// /lp/master-of-nursing-australia-anmj/ — course campaign landing page (row in src/content/landing.ts, CourseLanding). Copy in src/content/landing-campaign-mon.ts.
import type { Metadata } from 'next'
import { landingMetadata } from '@/components/templates/landing/pages'
import { CampaignLanding } from '@/components/landing/CampaignLanding'
import { MON_CAMPAIGNS } from '@/content/landing-campaign-mon'

const PATH = '/lp/master-of-nursing-australia-anmj/'
export const metadata: Metadata = landingMetadata(PATH)

export default function MasterOfNursingAustraliaAnmjRoute() {
  return <CampaignLanding path={PATH} page={MON_CAMPAIGNS[PATH]} />
}
