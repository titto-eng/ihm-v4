import { getPayload } from 'payload'
import config from '@payload-config'
import { calendarLabel, getIntakeCalendar, portalEnabled, portalToday } from '@/lib/portal'

export type CalEntry = { date: string; course: string; path: string; campus: string; mode: string; khId: number }
export type CalData = { state: 'ok' | 'empty' | 'unavailable'; months: { year: number; month: number }[]; entries: CalEntry[]; today: string }

export const MONTHS_AHEAD = 12

/**
 * The next 12 months of portal intakes (/monthly-calendar/, /course-calendar/), one cached query per month, as the WordPress
 * template-monthly-calendar.php read them. `studentType`: 0 domestic, 1 international, null both. A course shows only when a
 * published course page has its khId (the old page's wp_postmeta `kh_id` join), and links there.
 */
export async function loadCalendar(studentType: 0 | 1 | null): Promise<CalData> {
  const today = portalToday()
  const [y0, m0] = today.split('-').map(Number)
  const months = Array.from({ length: MONTHS_AHEAD }, (_, i) => ({ year: y0 + Math.floor((m0 - 1 + i) / 12), month: ((m0 - 1 + i) % 12) + 1 }))
  if (!portalEnabled()) return { state: 'unavailable', months, entries: [], today }
  const results = await Promise.all(months.map((m) => getIntakeCalendar(m.year, m.month, studentType)))
  if (results.every((r) => r.unavailable)) return { state: 'unavailable', months, entries: [], today }
  const all = results.flatMap((r) => r.data)
  const khIds = [...new Set(all.map((e) => e.khId))]
  let known = new Map<number, { path: string; title: string }>()
  if (khIds.length) {
    try {
      const payload = await getPayload({ config })
      const { docs } = await payload.find({
        collection: 'courses', where: { and: [{ khId: { in: khIds } }, { _status: { equals: 'published' } }] },
        depth: 0, limit: 200, pagination: false, select: { khId: true, path: true, title: true },
      })
      known = new Map(docs.flatMap((d) => (d.khId ? [[d.khId, { path: d.path ?? '/courses/', title: d.title }] as const] : [])))
    } catch {
      return { state: 'unavailable', months, entries: [], today }
    }
  }
  const entries = all.filter((e) => known.has(e.khId)).map((e) => ({
    date: e.date, khId: e.khId, course: e.courseName, path: known.get(e.khId)!.path, campus: e.campusName, mode: calendarLabel(e),
  }))
  return { state: entries.length ? 'ok' : 'empty', months, entries, today }
}

/** `?stud_type=0` domestic, `1` international (the old query parameter), anything else both. */
export const studentTypeParam = (v: string | string[] | undefined): 0 | 1 | null => (v === '0' ? 0 : v === '1' ? 1 : null)
