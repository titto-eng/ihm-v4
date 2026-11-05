// /student-cultural-workshop-events/ — WordPress template-student-aboriginal-workshops.php (synced 2026-10-30). Data: src/content/cultural-events.ts.
import type { Metadata } from 'next'
import { pageMetadata } from '@/components/page'
import { CulturalEventsPage } from '@/components/cultural-events/CulturalEventsPage'
import { STUDENT_EVENTS } from '@/content/cultural-events'

const PATH = '/student-cultural-workshop-events/'

export const metadata: Metadata = pageMetadata({
  title: 'Student Cultural Workshop Events',
  path: PATH,
  metaTitle: 'Aboriginal Cultural Workshops & Events for Students | IHM',
  description: 'Workshops and events at IHM exploring Aboriginal and Torres Strait Islander cultures, storytelling and culturally safe practice, led by community elders, artists and educators.',
})

export default function StudentCulturalWorkshopEventsRoute() {
  return <CulturalEventsPage events={STUDENT_EVENTS} categories={['Workshop', 'Seminar', 'Event']} audience="Students" path={PATH} />
}
