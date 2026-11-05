// /lp/bachelor-of-nursing-melbourne/ — Bachelor of Nursing, Melbourne intake (row in src/content/landing.ts, CampusBachelor, form lp-admissions).
// Copy shared by the four city pages in src/content/landing-bon.ts.
import type { Metadata } from 'next'
import { landingMetadata } from '@/components/templates/landing/pages'
import { BonCityLanding } from '@/components/landing/BonCityLanding'

const PATH = '/lp/bachelor-of-nursing-melbourne/'
export const metadata: Metadata = landingMetadata(PATH)

export default function BachelorOfNursingMelbourneRoute() {
  return <BonCityLanding path={PATH} />
}
