// /micro-credentials/critical-care-nursing/ — one of the 12 specialty pages (WordPress template-mc-specialty.php). Content: src/content/micro-credentials.ts.
import { Specialty, specialtyMetadata } from '@/components/micro-credentials/Specialty'

export const metadata = specialtyMetadata('critical-care-nursing')

export default function CriticalCareNursingRoute() {
  return <Specialty slug="critical-care-nursing" />
}
