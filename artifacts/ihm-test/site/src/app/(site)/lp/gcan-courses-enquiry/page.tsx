// /lp/gcan-courses-enquiry/ — short enquiry landing page (row in src/content/landing.ts; the form and thank-you URL come from the row).
// Copy in src/content/landing-enquiry.ts; layout QuickEnquiry (src/components/landing/QuickEnquiry.tsx).
import type { Metadata } from 'next'
import { landingMetadata } from '@/components/templates/landing/pages'
import { QuickEnquiry } from '@/components/landing/QuickEnquiry'

export const metadata: Metadata = landingMetadata('/lp/gcan-courses-enquiry/')

export default function GcanCoursesEnquiryRoute() {
  return <QuickEnquiry path="/lp/gcan-courses-enquiry/" />
}
