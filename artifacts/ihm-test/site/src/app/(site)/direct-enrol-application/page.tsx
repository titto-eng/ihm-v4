// /direct-enrol-application/ — WordPress template "direct enrol application": embeds the student portal's auto-enrol application
// (student.ihm.edu.au/CrmEnquiries/application_form_auto_enrol) for the course in `?course_id=` (and `?lead_id=`), with the
// course name in the heading. The ids are digits only; anything else is dropped.
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Mail, ShieldCheck } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { FormSplit } from '@/components/admissions/parts'
import { site } from '@/content/site'

export const metadata: Metadata = pageMetadata({
  title: 'Direct Enrol Application',
  path: '/direct-enrol-application/',
  description: 'Complete your direct enrolment application with the Institute of Health and Management.',
})

/** Portal course ids used by the old template. */
const COURSES: Record<string, string> = {
  '33': "NCLEX for RN's",
  '39': 'DCAP – Comprehensive',
  '42': 'MCAP – Comprehensive',
  '43': 'DCAP – ADC Adaptive Program',
  '44': 'MCAP – Intensive',
  '57': 'DCAP – ADC Intensive Program',
}
const ENQUIRY_SOURCE = '541'
const digits = (v: string | string[] | undefined) => (typeof v === 'string' && /^\d{1,9}$/.test(v) ? v : null)

export default async function DirectEnrolApplicationRoute({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams
  const courseId = digits(sp.course_id)
  const leadId = digits(sp.lead_id)
  const course = courseId ? COURSES[courseId] : undefined
  const src = courseId
    ? `https://student.ihm.edu.au/CrmEnquiries/application_form_auto_enrol?course_id=${courseId}&enqiry_src=${ENQUIRY_SOURCE}${leadId ? `&lead_id=${leadId}` : ''}`
    : null
  return (
    <FormSplit
      eyebrow="Direct enrolment"
      title={<>Application{course ? <>: <em className="text-secondary">{course}</em></> : null}</>}
      intro={<p>Complete the application form to enrol directly. Your details go securely to the IHM student portal.</p>}
      aside={<ul className="grid gap-3 text-sm">
        <li className="flex items-center gap-3"><ShieldCheck aria-hidden className="size-5 text-secondary" />Secure application on the IHM student portal</li>
        <li className="flex items-center gap-3"><Mail aria-hidden className="size-5 text-secondary" />Need help? <a href={`mailto:${site.email}`} className="font-semibold underline underline-offset-4">{site.email}</a></li>
      </ul>}
    >
      {src ? (
        <iframe src={src} title={`Application${course ? `: ${course}` : ''}`} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" className="h-[1100px] w-full rounded-2xl border border-border" />
      ) : (
        <div className="py-6">
          <h2 className="display text-2xl">Choose a course to apply for</h2>
          <p className="mt-2 text-muted-foreground">This application opens from a course link. Pick your program below, or send us an enquiry.</p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {Object.entries(COURSES).map(([id, name]) => <li key={id}><Link href={`/direct-enrol-application/?course_id=${id}`} className="flex items-center justify-between gap-3 rounded-2xl border border-border px-4 py-3 font-semibold hover:border-primary hover:text-primary-strong">{name}<ArrowRight aria-hidden className="size-4" /></Link></li>)}
          </ul>
          <Link href="/course-enquiry/" className="mt-6 inline-flex items-center gap-2 font-semibold text-primary-strong">Make a course enquiry<ArrowRight aria-hidden className="size-4" /></Link>
        </div>
      )}
    </FormSplit>
  )
}
