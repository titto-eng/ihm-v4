// /micro-credentials/orthopaedic-nursing/ — one of the 12 specialty pages (WordPress template-mc-specialty.php). Content: src/content/micro-credentials.ts.
import { Specialty, specialtyMetadata } from '@/components/micro-credentials/Specialty'

export const metadata = specialtyMetadata('orthopaedic-nursing')

export default function OrthopaedicNursingRoute() {
  return <Specialty slug="orthopaedic-nursing" />
}
