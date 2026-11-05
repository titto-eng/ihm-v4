// Older slug of the micro-credentials requirements page; kept live (rule 1). Same page, canonical to /micro-credentials/requirements/.
import type { Metadata } from 'next'
import { pageMetadata } from '@/components/page'
import RequirementsPage from '../requirements/page'

export const metadata: Metadata = pageMetadata({
  title: 'Microcredentials Requirements',
  path: '/micro-credentials/microcredentials-requirements/',
  canonical: '/micro-credentials/requirements/',
  description: 'Who can enrol in an IHM nursing micro-credential, fees, credit into the Graduate Certificate in Advanced Nursing, and how to apply.',
})

export default RequirementsPage
