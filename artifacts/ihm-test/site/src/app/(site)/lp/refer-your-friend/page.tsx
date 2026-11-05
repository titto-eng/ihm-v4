// /lp/refer-your-friend/ — short enquiry landing page (row in src/content/landing.ts; the form and thank-you URL come from the row).
// Copy in src/content/landing-enquiry.ts; layout QuickEnquiry (src/components/landing/QuickEnquiry.tsx).
import type { Metadata } from 'next'
import { landingMetadata } from '@/components/templates/landing/pages'
import { QuickEnquiry } from '@/components/landing/QuickEnquiry'

export const metadata: Metadata = landingMetadata('/lp/refer-your-friend/')

export default function ReferYourFriendRoute() {
  return <QuickEnquiry path="/lp/refer-your-friend/" />
}
