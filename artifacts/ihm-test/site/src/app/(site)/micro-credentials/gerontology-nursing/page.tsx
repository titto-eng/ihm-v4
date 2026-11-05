// /micro-credentials/gerontology-nursing/ — one of the 12 specialty pages (WordPress template-mc-specialty.php). Content: src/content/micro-credentials.ts.
import { Specialty, specialtyMetadata } from '@/components/micro-credentials/Specialty'

export const metadata = specialtyMetadata('gerontology-nursing')

export default function GerontologyNursingRoute() {
  return <Specialty slug="gerontology-nursing" />
}
