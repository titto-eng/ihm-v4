// /thanks-events/ — where the event registration form lands (src/content/forms.ts `event-registration`). Not indexed.
import type { Metadata } from 'next'
import { pageMetadata } from '@/components/page'
import { ThankYou } from '@/components/legal/parts'

export const metadata: Metadata = pageMetadata({
  title: 'Thanks : Events',
  path: '/thanks-events/',
  description: 'Thanks for registering. One of our representatives will get back to you shortly.',
  noindex: true,
})

export default function ThanksEventsRoute() {
  return (
    <ThankYou eyebrow="Registration received" title="Thanks for your enquiry."
      body={<p>One of our representatives will get back to you shortly. In the mean time feel free to contact us via our toll free number or via email.</p>}
      next={[
        { href: '/news-and-events/', label: 'News and events', note: 'More events, open days and announcements.' },
        { href: '/mon-events-and-webinars/', label: 'Webinars', note: 'Master of Nursing events and webinars.' },
        { href: '/courses/', label: 'Find your course', note: 'Compare nursing, social work and health courses.' },
      ]} />
  )
}
