// /ihm-student-appeals/ — the student appeal form (Spot-nik Superform embed), linked to /complaints-and-appeals/.
// Layout and form URLs: src/components/legal/ComplaintForm.tsx.
import type { Metadata } from 'next'
import { pageMetadata } from '@/components/page'
import { ComplaintForm } from '@/components/legal/ComplaintForm'

export const metadata: Metadata = pageMetadata({
  title: 'IHM Student Appeals',
  path: '/ihm-student-appeals/',
  description: 'Lodge a student appeal with IHM online. Read how complaints and appeals work on our Complaints and Appeals page.',
})

export default function IhmStudentAppealsRoute() {
  return <ComplaintForm kind="appeal" />
}
