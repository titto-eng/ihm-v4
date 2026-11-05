// /nursing-specialisation-pathway/ — WordPress template-nursing-specialisation-pathway.php (page 10423, synced 2026-10-30).
// Data: src/content/nursing-pathway.ts.
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, BookOpen, Briefcase, Check, ChevronDown, Download, FlaskConical, GraduationCap, Info, Laptop, ShieldCheck, Users } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { HeroRays } from '@/blocks/hero/Component'
import { JsonLd } from '@/components/seo/JsonLd'
import { Eyebrow, Faq, faqJsonLd } from '@/components/micro-credentials/parts'
import { SpecExplorer, Switcher } from '@/components/nursing-pathway/widgets.client'
import {
  NP_ADMISSION, NP_CAREERS, NP_FACTS, NP_FAQS, NP_FEES, NP_FOCUS, NP_LEADERS, NP_LINKS, NP_MENU, NP_OUTCOMES, NP_SEMESTERS, NP_STEPS, NP_TAGS, NP_TAKEAWAYS, NP_WHY,
} from '@/content/nursing-pathway'
import { siteOrigin } from '@/lib/seo/metadata'

export const metadata: Metadata = pageMetadata({
  title: 'Nursing Specialisation Pathway',
  path: '/nursing-specialisation-pathway/',
  metaTitle: 'Master of Nursing (Online) Specialisation Pathway | GCAN to MoN | IHM',
  description:
    'Start with a Graduate Certificate in Advanced Nursing in one of 12 specialisations, then continue into the Master of Nursing (Online) with one semester of credit. 100% online, TEQSA-accredited, AQF Level 8 to 9.',
})

const btn = 'inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-2.5 text-[15px] font-semibold transition-all duration-300 hover:-translate-y-0.5'
const primary = `${btn} bg-primary text-foreground shadow-[0_12px_28px_-14px_hsl(5_85%_55%/0.9)] hover:bg-secondary`
const line = `${btn} border border-foreground/25 bg-card hover:border-primary hover:text-primary-strong`
const STEP_ICONS = [BookOpen, Laptop, GraduationCap, ArrowRight, ShieldCheck]
const FOCUS_ICONS = [FlaskConical, Users, Briefcase]

function Acc({ id, title, open = false, children }: { id: string; title: string; open?: boolean; children: React.ReactNode }) {
  return (
    <details id={id} open={open} className="group/a scroll-mt-28 border-b border-border">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 text-lg font-semibold transition-colors hover:text-primary-strong md:text-xl [&::-webkit-details-marker]:hidden">
        <span className="display text-2xl">{title}</span>
        <ChevronDown aria-hidden className="size-5 shrink-0 text-primary-strong transition-transform duration-300 group-open/a:rotate-180" />
      </summary>
      <div className="pb-8 text-[15px] leading-relaxed text-foreground/85">{children}</div>
    </details>
  )
}

