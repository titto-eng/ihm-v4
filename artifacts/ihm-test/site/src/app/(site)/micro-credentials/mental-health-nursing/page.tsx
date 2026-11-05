// /micro-credentials/mental-health-nursing/ — one of the 12 specialty pages (WordPress template-mc-specialty.php). Content: src/content/micro-credentials.ts.
import { Specialty, specialtyMetadata } from '@/components/micro-credentials/Specialty'

export const metadata = specialtyMetadata('mental-health-nursing')

export default function MentalHealthNursingRoute() {
  return <Specialty slug="mental-health-nursing" />
}
