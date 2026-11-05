import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import type { Payload } from 'payload'
import { findLegacyMarkup } from '../../scripts/import/lib/assert-clean'
import { loadPageRows } from '../../scripts/import/lib/data'
import { newReport, type ImportContext } from '../../scripts/import/lib/context'
import { run as runWpCourses } from '../../scripts/import/steps/wp-courses'
import { boot } from '../collections/helpers'

// Integration: the wp-courses step against the dev Postgres (the import is idempotent, so this runs it again and expects no change).
let payload: Payload
const slugs = loadPageRows().filter((r) => r.wp_type === 'courses')

beforeAll(async () => {
  payload = await boot()
  const report = newReport('wp-courses', false)
  const ctx: ImportContext = {
    payload, args: { step: 'wp-courses', only: null, dry: false, force: false, flags: {} }, dry: false, report,
    opts: { context: { importing: true }, overrideAccess: true }, log: () => {}, wanted: () => true,
  }
  await runWpCourses(ctx)
  Object.assign(globalThis, { __wpCoursesReport: report })
}, 170_000)
afterAll(async () => {
  await payload?.destroy?.()
})

// Only imported courses (they carry import.wpId). Other test files create and delete their own courses in parallel, and a crashed
// run can leave one behind; neither may count here.
const all = async () =>
  (await payload.find({ collection: 'courses', limit: 200, depth: 0, pagination: false, overrideAccess: true, draft: true })).docs.filter((d) => d.import?.wpId)

describe('wp-courses import state', () => {
  it('a second run changes nothing (idempotent)', () => {
    const r = (globalThis as unknown as { __wpCoursesReport: { created: number; updated: number; skipped: number; failed: unknown[] } }).__wpCoursesReport
    expect(r.failed).toEqual([])
    expect(r.created).toBe(0)
    expect(r.updated).toBe(0)
    expect(r.skipped).toBe(slugs.length)
  })

  // 26 courses in the original crawl (../inventory); 25 in a .data/inventory written from a dump where course 10402 is private.
  it('has every course at its pages.csv path', async () => {
    const docs = await all()
    expect(slugs.length).toBeGreaterThanOrEqual(25)
    expect(docs.map((d) => d.path).sort()).toEqual(slugs.map((r) => r.path).sort())
  })

  it('kh_id: 10 resolved from the theme, the other real courses kh-unresolved, tests flagged', async () => {
    const docs = await all()
    const real = docs.filter((d) => ![1476, 1478].includes(d.import?.wpId ?? 0))
    expect(real.filter((d) => d.khId)).toHaveLength(10)
    expect(real.filter((d) => d.khId).every((d) => d.khIdSource === 'scrape')).toBe(true)
    expect(real.filter((d) => !d.khId).every((d) => d.import?.reviewStatus === 'kh-unresolved')).toBe(true)
    expect(real.filter((d) => !d.khId)).toHaveLength(real.length - 10)
    const tests = docs.filter((d) => [1476, 1478].includes(d.import?.wpId ?? 0))
    expect(tests.every((d) => d.seo?.noindex === true && d.import?.reviewStatus === 'check')).toBe(true)
  })

  it('DEC-7: showStartDates is off on every course; the commented StartDates never reached a layout', async () => {
    const docs = await all()
    expect(docs.every((d) => d.showStartDates === false)).toBe(true)
    expect(JSON.stringify(docs.map((d) => d.sections))).not.toMatch(/"blockType":"startDates"|start-date-ul/)
  })

  it('stores blocks only: no legacy markup, one section per slot, diabetes has its slots', async () => {
    const docs = await all()
    for (const d of docs) {
      expect(findLegacyMarkup(d.sections), d.slug).toEqual([])
      const slots = (d.sections ?? []).map((s) => s.slot)
      expect(new Set(slots).size, d.slug).toBe(slots.length)
    }
    const diabetes = docs.find((d) => d.slug === 'diabetes-nursing')!
    const slots = (diabetes.sections ?? []).map((s) => s.slot)
    for (const s of ['overview', 'entry', 'structure', 'careers', 'faq', 'fees']) expect(slots).toContain(s)
  })

  it('a table inside an accordion body stays a nested table block (DEC-15d)', async () => {
    const docs = await all()
    const found = docs.some((d) => JSON.stringify(d.sections).includes('"blockType":"accordion"') && /"blockType":"accordion"[\s\S]*?"blockType":"table"/.test(JSON.stringify(d.sections)))
    expect(found).toBe(true)
  })
})
