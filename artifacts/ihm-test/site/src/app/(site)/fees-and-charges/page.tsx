// /fees-and-charges/ — WordPress page 146: fee schedule (2026 fees PDF), other charges, refunds and the Tuition Protection
// Scheme. Copy in src/content/admissions.ts (ADMISSIONS.fees).
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, FileText } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { AdmissionsShell, KitChapters } from '@/components/admissions/parts'
import { heroBtn } from '@/components/student-support/parts'
import { ADMISSIONS as A, FEES_PDF } from '@/content/admissions'

export const metadata: Metadata = pageMetadata({
  title: 'Fees, Charges and Refund',
  path: '/fees-and-charges/',
  metaTitle: 'Fees, Charges and Refunds | 2026 Course Fees | IHM',
  description: 'IHM 2026 course fee schedule, interest-free payment plans, other charges, how to request a refund and how the Tuition Protection Scheme protects international students.',
})

export default function FeesAndChargesRoute() {
  return (
    <AdmissionsShell
      path="/fees-and-charges/"
      image={{ src: '/images/landing/gcan/study.webp', alt: 'A nursing student planning her studies' }}
      title={<>Fees, charges <em className="text-secondary">and refunds</em></>}
      intro="Tuition fees are correct at the time of publication and are subject to change. IHM gives students reasonable notice of any change and offers a range of interest-free payment plans."
      actions={<><a href={FEES_PDF} target="_blank" rel="noopener" className={heroBtn(true)}><FileText aria-hidden className="size-4" />2026 Fees &amp; Charges (PDF)</a><Link href="/payment-options/" className={heroBtn()}>Payment options<ArrowRight aria-hidden className="size-4" /></Link></>}
    >
      <KitChapters blocks={A.fees} />
    </AdmissionsShell>
  )
}
