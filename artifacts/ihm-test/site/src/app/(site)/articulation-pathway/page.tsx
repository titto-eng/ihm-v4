// /articulation-pathway/ — WordPress template-partnerships.php (page 10421, synced 2026-10-30). Data: src/content/articulation.ts.
import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight, BookOpenCheck, Building2, ChevronDown, GraduationCap, HeartHandshake, Mail, Sparkles } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { HeroRays } from '@/blocks/hero/Component'
import { JsonLd } from '@/components/seo/JsonLd'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { PathwayFinder } from '@/components/articulation/PathwayFinder.client'
import { MAIL_RTO, MAIL_STUDENT, PATHWAYS_EMAIL, RTO_POINTS, ROUTE, SCHOLARSHIP_CONDITIONS, STATS, STEPS, WHY } from '@/content/articulation'

export const metadata: Metadata = pageMetadata({
  title: 'Articulation Pathways & Partnerships',
  path: '/articulation-pathway/',
  metaTitle: 'Diploma to Degree Articulation Pathways | Nursing & Social Work Credit | IHM',
  description:
    'Move from a Diploma of Nursing or Diploma of Community Services into a Bachelor of Nursing or Bachelor of Social Work with up to 12 months credit, assessed individually and confirmed in writing.',
})

const WHY_ICONS = [BookOpenCheck, Sparkles, GraduationCap, HeartHandshake]
const btn = 'inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-2.5 text-[15px] font-semibold transition-all duration-300 hover:-translate-y-0.5'

