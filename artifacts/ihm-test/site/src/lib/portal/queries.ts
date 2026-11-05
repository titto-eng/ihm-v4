// The five portal reads of 50-portal-data §4 as parameterised SQL with typed results.
// Every statement is a constant string with `?` placeholders. No interpolation, no concatenation, no template literals:
// tests/portal/no-raw-sql.test.ts greps this folder for that. Base filter B = partner_id=1 AND status='Active'
// AND enable=1 AND show_in_website=1 (written out in each statement so each can be read on its own).
import type { RowDataPacket } from 'mysql2/promise'
import { runQuery } from './client'
import type { CalendarEntry, CampusStartDates, CensusRow, Country, DateSection, PortalCourse, StartDates } from './types'

const emptySection = (): DateSection => ({ fixed: [], rolling: [] })

// ---------------------------------------------------------------- Q1 StartDates (functions.php:1309-1470)

const SQL_CAMPUSES = 'SELECT id, campus_name FROM campuses ORDER BY id'

const SQL_START_DATES =
  "SELECT cb.campus_id, cb.mod_of_delivery_id, cb.intake_id, cb.start_date FROM course_batches cb " +
  "WHERE cb.partner_id = 1 AND cb.status = 'Active' AND cb.enable = 1 AND cb.show_in_website = 1 AND cb.course_id = ? " +
  "AND ((cb.intake_id = 1 AND cb.start_date >= ?) OR (cb.intake_id = 2 AND cb.end_date >= ? AND (cb.mod_of_delivery_id <> 3 OR EXISTS " +
  "(SELECT 1 FROM course_batch_dates d WHERE d.course_batch_id = cb.id AND d.enrollment_end_date >= ?)))) " +
  "ORDER BY cb.start_date, cb.id"

type CampusRow = RowDataPacket & { id: number; campus_name: string }
type StartRow = RowDataPacket & { campus_id: number; mod_of_delivery_id: number; intake_id: number; start_date: string }

/** One query, partitioned by campus x mode x intake in TS (the legacy code ran six queries per campus). */
export async function startDates(khId: number, today: string): Promise<StartDates> {
  const [campuses, rows] = await Promise.all([
    runQuery<CampusRow>(SQL_CAMPUSES),
    runQuery<StartRow>(SQL_START_DATES, [khId, today, today, today]),
  ])
  const byCampus = new Map<number, CampusStartDates>()
  for (const c of campuses) {
    byCampus.set(c.id, { campusId: c.id, campusName: c.campus_name, f2f: emptySection(), online: emptySection(), blended: emptySection() })
  }
  for (const r of rows) {
    const campus = byCampus.get(r.campus_id)
    if (!campus) continue
    const section = r.mod_of_delivery_id === 1 ? campus.f2f : r.mod_of_delivery_id === 2 ? campus.online : r.mod_of_delivery_id === 3 ? campus.blended : null
    if (!section) continue
    ;(r.intake_id === 1 ? section.fixed : section.rolling).push(r.start_date)
  }
  return { campuses: [...byCampus.values()] }
}

// ---------------------------------------------------------------- Q2 Census (ihm-census-dates-sc.php:12)

const SQL_CENSUS =
  "SELECT cb.id, cb.start_date, cb.graduation_day, cb.orientation_date, d.semester_census_date FROM course_batches cb " +
  "JOIN course_batch_dates d ON d.course_batch_id = cb.id AND d.semester IN (0, 1) " +
  "WHERE cb.partner_id = 1 AND cb.status = 'Active' AND cb.enable = 1 AND cb.show_in_website = 1 AND cb.course_id = ? " +
  "AND cb.end_date >= ? AND d.enrollment_end_date >= ? ORDER BY cb.start_date, cb.id, d.course_batch_id"

type CensusSqlRow = RowDataPacket & {
  id: number
  start_date: string
  graduation_day: string | null
  orientation_date: string | null
  semester_census_date: string | null
}

/** First row per start_date wins (replaces the legacy non-deterministic GROUP BY). End = graduation_day. */
export async function censusDates(khId: number, today: string): Promise<CensusRow[]> {
  const rows = await runQuery<CensusSqlRow>(SQL_CENSUS, [khId, today, today])
  const seen = new Set<string>()
  const out: CensusRow[] = []
  for (const r of rows) {
    if (seen.has(r.start_date)) continue
    seen.add(r.start_date)
    out.push({ start: r.start_date, end: r.graduation_day ?? '', census: r.semester_census_date ?? '', orientation: r.orientation_date ?? '' })
  }
  return out
}

