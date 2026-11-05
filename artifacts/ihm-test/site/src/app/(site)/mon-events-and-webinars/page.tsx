// /mon-events-and-webinars/ — WordPress page 10001: Master of Nursing webinars and events (the old page's JavaScript dataset,
// now src/content/webinars.ts) with location/presenter filters, and the event registration form.
import type { Metadata } from 'next'
import { SessionsPage, sessionsMetadata } from '@/components/webinars/SessionsPage'
import { MON_SESSIONS } from '@/content/webinars'

export const revalidate = 3600
export const metadata: Metadata = sessionsMetadata('MON Events and Webinars', '/mon-events-and-webinars/', 'Master of Nursing')

export default function MonEventsAndWebinarsRoute() {
  return <SessionsPage title={<>Master of Nursing <em className="text-secondary">events and webinars</em></>} sessions={MON_SESSIONS} />
}
