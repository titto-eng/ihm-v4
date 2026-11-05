// /micro-credentials/palliative-care-nursing/ — one of the 12 specialty pages (WordPress template-mc-specialty.php). Content: src/content/micro-credentials.ts.
import { Specialty, specialtyMetadata } from '@/components/micro-credentials/Specialty'

export const metadata = specialtyMetadata('palliative-care-nursing')

export default function PalliativeCareNursingRoute() {
  return <Specialty slug="palliative-care-nursing" />
}
