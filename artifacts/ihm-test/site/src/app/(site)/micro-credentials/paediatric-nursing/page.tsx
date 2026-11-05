// /micro-credentials/paediatric-nursing/ — one of the 12 specialty pages (WordPress template-mc-specialty.php). Content: src/content/micro-credentials.ts.
import { Specialty, specialtyMetadata } from '@/components/micro-credentials/Specialty'

export const metadata = specialtyMetadata('paediatric-nursing')

export default function PaediatricNursingRoute() {
  return <Specialty slug="paediatric-nursing" />
}
