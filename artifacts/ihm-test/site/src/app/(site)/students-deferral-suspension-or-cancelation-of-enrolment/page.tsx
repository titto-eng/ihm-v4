// /students-deferral-suspension-or-cancelation-of-enrolment/ — WordPress page 5311: deferral, suspension or cancellation of
// enrolment (reasons, compassionate and compelling circumstances, evidence), the policy PDFs and the withdrawal form.
import type { Metadata } from 'next'
import { ArrowUpRight, FileWarning, HeartCrack, Info } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { DocLinks, IntlShell } from '@/components/international/parts'
import { Lead, Ticks, heroBtn } from '@/components/student-support/parts'
import { legacyImage } from '@/lib/legacy-image'
import { ENROLMENT_CHANGES as C } from '@/content/international'

export const metadata: Metadata = pageMetadata({
  title: 'Students deferral, suspension, or cancelation of enrolment',
  path: '/students-deferral-suspension-or-cancelation-of-enrolment/',
  metaTitle: 'Deferral, Suspension or Cancellation of Enrolment | IHM Students',
  description: 'When IHM may defer, suspend or cancel enrolment, what counts as compassionate and compelling circumstances, the evidence required, visa impact, the Changes to Enrolment policy and the withdrawal form.',
})

export default function EnrolmentChangesRoute() {
  const img = legacyImage('/images/international/deferral-suspension.webp', '')
  return (
    <IntlShell
      path="/students-deferral-suspension-or-cancelation-of-enrolment/"
      eyebrow="Students · Changes to enrolment"
      title={<>Deferral, suspension or <em className="text-secondary">cancellation of enrolment</em></>}
      intro={C.intro[0]}
      image={img ? { src: img, alt: 'Students meeting to discuss enrolment' } : undefined}
      actions={<><a href={C.withdrawal} target="_blank" rel="noopener noreferrer" className={heroBtn(true)}>Application for Withdrawal Form<ArrowUpRight aria-hidden className="size-4" /></a><a href={C.docs[0].href} target="_blank" rel="noopener" className={heroBtn()}>Changes to Enrolment Policy</a></>}
    >
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-4 text-[17px] leading-relaxed">{C.intro.slice(1).map((p) => <p key={p.slice(0, 30)}>{p}</p>)}</div>
          <div className="rounded-card border border-border bg-card p-6"><h2 className="flex items-center gap-2 font-semibold"><FileWarning aria-hidden className="size-5 text-primary-strong" />{C.reasonsIntro}</h2><div className="mt-4"><Ticks items={C.reasons} /></div></div>
        </div>
        <p className="mt-8 flex gap-3 rounded-card bg-ink p-5 text-ink-foreground"><Info aria-hidden className="size-6 shrink-0 text-secondary" />{C.notice}</p>
      </Section>
      <Section tone="muted" anchorId="compassionate">
        <Lead eyebrow="Beyond your control" title="Compassionate and compelling circumstances"><p>{C.compassionateIntro}</p></Lead>
        <ul className="grid gap-4 md:grid-cols-2">{C.compassionate.map((c) => <li key={c.slice(0, 30)} className="flex gap-3 rounded-card bg-card p-5 text-[15px]"><HeartCrack aria-hidden className="size-5 shrink-0 text-primary-strong" />{c}</li>)}</ul>
        <div className="mt-6 grid gap-4 md:grid-cols-2"><p className="rounded-2xl bg-sand/70 p-4 text-sm">{C.evidence}</p><p className="rounded-2xl bg-blush p-4 text-sm font-semibold">{C.visa}</p></div>
      </Section>
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-card border border-border bg-card p-6"><h2 className="display text-2xl">Policy &amp; Procedure</h2><div className="mt-4"><DocLinks items={C.docs} /></div></div>
          <div className="rounded-card bg-sunrise-glow p-6"><h2 className="display text-2xl">Application for Withdrawal</h2><a href={C.withdrawal} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-semibold text-ink-foreground">Application for Withdrawal Form<ArrowUpRight aria-hidden className="size-4" /></a></div>
        </div>
      </Section>
    </IntlShell>
  )
}
