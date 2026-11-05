// /course-calendar/ — WordPress template-course-calendar.php, which framed /monthly-calendar/ under a "Domestic / International
// Course Calendar" heading (`?stud_type=0|1`). Here it renders the same calendar directly.
import type { Metadata } from 'next'
import { pageMetadata } from '@/components/page'
import { CalendarShell } from '@/components/calendar/CalendarShell'
import { studentTypeParam } from '@/components/calendar/load'

export const metadata: Metadata = pageMetadata({
  title: 'Course Calendar',
  path: '/course-calendar/',
  metaTitle: 'Course Calendar | Upcoming Intakes for Domestic and International Students | IHM',
  description: 'Upcoming IHM course intakes for the next 12 months, for domestic and international students, by campus and mode of delivery.',
})

type Search = Promise<Record<string, string | string[] | undefined>>

export default async function CourseCalendarRoute({ searchParams }: { searchParams: Search }) {
  const sp = await searchParams
  return (
    <CalendarShell
      path="/course-calendar/"
      title="Course Calendar"
      intro="Upcoming intakes for the next 12 months. Choose domestic or international to see the courses open to you, then open a start date for the course details."
      studentType={studentTypeParam(sp.stud_type)}
    />
  )
}
