// /thanks/ — where most enquiry forms land after a successful submission (src/content/forms.ts `thankYou`, /api/enquire).
// Not indexed. Layout: ThankYou in src/components/legal/parts.tsx.
import type { Metadata } from 'next'
import { pageMetadata } from '@/components/page'
import { ThankYou } from '@/components/legal/parts'

export const metadata: Metadata = pageMetadata({
  title: 'Thanks',
  path: '/thanks/',
  description: 'Thanks for your enquiry. One of our representatives will get back to you shortly.',
  noindex: true,
})

export default function ThanksRoute() {
  return (
    <ThankYou eyebrow="Enquiry received" title="Thanks for your enquiry."
      body={<p>One of our representatives will get back to you shortly. In the mean time feel free to contact us via our toll free number or via email.</p>}
      next={[
        { href: '/courses/', label: 'Find your course', note: 'Compare nursing, social work and health courses.' },
        { href: '/how-to-apply/', label: 'How to apply', note: 'The steps, documents and dates to get your application in.' },
        { href: '/campuses/', label: 'Our campuses', note: 'Melbourne, Sydney, Perth and Brisbane.' },
      ]} />
  )
}
