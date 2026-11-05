// /courses/bachelor-of-nursing/ — bespoke course page (WordPress template-bachelor-of-nursing.php on course 3767, synced 2026-10-30).
// This static route takes precedence over courses/[slug]. Content: src/content/bachelor-of-nursing.ts. /bachelor-of-nursing/ redirects here.
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Building2, CheckCircle2, Cpu, Download, GraduationCap, HeartHandshake, MapPin, Mountain, Phone, Stethoscope } from 'lucide-react'
import { pageMetadata, EnquiryForm } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { HeroRays } from '@/blocks/hero/Component'
import { JsonLd } from '@/components/seo/JsonLd'
import { AudienceOnly } from '@/components/audience/AudienceOnly'
import { AudienceSwitch } from '@/components/audience/AudienceSwitch'
import { Eyebrow, Faq, faqJsonLd } from '@/components/micro-credentials/parts'
import { Switcher } from '@/components/nursing-pathway/widgets.client'
import { IntakePlanner } from '@/components/bachelor-of-nursing/IntakePlanner.client'
import {
  BN_ADMISSIONS, BN_APPLY, BN_BROCHURE, BN_CURRICULUM, BN_ENGLISH_POLICY, BN_FACTS, BN_FAQS, BN_FEATURES, BN_FEES, BN_IHNA, BN_INHERENT, BN_INHERENT_TEXT,
  BN_MANDATORY, BN_MENU, BN_NMBA_ENGLISH, BN_OUTCOMES, BN_PATHWAYS, BN_PLACEMENTS, BN_PREPLACEMENT, BN_WEEKS,
} from '@/content/bachelor-of-nursing'
import { siteOrigin } from '@/lib/seo/metadata'

export const metadata: Metadata = pageMetadata({
  title: 'Bachelor of Nursing',
  path: '/courses/bachelor-of-nursing/',
  metaTitle: 'Bachelor of Nursing (AQF 7) | Melbourne, Sydney, Perth, Brisbane | IHM',
  description:
    'IHM Bachelor of Nursing: an NMBA/TEQSA-accredited 3-year degree with 800 hours of placement, simulation labs and six intakes a year at four campuses. Graduate eligible to apply for registration as a Registered Nurse.',
})

const btn = 'inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-2.5 text-[15px] font-semibold transition-all duration-300 hover:-translate-y-0.5'
const primary = `${btn} bg-primary text-foreground shadow-[0_12px_28px_-14px_hsl(5_85%_55%/0.9)] hover:bg-secondary`
const line = `${btn} border border-foreground/25 bg-card hover:border-primary hover:text-primary-strong`
const FEATURE_ICONS = [HeartHandshake, Stethoscope, Cpu, Mountain, GraduationCap]
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const ext = { target: '_blank', rel: 'noopener noreferrer' } as const

const Num = ({ n, children }: { n: string; children: React.ReactNode }) => (
  <Eyebrow><span className="label-mono rounded-full bg-ink px-2 py-0.5 text-[10px] text-ink-foreground">{n}</span>{children}</Eyebrow>
)

