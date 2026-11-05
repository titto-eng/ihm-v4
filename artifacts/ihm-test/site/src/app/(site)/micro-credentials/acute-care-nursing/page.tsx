// /micro-credentials/acute-care-nursing/ — one of the 12 specialty pages (WordPress template-mc-specialty.php). Content: src/content/micro-credentials.ts.
import { Specialty, specialtyMetadata } from '@/components/micro-credentials/Specialty'

export const metadata = specialtyMetadata('acute-care-nursing')

export default function AcuteCareNursingRoute() {
  return <Specialty slug="acute-care-nursing" />
}
