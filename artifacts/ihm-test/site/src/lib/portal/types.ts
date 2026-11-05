// Typed results of the portal queries (50-portal-data §2). Dates are `YYYY-MM-DD` strings, never `Date`.

export type DateSection = { fixed: string[]; rolling: string[] }

export type CampusStartDates = {
  campusId: number
  campusName: string
  f2f: DateSection
  online: DateSection
  blended: DateSection
}

export type StartDates = { campuses: CampusStartDates[] }

/** One row of the census table, raw ISO dates (format.ts turns them into the live display strings). */
export type CensusRow = { start: string; end: string; census: string; orientation: string }

export type CalendarEntry = {
  date: string
  khId: number
  courseName: string
  campusId: number
  campusName: string
  intake: 'fixed' | 'rolling'
  mode: 'f2f' | 'blended'
}

export type Country = { id: number; name: string }

export type PortalCourse = {
  khId: number
  name: string
  crmCourseId: string | null
  crmStaffId: string | null
  formFlags: { flag: number | null; flag2: number | null; flag3: number | null; flag4: number | null; flag7: number | null; flag9: number | null }
}

/** Every public function returns this: a page never sees an exception (50 §4 Failure). */
export type PortalResult<T> = { unavailable: boolean; data: T }

export type StudentType = 'domestic' | 'international'
