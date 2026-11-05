// /credit-and-recognition-of-prior-learning/ — WordPress page 343: what RPL is, the L-Portfolio, how to apply, how much credit,
// conditions, eligibility and restrictions, policy and procedure, key definitions. Copy in src/content/admissions.ts (ADMISSIONS.rpl).
import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { AdmissionsShell, KitChapters } from '@/components/admissions/parts'
import { heroBtn } from '@/components/student-support/parts'
import { ADMISSIONS as A, RPL_APPLY_URL } from '@/content/admissions'

export const metadata: Metadata = pageMetadata({
  title: 'Credit and Recognition of Prior Learning (RPL)',
  path: '/credit-and-recognition-of-prior-learning/',
  metaTitle: 'Credit and Recognition of Prior Learning (RPL) | IHM',
  description: 'Your previous work experience and formal or informal learning could shorten your studies. Learn how IHM grants credit and RPL (up to 50% of a course), what to submit and how to apply.',
})

export default function RplRoute() {
  const apply = <a href={RPL_APPLY_URL} target="_blank" rel="noopener noreferrer" className={heroBtn(true)}>Apply for Credit Transfer and RPL<ArrowUpRight aria-hidden className="size-4" /></a>
  return (
    <AdmissionsShell
      path="/credit-and-recognition-of-prior-learning/"
      image={{ src: '/images/landing/mon/rpl.webp', alt: 'A registered nurse reviewing her prior study and experience' }}
      title={<>Credit and Recognition of <em className="text-secondary">Prior Learning</em></>}
      intro="Did you know that your previous work experience or formal or informal learning could lessen the time you take to complete your studies? When you apply to study at IHM, we assess and recognise it."
      actions={apply}
    >
      <KitChapters blocks={A.rpl.slice(1)} />
      <div className="bg-ink-glow text-ink-foreground"><div className="mx-auto flex max-w-site flex-col gap-5 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-8"><p className="display text-2xl md:text-3xl">Ready to have your learning recognised?</p>{apply}</div></div>
    </AdmissionsShell>
  )
}
