// /lp/dental-career-advancement-program/ — exam-preparation campaign landing page (row in src/content/landing.ts, CourseLanding). Copy in src/content/landing-campaign-exam.ts.
import type { Metadata } from 'next'
import { landingMetadata } from '@/components/templates/landing/pages'
import { CampaignLanding } from '@/components/landing/CampaignLanding'
import { EXAM_CAMPAIGNS } from '@/content/landing-campaign-exam'

const PATH = '/lp/dental-career-advancement-program/'
export const metadata: Metadata = landingMetadata(PATH)

export default function DentalCareerAdvancementProgramRoute() {
  return <CampaignLanding path={PATH} page={EXAM_CAMPAIGNS[PATH]} />
}
