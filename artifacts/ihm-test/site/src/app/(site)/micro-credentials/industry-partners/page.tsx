// /micro-credentials/industry-partners/ — WordPress template-mc-partners.php (synced 2026-10-30).
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, CalendarRange, ChartColumn, GraduationCap, Handshake, Quote, Receipt, UsersRound } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { HeroRays } from '@/blocks/hero/Component'
import { btnOnDark, Enquire, Eyebrow, McCard, Tbc } from '@/components/micro-credentials/parts'
import { MC_AREAS, MC_COURSES, MC_LINKS, MC_PARTNER_PROPS, mcCourse, mcPath } from '@/content/micro-credentials'

export const metadata: Metadata = pageMetadata({
  title: 'Industry Partners',
  path: '/micro-credentials/industry-partners/',
  metaTitle: 'Micro-credentials for Health Services and Employers | IHM Industry Hub',
  description:
    'A proposed Industry Hub Partnership for hospitals, aged care providers and health services: nominate staff, roster-aware cohorts, progress reporting and a pathway to the Graduate Certificate in Advanced Nursing.',
})

const ICONS = [UsersRound, CalendarRange, Receipt, ChartColumn, Handshake, GraduationCap]
const STARTERS = ['critical-care-nursing', 'gerontology-nursing', 'emergency-nursing']

export default function IndustryPartnersRoute() {
  return (
    <>
      <section data-tone="ink" className="bg-ink-glow relative isolate overflow-hidden text-ink-foreground">
        <HeroRays id="partners-rays" className="-right-24 -bottom-24 -z-10 w-[28rem] opacity-[0.18]" />
        <div className="mx-auto grid max-w-site items-center gap-12 px-5 pt-10 pb-16 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:pt-14 lg:pb-24">
          <div>
            <nav aria-label="Breadcrumb" className="label-mono mb-8 text-[11px] tracking-[0.12em] text-ink-foreground/60">
              <Link href="/courses/" className="hover:text-secondary">Courses</Link> / <Link href="/micro-credentials/" className="hover:text-secondary">Micro-Credentials</Link> / <span aria-current="page" className="text-ink-foreground">Industry partners</span>
            </nav>
            <Eyebrow onDark>Industry Hub Partnership</Eyebrow>
            <h1 className="display text-[clamp(2.4rem,5.2vw,4.2rem)] leading-[1.04] text-balance">Specialist capability, grown <em className="text-secondary">where your patients are.</em></h1>
            <p className="mt-6 max-w-xl text-lg text-ink-foreground/80">
              A proposed way for hospitals, aged care providers and health services to upskill nurses one specialty at a time, with IHM as an academic partner.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Enquire label="Start a partner conversation" />
              <a href={MC_LINKS.industryHub} target="_blank" rel="noopener noreferrer" className={btnOnDark}>IHM Industry Hub<ArrowUpRight aria-hidden className="size-4" /><span className="sr-only"> (opens in a new tab)</span></a>
            </div>
          </div>
          <div aria-hidden className="grid grid-cols-3 gap-3">
            {['emergency-nursing', 'critical-care-nursing', 'gerontology-nursing'].map((s, i) => (
              <div key={s} className={`relative aspect-[3/5] overflow-hidden rounded-3xl ring-4 ring-ink-foreground/10 ${i === 1 ? '-translate-y-6' : 'translate-y-4'}`}>
                <Image src={mcCourse(s)!.image} alt="" fill sizes="(min-width: 1024px) 14vw, 30vw" className="object-cover" priority={i === 1} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section anchorId="proposition">
        <Eyebrow>The proposition</Eyebrow>
        <h2 className="display text-display-md">What a partnership <em className="text-primary-strong">could include</em></h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">All arrangements below are drawn from IHM’s draft proposal and are subject to approval.</p>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MC_PARTNER_PROPS.map(([t, b], i) => {
            const Icon = ICONS[i]
            return (
              <li key={t} className="group/p relative overflow-hidden rounded-card border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_-30px_hsl(5_60%_30%/0.45)]">
                <Icon aria-hidden className="size-8 text-primary-strong transition-transform duration-500 group-hover/p:-translate-y-1" />
                <h3 className="display mt-5 text-2xl">{t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{b}</p>
                <span aria-hidden className="bg-brand-gradient absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover/p:scale-x-100" />
              </li>
            )
          })}
        </ul>
        <p className="mt-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">Commercial terms: <Tbc>Partner rate</Tbc><Tbc>Minimum cohort size</Tbc><Tbc>Invoicing terms</Tbc></p>
      </Section>

      <section data-tone="sunrise" className="bg-sunrise-glow">
        <figure className="mx-auto max-w-4xl px-5 py-16 text-center md:px-8 md:py-20">
          <Quote aria-hidden className="mx-auto size-10 text-primary-strong opacity-70" />
          <blockquote className="display mt-6 text-[clamp(1.5rem,3vw,2.3rem)] leading-snug">
            You will improve your skills and knowledge in the area you work in; your patients will get better, safer, more compassionate care; and your organisation will see the benefit on the ward and in the community.
          </blockquote>
          <figcaption className="mt-6 text-sm text-foreground/70">What partners can say to their staff, in plain language. Adapted from the IHM proposal.</figcaption>
        </figure>
      </section>

      <Section anchorId="workforce">
        <Eyebrow>Workforce alignment</Eyebrow>
        <h2 className="display text-display-md">Map specialties to <em className="text-primary-strong">your service needs</em></h2>
        <p className="mt-4 text-muted-foreground">Twelve specialties across four care areas, each based on a named GCAN unit.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {MC_AREAS.map((a) => (
            <div key={a.id} className="rounded-card border border-border bg-card p-6">
              <h3 className="display text-2xl">{a.label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{a.blurb}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {MC_COURSES.filter((c) => c.area === a.id).map((c) => (
                  <li key={c.slug}>
                    <Link href={mcPath(c.slug)} className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-sm font-semibold transition-colors hover:border-primary hover:bg-blush hover:text-primary-strong">
                      <span aria-hidden className="size-2 rounded-full" style={{ background: c.accent }} />{c.short}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section anchorId="starting-points" tone="muted">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="display text-display-md">Popular <em className="text-primary-strong">starting points</em></h2>
          <Link href="/micro-credentials/#catalogue" className="inline-flex items-center gap-2 font-semibold text-primary-strong hover:underline">Full catalogue<ArrowRight aria-hidden className="size-4" /></Link>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{STARTERS.map((s) => <li key={s}><McCard course={mcCourse(s)!} /></li>)}</ul>
        <p className="mt-10 max-w-3xl text-sm text-muted-foreground">
          Micro-credentials are proposed non-award units, not AQF qualifications. They do not confer registration, endorsement or a specialist title. Please contact IHM directly about partnerships.
        </p>
      </Section>
    </>
  )
}
