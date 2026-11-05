import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, extname, resolve } from 'node:path'
import * as cheerio from 'cheerio'
import pLimit from 'p-limit'
import { CACHE_DIR, CONCURRENCY, LEGACY_BASE_URL, LEGACY_ROOT, MEDIA_EXTENSIONS, MEDIA_MAP_PATH, MEDIA_MAX_BYTES, OUT_DIR } from '../lib/config'
import { loadMediaMap, normaliseLegacyPath, type ImportContext, type MediaMap } from '../lib/context'
import { decodeTitle, eventImagePath, loadCourses, loadEvents, loadPages, loadPosts } from '../lib/data'

// `media`: every wp-content/uploads URL referenced by pages, posts and staff pages goes into the `media` collection with
// legacyPath = the original path (no host, no leading slash). Theme assets (wp-content/themes) are NOT imported.
export const name = 'media'
export const order = 20

const UPLOADS = /(?:https?:)?(?:\/\/(?:www\.)?ihm\.edu\.au)?(\/wp-content\/uploads\/[^"'\s)<>\\]+)/gi

type Ref = { path: string; alt: string }

/** uploads URL → first alt text seen. Looks at src, href and CSS url(): the extractor reads the same places. */
export function collectReferences(htmls: string[]): Map<string, Ref> {
  const refs = new Map<string, Ref>()
  for (const html of htmls) {
    const alts = new Map<string, string>()
    if (html.includes('<img')) {
      const $ = cheerio.load(html)
      $('img[src]').each((_, el) => {
        const key = normaliseLegacyPath(($(el).attr('src') ?? '').replace(/&#038;|&amp;/g, '&'))
        if (!alts.get(key)) alts.set(key, ($(el).attr('alt') ?? '').trim())
      })
    }
    for (const m of html.matchAll(UPLOADS)) {
      const key = normaliseLegacyPath(m[1].replace(/&#038;|&amp;/g, '&'))
      const found = refs.get(key)
      if (!found) refs.set(key, { path: key, alt: alts.get(key) ?? '' })
      else if (!found.alt && alts.get(key)) found.alt = alts.get(key) ?? ''
    }
  }
  return refs
}

/** GET only. Retries network errors and 5xx twice; a 404 is final (the file is gone from the live site). */
async function fetchWithRetry(url: string, attempts = 3): Promise<Response> {
  for (let i = 1; ; i++) {
    try {
      const res = await fetch(url, { headers: { 'user-agent': 'ihm-web-import/1.0' }, signal: AbortSignal.timeout(30_000) })
      if (res.status < 500 || i === attempts) return res
    } catch (e) {
      if (i === attempts) throw e
    }
    await new Promise((r) => setTimeout(r, 500 * i))
  }
}

const humanise = (file: string) =>
  basename(file, extname(file))
    .replace(/-(scaled|e\d{10,})$/g, '')
    .replace(/-\d+x\d+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim() || 'Image'

export async function run(ctx: ImportContext) {
  const { payload, report } = ctx
  const items = [...loadPages(), ...loadPosts(), ...loadCourses()]
  const refs = collectReferences(items.map((p) => p.content ?? ''))
  // Featured images (posts' hero, courses' hero) are not in the body.
  for (const p of items) {
    if (!p.featured_media) continue
    const key = normaliseLegacyPath(p.featured_media)
    if (!refs.has(key)) refs.set(key, { path: key, alt: decodeTitle(p.title.rendered) })
  }
  // Event images (old wp_mwt_events.image, served from uploads/mwt-events/).
  for (const e of loadEvents()) {
    const key = eventImagePath(e.image)
    if (key && !refs.has(key)) refs.set(key, { path: key, alt: e.name })
  }
  ctx.log(`${refs.size} distinct uploads referenced`)
  mkdirSync(resolve(CACHE_DIR, 'media'), { recursive: true })
  const limit = pLimit(CONCURRENCY)
  const skippedByReason: Record<string, number> = {}
  const skip = (reason: string) => {
    report.skipped++
    skippedByReason[reason] = (skippedByReason[reason] ?? 0) + 1
  }

  await Promise.all(
    [...refs.values()].map((ref) =>
      limit(async () => {
        if (!ctx.wanted(ref.path)) return
        const ext = extname(ref.path).slice(1).toLowerCase()
        if (!(MEDIA_EXTENSIONS as readonly string[]).includes(ext)) {
          skip(`extension-not-allowed:${ext || 'none'}`)
          return
        }
        const existing = await payload.find({ collection: 'media', where: { legacyPath: { equals: ref.path } }, limit: 1, depth: 0, overrideAccess: true })
        if (existing.docs[0]) {
          skip('already-imported')
          return
        }
        if (ctx.dry) {
          report.created++
          return
        }
        try {
          // The old site's own copy under ../ihmv3 first (no network, same bytes); the live site only for files not kept locally.
          const local = resolve(LEGACY_ROOT, ref.path)
          let buf: Buffer
          if (local.startsWith(LEGACY_ROOT) && existsSync(local)) {
            buf = readFileSync(local)
            report.fromLocal = Number(report.fromLocal ?? 0) + 1
          } else {
            const url = `${LEGACY_BASE_URL}/${ref.path.split('/').map(encodeURIComponent).join('/')}`
            const res = await fetchWithRetry(url)
            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            const type = res.headers.get('content-type') ?? ''
            if (!/^(image\/|application\/pdf)/.test(type)) throw new Error(`unexpected content-type ${type}`)
            buf = Buffer.from(await res.arrayBuffer())
          }
          if (buf.length > MEDIA_MAX_BYTES) throw new Error(`file too large (${buf.length} bytes)`)
          const file = resolve(CACHE_DIR, 'media', `${createHash('sha256').update(ref.path).digest('hex').slice(0, 12)}-${basename(ref.path)}`)
          writeFileSync(file, buf)
          await payload.create({
            collection: 'media',
            data: { alt: ref.alt || humanise(ref.path), legacyPath: ref.path },
            filePath: file,
            ...ctx.opts,
          })
          report.created++
        } catch (e) {
          report.failed.push({ id: ref.path, reason: e instanceof Error ? e.message : String(e) })
        }
      }),
    ),
  )
  report.skippedByReason = skippedByReason

  // The URL map every later step reads: legacyPath → media id (all docs that carry a legacyPath).
  const map: MediaMap = ctx.dry && existsSync(MEDIA_MAP_PATH) ? loadMediaMap() : {}
  if (!ctx.dry) {
    const all = await payload.find({ collection: 'media', limit: 0, depth: 0, pagination: false, overrideAccess: true })
    for (const d of all.docs) if (d.legacyPath) map[d.legacyPath] = Number(d.id)
    mkdirSync(OUT_DIR, { recursive: true })
    writeFileSync(MEDIA_MAP_PATH, JSON.stringify({ generatedAt: new Date().toISOString(), count: Object.keys(map).length, map }, null, 2))
  }
  report.referenced = refs.size
  report.mapEntries = Object.keys(map).length
}
