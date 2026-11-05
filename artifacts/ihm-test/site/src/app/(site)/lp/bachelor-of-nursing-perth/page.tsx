// /lp/bachelor-of-nursing-perth/ — Bachelor of Nursing, Perth intake (row in src/content/landing.ts, CampusBachelor, form lp-admissions).
// Copy shared by the four city pages in src/content/landing-bon.ts.
import type { Metadata } from 'next'
import { landingMetadata } from '@/components/templates/landing/pages'
import { BonCityLanding } from '@/components/landing/BonCityLanding'

const PATH = '/lp/bachelor-of-nursing-perth/'
export const metadata: Metadata = landingMetadata(PATH)

export default function BachelorOfNursingPerthRoute() {
  return <BonCityLanding path={PATH} />
}
