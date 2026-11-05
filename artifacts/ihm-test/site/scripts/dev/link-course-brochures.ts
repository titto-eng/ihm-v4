// Links each course's brochure document (`courses.brochure`, DEC-69) from its legacy `brochureUrl`:
//   1. the URL is normalised like a document path (host and query dropped, decoded) and resolved through `DOCUMENT_ALIASES`;
//   2. the `documents` row with that `publicPath` gets category `brochure` (so the course's picker accepts it), then the course
//      gets `brochure` = that row. `brochureUrl` is left as it is (legacy fallback).
// Safe to re-run: a course whose `brochure` is already set is reported as `already` and left alone (marketing's pick wins).
// A course with a newer unpublished draft is skipped (`draft-pending`) so the update never publishes or drops the draft.
//
// Usage: npx tsx scripts/dev/link-course-brochures.ts [--dry]
//   --dry   write the report only, no database writes
// Report: scripts/dev/out/course-brochures-report.json
import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'
import { getPayload } from 'payload'
import { DOCUMENT_ALIASES, normalisePublicPath } from '../../src/collections/Documents'

if (process.env.NODE_ENV === 'production') throw new Error('link-course-brochures is dev only')
process.env.DISABLE_DB_PUSH ??= '1' // the dev server owns schema push (DEC-46); the config reads the flag when it loads, so it is imported in main()

const DRY = process.argv.includes('--dry')
const OUT = path.resolve('scripts/dev/out/course-brochures-report.json')

type Status = 'linked' | 'already' | 'unmatched' | 'draft-pending' | 'external'
type Row = { slug: string; status: Status; brochureUrl: string; publicPath?: string; documentId?: number; note?: string }

async function main() {
  const { default: config } = await import('../../src/payload.config')
  const payload = await getPayload({ config })
  const ctx = { overrideAccess: true, context: { disableRevalidate: true } } as const

  const { docs: courses } = await payload.find({
    collection: 'courses', where: { brochureUrl: { exists: true } }, depth: 0, limit: 0, pagination: false, sort: 'slug', ...ctx,
  })
  const rows: Row[] = []
  const recategorised = new Set<number>()

  for (const course of courses) {
    const url = (course.brochureUrl ?? '').trim()
    if (!url) continue
    const row: Row = { slug: course.slug, status: 'unmatched', brochureUrl: url }
    rows.push(row)
    if (course.brochure) {
      row.status = 'already'
      row.documentId = typeof course.brochure === 'object' ? course.brochure.id : course.brochure
      continue
    }
    if (/^https?:\/\//i.test(url) && !/^https?:\/\/(www\.)?ihm\.edu\.au\//i.test(url)) {
      row.status = 'external'
      continue
    }
    const decoded = normalisePublicPath(url)
    const publicPath = DOCUMENT_ALIASES[decoded] ?? decoded
    row.publicPath = publicPath
    const { docs } = await payload.find({ collection: 'documents', where: { publicPath: { equals: publicPath } }, depth: 0, limit: 1, ...ctx })
    const doc = docs[0]
    if (!doc) continue
    row.documentId = doc.id

    // A newer draft than the published row means marketing has unpublished edits: leave the course for a person.
    const latest = await payload.findVersions({ collection: 'courses', where: { parent: { equals: course.id } }, sort: '-updatedAt', limit: 1, depth: 0, ...ctx })
    if (latest.docs[0]?.version?._status === 'draft') {
      row.status = 'draft-pending'
      row.note = 'Newer draft exists: set Brochure on the draft by hand.'
      continue
    }
    row.status = 'linked'
    if (DRY) continue
    if (doc.category !== 'brochure' && !recategorised.has(doc.id)) {
      await payload.update({ collection: 'documents', id: doc.id, data: { category: 'brochure' }, depth: 0, ...ctx })
      recategorised.add(doc.id)
    }
    await payload.update({ collection: 'courses', id: course.id, data: { brochure: doc.id }, draft: false, depth: 0, ...ctx })
  }

  const count = (s: Status) => rows.filter((r) => r.status === s).length
  const summary = {
    dry: DRY,
    courses: rows.length,
    linked: count('linked'),
    already: count('already'),
    unmatched: count('unmatched'),
    draftPending: count('draft-pending'),
    external: count('external'),
    documentsRecategorised: recategorised.size,
  }
  fs.mkdirSync(path.dirname(OUT), { recursive: true })
  fs.writeFileSync(OUT, JSON.stringify({ summary, rows }, null, 2) + '\n')
  console.log(JSON.stringify(summary))
  console.log(`report: ${path.relative(process.cwd(), OUT)}`)
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