export default function BachelorOfNursingCourseRoute() {
  const origin = siteOrigin()
  return (
    <>
      <JsonLd data={faqJsonLd(BN_FAQS)} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: 'Bachelor of Nursing',
        courseCode: 'CRICOS 118071E',
        description: 'An NMBA/TEQSA-accredited 3-year Bachelor of Nursing (AQF 7) with 800 hours of supervised placement, at Melbourne, Sydney, Perth and Brisbane.',
        url: `${origin}/courses/bachelor-of-nursing/`,
        educationalCredentialAwarded: 'Bachelor of Nursing (AQF Level 7)',
        timeRequired: 'P3Y',
        provider: { '@type': 'CollegeOrUniversity', name: 'Institute of Health and Management', url: origin },
        offers: [
          { '@type': 'Offer', category: 'Domestic tuition per semester', price: 15000, priceCurrency: 'AUD' },
          { '@type': 'Offer', category: 'International tuition per semester', price: 18250, priceCurrency: 'AUD' },
        ],
        hasCourseInstance: ['Melbourne', 'Sydney', 'Perth', 'Brisbane'].map((c) => ({ '@type': 'CourseInstance', courseMode: 'blended', location: `IHM ${c} campus` })),
      }} />

      {/* Hero */}
      <section data-tone="sunrise" className="bg-brand-wash relative isolate overflow-hidden">
        <HeroRays id="bn-rays" className="-top-24 -left-24 -z-10 w-[28rem] opacity-[0.12]" />
        <div className="mx-auto grid max-w-site items-center gap-12 px-5 pt-10 pb-12 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:pt-14">
          <div>
            <p className="label-mono text-[11px] tracking-[0.14em] text-primary-strong">Bachelor of Nursing · AQF 7 · CRICOS 118071E</p>
            <h1 className="display mt-5 text-[clamp(2.5rem,5.8vw,4.8rem)] leading-[1.02] text-balance">Become the nurse people <em className="text-primary-strong">remember</em>.</h1>
            <p className="display mt-3 text-[clamp(1.3rem,2.4vw,1.8rem)] text-foreground/80 italic">Caring with passion, from your first day.</p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/80">
              An NMBA/TEQSA-accredited degree is taught the way nursing is practised: in small cohorts, hands-on in simulated wards, and on placement in city and regional
              hospitals and aged-care homes across Australia. Start in any of six intakes a year at four campuses, and graduate eligible to apply for registration as a
              Registered Nurse with AHPRA.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={BN_APPLY} {...ext} className={primary}>Apply for the BN<ArrowUpRight aria-hidden className="size-4" /></a>
              <a href="#quickContact" className={line}>Enquire now</a>
              <a href="#pathways" className={`${btn} text-primary-strong underline-offset-4 hover:underline`}>Compare three pathways</a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <AudienceSwitch />
              <a href={BN_BROCHURE} className="inline-flex items-center gap-2 text-sm font-semibold text-primary-strong hover:underline"><Download aria-hidden className="size-4" />Download brochure</a>
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-[2rem] shadow-[0_32px_64px_-36px_hsl(348_35%_13%/0.6)] ring-4 ring-card">
              <Image src="/images/bachelor-of-nursing/hero.webp" alt="A nursing student wearing maroon IHM scrubs practising with a stethoscope on a simulation mannequin" fill priority sizes="(min-width: 1024px) 40vw, 92vw" className="object-cover" />
            </div>
            <p className="display absolute -bottom-5 left-6 rounded-2xl bg-ink px-5 py-3 text-lg text-ink-foreground shadow-xl"><span className="text-secondary">800 hours</span> of supervised placement</p>
          </div>
        </div>
        <dl className="mx-auto grid max-w-site grid-cols-2 gap-3 px-5 pb-14 md:grid-cols-5 md:px-8">
          {BN_FACTS.map(([k, v, s]) => (
            <div key={k} className="flex flex-col rounded-2xl border border-border bg-card/85 p-4 backdrop-blur">
              <dt className="label-mono text-[10px] text-muted-foreground">{k}</dt>
              <dd className="display mt-1 text-2xl">{v}</dd>
              <dd className="text-xs text-muted-foreground">{s}</dd>
            </div>
          ))}
        </dl>
      </section>

      <nav aria-label="On this page" className="border-y border-border bg-card">
        <ul className="mx-auto flex max-w-site gap-1 overflow-x-auto px-5 py-2 [scrollbar-width:none] md:px-8">
          {BN_MENU.map(([id, label]) => <li key={id}><a href={`#${id}`} className="block rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">{label}</a></li>)}
        </ul>
      </nav>

      {/* 01 Pathways */}
      <Section anchorId="pathways">
        <Num n="01">Three ways in</Num>
        <h2 className="display max-w-3xl text-display-md">Where you start shapes the route, <em className="text-primary-strong">not the destination.</em></h2>
        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {BN_PATHWAYS.map((p, i) => (
            <li key={p.tag} className={`flex flex-col rounded-card p-7 ${i === 1 ? 'bg-ink text-ink-foreground' : 'border border-border bg-card'}`}>
              <p className={`label-mono text-[10px] ${i === 1 ? 'text-secondary' : 'text-primary-strong'}`}>{p.tag}</p>
              <p className={`mt-2 text-sm ${i === 1 ? 'text-ink-foreground/75' : 'text-muted-foreground'}`}>{p.who}</p>
              <h3 className="display mt-4 text-3xl">{p.title}</h3>
              <p className="mt-1 font-semibold">{p.length}</p>
              <ol className="mt-5 space-y-2">
                {p.steps.map(([k, v]) => <li key={k} className={`flex gap-3 rounded-xl p-3 text-sm ${i === 1 ? 'bg-ink-foreground/10' : 'bg-muted'}`}><span className="label-mono w-14 shrink-0 text-[10px] opacity-70">{k}</span>{v}</li>)}
              </ol>
              <ul className="mt-5 space-y-2 text-sm">
                {p.points.map((t) => <li key={t} className="flex gap-2"><CheckCircle2 aria-hidden className={`mt-0.5 size-4 shrink-0 ${i === 1 ? 'text-secondary' : 'text-primary-strong'}`} />{t}</li>)}
              </ul>
              <p className="mt-5 text-sm font-semibold">{p.note}</p>
              <div className="mt-auto flex flex-wrap gap-2 pt-6">
                {p.links.map(([l, h], j) => (
                  <a key={l} href={h} {...(h.startsWith('http') ? ext : {})} className={j === 0 ? 'inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary' : `inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold ${i === 1 ? 'border-ink-foreground/40 hover:border-secondary' : 'border-foreground/25 hover:border-primary'}`}>{l}</a>
                ))}
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6 grid gap-6 rounded-card bg-sand/70 p-7 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h3 className="display text-2xl">{BN_IHNA.title}</h3>
            <ol className="mt-4 grid gap-3 sm:grid-cols-3">
              {BN_IHNA.steps.map((s, i) => <li key={s} className="rounded-xl bg-card p-4 text-sm"><span className="label-mono text-[10px] text-primary-strong">Step {i + 1}</span><p className="mt-1">{s}</p></li>)}
            </ol>
            <p className="mt-3 text-xs text-muted-foreground">{BN_IHNA.note}</p>
          </div>
          <div className="flex flex-wrap gap-2 md:flex-col">
            {BN_IHNA.links.map(([l, h]) => <a key={l} href={h} {...ext} className="inline-flex items-center justify-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-ink-foreground hover:bg-primary-strong">{l}<ArrowUpRight aria-hidden className="size-4" /></a>)}
          </div>
        </div>
      </Section>

      {/* Intakes */}
      <Section anchorId="intakes" tone="muted">
        <Eyebrow>Intake planner</Eyebrow>
        <h2 className="display text-display-md">Pick your campus. <em className="text-primary-strong">Plan your first day.</em></h2>
        <p className="mt-4 mb-8 max-w-3xl text-muted-foreground">Course commencement dates by campus, from IHM planning timetables. These are first days of the course, not orientation dates or continuing semesters.</p>
        <IntakePlanner />
      </Section>

      {/* 02 The course */}
      <Section anchorId="course">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <Num n="02">The course</Num>
            <h2 className="display text-display-md">Competence you can <em className="text-primary-strong">feel in your hands.</em></h2>
            <p className="mt-5 text-lg text-foreground/80">The BN combines anatomy, pathophysiology and pharmacotherapeutics with the communication, ethics and clinical reasoning that make care safe. Blended learning keeps theory flexible; simulation and placement make it real.</p>
            <div className="relative mt-8 aspect-square overflow-hidden rounded-card">
              <Image src="/images/bachelor-of-nursing/hands.webp" alt="A nurse holding an older patient's hand" fill sizes="(min-width: 1024px) 40vw, 92vw" className="object-cover" />
            </div>
          </div>
          <div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {BN_FEATURES.map(([t, b], i) => {
                const Icon = FEATURE_ICONS[i]
                return (
                  <li key={t} className="rounded-card border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_-30px_hsl(5_60%_30%/0.45)]">
                    <span className={`grid size-11 place-items-center rounded-xl ${i % 2 ? 'bg-sand text-secondary-strong' : 'bg-blush text-primary-strong'}`}><Icon aria-hidden className="size-5" /></span>
                    <h3 className="display mt-4 text-xl">{t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b}</p>
                  </li>
                )
              })}
              <li className="rounded-card bg-ink p-6 text-ink-foreground">
                <Building2 aria-hidden className="size-6 text-secondary" />
                <h3 className="display mt-4 text-xl">Campuses</h3>
                <ul className="mt-3 flex flex-wrap gap-2">{['Melbourne', 'Sydney', 'Perth', 'Brisbane'].map((c) => <li key={c} className="inline-flex items-center gap-1 rounded-full bg-ink-foreground/10 px-3 py-1 text-sm"><MapPin aria-hidden className="size-3.5 text-secondary" />{c}</li>)}</ul>
                <p className="mt-3 text-xs text-ink-foreground/70">Course and intake availability can differ by campus. Please confirm your preferred campus and start date with IHM before applying.</p>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* 03 Placements */}
      <section id="placements" data-tone="ink" className="bg-ink-glow scroll-mt-[88px] text-ink-foreground">
        <div className="mx-auto max-w-site px-5 py-16 md:px-8 md:py-24">
          <Eyebrow onDark>03 · Professional experience</Eyebrow>
          <h2 className="display text-display-md">Five placements. 800 hours. <em className="text-secondary">One rising arc.</em></h2>
          <p className="mt-4 max-w-3xl text-ink-foreground/75">Placements are assessed against NMBA Registered Nurse Standards for Practice. They are normally in the state of your campus and may be in rural areas; travel and accommodation are generally at your own cost.</p>
          <ol className="mt-12 grid items-end gap-4 md:grid-cols-5">
            {BN_PLACEMENTS.map(([code, hours, when, t, b]) => {
              const h = parseInt(hours)
              return (
                <li key={code} className="flex flex-col">
                  <div className="bg-brand-gradient flex flex-col justify-end rounded-t-2xl p-4 text-foreground" style={{ minHeight: `${h / 1.6 + 60}px` }}>
                    <p className="label-mono text-[10px]">{code}</p>
                    <p className="display text-3xl">{hours}</p>
                  </div>
                  <div className="flex-1 rounded-b-2xl bg-ink-foreground/5 p-4 ring-1 ring-ink-foreground/10">
                    <p className="label-mono text-[10px] text-secondary">{when}</p>
                    <h3 className="mt-1 font-semibold">{t}</h3>
                    <p className="mt-1 text-sm text-ink-foreground/70">{b}</p>
                  </div>
                </li>
              )
            })}
          </ol>
          <div className="mt-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="relative aspect-square overflow-hidden rounded-card ring-4 ring-ink-foreground/10">
              <Image src="/images/bachelor-of-nursing/sim.webp" alt="Nursing students with an educator at a simulation bed" fill sizes="(min-width: 1024px) 35vw, 92vw" className="object-cover" />
            </div>
            <div>
              <h3 className="display text-3xl">Before your first placement</h3>
              <p className="mt-2 text-ink-foreground/75">Healthcare facilities require pre-placement compliance. Immunisations can take up to seven months, so start early.</p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {BN_PREPLACEMENT.map((t) => <li key={t} className="flex gap-2 rounded-xl bg-ink-foreground/5 p-3 text-sm"><CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-secondary" />{t}</li>)}
              </ul>
              <p className="mt-6 font-semibold">Mandatory e-learning modules/trainings are to be completed prior to PEP. These include:</p>
              <ul className="mt-3 flex flex-wrap gap-2">{BN_MANDATORY.map((t) => <li key={t} className="rounded-full border border-ink-foreground/20 px-3 py-1 text-xs">{t}</li>)}</ul>
              <p className="mt-6 text-xs text-ink-foreground/65">PEP means Professional Experience Placement – the supervised clinical placements you complete in healthcare settings during the course. Screening, compliance check and mandatory training fees are the student’s responsibility. Requirements can change; IHM will notify students.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 04 Timetable */}
      <Section anchorId="timetable">
        <Num n="04">Your week on campus</Num>
        <h2 className="display text-display-md">Two days in the room. <em className="text-primary-strong">One online.</em></h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">The same indicative weekly pattern is shown for every campus. Please confirm arrangements for your campus and intake with IHM.</p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <span className="inline-flex items-center gap-2"><span className="bg-brand-gradient size-3 rounded" />On campus, face-to-face</span>
          <span className="inline-flex items-center gap-2"><span className="size-3 rounded bg-ink" />Online Active Learning Day</span>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {BN_WEEKS.map(([y, sem, days, onCampus, online]) => (
            <div key={y} className="rounded-card border border-border bg-card p-6">
              <p className="label-mono text-[10px] text-muted-foreground">{sem}</p>
              <h3 className="display mt-1 text-2xl">{y}</h3>
              <ul className="mt-5 grid grid-cols-6 gap-1.5">
                {days.map((d, i) => (
                  <li key={DAYS[i]} className={`flex flex-col items-center rounded-lg py-3 text-xs font-semibold ${d === 'c' ? 'bg-brand-gradient' : d === 'o' ? 'bg-ink text-ink-foreground' : 'bg-muted text-muted-foreground/60'}`}>
                    {DAYS[i]}<span className="sr-only">: {d === 'c' ? 'on campus' : d === 'o' ? 'online' : 'not listed'}</span>
                  </li>
                ))}
              </ul>
              <dl className="mt-4 space-y-1 text-sm">
                <div className="flex justify-between gap-3"><dt className="text-muted-foreground">On campus</dt><dd className="font-semibold">{onCampus}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-muted-foreground">Online day</dt><dd className="font-semibold">{online}</dd></div>
              </dl>
            </div>
          ))}
        </div>
        <p className="mt-5 text-xs text-muted-foreground">Indicative timetable only. Class schedules are subject to change each semester based on campus requirements, staff availability, and the operational and academic requirements of the College.</p>
      </Section>

      {/* 05 Curriculum + outcomes */}
      <Section anchorId="curriculum" tone="muted">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="min-w-0">
            <Num n="05">Curriculum</Num>
            <h2 className="display text-display-md">24 units, <em className="text-primary-strong">in order.</em></h2>
            <Switcher
              className="mt-8"
              tabs={BN_CURRICULUM.map(([y]) => ({ id: y, label: y }))}
              panels={Object.fromEntries(BN_CURRICULUM.map(([y, sems]) => [y, (
                <div key={y} className="grid gap-4 sm:grid-cols-2">
                  {sems.map(([s, units]) => (
                    <div key={s} className="rounded-card border border-border bg-card p-5">
                      <h3 className="display text-xl">{y} · {s}</h3>
                      <ul className="mt-4 space-y-2.5 text-sm">
                        {units.map((u) => {
                          const [code, ...rest] = u.split(' ')
                          const pep = u.endsWith('PEP')
                          return <li key={u} className="flex gap-3"><span className={`label-mono shrink-0 rounded px-1.5 py-0.5 text-[10px] ${pep ? 'bg-primary text-foreground' : 'bg-muted'}`}>{code}</span><span>{rest.join(' ').replace(/ PEP$/, '')}</span></li>
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              )]))}
            />
          </div>
          <div id="outcomes" className="scroll-mt-28 rounded-card bg-ink p-7 text-ink-foreground">
            <p className="label-mono text-[10px] text-secondary">Bachelor of Nursing</p>
            <h2 className="display mt-2 text-3xl">Course Learning Outcomes</h2>
            <p className="mt-3 text-sm text-ink-foreground/75">Course learning outcomes are specific to each course, in this instance the Bachelor of Nursing. On successful completion of the BN course, graduates are expected to be able to:</p>
            <ol className="mt-5 space-y-3 text-sm">{BN_OUTCOMES.map((o, i) => <li key={o} className="flex gap-3"><span className="bg-brand-gradient grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-bold text-foreground">{i + 1}</span>{o}</li>)}</ol>
          </div>
        </div>
      </Section>

      {/* 06 Admissions + 07 Fees, per audience */}
      <Section anchorId="admissions">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Num n="06">Admissions</Num>
          </div>
          <AudienceSwitch />
        </div>
        {(['domestic', 'international'] as const).map((aud) => {
          const a = BN_ADMISSIONS[aud]
          return (
            <AudienceOnly key={aud} audience={aud}>
              <h2 className="display text-display-md">{a.heading}</h2>
              <p className="mt-4 max-w-3xl text-muted-foreground">{a.intro}</p>
              <ul className="mt-8 grid gap-4 md:grid-cols-3">
                {a.cards.map(([t, big, b]) => (
                  <li key={t} className="rounded-card border border-border bg-card p-6">
                    <h3 className="text-sm font-semibold text-muted-foreground">{t}</h3>
                    <p className="display mt-1 text-3xl text-primary-strong">{big}</p>
                    <p className="mt-3 text-sm leading-relaxed">{b}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
                <a href={BN_NMBA_ENGLISH} {...ext} className="text-primary-strong hover:underline">NMBA English standard</a>
                {aud === 'international' && <a href={BN_ENGLISH_POLICY} className="text-primary-strong hover:underline">IHM English policy</a>}
              </div>
              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <div className="rounded-card bg-sand/70 p-6">
                  <h3 className="display text-2xl">From application to orientation</h3>
                  <ol className="mt-4 space-y-3">{a.steps.map((s, i) => <li key={s} className="flex gap-3 text-sm"><span className="bg-brand-gradient grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold">{i + 1}</span>{s}</li>)}</ol>
                  <div className="mt-5 flex flex-wrap gap-2"><a href={BN_APPLY} {...ext} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold hover:bg-secondary">Apply now</a><a href="#intakes" className="rounded-full border border-foreground/25 bg-card px-4 py-2 text-sm font-semibold hover:border-primary">Current intake dates</a></div>
                </div>
                <div className="rounded-card border border-border bg-card p-6">
                  <h3 className="display text-2xl">Inherent Requirements</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{BN_INHERENT_TEXT}</p>
                  <a href={BN_INHERENT} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-strong hover:underline"><Download aria-hidden className="size-4" />Inherent Requirements</a>
                </div>
              </div>

              <div id={aud === 'domestic' ? 'fees' : undefined} className="mt-16 scroll-mt-28">
                <Num n="07">Bachelor of Nursing tuition · {aud}</Num>
                <div className="grid gap-5 lg:grid-cols-3">
                  <div className="bg-brand-gradient flex flex-col rounded-card p-7">
                    <p className="display text-5xl">{BN_FEES[aud].amount}</p>
                    <p className="mt-1 font-semibold">per semester</p>
                    {BN_FEES[aud].admin && <p className="mt-3 text-sm">{BN_FEES[aud].admin}</p>}
                    <p className="mt-4 text-xs">Tuition fees are subject to annual review and may change in accordance with the College’s fees policy. The College reserves the right to revise tuition fees annually.</p>
                    {/* Scholarship offer (owner, Nov 2026): a light card inside the fee card, so it reads clearly on the gradient. */}
                    <span aria-hidden className="min-h-6 flex-1" />
                    <aside aria-label="Scholarship offer" className="rounded-2xl bg-card/95 p-5 text-foreground shadow-[0_18px_40px_-24px_rgb(38_27_24/0.6)] ring-1 ring-ink/10">
                      <p className="label-mono flex items-center gap-2 text-[11px] tracking-[0.14em] text-primary-strong"><GraduationCap aria-hidden className="size-4" />Scholarship offer</p>
                      <p className="mt-2 leading-snug">
                        <span className="display block text-4xl text-primary-strong">Up to 20%</span>
                        <span className="mt-1 block font-semibold">scholarship on <span className="whitespace-nowrap">first-semester</span> fees</span>
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/80">To any eligible candidate joining the <strong>November 2026 intake</strong>.</p>
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <a href={BN_APPLY} {...ext} className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-ink-foreground transition-colors hover:bg-primary-strong">Apply now<ArrowUpRight aria-hidden className="size-4" /></a>
                        <p className="text-xs text-muted-foreground">Terms and conditions apply.</p>
                      </div>
                    </aside>
                  </div>
                  <div className="rounded-card border border-border bg-card p-7">
                    <h3 className="display text-xl">Costs beyond tuition</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Budget for these separately. Amounts vary and are not listed here.</p>
                    <ul className="mt-4 space-y-1.5 text-sm">{BN_FEES[aud].costs.map((c) => <li key={c} className="flex gap-2"><span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />{c}</li>)}</ul>
                  </div>
                  <div className="space-y-5">
                    {BN_FEES[aud].feeHelp && (
                      <div className="rounded-card border border-border bg-card p-7">
                        <h3 className="display text-xl">FEE-HELP</h3>
                        <p className="mt-2 text-sm text-muted-foreground">FEE-HELP is an Australian Government loan for eligible fee-paying students. Not every domestic student is eligible; eligibility for this course must be confirmed with IHM.</p>
                        <Link href="/fee-help/" className="mt-3 inline-flex text-sm font-semibold text-primary-strong hover:underline">About FEE-HELP at IHM</Link>
                      </div>
                    )}
                    <div className="rounded-card bg-ink p-7 text-ink-foreground">
                      <h3 className="display text-xl">Fee and refund policies</h3>
                      <ul className="mt-3 space-y-2 text-sm">{BN_FEES[aud].policies.map(([l, h]) => <li key={l}><a href={h} className="inline-flex items-center gap-2 hover:text-secondary"><Download aria-hidden className="size-4" />{l}</a></li>)}</ul>
                    </div>
                  </div>
                </div>
              </div>
            </AudienceOnly>
          )
        })}
      </Section>

      {/* 08 After graduation */}
      <Section anchorId="registration" tone="muted">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-square overflow-hidden rounded-card">
            <Image src="/images/bachelor-of-nursing/community.webp" alt="A community nurse reviewing a digital health record with a patient" fill sizes="(min-width: 1024px) 45vw, 92vw" className="object-cover" />
          </div>
          <div>
            <Num n="08">After graduation</Num>
            <h2 className="display text-display-md">Registration is a step <em className="text-primary-strong">you take.</em></h2>
            <p className="mt-5 text-lg text-foreground/80">Successful BN graduates may apply to the Nursing and Midwifery Board of Australia for registration as a Registered Nurse. You must meet all NMBA registration standards; registration is never automatic. Registration overseas is assessed separately by local regulators.</p>
            <ul className="mt-6 flex flex-wrap gap-2">{['Hospitals', 'Clinics', 'Community health', 'Mental health', 'Aged care'].map((s) => <li key={s} className="rounded-full bg-card px-4 py-2 text-sm font-semibold ring-1 ring-border">{s}</li>)}</ul>
            <p className="mt-4 text-sm text-muted-foreground">Settings where Registered Nurses work. Employment outcomes are not guaranteed. <a href="https://www.nursingmidwiferyboard.gov.au/Registration-Standards.aspx" {...ext} className="font-semibold text-primary-strong hover:underline">NMBA registration standards</a></p>
          </div>
        </div>
      </Section>

      {/* 09 FAQ */}
      <Section anchorId="faq">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <Num n="09">Questions</Num>
            <h2 className="display text-display-md">Straight <em className="text-primary-strong">answers.</em></h2>
          </div>
          <Faq items={BN_FAQS} />
        </div>
      </Section>

      <EnquiryForm formKey="quick-enquiry" heading="Come learn with *IHM Australia*" variant="card" anchorId="quickContact" tone="muted" />

      <section data-tone="sunrise" className="bg-sunrise-glow">
        <div className="mx-auto flex max-w-site flex-wrap items-center justify-between gap-6 px-5 py-12 md:px-8">
          <h2 className="display text-[clamp(1.8rem,3.6vw,2.8rem)]">Come learn with IHM Australia</h2>
          <div className="flex flex-wrap gap-3">
            <a href={BN_APPLY} {...ext} className={`${btn} bg-ink text-ink-foreground hover:bg-ink/90`}>Apply for the BN<ArrowRight aria-hidden className="size-4" /></a>
            <a href="tel:1800763757" className={`${btn} bg-card/90`}><Phone aria-hidden className="size-4" />1800 763 757</a>
          </div>
        </div>
      </section>
    </>
  )
}
