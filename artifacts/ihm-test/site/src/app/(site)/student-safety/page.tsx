// /student-safety/ — WordPress page 3154: student safety and wellbeing (IHM's responsibilities, confidential counselling,
// complaints, access and equity, external services), each section linking to its full page.
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Phone, ShieldCheck } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { CrisisBand, Lead, SupportShell, Ticks, heroBtn } from '@/components/student-support/parts'
import { ACCESSIBILITY, COMPLAINTS, EXTERNAL_SERVICES, OTHER_COUNSELLING, RELATIONSHIPS_AUSTRALIA as RA, SAFETY } from '@/content/student-support'

export const metadata: Metadata = pageMetadata({
  title: 'Student Safety and Wellbeing',
  path: '/student-safety/',
  metaTitle: 'Student Safety and Wellbeing at IHM | Misconduct, Critical Incidents, Counselling and Support',
  description: 'How IHM keeps students safe: student misconduct, critical incidents, sexual misconduct and harassment responses, confidential counselling, complaints and appeals, accessibility and emergency services.',
})

const more = (href: string, label = 'To know more') => <Link href={href} className="mt-5 inline-flex items-center gap-1.5 font-semibold text-primary-strong">{label}<ArrowRight aria-hidden className="size-4" /></Link>

export default function StudentSafetyRoute() {
  const emergency = EXTERNAL_SERVICES[0].items.filter((s) => s.phone)
  return (
    <SupportShell
      path="/student-safety/"
      eyebrow="Student support · Safety & Wellbeing"
      title={<>Student Safety and <em className="text-secondary">Wellbeing</em></>}
      intro={SAFETY.intro}
      actions={<><Link href="/courses/" className={heroBtn(true)}>Find Your Perfect Course<ArrowRight aria-hidden className="size-4" /></Link><a href="#counselling" className={heroBtn()}>Confidential counselling</a></>}
    >
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <Lead eyebrow="Our responsibilities" title="IHM is the custodian of:" />
            <Ticks items={SAFETY.custodian} />
            <p className="mt-5 text-muted-foreground">{SAFETY.custodianClose}</p>
          </div>
          <div className="space-y-5">
            <CrisisBand />
            <div className="rounded-card bg-ink p-6 text-ink-foreground">
              <p className="flex items-center gap-2 font-semibold"><ShieldCheck aria-hidden className="size-5 text-secondary" />Emergency Services</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">{emergency.map((s) => <li key={s.name}><a href={`tel:${s.phone!.replace(/\s/g, '')}`} className="flex items-center gap-3 rounded-2xl bg-ink-foreground/5 p-4"><Phone aria-hidden className="size-5 text-secondary" /><span><span className="block text-sm">{s.name}</span><span className="display text-2xl text-secondary">{s.phone}</span></span></a></li>)}</ul>
              {more('/external-services/', 'All external services')}
            </div>
          </div>
        </div>
      </Section>
      <Section tone="muted" anchorId="counselling">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Lead eyebrow="Mental Wellbeing" title="Service of Confidential Counselling"><p>{SAFETY.counselling}</p></Lead>
            <div className="rounded-card border border-border bg-card p-6">
              <h3 className="display text-2xl">Relationships Australia</h3>
              <p className="mt-2 text-sm text-muted-foreground">{RA.about}</p>
              <p className="mt-3 text-sm"><strong>How can IHM students access counselling and support services?</strong> {RA.access}</p>
              <p className="mt-3 text-sm"><strong>Costs:</strong> {RA.costs.join(' ')}</p>
              <a href={RA.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-strong">relationships.org.au<ArrowUpRight aria-hidden className="size-4" /></a>
            </div>
          </div>
          <div>
            <p className="mb-4 font-semibold">Other sources for students to obtain counselling and support services:</p>
            <ul className="grid gap-3">{OTHER_COUNSELLING.slice(0, 3).map((s) => <li key={s.name} className="rounded-2xl border border-border bg-card p-4"><a href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between font-semibold hover:text-primary-strong">{s.name}<ArrowUpRight aria-hidden className="size-4" /></a><p className="mt-1 line-clamp-3 text-sm text-muted-foreground">{s.body}</p></li>)}</ul>
            {more('/counselling/', 'Counselling support in full')}
          </div>
        </div>
      </Section>
      <Section>
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-card border border-border bg-card p-6 md:p-8">
            <Eyebrow>Complaints and Appeals</Eyebrow>
            <div className="space-y-3 text-[15px]">{COMPLAINTS.intro.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}</div>
            {more('/complaints-and-appeals/')}
          </div>
          <div className="rounded-card border border-border bg-card p-6 md:p-8">
            <Eyebrow>Student Support – Access, Accessibility and Equity</Eyebrow>
            <p className="mb-4 text-[15px]">{ACCESSIBILITY.equityIntro}</p>
            <Ticks items={ACCESSIBILITY.equityAims} />
            {more('/disability-accessibility-support/#equity')}
          </div>
        </div>
      </Section>
    </SupportShell>
  )
}
