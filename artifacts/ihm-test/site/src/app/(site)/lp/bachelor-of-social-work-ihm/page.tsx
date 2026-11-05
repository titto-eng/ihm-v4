// /lp/bachelor-of-social-work-ihm/ — course campaign landing page (row in src/content/landing.ts, CourseLanding). Copy in src/content/landing-campaign-bsw.ts.
import type { Metadata } from 'next'
import { landingMetadata } from '@/components/templates/landing/pages'
import { CampaignLanding } from '@/components/landing/CampaignLanding'
import { BSW_CAMPAIGNS } from '@/content/landing-campaign-bsw'

const PATH = '/lp/bachelor-of-social-work-ihm/'
export const metadata: Metadata = landingMetadata(PATH)

export default function BachelorOfSocialWorkIhmRoute() {
  return <CampaignLanding path={PATH} page={BSW_CAMPAIGNS[PATH]} />
}
