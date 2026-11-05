// /staff-cultural-workshop-events/ — WordPress template-staff-aboriginal-workshops.php (synced 2026-10-30). Data: src/content/cultural-events.ts.
import type { Metadata } from 'next'
import { pageMetadata } from '@/components/page'
import { CulturalEventsPage } from '@/components/cultural-events/CulturalEventsPage'
import { STAFF_EVENTS } from '@/content/cultural-events'

const PATH = '/staff-cultural-workshop-events/'

export const metadata: Metadata = pageMetadata({
  title: 'Staff Cultural Workshop Events',
  path: PATH,
  metaTitle: 'Aboriginal Cultural Workshops & Events for Staff | IHM',
  description: 'Workshops and events at IHM exploring Aboriginal and Torres Strait Islander cultures, storytelling and culturally safe practice, led by community elders, artists and educators.',
})

export default function StaffCulturalWorkshopEventsRoute() {
  return <CulturalEventsPage events={STAFF_EVENTS} categories={['Workshop', 'Seminar']} audience="Staff" path={PATH} />
}
