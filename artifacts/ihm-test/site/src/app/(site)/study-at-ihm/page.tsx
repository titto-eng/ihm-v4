// /study-at-ihm/ — WordPress page 87 "Studying at IHM": study at IHM and the Student Representative Council, ways to study,
// the campuses, e-learning, the ESOS framework and important information for students. Copy in src/content/study.ts.
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { KitChapters } from '@/components/admissions/parts'
import { SupportShell, heroBtn } from '@/components/student-support/parts'
import { STUDY_AT_IHM } from '@/content/study'

export const metadata: Metadata = pageMetadata({
  title: 'Study at IHM',
  path: '/study-at-ihm/',
  metaTitle: 'Studying at IHM | Campuses, Ways to Study, Student Voice and ESOS',
  description: 'Study online or on campus in Melbourne, Perth and Sydney with 24/7 student support, a Student Representative Council, e-learning for every student and the protection of the ESOS framework.',
})

const NAV = [
  { href: '#study-at-ihm', label: 'Study@IHM' },
  { href: '#ways-to-study', label: 'Ways to Study' },
  { href: '#ihm-campus-and-its-perimeters', label: 'IHM Campuses' },
  { href: '#education-services-for-overseas-students-framework-esos', label: 'ESOS' },
  { href: '#important-information-for-students', label: 'Important Information' },
]

export default function StudyAtIhmRoute() {
  return (
    <SupportShell
      path=""
      eyebrow="About IHM"
      title={<>Studying <em className="text-secondary">at IHM</em></>}
      intro="Be part of one of Australia’s most innovative healthcare education institutes, online or on campus, with your voice shaping the student experience."
      actions={<><Link href="/courses/" className={heroBtn(true)}>Find Your Perfect Course<ArrowRight aria-hidden className="size-4" /></Link><Link href="/campuses/" className={heroBtn()}>Our campuses</Link></>}
      nav={NAV}
      navLabel="On this page"
    >
      <KitChapters blocks={STUDY_AT_IHM} />
    </SupportShell>
  )
}
