// /micro-credentials/ — WordPress template-mc-overview.php (synced 2026-10-30). Copy and data: src/content/micro-credentials.ts.
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BookOpenCheck, Building2, CalendarClock, Compass, HeartHandshake, Laptop, ShieldCheck } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { HeroRays } from '@/blocks/hero/Component'
import { JsonLd } from '@/components/seo/JsonLd'
import { Catalogue } from '@/components/micro-credentials/Catalogue.client'
import { Breadcrumb, btnLine, btnPrimary, Enquire, Eyebrow, Faq, faqJsonLd, McCard, McClosing } from '@/components/micro-credentials/parts'
import { MC_AREAS, MC_COURSES, MC_FAQS, MC_LINKS, MC_STEPS, MC_TODAY, MC_WHY, mcPath } from '@/content/micro-credentials'
import { siteOrigin } from '@/lib/seo/metadata'

export const metadata: Metadata = pageMetadata({
  title: 'Micro-credentials',
  path: '/micro-credentials/',
  metaTitle: 'Nursing Micro-credentials Online | 12 Specialty Units | IHM',
  description:
    'Proposed IHM nursing micro-credentials: study one specialty unit from the Graduate Certificate in Advanced Nursing online in a seven-week block, alongside your roster. Twelve specialties, from critical care to palliative care.',
})

const WHY_ICONS = [CalendarClock, HeartHandshake, BookOpenCheck, Compass]
const STATS = [['12', 'nursing specialties proposed'], ['1', 'unit per micro-credential'], ['Online', 'parent course delivery']] as const
const COLLAGE = ['critical-care-nursing', 'paediatric-nursing', 'gerontology-nursing', 'neonatal-nursing']

