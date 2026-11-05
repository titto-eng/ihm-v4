// /micro-credentials/neonatal-nursing/ — one of the 12 specialty pages (WordPress template-mc-specialty.php). Content: src/content/micro-credentials.ts.
import { Specialty, specialtyMetadata } from '@/components/micro-credentials/Specialty'

export const metadata = specialtyMetadata('neonatal-nursing')

export default function NeonatalNursingRoute() {
  return <Specialty slug="neonatal-nursing" />
}
