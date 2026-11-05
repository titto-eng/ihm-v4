// /staff-profile/ — WordPress template-staff-profile.php read `?id=` from the old `staff_profile` table. Ids of people who now
// have a profile page redirect there (map below, matched by name); any other id, or none, shows the staff directory. The old
// table's emails and bios are not imported (AGENTS rule 4).
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { pageMetadata } from '@/components/page'
import { StaffDirectoryPage } from '@/components/templates/pages'

export const metadata: Metadata = pageMetadata({ title: 'Staff profile', path: '/staff-profile/', description: 'Profiles of the academic and professional staff at the Institute of Health & Management.' })

/** Old `staff_profile.id` -> current profile URL. */
const OLD_IDS: Record<string, string> = {
  '3': '/dr-shisir-prasad-manandhar/',
  '4': '/dr-abhishek-sharma/',
  '13': '/bijo-kunnumpurath/',
  '15': '/dr-balasankar-ganesan/',
  '19': '/dr-prerna-khawas/',
  '21': '/gethsy-jayaseelan/',
  '30': '/mandeep-kaur/',
  '32': '/greety-antony/',
  '43': '/mrs-bindu-varughese/',
  '58': '/jolly-mathews-philip/',
  '60': '/julie-angilivelil/',
  '76': '/sweety-sanju/',
  '87': '/dr-philomina-jacob/',
  '88': '/assoc-prof-helen-almond/',
}

export default async function StaffProfileRoute({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { id } = await searchParams
  const to = typeof id === 'string' && /^\d+$/.test(id) ? OLD_IDS[id] : undefined
  if (to) redirect(to)
  return <StaffDirectoryPage title="Staff profile" path="/staff-profile/" hero={{ variant: 'compact', heading: 'Our staff', eyebrow: 'People' }} />
}
