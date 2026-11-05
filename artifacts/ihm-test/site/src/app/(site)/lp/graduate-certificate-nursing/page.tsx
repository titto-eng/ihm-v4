// /lp/graduate-certificate-nursing/ — course campaign landing page (row in src/content/landing.ts, CourseLanding). Copy in src/content/landing-campaign-gcan.ts.
import type { Metadata } from 'next'
import { landingMetadata } from '@/components/templates/landing/pages'
import { CampaignLanding } from '@/components/landing/CampaignLanding'
import { GCAN_CAMPAIGNS } from '@/content/landing-campaign-gcan'

const PATH = '/lp/graduate-certificate-nursing/'
export const metadata: Metadata = landingMetadata(PATH)

export default function GraduateCertificateNursingRoute() {
  return <CampaignLanding path={PATH} page={GCAN_CAMPAIGNS[PATH]} />
}