// ---------------------------------------------------------------- Q3 Intake calendar (template-monthly-calendar.php:36-133)

const SQL_CALENDAR =
  "SELECT cb.course_id, cb.campus_id, cb.start_date, cb.intake_id, cb.mod_of_delivery_id, c.course_name, ca.campus_name " +
  "FROM course_batches cb JOIN courses c ON c.id = cb.course_id AND c.enable = 1 JOIN campuses ca ON ca.id = cb.campus_id " +
  "WHERE cb.partner_id = 1 AND cb.status = 'Active' AND cb.enable = 1 AND cb.show_in_website = 1 " +
  "AND cb.start_date BETWEEN ? AND ? AND cb.intake_id IN (1, 2) AND cb.mod_of_delivery_id IN (1, 3) " +
  "AND (? IS NULL OR (? = 0 AND c.application_form5 = 1) OR (? = 1 AND c.application_form6 = 1)) " +
  "AND (NOT (cb.intake_id = 2 AND cb.mod_of_delivery_id = 3) OR EXISTS " +
  "(SELECT 1 FROM course_batch_dates d WHERE d.course_batch_id = cb.id AND d.enrollment_end_date >= ?)) " +
  "ORDER BY cb.start_date, cb.course_id, cb.campus_id, cb.id" // tie-breakers: rows on the same day come back in a stable order

type CalendarRow = RowDataPacket & {
  course_id: number
  campus_id: number
  start_date: string
  intake_id: number
  mod_of_delivery_id: number
  course_name: string
  campus_name: string
}

/** One query per month. `studentType`: 0 domestic, 1 international, null both. Deduped per day on (course, campus). */
export async function intakeCalendar(from: string, to: string, studentType: 0 | 1 | null, today: string): Promise<CalendarEntry[]> {
  const rows = await runQuery<CalendarRow>(SQL_CALENDAR, [from, to, studentType, studentType, studentType, today])
  const seen = new Set<string>()
  const out: CalendarEntry[] = []
  for (const r of rows) {
    const key = `${r.start_date}|${r.course_id}|${r.campus_id}`
    if (seen.has(key)) continue
    seen.add(key)
    out.push({
      date: r.start_date,
      khId: r.course_id,
      courseName: r.course_name,
      campusId: r.campus_id,
      campusName: r.campus_name,
      intake: r.intake_id === 2 ? 'rolling' : 'fixed',
      mode: r.mod_of_delivery_id === 3 ? 'blended' : 'f2f',
    })
  }
  return out
}

// ---------------------------------------------------------------- Q4 Countries (quick-enquiry.php:451)

const SQL_COUNTRIES = 'SELECT id, country_name FROM countries WHERE enable = 1 AND default_country = 1 ORDER BY id'
const SQL_COUNTRY_BY_ID = 'SELECT id, country_name FROM countries WHERE id = ?'

type CountryRow = RowDataPacket & { id: number; country_name: string }

export async function countries(): Promise<Country[]> {
  return (await runQuery<CountryRow>(SQL_COUNTRIES)).map((r) => ({ id: r.id, name: r.country_name }))
}

export async function countryById(id: number): Promise<Country | null> {
  const r = (await runQuery<CountryRow>(SQL_COUNTRY_BY_ID, [id]))[0]
  return r ? { id: r.id, name: r.country_name } : null
}

// ---------------------------------------------------------------- Q5 Course by kh_id (quick-enquiry.php:10)

const SQL_COURSE =
  'SELECT id, course_name, crm_courseid, crm_staff_id, application_form_flag, application_form2, application_form3, ' +
  'application_form4, application_form7, application_form9 FROM courses WHERE id = ?'

type CourseRow = RowDataPacket & {
  id: number
  course_name: string
  crm_courseid: string | null
  crm_staff_id: string | null
  application_form_flag: number | null
  application_form2: number | null
  application_form3: number | null
  application_form4: number | null
  application_form7: number | null
  application_form9: number | null
}

export async function courseByKhId(khId: number): Promise<PortalCourse | null> {
  const r = (await runQuery<CourseRow>(SQL_COURSE, [khId]))[0]
  if (!r) return null
  return {
    khId: r.id,
    name: r.course_name,
    crmCourseId: r.crm_courseid,
    crmStaffId: r.crm_staff_id,
    formFlags: { flag: r.application_form_flag, flag2: r.application_form2, flag3: r.application_form3, flag4: r.application_form4, flag7: r.application_form7, flag9: r.application_form9 },
  }
}