export default function ArticulationPathwayRoute() {
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to apply for credit through an IHM articulation pathway',
        step: STEPS.map(([name, text], i) => ({ '@type': 'HowToStep', position: i + 1, name, text })),
      }} />

      {/* Hero */}
      <section data-tone="sunrise" className="bg-brand-wash relative isolate overflow-hidden">
        <HeroRays id="pp-rays" className="-top-28 -left-28 -z-10 w-[26rem] opacity-[0.12]" />
        <div className="mx-auto grid max-w-site items-center gap-12 px-5 pt-12 pb-16 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:pt-16 lg:pb-24">
          <div>
            <Eyebrow>Articulation pathways and partnerships</Eyebrow>
            <h1 className="display text-[clamp(2.5rem,5.6vw,4.6rem)] leading-[1.02] text-balance">
              The learning you&apos;ve done <em className="text-primary-strong">counts</em>. Let&apos;s work out how far.
            </h1>
            <span aria-hidden className="bg-brand-gradient mt-7 block h-1 w-20 rounded-full" />
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-foreground/80">
              For healthcare and community services learners taking the next step, we recognise relevant prior study through credit transfer and recognition of prior
              learning. Every application is assessed individually, in writing, before you commit.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#finder" className={`${btn} bg-primary text-foreground shadow-[0_12px_28px_-14px_hsl(5_85%_55%/0.9)] hover:bg-secondary`}>Find my pathway<ArrowRight aria-hidden className="size-4" /></a>
              <a href="#institutions" className={`${btn} border border-foreground/25 bg-card hover:border-primary hover:text-primary-strong`}>I represent an RTO</a>
            </div>
          </div>
          <div className="relative">
            <div className="relative overflow-hidden rounded-[2rem] bg-ink p-7 text-ink-foreground shadow-[0_32px_64px_-36px_hsl(348_35%_13%/0.7)] md:p-9">
              <HeroRays id="pp-route-rays" className="-right-20 -bottom-20 w-64 opacity-[0.15]" />
              <p className="label-mono text-[11px] tracking-[0.16em] text-secondary">A typical route</p>
              <ol className="relative mt-6 space-y-5">
                <span aria-hidden className="absolute top-5 bottom-5 left-5 w-px bg-ink-foreground/20" />
                {ROUTE.map(([t, d, tag], i) => (
                  <li key={t} className="relative flex gap-5">
                    <span className={`relative grid size-10 shrink-0 place-items-center rounded-full text-sm font-bold ${i === 1 ? 'bg-ink ring-2 ring-secondary text-secondary' : 'bg-brand-gradient text-foreground'}`}>0{i + 1}</span>
                    <div>
                      <p className="display text-2xl">{t}</p>
                      <p className="mt-1 text-sm text-ink-foreground/75">{d}</p>
                      <p className="label-mono mt-2 inline-block rounded-full bg-ink-foreground/10 px-2.5 py-1 text-[10px] text-secondary">{tag}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-card">
        <dl className="mx-auto grid max-w-site grid-cols-2 gap-px bg-border px-0 md:grid-cols-4">
          {STATS.map(([v, l]) => (
            <div key={l} className="flex flex-col bg-card px-5 py-8 md:px-8">
              <dt className="order-last mt-2 text-sm leading-snug text-muted-foreground">{l}</dt>
              <dd className="display text-5xl text-primary-strong">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Why */}
      <Section anchorId="why">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Eyebrow>Why articulation matters</Eyebrow>
            <h2 className="display text-display-md">A clearer next step, <em className="text-primary-strong">with honest limits.</em></h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Articulation links one qualification to the next. It&apos;s designed to respect your previous learning. It does not guarantee employment, a visa, professional
              registration or unconditional admission, and we&apos;d rather tell you that up front.
            </p>
            <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-card">
              <Image src="/images/home/hero/healthcare-professionals-ihm-uniform.webp" alt="Healthcare professionals in training" fill sizes="(min-width: 1024px) 40vw, 92vw" className="object-cover" />
            </div>
          </div>
          <div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {WHY.map(([t, b], i) => {
                const Icon = WHY_ICONS[i]
                return (
                  <li key={t} className="group/w rounded-card border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_-30px_hsl(5_60%_30%/0.45)]">
                    <Icon aria-hidden className="size-7 text-primary-strong transition-transform group-hover/w:-translate-y-0.5" />
                    <h3 className="display mt-4 text-xl">{t}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{b}</p>
                  </li>
                )
              })}
            </ul>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-card bg-blush p-6"><h3 className="font-semibold">Credit transfer</h3><p className="mt-1 text-sm text-foreground/80">Recognises completed units that are identical or equivalent to units in your new course.</p></div>
              <div className="rounded-card bg-sand p-6"><h3 className="font-semibold">Recognition of prior learning (RPL)</h3><p className="mt-1 text-sm text-foreground/80">Assesses other prior learning against unit requirements, based on the evidence you provide.</p></div>
            </div>
          </div>
        </div>
      </Section>

      {/* Finder */}
      <section id="finder" data-tone="ink" className="bg-ink-glow scroll-mt-[88px] text-ink-foreground">
        <div className="mx-auto max-w-site px-5 py-16 md:px-8 md:py-24">
          <Eyebrow onDark>Pathway Finder</Eyebrow>
          <h2 className="display text-display-md">Start with what you hold, <em className="text-secondary">or what you&apos;re studying now.</em></h2>
          <div className="mt-10"><PathwayFinder /></div>
        </div>
      </section>

      {/* How it works */}
      <Section anchorId="how">
        <Eyebrow>How it works</Eyebrow>
        <h2 className="display max-w-3xl text-display-md">Six steps, and you&apos;ll know your credit <em className="text-primary-strong">in writing</em> before you decide.</h2>
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map(([t, b], i) => (
            <li key={t} className="relative overflow-hidden rounded-card border border-border bg-card p-6">
              <span aria-hidden className="display absolute -top-4 -right-1 text-8xl text-primary/10">{String(i + 1).padStart(2, '0')}</span>
              <span className="bg-brand-gradient relative grid size-10 place-items-center rounded-full text-sm font-bold">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="display relative mt-4 text-2xl">{t}</h3>
              <p className="relative mt-2 text-[15px] leading-relaxed text-muted-foreground">{b}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <div className="rounded-card bg-ink p-8 text-ink-foreground">
            <h3 className="display text-2xl">Domestic eligibility</h3>
            <ul className="mt-4 space-y-2 text-[15px] text-ink-foreground/85">
              <li>Current students, and alumni who completed within the last 18 months, in an eligible feeder qualification.</li>
              <li>Standard entry and English / LLN requirements apply.</li>
              <li>Nursing placements require a police check, Working with Children check and immunisations.</li>
            </ul>
          </div>
          <div className="rounded-card border border-border bg-card p-8">
            <h3 className="display text-2xl">Onshore international students</h3>
            <ul className="mt-4 space-y-2 text-[15px] text-foreground/85">
              <li>A completion-first policy applies: you&apos;re expected to complete your current course.</li>
              <li>Before any offer, admissions checks Standard 7, the six-month/1 year principal-course restriction, any release required, and PRISMS.</li>
              <li>We can&apos;t provide migration advice. Please seek a registered migration agent for visa questions.</li>
            </ul>
          </div>
        </div>

        <div className="bg-brand-gradient relative mt-5 overflow-hidden rounded-[2rem] p-8 sm:p-12">
          <HeroRays id="pp-sch-rays" className="-top-16 -right-16 w-72 opacity-25 mix-blend-soft-light" />
          <p className="label-mono text-[11px] tracking-[0.16em]">Scholarship</p>
          <h3 className="display mt-2 text-[clamp(1.8rem,3.6vw,2.8rem)] leading-tight">HCI Pathway Scholarship</h3>
          <p className="mt-3 max-w-2xl text-lg">Eligible students may receive the HCI Pathway Scholarship of <strong>20 per cent off first-semester tuition fees</strong>. Conditions apply.</p>
          <details className="group/c mt-6 max-w-3xl rounded-2xl bg-card/90 text-foreground">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-semibold [&::-webkit-details-marker]:hidden">
              Read the conditions<ChevronDown aria-hidden className="size-4 transition-transform group-open/c:rotate-180" />
            </summary>
            <ul className="space-y-2 px-5 pb-5 text-sm">{SCHOLARSHIP_CONDITIONS.map((c) => <li key={c} className="flex gap-2"><span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />{c}</li>)}</ul>
          </details>
        </div>
      </Section>

      {/* RTOs */}
      <Section anchorId="institutions" tone="muted">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>For registered training organisations</Eyebrow>
            <h2 className="display text-display-md">Give your graduates a <em className="text-primary-strong">responsible next step.</em></h2>
            <p className="mt-5 text-lg text-muted-foreground">
              If your RTO delivers certificate qualifications in health, ageing, disability or community services, a partnership can give your learners a documented route
              into diploma and degree study.
            </p>
            <a href={MAIL_RTO} className={`${btn} mt-8 bg-ink text-ink-foreground hover:bg-primary-strong`}><Mail aria-hidden className="size-4" />Discuss a partnership<ArrowRight aria-hidden className="size-4" /></a>
            <p className="mt-3 text-xs text-muted-foreground">Opens your email app, addressed to {PATHWAYS_EMAIL}.</p>
          </div>
          <ol className="divide-y divide-border rounded-card border border-border bg-card px-6">
            {RTO_POINTS.map(([t, b], i) => (
              <li key={t} className="flex gap-5 py-5">
                <span className="label-mono pt-1 text-sm text-primary-strong">{String(i + 1).padStart(2, '0')}</span>
                <div><p className="font-semibold">{t}</p><p className="mt-1 text-[15px] text-muted-foreground">{b}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Two doors */}
      <Section anchorId="start">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-card border border-primary/30 bg-blush/60 p-8">
            <GraduationCap aria-hidden className="size-8 text-primary-strong" />
            <h3 className="display mt-4 text-3xl">I&apos;m a student or graduate</h3>
            <p className="mt-2 text-muted-foreground">Tell us a little about your study and connect you with a Pathway Advisor.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="https://courses.ihm.edu.au/admissions/apply/?course=BN" target="_blank" rel="noopener noreferrer" className={`${btn} border border-foreground/20 bg-card text-sm hover:border-primary`}>Diploma of Nursing<ArrowUpRight aria-hidden className="size-4" /></a>
              <a href="https://application.ihm.edu.au/" target="_blank" rel="noopener noreferrer" className={`${btn} border border-foreground/20 bg-card text-sm hover:border-primary`}>Diploma of Community Services<ArrowUpRight aria-hidden className="size-4" /></a>
              <a href={MAIL_STUDENT} className={`${btn} bg-primary text-sm text-foreground hover:bg-secondary`}><Mail aria-hidden className="size-4" />Email a Pathway Advisor</a>
            </div>
          </div>
          <div className="rounded-card border border-secondary/40 bg-sand/70 p-8">
            <Building2 aria-hidden className="size-8 text-secondary-strong" />
            <h3 className="display mt-4 text-3xl">I represent an RTO</h3>
            <p className="mt-2 text-muted-foreground">Share your RTO number and the qualifications you deliver, and we&apos;ll start a conversation.</p>
            <a href="https://industryhub.ihm.edu.au/industry-partnership" target="_blank" rel="noopener noreferrer" className={`${btn} mt-6 bg-ink text-ink-foreground hover:bg-primary-strong`}>Discuss a partnership<ArrowUpRight aria-hidden className="size-4" /></a>
          </div>
        </div>
      </Section>
    </>
  )
}
