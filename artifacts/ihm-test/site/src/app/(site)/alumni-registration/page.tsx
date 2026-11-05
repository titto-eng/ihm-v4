// /alumni-registration/ — WordPress template-alumni-registration.php (page 1249): the alumni registration form (name, mobile,
// personal email, workplace, job title, course, year). It is the `alumni-registration` enquiry form: saved to Postgres first,
// then emailed to the alumni group.
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, Briefcase, GraduationCap, Mail } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { HeroRays } from '@/blocks/hero/Component'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { EnquiryFormClient } from '@/components/forms/EnquiryFormClient'
import { getFormView } from '@/lib/enquiries/formView'

export const metadata: Metadata = pageMetadata({
  title: 'Alumni Registration',
  path: '/alumni-registration/',
  metaTitle: 'Alumni Registration | Join the IHM Alumni Network | IHM',
  description: 'IHM graduates: register with the IHM Alumni network with your current workplace, job title and course to receive alumni events, mentoring, career opportunities and news.',
})

const WHY = [
  { icon: GraduationCap, title: 'Stay part of IHM', body: 'Invitations to alumni events, reunions, graduations and cultural celebrations.' },
  { icon: Briefcase, title: 'Grow your career', body: 'Career opportunities from our placement partners and pathways to further study.' },
  { icon: BadgeCheck, title: 'Give back', body: 'Mentor new graduates, share your story and inspire the next cohort.' },
]

export default async function AlumniRegistrationRoute() {
  const view = await getFormView('alumni-registration')
  return (
    <section data-tone="ink" className="bg-ink-glow relative isolate overflow-hidden text-ink-foreground">
      <HeroRays id="alreg-rays" className="-bottom-24 -left-24 -z-10 w-[30rem] opacity-[0.12]" />
      <div className="mx-auto grid max-w-site gap-12 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="animate-rise">
          <Eyebrow onDark>IHM Alumni</Eyebrow>
          <h1 className="display text-[clamp(2.4rem,5vw,4.2rem)] leading-[1.03]">Alumni <em className="text-secondary">Registration</em></h1>
          <p className="mt-5 max-w-xl text-lg text-ink-foreground/80">Graduated from IHM? Register your details so the alumni team can keep you connected with events, mentoring, career opportunities and news.</p>
          <ul className="mt-8 grid gap-4">
            {WHY.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-4 rounded-2xl bg-ink-foreground/5 p-4">
                <span className="bg-brand-gradient grid size-11 shrink-0 place-items-center rounded-full text-foreground"><Icon aria-hidden className="size-5" /></span>
                <span><span className="block font-semibold">{title}</span><span className="block text-sm text-ink-foreground/75">{body}</span></span>
              </li>
            ))}
          </ul>
          <div className="relative mt-8 hidden aspect-[16/9] overflow-hidden rounded-card lg:block">
            <Image src="/images/alumni/grad-8.webp" alt="IHM graduates and faculty on stage at a graduation ceremony" fill sizes="40vw" className="object-cover" />
          </div>
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-foreground/75">
            <Link href="/alumni/" className="inline-flex items-center gap-1.5 font-semibold text-secondary">Explore the alumni hub<ArrowRight aria-hidden className="size-4" /></Link>
            <a href="mailto:alumni@ihm.edu.au" className="inline-flex items-center gap-1.5"><Mail aria-hidden className="size-4" />alumni@ihm.edu.au</a>
          </p>
        </div>
        <div className="self-start rounded-card bg-card p-6 text-foreground shadow-[0_30px_60px_-30px_hsl(0_0%_0%/0.5)] md:p-10" data-form-key="alumni-registration">
          <h2 className="display text-3xl">Registration details</h2>
          <p className="mt-1 mb-6 text-sm text-muted-foreground">Fields marked * are required. We use your details as set out in our <a href="/pdf/policies/IHM_Privacy_Policy.pdf" target="_blank" rel="noopener" className="font-semibold text-primary-strong underline underline-offset-4">Privacy Policy</a>.</p>
          {view ? (
            <EnquiryFormClient def={view.def} campuses={view.campuses} courses={view.courses} submitLabel="Register" />
          ) : (
            <p className="text-sm text-muted-foreground">Registration is unavailable right now. Please email <a href="mailto:alumni@ihm.edu.au" className="font-semibold text-primary-strong underline">alumni@ihm.edu.au</a>.</p>
          )}
        </div>
      </div>
    </section>
  )
}
