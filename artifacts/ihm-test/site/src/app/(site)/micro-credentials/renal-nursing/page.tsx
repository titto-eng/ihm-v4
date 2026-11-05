// /micro-credentials/renal-nursing/ — one of the 12 specialty pages (WordPress template-mc-specialty.php). Content: src/content/micro-credentials.ts.
import { Specialty, specialtyMetadata } from '@/components/micro-credentials/Specialty'

export const metadata = specialtyMetadata('renal-nursing')

export default function RenalNursingRoute() {
  return <Specialty slug="renal-nursing" />
}
