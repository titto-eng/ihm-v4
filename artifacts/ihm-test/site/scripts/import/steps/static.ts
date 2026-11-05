/**
 * Step `static` (30-import, 60-landing §5 "copy-static" rows): copies document stores into `public/` at the SAME public paths.
 *
 * Inputs (all under ../ihmv3/, read-only):
 *   - `../inventory/v2/ihm/landing-pages.csv` rows with `recommendation=copy-static` (12: the 9 `pdf/*` and `brochures/IHM_NEW_Brochures` folder rows,
 *     `IHM_Domestic_SHB/IHM_Domestic_SHB.pdf`, `International-SHB/International-SHB.pdf`): a folder row copies that folder recursively.
 *   - the document stores `pdf/**`, `brochures/**`, `IHM_Domestic_SHB/`, `International-SHB/`.
 *   - alias: the repo file `IHM_Domestic_SHB/Domestic-SHB.pdf` is served under BOTH `/IHM_Domestic_SHB/Domestic-SHB.pdf` and the linked
 *     `/IHM_Domestic_SHB/IHM_Domestic_SHB.pdf` (landing-pages.csv notes; 08 §2), so no redirect is needed.
 * Rules: allowlist pdf, jpg, jpeg, png, webp, gif, svg (never .php/.htaccess/.js, backup names such as `*.pdf_bkp(...)`, dotfiles); files over 50 MB are
 * skipped and listed; an SVG that holds `<script`, `javascript:` or an `on*=` handler is skipped and listed (`unsafeSvgReason`); exact names kept (spaces, `&`). Never fetches from production: `/brochures/...` targets that exist only there are listed as
 * `missingOnProduction` (the 9 live `brochures-dead-target` rows). Writes `scripts/import/out/ihm-static-manifest.json` (path, bytes, sha256)
 * and `ihm-static.report.json`. Idempotent: an identical file (same size and sha256) is left alone.
 * Not copied by design: the two flipbook folders (their paths 301 to PDFs, DEC-17), `ihm-alumni/`, `sae/` images, `automated-gcan-enrolment/`
 * (needs-decision), `lp/`, `enquirenow/`.
 * Run: `npm run import -- static [--dry]` or `npx tsx scripts/import/steps/static.ts [--dry]` (`ctx.dry`, the CLI's flag).
 */
import 'dotenv/config'
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { dirname, extname, join, resolve, relative } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { parse } from 'csv-parse/sync'

export const name = 'static'

const here = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(here, '../../..')
const OLD = resolve(ROOT, '../ihmv3')
const INV = resolve(ROOT, '../inventory/v2/ihm')
const PUBLIC = join(ROOT, 'public')
const OUT = join(ROOT, 'scripts/import/out')
const SEEDS = join(process.cwd(), 'scripts', 'import', 'seeds')

const ALLOW = new Set(['.pdf', '.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'])
const MAX_BYTES = 50 * 1024 * 1024

/** Why an SVG may not be served from public/ (90-security §7), or null when it carries no script. Checked on the decoded text. */
export function unsafeSvgReason(svg: string): string | null {
  const text = svg.replace(/&#x([0-9a-f]+);?/gi, (_, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&#(\d+);?/g, (_, d) => String.fromCodePoint(Number(d)))
  if (/<\s*script[\s>\/]/i.test(text)) return 'svg contains <script>'
  if (/javascript\s*:/i.test(text)) return 'svg contains a javascript: URL'
  if (/\son[a-z]+\s*=/i.test(text)) return 'svg contains an on*= event handler'
  return null
}

function walk(dir: string): string[] {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (e.name.startsWith('.')) return []
    const p = join(dir, e.name)
    return e.isDirectory() ? walk(p) : e.isFile() ? [p] : []
  })
}

