// /micro-credentials/diabetes-nursing/ — one of the 12 specialty pages (WordPress template-mc-specialty.php). Content: src/content/micro-credentials.ts.
import { Specialty, specialtyMetadata } from '@/components/micro-credentials/Specialty'

export const metadata = specialtyMetadata('diabetes-nursing')

export default function DiabetesNursingRoute() {
  return <Specialty slug="diabetes-nursing" />
}
