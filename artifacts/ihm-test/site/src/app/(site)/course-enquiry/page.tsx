// /course-enquiry/ — WordPress template-enquiry-lp (the `lp_enquiry` form, here `lp-portal`): saved to Postgres first, then sent
// to the portal CRM and the admissions mailbox (docs/modules/40-enquiries.md).
import type { Metadata } from 'next'
import { Clock, GraduationCap, MessageCircle, Phone } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { FormSplit } from '@/components/admissions/parts'
import { EnquiryFormClient } from '@/components/forms/EnquiryFormClient'
import { getFormView } from '@/lib/enquiries/formView'
import { site } from '@/content/site'

export const metadata: Metadata = pageMetadata({
  title: 'Course Enquiry',
  path: '/course-enquiry/',
  metaTitle: 'Course Enquiry | Ask IHM About Courses, Costs and Careers',
  description: 'Get an answer on courses, costs, careers, facilities, entry requirements or anything else about studying at the Institute of Health and Management.',
})

const POINTS = [
  { Icon: GraduationCap, t: 'Courses and entry requirements' },
  { Icon: Clock, t: 'Intakes, costs and payment plans' },
  { Icon: MessageCircle, t: 'Careers, facilities and student life' },
]

export default async function CourseEnquiryRoute() {
  const view = await getFormView('lp-portal')
  return (
    <FormSplit
      eyebrow="Course enquiry"
      title={<>We are here to <em className="text-secondary">help you</em></>}
      intro={<p>Get an answer on courses, costs, careers as well as facilities, entry requirements or just about anything else relating to studying at IHM.</p>}
      aside={<>
        <ul className="grid gap-3">{POINTS.map(({ Icon, t }) => <li key={t} className="flex items-center gap-4 rounded-2xl bg-ink-foreground/5 p-4"><span className="bg-brand-gradient grid size-10 shrink-0 place-items-center rounded-full text-foreground"><Icon aria-hidden className="size-5" /></span><span className="font-semibold">{t}</span></li>)}</ul>
        <a href={`tel:+61${site.phone.replace(/\s/g, '').slice(1)}`} className="mt-6 inline-flex items-center gap-2 font-semibold text-secondary"><Phone aria-hidden className="size-4" />Call us toll free on {site.phone}</a>
      </>}
      cardTitle="Course Enquiry"
      cardNote={<>Fields marked * are required. See our <a href="/pdf/policies/IHM_Privacy_Policy.pdf" target="_blank" rel="noopener" className="font-semibold text-primary-strong underline underline-offset-4">Privacy Policy</a>.</>}
      dataKey="lp-portal"
    >
      {view ? <EnquiryFormClient def={view.def} campuses={view.campuses} courses={view.courses} /> : <p className="text-sm text-muted-foreground">The form is unavailable right now. Please email <a href={`mailto:${site.email}`} className="font-semibold text-primary-strong underline">{site.email}</a>.</p>}
    </FormSplit>
  )
}