export async function run(ctx: { dry?: boolean } = {}) {
  // The copy-static rows only name folders and files inside the four stores walked below, so without the inventory CSV
  // (a machine without ../inventory/v2/ihm) the step copies the same files.
  const csv = join(INV, 'landing-pages.csv')
  const rows: Record<string, string>[] = existsSync(csv) ? parse(readFileSync(csv, 'utf8'), { columns: true, skip_empty_lines: true, bom: true }) : []
  if (!existsSync(csv)) console.log('[static] no inventory CSV on this machine; copying the four document stores (pdf, brochures, IHM_Domestic_SHB, International-SHB)')

  // public path (leading slash, decoded) -> source file
  const want = new Map<string, string>()
  const add = (file: string) => {
    const rel = '/' + relative(OLD, file).split('\\').join('/')
    want.set(rel, file)
  }
  const stores = ['pdf', 'brochures', 'IHM_Domestic_SHB', 'International-SHB']
  for (const s of stores) for (const f of walk(join(OLD, s))) add(f)
  for (const r of rows.filter((x) => x.recommendation === 'copy-static')) {
    const p = decodeURI(new URL(r.url).pathname)
    const abs = join(OLD, p)
    if (existsSync(abs) && statSync(abs).isDirectory()) walk(abs).forEach(add)
    else if (existsSync(abs)) add(abs)
  }
  // alias: the linked handbook name (the repo file is named Domestic-SHB.pdf)
  const dom = join(OLD, 'IHM_Domestic_SHB/Domestic-SHB.pdf')
  if (existsSync(dom)) want.set('/IHM_Domestic_SHB/IHM_Domestic_SHB.pdf', dom)

  const manifest: { path: string; bytes: number; sha256: string }[] = []
  const skipped: { path: string; reason: string; bytes?: number }[] = []
  // created = new file in public/, updated = file replaced because it changed, unchanged = identical file already there.
  let created = 0, updated = 0, unchanged = 0

  // Files production no longer serves (404 on live per the parity crawl) are held, never copied: a gone URL stays gone (rule 1, D11).
  const heldPath = join(SEEDS, 'static-held.json')
  const held = new Set<string>(existsSync(heldPath) ? (JSON.parse(readFileSync(heldPath, 'utf8')) as { paths: string[] }).paths : [])
  for (const [pub, src] of [...want].sort(([a], [b]) => a.localeCompare(b))) {
    if (held.has(pub)) { skipped.push({ path: pub, reason: 'held: 404 on production (static-held.json)' }); continue }
    const ext = extname(pub).toLowerCase()
    if (!ALLOW.has(ext)) { skipped.push({ path: pub, reason: `extension ${ext || '(none)'} not allowed` }); continue }
    const bytes = statSync(src).size
    if (bytes > MAX_BYTES) { skipped.push({ path: pub, reason: 'over 50 MB', bytes }); continue }
    const buf = readFileSync(src)
    if (ext === '.svg') {
      const unsafe = unsafeSvgReason(buf.toString('utf8'))
      if (unsafe) { skipped.push({ path: pub, reason: unsafe, bytes }); continue }
    }
    const sha256 = createHash('sha256').update(buf).digest('hex')
    const dest = join(PUBLIC, pub)
    const exists = existsSync(dest)
    const same = exists && statSync(dest).size === bytes && createHash('sha256').update(readFileSync(dest)).digest('hex') === sha256
    if (same) unchanged++
    else {
      if (exists) updated++
      else created++
      if (!ctx.dry) { mkdirSync(dirname(dest), { recursive: true }); copyFileSync(src, dest) }
    }
    manifest.push({ path: pub, bytes, sha256 })
  }

  const missingOnProduction = rows
    .filter((r) => r.section === 'brochures-dead-target' && r.live_status.startsWith('live'))
    .map((r) => decodeURI(new URL(r.url).pathname))
  const totalBytes = manifest.reduce((n, m) => n + m.bytes, 0)

  mkdirSync(OUT, { recursive: true })
  writeFileSync(join(OUT, 'ihm-static-manifest.json'), JSON.stringify(manifest, null, 2))
  const report = {
    step: name, dryRun: Boolean(ctx.dry), files: manifest.length, created, updated, unchanged, skipped: skipped.length, skippedList: skipped,
    totalBytes, totalMB: Math.round((totalBytes / 1048576) * 10) / 10, missingOnProduction,
    review: ['/pdf/IHM_Agent_List_2025.pdf: public agent list; confirm it holds no personal data (AGENTS.md rule 4) before launch'],
  }
  writeFileSync(join(OUT, 'ihm-static.report.json'), JSON.stringify(report, null, 2))
  const held404 = skipped.filter((x) => x.reason.startsWith('held')).length
  console.log(
    `[static] ${manifest.length} files (${report.totalMB} MB) in public/: ${created} new, ${updated} changed, ${unchanged} already up to date` +
      (skipped.length ? `; ${skipped.length} not copied on purpose (${held404} are gone on the live site, ${skipped.length - held404} other: see ${relative(ROOT, join(OUT, 'ihm-static.report.json'))})` : ''),
  )
  return { name, files: manifest.length, created, updated, unchanged, skipped: skipped.length, skippedList: skipped, totalMB: report.totalMB, missingOnProduction: missingOnProduction.length }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  run({ dry: process.argv.includes('--dry') || process.argv.includes('--dry-run') }).then((r) => { console.log(r); process.exit(0) }, (e) => { console.error(e); process.exit(1) })
}
