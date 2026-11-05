// /micro-credentials/emergency-nursing/ — one of the 12 specialty pages (WordPress template-mc-specialty.php). Content: src/content/micro-credentials.ts.
import { Specialty, specialtyMetadata } from '@/components/micro-credentials/Specialty'

export const metadata = specialtyMetadata('emergency-nursing')

export default function EmergencyNursingRoute() {
  return <Specialty slug="emergency-nursing" />
}