export default function NursingSpecialisationPathwayRoute() {
  const origin = siteOrigin()
  return (
    <>
      <JsonLd data={faqJsonLd(NP_FAQS)} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'EducationalOccupationalProgram',
        name: 'Master of Nursing (Online) Specialisation Pathway',
        description: 'Graduate Certificate in Advanced Nursing (AQF 8) in one of 12 specialisations, then the Master of Nursing (Online) (AQF 9) with one semester of credit.',
        url: `${origin}/nursing-specialisation-pathway/`,
        provider: { '@type': 'CollegeOrUniversity', name: 'Institute of Health and Management', url: origin },
        educationalProgramMode: 'online',
        hasCourse: [
          { '@type': 'Course', name: 'Graduate Certificate in Advanced Nursing', url: `${origin}${NP_LINKS.gcanPage}`, provider: { '@type': 'CollegeOrUniversity', name: 'Institute of Health and Management' }, offers: { '@type': 'Offer', price: 7750, priceCurrency: 'AUD' } },
          { '@type': 'Course', name: 'Master of Nursing (Online)', url: `${origin}${NP_LINKS.monPage}`, provider: { '@type': 'CollegeOrUniversity', name: 'Institute of Health and Management' }, offers: { '@type': 'Offer', price: 20000, priceCurrency: 'AUD' } },
        ],
      }} />

      {/* Hero */}
      <section data-tone="ink" className="bg-ink-glow relative isolate overflow-hidden text-ink-foreground">
        <HeroRays id="np-rays" className="-top-24 -left-24 -z-10 w-[28rem] opacity-[0.12]" />
        <div className="mx-auto grid max-w-site items-center gap-12 px-5 pt-10 pb-16 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:pt-14 lg:pb-20">
          <div>
            <nav aria-label="Breadcrumb" className="label-mono mb-6 text-[11px] tracking-[0.12em] text-ink-foreground/60">
              <Link href="/" className="hover:text-secondary">Home</Link> › <Link href="/courses/" className="hover:text-secondary">Courses</Link> › School of Nursing › <span aria-current="page" className="text-ink-foreground">Specialisation Pathway</span>
            </nav>
            <p className="inline-flex flex-wrap items-center gap-2 rounded-full bg-ink-foreground/10 px-4 py-1.5 text-sm ring-1 ring-secondary/30">
              Graduate Certificate in Advanced Nursing <ArrowRight aria-hidden className="size-3.5 text-secondary" /> Master of Nursing
            </p>
            <h1 className="display mt-6 text-[clamp(2.4rem,5.4vw,4.4rem)] leading-[1.03] text-balance">Master of Nursing (Online) <em className="text-secondary">Specialisation Pathway</em></h1>
            <p className="mt-6 max-w-xl text-lg text-ink-foreground/80">Go deep in your specialty. Then grow into research, education and leadership at Master’s level — 100% online.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#specialisations" className={primary}>Explore specialisations<ArrowRight aria-hidden className="size-4" /></a>
              <a href="#apply" className={`${btn} border border-ink-foreground/50 hover:border-secondary hover:text-secondary`}>Apply now<ArrowUpRight aria-hidden className="size-4" /></a>
              <a href="#enquire" className={`${btn} text-secondary underline-offset-4 hover:underline`}>Enquire now</a>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2">
              {NP_TAGS.map((t) => <li key={t} className="rounded-full border border-ink-foreground/20 px-3 py-1 text-xs text-ink-foreground/85">{t}</li>)}
            </ul>
          </div>
          <div className="relative">
            <div className="relative aspect-[820/1026] max-h-[34rem] overflow-hidden rounded-[2rem] ring-4 ring-ink-foreground/10 lg:ml-auto">
              <Image src="/images/nursing-pathway/hero.webp" alt="A registered nurse in IHM uniform checking in with an older patient" fill priority sizes="(min-width: 1024px) 40vw, 92vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* In-page menu */}
      <nav aria-label="On this page" className="border-b border-border bg-card">
        <ul className="mx-auto flex max-w-site gap-1 overflow-x-auto px-5 py-2 [scrollbar-width:none] md:px-8">
          {NP_MENU.map(([id, label]) => <li key={id}><a href={`#${id}`} className="block rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">{label}</a></li>)}
        </ul>
      </nav>

      {/* Key takeaways + facts */}
      <Section anchorId="facts">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="min-w-0 self-start rounded-card bg-sand/70 p-6 md:p-8 lg:sticky lg:top-28">
            <p className="label-mono text-[11px] text-secondary-strong">Key takeaways</p>
            <ol className="mt-5 space-y-4">
              {NP_TAKEAWAYS.map(([t, b], i) => (
                <li key={t} className="flex gap-4">
                  <span className="bg-brand-gradient grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold">{i + 1}</span>
                  <p className="text-[15px]"><strong>{t}</strong> {b}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="min-w-0">
            <Eyebrow>Key facts</Eyebrow>
            <h2 className="display text-display-md">Two stages. <em className="text-primary-strong">One direction.</em></h2>
            <div className="mt-8 overflow-x-auto rounded-card border border-border bg-card">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th scope="col" className="w-1/4 px-4 py-4"><span className="sr-only">Fact</span></th>
                    <th scope="col" className="px-4 py-4"><span className="label-mono block text-[10px] text-primary-strong">Stage 1 (Online)</span><span className="font-semibold">Graduate Certificate in Advanced Nursing</span></th>
                    <th scope="col" className="px-4 py-4"><span className="label-mono block text-[10px] text-primary-strong">Stage 2</span><span className="font-semibold">Master of Nursing (Online)</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {NP_FACTS.map(([k, a, b]) => (
                    <tr key={k}><th scope="row" className="label-mono px-4 py-3 align-top text-[10px] text-muted-foreground">{k}</th><td className="px-4 py-3 align-top">{a}</td><td className="px-4 py-3 align-top">{b}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Progression and credit are subject to Master of Nursing admission requirements and credit assessment. Part-time duration after credit should be confirmed with Admissions.</p>
            <div id="apply" className="mt-8 scroll-mt-28 rounded-card border border-primary/25 bg-blush/50 p-6">
              <p className="font-semibold">Ready when you are. Applications open through IHM’s official portals.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href="#enquire" className={primary}>Enquire now</a>
                <a href={NP_LINKS.applyGcan} target="_blank" rel="noopener noreferrer" className={line}>Apply — Graduate Certificate<ArrowUpRight aria-hidden className="size-4" /></a>
                <a href={NP_LINKS.applyMon} target="_blank" rel="noopener noreferrer" className={line}>Apply — Master of Nursing<ArrowUpRight aria-hidden className="size-4" /></a>
                <a href={NP_LINKS.monGuide} className={`${btn} text-primary-strong`}><Download aria-hidden className="size-4" />Course guide</a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Overview */}
      <Section anchorId="overview" tone="muted">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Overview</Eyebrow>
            <h2 className="display text-display-md">Specialise first, <em className="text-primary-strong">then lead.</em></h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-foreground/85">
              <p>IHM’s online specialisation pathway is built for registered nurses who want expert depth in their field and the Master’s-level capability to shape practice, teach others and lead teams.</p>
              <p>You begin with the Graduate Certificate in Advanced Nursing in one of 12 specialisations. Eligible graduates who are admitted to IHM’s Master of Nursing (Online) may receive one semester of credit — three units — following credit assessment.</p>
              <p>From there, the Master of Nursing takes your specialty knowledge further — into research that improves care, education that develops other nurses, and leadership and management that shapes how services run.</p>
            </div>
          </div>
          <div className="relative aspect-[1024/640] overflow-hidden rounded-card shadow-[0_32px_64px_-36px_hsl(348_35%_13%/0.55)]">
            <Image src="/images/nursing-pathway/community.webp" alt="A nurse reviewing a digital health record with an older patient at home" fill sizes="(min-width: 1024px) 45vw, 92vw" className="object-cover" />
          </div>
        </div>
        <div className="mt-16">
          <h3 className="display text-3xl">Why specialise first?</h3>
          <p className="mt-3 max-w-3xl text-muted-foreground">Specialty knowledge is the foundation of advanced nursing practice. Starting with a specialisation means everything you learn at Master’s level is anchored in a field you know deeply.</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {NP_WHY.map(([t, b], i) => (
              <li key={t} className="rounded-card border border-border bg-card p-5">
                <span className="label-mono text-xs text-primary-strong">{String(i + 1).padStart(2, '0')}</span>
                <p className="mt-3 font-semibold">{t}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Specialisations */}
      <Section anchorId="specialisations">
        <Eyebrow>Choose your specialisation</Eyebrow>
        <h2 className="display text-display-md">Twelve <em className="text-primary-strong">ways in.</em></h2>
        <p className="mt-4 mb-8 max-w-3xl text-muted-foreground">Every specialisation comprises one common core unit and two specialisation units, and every specialisation sits within the pathway towards the Master of Nursing.</p>
        <SpecExplorer />
      </Section>

      {/* Pathway */}
      <Section anchorId="pathway" tone="muted">
        <Eyebrow>How the pathway works</Eyebrow>
        <h2 className="display max-w-3xl text-display-md">Your specialisation can become <em className="text-primary-strong">your first semester.</em></h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">Complete the Graduate Certificate, then continue into the Master of Nursing with credit for the semester you have already studied, subject to admission and credit assessment.</p>
        <ol className="relative mt-12 grid gap-5 md:grid-cols-5">
          <span aria-hidden className="bg-brand-gradient absolute top-6 right-[10%] left-[10%] hidden h-0.5 opacity-60 md:block" />
          {NP_STEPS.map(([t, b], i) => {
            const Icon = STEP_ICONS[i]
            return (
              <li key={t} className="relative">
                <span className={`relative grid size-12 place-items-center rounded-full shadow-lg ${i === 2 ? 'bg-ink text-secondary' : 'bg-brand-gradient text-foreground'}`}><Icon aria-hidden className="size-5" /></span>
                <p className="label-mono mt-4 text-[10px] text-muted-foreground">Step {i + 1}</p>
                <h3 className="display mt-1 text-xl">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b}</p>
              </li>
            )
          })}
        </ol>
        <p className="mt-10 flex max-w-4xl gap-3 rounded-2xl border border-border bg-card p-5 text-sm">
          <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-primary-strong" />
          <span>Progression is open to Graduate Certificate in Advanced Nursing graduates who meet Master of Nursing admission requirements (including a Bachelor of Nursing or equivalent). Credit is assessed individually under IHM’s <Link href={NP_LINKS.credit} className="font-semibold text-primary-strong hover:underline">Credit and RPL policy</Link>. Diploma-qualified graduates should discuss progression with Admissions.</span>
        </p>
      </Section>

      {/* Master's focus */}
      <section id="masters" data-tone="ink" className="bg-ink-glow scroll-mt-[88px] text-ink-foreground">
        <div className="mx-auto max-w-site px-5 py-16 md:px-8 md:py-24">
          <Eyebrow onDark>At Master’s level</Eyebrow>
          <h2 className="display text-display-md">Turn specialty expertise <em className="text-secondary">into influence.</em></h2>
          <p className="mt-4 max-w-2xl text-ink-foreground/75">Three areas of focus run through the degree, and your final semester lets you choose where to go deepest.</p>
          <Switcher
            onDark
            className="mt-10"
            tabs={NP_FOCUS.map((f, i) => {
              const Icon = FOCUS_ICONS[i]
              return { id: f.id, label: <span className="inline-flex items-center gap-2"><Icon aria-hidden className="size-4" />{f.label}</span> }
            })}
            panels={Object.fromEntries(NP_FOCUS.map((f) => [f.id, (
              <div key={f.id} className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div className="relative aspect-[4/3] overflow-hidden rounded-card ring-4 ring-ink-foreground/10">
                  <Image src={f.image} alt="" fill sizes="(min-width: 1024px) 45vw, 92vw" className="object-cover" />
                </div>
                <div>
                  <h3 className="display text-3xl">{f.title}</h3>
                  <p className="label-mono mt-6 text-[10px] text-secondary">What you will develop</p>
                  <p className="mt-2 text-ink-foreground/85">{f.develop}</p>
                  <p className="label-mono mt-6 text-[10px] text-secondary">Units</p>
                  <ul className="mt-2 space-y-2">{f.units.map((u) => <li key={u} className="flex gap-2"><Check aria-hidden className="mt-0.5 size-4 shrink-0 text-secondary" />{u}</li>)}</ul>
                  <p className="label-mono mt-6 text-[10px] text-secondary">Where it can lead</p>
                  <p className="mt-2 text-ink-foreground/85">{f.lead}</p>
                </div>
              </div>
            )]))}
          />
          <p className="mt-10 rounded-2xl border border-ink-foreground/15 bg-ink-foreground/5 p-5 text-sm text-ink-foreground/80">
            Your final-semester choice: complete a research-focused Nursing Project (N9014), or take the education and global health option (N9011, N9012, N9013).
          </p>
        </div>
      </section>

      {/* Structure */}
      <Section anchorId="structure">
        <Eyebrow>Course structure</Eyebrow>
        <h2 className="display text-display-md">128 credit points, <em className="text-primary-strong">semester by semester.</em></h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">
          Indicative pathway structure for review. Semester 1 credit, the proposed 32-credit-point mapping and semester sequence require confirmation by IHM.
        </p>
        <div className="mt-10 grid gap-3 md:grid-cols-4">
          {NP_SEMESTERS.map(([s, cp, units], i) => (
            <div key={s} className={`flex flex-col rounded-card p-5 ${i === 0 ? 'bg-brand-gradient' : 'border border-border bg-card'}`}>
              <div className="flex items-baseline justify-between"><h3 className="display text-2xl">{s}</h3><span className="label-mono text-[11px]">{cp} cp</span></div>
              <ul className="mt-4 space-y-3 text-sm">
                {units.map(([u, c]) => <li key={u} className={`flex justify-between gap-3 border-t pt-3 ${i === 0 ? 'border-foreground/20' : 'border-border'}`}><span>{u}</span>{c && <span className="label-mono shrink-0 text-[10px] text-muted-foreground">{c} cp</span>}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          All students also complete AI001 Academic Integrity and AI002 Aboriginal Health (0 credit points). Unit order and credit mapping may vary by intake; refer to the current Course Handbook.{' '}
          <Link href={NP_LINKS.monPage} className="font-semibold text-primary-strong hover:underline">Official Master of Nursing course page</Link>
        </p>
      </Section>

      {/* Details */}
      <Section anchorId="admission" tone="muted">
        <div className="mx-auto max-w-4xl">
          <Eyebrow>The details</Eyebrow>
          <h2 className="display mb-6 text-display-md">Everything you need <em className="text-primary-strong">to decide.</em></h2>
          <div className="border-t border-border">
            <Acc id="outcomes" title="Learning outcomes">
              <p>Master of Nursing course learning outcomes. On successful completion, graduates will be able to:</p>
              <ol className="mt-4 space-y-2">{NP_OUTCOMES.map((o, i) => <li key={o} className="flex gap-3"><span className="label-mono pt-0.5 text-xs text-primary-strong">{i + 1}.</span>{o}</li>)}</ol>
              <p className="mt-4 text-sm text-muted-foreground">Graduate Certificate in Advanced Nursing learning outcomes are published on the <Link href={NP_LINKS.gcanPage} className="font-semibold text-primary-strong hover:underline">official GCAN course page</Link> and course guide.</p>
            </Acc>
            <Acc id="entry" title="Admission requirements" open>
              <div className="overflow-x-auto rounded-xl border border-border bg-card">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead className="bg-muted"><tr><th scope="col" className="px-4 py-3">Requirement</th><th scope="col" className="px-4 py-3">Graduate Certificate</th><th scope="col" className="px-4 py-3">Master of Nursing</th></tr></thead>
                  <tbody className="divide-y divide-border">{NP_ADMISSION.map(([r, a, b]) => <tr key={r}><th scope="row" className="px-4 py-3 align-top font-semibold">{r}</th><td className="px-4 py-3 align-top">{a}</td><td className="px-4 py-3 align-top">{b}</td></tr>)}</tbody>
                </table>
              </div>
              <p className="mt-4">You may be eligible for an English language waiver under IHM’s <Link href={NP_LINKS.english} className="font-semibold text-primary-strong hover:underline">English Language Entry Requirements</Link>. Diploma-qualified Graduate Certificate graduates should speak with Admissions about Master of Nursing eligibility.</p>
            </Acc>
            <Acc id="duration" title="Duration, study mode and intakes">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-card p-5"><p className="font-semibold">Graduate Certificate</p><p className="mt-2">26 weeks full-time / 52 weeks part-time</p><p className="mt-1 text-sm text-muted-foreground">Published intakes: 2 November 2026 and 1 February 2027.</p></div>
                <div className="rounded-xl border border-border bg-card p-5"><p className="font-semibold">Master of Nursing (Online)</p><p className="mt-2">Full course: 2 years full-time / 4 years part-time</p><p className="mt-1 text-sm text-muted-foreground">With one-semester credit: around 1.5 years full-time remaining. Part-time duration after credit is confirmed at assessment. Intakes: March, July and November each year.</p></div>
              </div>
              <p className="mt-4">All classes are online. Live sessions are recorded, so you can catch up around your roster. Intake dates should be confirmed with Admissions for your situation.</p>
            </Acc>
            <Acc id="fees" title="Fees">
              <dl className="grid gap-3 sm:grid-cols-2">{NP_FEES.map(([k, v]) => <div key={k} className="rounded-xl border border-border bg-card p-5"><dt className="text-sm text-muted-foreground">{k}</dt><dd className="display mt-1 text-2xl text-primary-strong">{v}</dd></div>)}</dl>
              <p className="mt-4">Fees are subject to change annually. FEE-HELP may be available to eligible domestic students. Payment plans are available. Refunds are governed by IHM’s <a href={NP_LINKS.feesPolicy} className="font-semibold text-primary-strong hover:underline">Fees, Charges and Refunds Policies</a>.</p>
            </Acc>
            <Acc id="careers" title="Career opportunities">
              <p>Graduates of the pathway combine specialty depth with Master’s-level capability. Roles that Master’s-qualified registered nurses commonly pursue include:</p>
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">{NP_CAREERS.map(([k, v]) => <div key={k} className="rounded-xl border border-border bg-card p-5"><dt className="font-semibold">{k}</dt><dd className="mt-1 text-sm text-muted-foreground">{v}</dd></div>)}</dl>
              <p className="mt-4 text-sm text-muted-foreground">Employment outcomes are not guaranteed. Appointment to specialist or senior roles depends on registration, experience and employer requirements.</p>
            </Acc>
          </div>
          <div className="mt-8 flex gap-4 rounded-card bg-ink p-6 text-ink-foreground">
            <ShieldCheck aria-hidden className="size-6 shrink-0 text-secondary" />
            <div>
              <p className="font-semibold">Nursing registration in Australia</p>
              <p className="mt-1 text-sm text-ink-foreground/80">These courses are for registered nurses and do not lead to registration as a nurse in Australia. Internationally qualified nurses seeking Australian registration must apply to Ahpra and meet NMBA requirements, which may include the NCLEX-RN and the OSCE.</p>
              <Link href={NP_LINKS.registration} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:underline">Nursing Registration Process<ArrowRight aria-hidden className="size-4" /></Link>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ + leadership */}
      <Section anchorId="faq">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Frequently asked</Eyebrow>
            <h2 className="display text-display-md">Questions nurses <em className="text-primary-strong">actually ask.</em></h2>
            <p className="label-mono mt-10 mb-4 text-[11px] text-muted-foreground">Course leadership</p>
            <ul className="space-y-3">
              {NP_LEADERS.map((l) => (
                <li key={l.name}>
                  <Link href={l.profile} className="group/l flex items-center gap-4 rounded-2xl border border-border bg-card p-3 transition-colors hover:border-primary">
                    <span className="relative size-14 shrink-0 overflow-hidden rounded-full bg-blush">
                      <Image src={l.photo} alt="" fill sizes="56px" className="object-cover" />
                    </span>
                    <span><span className="block font-semibold group-hover/l:text-primary-strong">{l.name}</span><span className="block text-sm text-muted-foreground">{l.role}</span></span>
                    <ArrowRight aria-hidden className="ml-auto size-4 text-muted-foreground transition-transform group-hover/l:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Faq items={NP_FAQS} />
        </div>
      </Section>

      {/* Enquire */}
      <section id="enquire" data-tone="sunrise" className="bg-sunrise-glow scroll-mt-[88px]">
        <div className="mx-auto max-w-site px-5 py-16 md:px-8 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <Eyebrow className="text-foreground">Get in touch</Eyebrow>
              <h2 className="display text-display-md">Talk to us about your <span className="underline decoration-ink/25 decoration-4 underline-offset-8">specialisation pathway.</span></h2>
              <p className="mt-5 max-w-lg text-lg text-foreground/85">Tell us where you are heading and we’ll point you to the right IHM course team.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={NP_LINKS.gcanGuide} className={`${btn} bg-card/80 text-sm hover:bg-card`}><Download aria-hidden className="size-4" />GCAN course guide</a>
                <a href={NP_LINKS.monGuide} className={`${btn} bg-card/80 text-sm hover:bg-card`}><Download aria-hidden className="size-4" />MoN course guide</a>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: 'Graduate Certificate in Advanced Nursing', note: 'Start with one of 12 specialisations, online.', href: NP_LINKS.gcanEnquire },
                { title: 'Master of Nursing (Online)', note: 'Continue with one semester of credit.', href: NP_LINKS.monEnquire },
              ].map((c) => (
                <Link key={c.title} href={c.href} className="group/e flex flex-col rounded-card bg-card p-6 shadow-[0_24px_48px_-30px_hsl(348_35%_13%/0.5)] transition-transform hover:-translate-y-1">
                  <GraduationCap aria-hidden className="size-7 text-primary-strong" />
                  <span className="display mt-4 text-xl">{c.title}</span>
                  <span className="mt-1 text-sm text-muted-foreground">{c.note}</span>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-primary-strong">Enquire<ArrowRight aria-hidden className="size-4 transition-transform group-hover/e:translate-x-1" /></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
