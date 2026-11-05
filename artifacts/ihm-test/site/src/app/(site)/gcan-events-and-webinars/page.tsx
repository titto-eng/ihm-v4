// /gcan-events-and-webinars/ — WordPress page: GCAN webinars and events (the old page's JavaScript dataset, now
// src/content/webinars.ts) with location/presenter filters, and the event registration form.
import type { Metadata } from 'next'
import { SessionsPage, sessionsMetadata } from '@/components/webinars/SessionsPage'
import { GCAN_SESSIONS } from '@/content/webinars'

export const revalidate = 3600
export const metadata: Metadata = sessionsMetadata('GCAN Events and Webinars', '/gcan-events-and-webinars/', 'Graduate Certificate in Advanced Nursing')

export default function GcanEventsAndWebinarsRoute() {
  return <SessionsPage title={<>GCAN <em className="text-secondary">events and webinars</em></>} sessions={GCAN_SESSIONS} />
}
