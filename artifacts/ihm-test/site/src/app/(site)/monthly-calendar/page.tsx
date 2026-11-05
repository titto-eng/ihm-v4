// /monthly-calendar/ — WordPress template-monthly-calendar.php: the portal intake calendar a month at a time. The old query
// parameters still work: `?stud_type=0|1` (domestic / international) and `?month=&year=` (the month shown first).
import type { Metadata } from 'next'
import { pageMetadata } from '@/components/page'
import { CalendarShell } from '@/components/calendar/CalendarShell'
import { studentTypeParam } from '@/components/calendar/load'

export const metadata: Metadata = pageMetadata({
  title: 'Monthly Calendar',
  path: '/monthly-calendar/',
  metaTitle: 'Monthly Intake Calendar | Course Start Dates by Month | IHM',
  description: 'IHM course start dates month by month: Master of Nursing, Bachelor of Social Work, GCAN, NCLEX and OSCE intakes across Melbourne, Sydney, Perth and online, for domestic and international students.',
})

type Search = Promise<Record<string, string | string[] | undefined>>

export default async function MonthlyCalendarRoute({ searchParams }: { searchParams: Search }) {
  const sp = await searchParams
  const month = Number(sp.month), year = Number(sp.year)
  const initial = month >= 1 && month <= 12 && year > 2000 ? { year, month } : null
  return (
    <CalendarShell
      path="/monthly-calendar/"
      title="Monthly Calendar"
      intro="Every upcoming IHM intake, a month at a time. Pick a month, filter by course, and open any start date for the course details."
      studentType={studentTypeParam(sp.stud_type)}
      initial={initial}
    />
  )
}
