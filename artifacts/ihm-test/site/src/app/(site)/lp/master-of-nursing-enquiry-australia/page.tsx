// /lp/master-of-nursing-enquiry-australia/ — Master of Nursing enquiry page (row in src/content/landing.ts, CampusMaster, form lp-portal-hubspot).
// Shared copy and this page's variant in src/content/landing-mon.ts.
import type { Metadata } from 'next'
import { landingMetadata } from '@/components/templates/landing/pages'
import { MasterEnquiryLanding } from '@/components/landing/MasterEnquiryLanding'

const PATH = '/lp/master-of-nursing-enquiry-australia/'
export const metadata: Metadata = landingMetadata(PATH)

export default function MasterOfNursingEnquiryAustraliaRoute() {
  return <MasterEnquiryLanding path={PATH} />
}
