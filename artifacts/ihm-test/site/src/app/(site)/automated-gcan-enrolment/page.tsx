// /automated-gcan-enrolment/ — WordPress page 9745 "GCAN Admission Guide": before you start, the five-step automated enrolment,
// what happens after you apply, tips, common questions and the Enroll Now link (#enrolnowSec is kept). Copy in
// src/content/admissions.ts (GCAN_GUIDE).
import type { Metadata } from 'next'
import { ArrowDown, ArrowUpRight, BellRing, BookOpen, CreditCard, FileSignature, Headset, KeyRound, LogIn, Mail, MailWarning, MessageCircleQuestion, MessagesSquare, Rocket, ShieldCheck, Target, Wifi } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { JsonLd } from '@/components/seo/JsonLd'
import { AdmissionsShell } from '@/components/admissions/parts'
import { KitFaq, kitFaqJsonLd } from '@/components/page-kit/Kit'
import { Lead, heroBtn } from '@/components/student-support/parts'
import { GCAN_GUIDE as G } from '@/content/admissions'

export const metadata: Metadata = pageMetadata({
  title: 'Automated GCAN Enrolment',
  path: '/automated-gcan-enrolment/',
  metaTitle: 'GCAN Admission Guide | Automated GCAN Enrolment | IHM',
  description: 'Everything you need to complete your automated Graduate Certificate in Advanced Nursing (GCAN) enrolment: chat with the Admission Agent, apply, sign your offer, pay securely and start learning.',
})

const STEP_ICONS = [MessagesSquare, FileSignature, ShieldCheck, CreditCard, LogIn]
const AFTER_ICONS = [FileSignature, CreditCard, Mail, Rocket, Headset]
const TIP_ICONS = [Wifi, MessagesSquare, Target, CreditCard, BellRing, KeyRound, MailWarning, MessageCircleQuestion]
const faq = G.faq.map((f) => ({ title: f.q, blocks: [{ p: f.a }] }))

export default function AutomatedGcanEnrolmentRoute() {
  return (
    <AdmissionsShell
      path="/automated-gcan-enrolment/"
      image={{ src: '/images/landing/gcan/admission.webp', alt: 'An IHM admissions adviser helping a nurse with her enrolment' }}
      eyebrow="GCAN admission guide"
      title={<>Your automated <em className="text-secondary">GCAN enrolment</em></>}
      intro={G.tagline}
      actions={<><a href="#enrolnowSec" className={heroBtn(true)}>Jump to Enroll<ArrowDown aria-hidden className="size-4" /></a><a href={G.enrolUrl} target="_blank" rel="noopener noreferrer" className={heroBtn()}>Enroll Now<ArrowUpRight aria-hidden className="size-4" /></a></>}
    >
      <JsonLd data={kitFaqJsonLd(faq)} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Lead eyebrow="Before you start" title="Step-by-step GCAN admission process"><p>{G.before}</p><p>{G.stepsLead}</p></Lead>
          </div>
          <ol className="relative space-y-4 before:absolute before:top-6 before:bottom-6 before:left-[27px] before:w-px before:bg-border">
            {G.steps.map((s, i) => { const Icon = STEP_ICONS[i] ?? BookOpen; return (
              <li key={s.title} className="relative flex gap-5">
                <span className="bg-brand-gradient relative z-10 grid size-14 shrink-0 place-items-center rounded-2xl text-foreground"><Icon aria-hidden className="size-6" /></span>
                <div className="rounded-card border border-border bg-card p-5"><p className="label-mono text-[11px] text-muted-foreground">Step {i + 1}</p><h3 className="display mt-1 text-xl">{s.title}</h3><p className="mt-2 text-[15px] text-muted-foreground">{s.text}</p></div>
              </li>
            ) })}
          </ol>
        </div>
      </Section>

      <Section tone="ink" className="bg-ink-glow">
        <Lead onDark eyebrow="After you apply" title="What happens after you apply?"><p>{G.afterLead}</p></Lead>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {G.after.map((a, i) => { const Icon = AFTER_ICONS[i] ?? Rocket; return (
            <li key={a.title} className="rounded-card bg-ink-foreground/5 p-5 ring-1 ring-ink-foreground/10"><span className="display text-4xl text-secondary">{i + 1}</span><Icon aria-hidden className="mt-3 size-6 text-secondary" /><h3 className="mt-3 font-semibold">{a.title}</h3><p className="mt-1 text-sm text-ink-foreground/75">{a.text}</p></li>
          ) })}
        </ul>
      </Section>

      <Section tone="muted">
        <Lead eyebrow="Tips" title="Helpful tips for a smooth application" />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {G.tips.map((t, i) => { const Icon = TIP_ICONS[i] ?? BookOpen; return (
            <li key={t.title} className="rounded-card border border-border bg-card p-5 transition-transform hover:-translate-y-1"><Icon aria-hidden className="size-6 text-primary-strong" /><h3 className="mt-3 font-semibold">{t.title}</h3><p className="mt-1 text-sm text-muted-foreground">{t.text}</p></li>
          ) })}
        </ul>
      </Section>

      <Section anchorId="faq">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]"><Lead eyebrow="FAQs" title="Common questions" /><KitFaq items={faq} numbered={false} /></div>
      </Section>

      <Section tone="ink" anchorId="enrolnowSec" className="bg-ink-glow">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="display text-display-md">{G.ready[0]}</h2>
          <p className="mt-4 text-lg text-ink-foreground/80">{G.ready[1]}</p>
          <a href={G.enrolUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-14 items-center gap-2 rounded-full bg-primary px-8 text-lg font-semibold text-foreground hover:bg-secondary">Enroll Now<ArrowUpRight aria-hidden className="size-5" /></a>
          <p className="mt-6 text-sm text-ink-foreground/70">{G.ready[2]}</p>
        </div>
      </Section>
    </AdmissionsShell>
  )
}
