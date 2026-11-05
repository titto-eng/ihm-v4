// /micro-credentials/perioperative-nursing/ — one of the 12 specialty pages (WordPress template-mc-specialty.php). Content: src/content/micro-credentials.ts.
import { Specialty, specialtyMetadata } from '@/components/micro-credentials/Specialty'

export const metadata = specialtyMetadata('perioperative-nursing')

export default function PerioperativeNursingRoute() {
  return <Specialty slug="perioperative-nursing" />
}
