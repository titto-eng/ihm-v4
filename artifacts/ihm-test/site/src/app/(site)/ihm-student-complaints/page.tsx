// /ihm-student-complaints/ — the student complaint form (Spot-nik Superform embed), linked to /complaints-and-appeals/.
// Layout and form URLs: src/components/legal/ComplaintForm.tsx.
import type { Metadata } from 'next'
import { pageMetadata } from '@/components/page'
import { ComplaintForm } from '@/components/legal/ComplaintForm'

export const metadata: Metadata = pageMetadata({
  title: 'IHM Student Complaints',
  path: '/ihm-student-complaints/',
  description: 'Lodge a student complaint with IHM online. Read how complaints and appeals work on our Complaints and Appeals page.',
})

export default function IhmStudentComplaintsRoute() {
  return <ComplaintForm kind="complaint" />
}