export default function MicroCredentialsRoute() {
  const origin = siteOrigin()
  const cards = Object.fromEntries(MC_COURSES.map((c) => [c.slug, <McCard key={c.slug} course={c} />]))
  return (
    <>
      <JsonLd data={faqJsonLd(MC_FAQS)} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'IHM nursing micro-credentials',
        itemListElement: MC_COURSES.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Course',
            name: c.title,
            description: `${c.tagline} ${c.forWho}`,
            courseCode: c.unitCode,
            url: `${origin}${mcPath(c.slug)}`,
            provider: { '@type': 'CollegeOrUniversity', name: 'Institute of Health and Management', url: origin },
          },
        })),
      }} />

      {/* Hero */}
      <section data-tone="sunrise" className="bg-brand-wash relative isolate overflow-hidden">
        <HeroRays id="mc-rays" className="-top-32 -right-32 -z-10 w-[30rem] opacity-[0.12] lg:right-[38%]" />
        <div className="mx-auto grid max-w-site items-center gap-12 px-5 pt-12 pb-16 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pt-16 lg:pb-24">
          <div>
            <Breadcrumb items={[{ label: 'Courses', href: '/courses/' }, { label: 'Micro-Credentials' }]} />
            <h1 className="display text-[clamp(2.5rem,5.6vw,4.6rem)] leading-[1.02] text-balance">
              Deepen your practice. <em className="text-primary-strong">One specialty at a time.</em>
            </h1>
            <span aria-hidden className="bg-brand-gradient mt-7 block h-1 w-20 rounded-full" />
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-foreground/80">
              Proposed IHM micro-credentials let working nurses study a single specialty unit from the Graduate Certificate in Advanced Nursing, online, alongside the
              roster you already have. Compassionate, evidence-based practice, without committing to a whole award on day one.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#catalogue" className={btnPrimary}>Find your specialty<ArrowRight aria-hidden className="size-4" /></a>
              <Link href={MC_LINKS.requirements} className={btnLine}>Requirements and how to apply</Link>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-3">
              {STATS.map(([v, l]) => (
                <div key={l} className="flex flex-col rounded-2xl border border-border bg-card/80 p-4 backdrop-blur">
                  <dt className="order-last mt-1 text-xs leading-snug text-muted-foreground">{l}</dt>
                  <dd className="display text-3xl text-primary-strong">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <ul aria-hidden className="grid grid-cols-2 gap-4">
              {COLLAGE.map((slug, i) => {
                const c = MC_COURSES.find((x) => x.slug === slug)!
                return (
                  <li key={slug} className={`relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-[0_24px_48px_-28px_hsl(348_35%_13%/0.55)] ring-4 ring-card ${i % 2 ? 'translate-y-10' : ''}`}>
                    <Image src={c.image} alt="" fill sizes="(min-width: 1024px) 22vw, 45vw" priority={i < 2} className="object-cover" />
                  </li>
                )
              })}
            </ul>
            <p className="display absolute -bottom-6 left-1/2 w-[85%] -translate-x-1/2 rounded-2xl bg-ink px-6 py-4 text-center text-lg leading-snug text-ink-foreground shadow-xl sm:text-xl">
              After handover, before the next shift: <em className="text-secondary">time that is yours to grow.</em>
            </p>
          </div>
        </div>
      </section>

      {/* Ribbon of the twelve titles */}
      <div aria-hidden className="overflow-hidden border-y border-border bg-card py-4">
        <div className="motion-marquee flex w-max animate-[marquee_45s_linear_infinite] gap-10 hover:[animation-play-state:paused]">
          {[...MC_COURSES, ...MC_COURSES].map((c, i) => (
            <span key={`${c.slug}-${i}`} className="display flex items-center gap-10 text-xl whitespace-nowrap text-foreground/70">
              {c.title}<span className="bg-brand-gradient size-2 rounded-full" />
            </span>
          ))}
        </div>
      </div>

      {/* Why */}
      <Section anchorId="why">
        <div className="mb-12 grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <Eyebrow>Why micro-credentials</Eyebrow>
            <h2 className="display text-display-md">Designed for nurses who are <em className="text-primary-strong">already doing the work.</em></h2>
          </div>
          <p className="max-w-md text-muted-foreground md:justify-self-end">
            You know which patients you want to care for better. Micro-credentials let you go deep in that specialty first, then decide what comes next.
          </p>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {MC_WHY.map(([t, b], i) => {
            const Icon = WHY_ICONS[i]
            return (
              <li key={t} className="group/w relative overflow-hidden rounded-card border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_-30px_hsl(5_60%_30%/0.45)]">
                <div className="flex items-start justify-between">
                  <span className={`grid size-12 place-items-center rounded-2xl ${i % 2 ? 'bg-sand text-secondary-strong' : 'bg-blush text-primary-strong'}`}><Icon aria-hidden className="size-6" /></span>
                  <span className="label-mono text-[11px] text-muted-foreground">0{i + 1}</span>
                </div>
                <h3 className="display mt-6 text-xl leading-snug">{t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{b}</p>
                <span aria-hidden className="bg-brand-gradient absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover/w:scale-x-100" />
              </li>
            )
          })}
        </ul>
      </Section>

      {/* How it works */}
      <section data-tone="ink" className="bg-ink-glow relative isolate overflow-hidden text-ink-foreground">
        <HeroRays id="mc-rays-dark" className="-top-24 -right-24 -z-10 w-[26rem] opacity-[0.12]" />
        <div className="mx-auto max-w-site px-5 py-16 md:px-8 md:py-24">
          <Eyebrow onDark>How it works</Eyebrow>
          <h2 className="display max-w-2xl text-display-md">Four steps from curiosity to <em className="text-secondary">capability.</em></h2>
          <ol className="relative mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {MC_STEPS.map(([t, b], i) => (
              <li key={t} className="relative">
                {/* Connector from this step's circle to the next one (≥lg, one row): it starts 8px after the circle and stops 8px before the next. */}
                {i < MC_STEPS.length - 1 && <span aria-hidden className="bg-brand-gradient absolute top-6 right-[-1rem] left-14 hidden h-0.5 -translate-y-1/2 rounded-full opacity-60 lg:block" />}
                <span className="bg-brand-gradient relative grid size-12 place-items-center rounded-full text-lg font-bold text-foreground shadow-lg">{i + 1}</span>
                <h3 className="display mt-5 text-2xl">{t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-foreground/75">{b}</p>
              </li>
            ))}
          </ol>
          <p className="mt-12 max-w-3xl rounded-2xl border border-ink-foreground/15 bg-ink-foreground/5 p-5 text-sm leading-relaxed text-ink-foreground/80">
            Proposed pathway: specialty micro-credential, then the Graduate Certificate in Advanced Nursing, then further postgraduate study such as a Master of Nursing.
            Progression depends on meeting each course’s admission requirements. No automatic stacking into other certificates is implied.
          </p>
        </div>
      </section>

      {/* Catalogue */}
      <Section anchorId="catalogue" tone="muted">
        <div className="mb-10 text-center">
          <Eyebrow className="justify-center">The catalogue</Eyebrow>
          <h2 className="display text-display-md">Twelve specialties. <em className="text-primary-strong">Find yours.</em></h2>
          <p className="mt-4 text-muted-foreground">Search by specialty, unit code, clinical setting or topic.</p>
        </div>
        <Catalogue
          courses={MC_COURSES}
          areas={MC_AREAS}
          cards={cards}
          empty={
            <div className="rounded-card border border-dashed border-border bg-card p-10 text-center">
              <h3 className="display text-2xl">No specialty matches that search</h3>
              <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                Try a broader word like “care” or a clinical setting. If the area you are looking for is not listed, IHM would like to hear about it.
              </p>
              <div className="mt-6 flex justify-center"><Enquire label="Suggest a specialty" /></div>
            </div>
          }
        />
      </Section>

      {/* Facts + employers */}
      <Section anchorId="facts">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-card border border-border bg-card p-8 md:p-10">
            <span className="grid size-12 place-items-center rounded-2xl bg-blush text-primary-strong"><ShieldCheck aria-hidden className="size-6" /></span>
            <h2 className="display mt-6 text-3xl">What we can tell you today</h2>
            <p className="mt-3 text-muted-foreground">Nurses deserve straight answers. Here is what is drawn from official IHM sources.</p>
            <ul className="mt-6 space-y-3">
              {MC_TODAY.map((t) => (
                <li key={t} className="flex gap-3 text-[15px]"><span aria-hidden className="bg-brand-gradient mt-2 size-2 shrink-0 rounded-full" />{t}</li>
              ))}
            </ul>
          </div>
          <div className="bg-ink-glow flex flex-col rounded-card p-8 text-ink-foreground md:p-10">
            <Eyebrow onDark>For health services</Eyebrow>
            <h2 className="display text-3xl leading-tight">Grow specialist capability on your own wards.</h2>
            <p className="mt-3 text-ink-foreground/80">
              The proposal includes an Industry Hub Partnership model: nominate staff, request cohorts timetabled around rosters, and build a pathway that supports retention and succession.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {['Staff nomination', 'Roster-aware cohorts', 'Progress reporting', 'Pathway to the award'].map((a) => (
                <li key={a} className="inline-flex items-center gap-2 rounded-full bg-ink-foreground/10 px-3.5 py-1.5 text-sm"><Building2 aria-hidden className="size-4 text-secondary" />{a}</li>
              ))}
            </ul>
            <Link href={MC_LINKS.partners} className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:bg-secondary">
              The employer proposition<ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-5 rounded-card border border-border bg-sand/60 p-8 sm:flex-row sm:items-center md:p-10">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-card text-primary-strong shadow-sm"><Laptop aria-hidden className="size-7" /></span>
          <div>
            <h2 className="display text-2xl">Recognised learning for your CPD record</h2>
            <p className="mt-2 text-[15px] text-foreground/80">
              Completing a micro-credential provides formal tertiary study that may be recorded toward the Nursing and Midwifery Board of Australia’s annual CPD requirement,
              where relevant to your context of practice.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Micro-credentials do not lead to registration, endorsement or a specialist title.</p>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section anchorId="faq" tone="muted">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <Eyebrow className="justify-center">Questions nurses ask</Eyebrow>
            <h2 className="display text-display-md">Frequently asked</h2>
          </div>
          <Faq items={MC_FAQS} />
        </div>
      </Section>

      <McClosing heading={<>Your patients will feel the difference. <em className="underline decoration-ink/30 decoration-4 underline-offset-8">So will you.</em></>} body="Talk to IHM about the specialty you care about most. Availability will be confirmed directly by the IHM team." />
    </>
  )
}
