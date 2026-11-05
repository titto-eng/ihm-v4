// GCAN Australian Nursing Practice (RN Bridging Program) — bespoke course page (WordPress template-gcan-anp.php on course 6355,
// inc/gcan-anp/gcan-page.html, synced 2026-10-30). This static route takes precedence over courses/[slug]. Data: src/content/gcan-anp.ts.
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowRight, ArrowUpRight, Check, CheckCircle2, Info, Mail, MapPin, Phone, X } from 'lucide-react'
import { pageMetadata, IframeEmbed } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { HeroRays } from '@/blocks/hero/Component'
import { JsonLd } from '@/components/seo/JsonLd'
import { Eyebrow, Faq, faqJsonLd } from '@/components/micro-credentials/parts'
import { PathwayQuiz } from '@/components/gcan-anp/PathwayQuiz.client'
import * as G from '@/content/gcan-anp'
import { siteOrigin } from '@/lib/seo/metadata'

export const metadata: Metadata = pageMetadata({
  title: 'Graduate Certificate in Advanced Nursing – Australian Nursing Practice (Registered Nurse Bridging Program)',
  path: G.GA_PATH,
  metaTitle: 'Australian Nursing Practice | RN Bridging Program for Overseas Nurses | IHM',
  description:
    'Graduate Certificate in Advanced Nursing (Australian Nursing Practice) online from AUD $8,000, with optional OSCE training in Melbourne, a Master of Nursing pathway, a micro-credential package, two-week simulation, placements and clinical observation.',
})

const btn = 'inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-2.5 text-[15px] font-semibold transition-all duration-300 hover:-translate-y-0.5'
const primary = `${btn} bg-primary text-foreground shadow-[0_12px_28px_-14px_hsl(5_85%_55%/0.9)] hover:bg-secondary`
const line = `${btn} border border-foreground/25 bg-card hover:border-primary hover:text-primary-strong`
const onDisk = (p: string) => (existsSync(join(process.cwd(), 'public', p)) ? p : undefined)

const Ticks = ({ items, icon = 'check', className }: { items: readonly string[]; icon?: 'check' | 'x' | 'dot'; className?: string }) => (
  <ul className={`space-y-2 text-[15px] ${className ?? ''}`}>
    {items.map((t) => (
      <li key={t} className="flex gap-2.5">
        {icon === 'check' ? <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-primary-strong" /> : icon === 'x' ? <X aria-hidden className="mt-0.5 size-4 shrink-0 text-primary-strong" /> : <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />}
        <span>{t}</span>
      </li>
    ))}
  </ul>
)
const Card = ({ title, children, tone = 'card', className }: { title?: ReactNode; children: ReactNode; tone?: 'card' | 'ink' | 'sand' | 'blush'; className?: string }) => (
  <div className={`rounded-card p-6 md:p-7 ${tone === 'ink' ? 'bg-ink text-ink-foreground' : tone === 'sand' ? 'bg-sand/70' : tone === 'blush' ? 'bg-blush/60' : 'border border-border bg-card'} ${className ?? ''}`}>
    {title && <h3 className="display mb-4 text-2xl">{title}</h3>}
    {children}
  </div>
)
const Dl = ({ rows, onDark = false }: { rows: readonly (readonly [string, string])[]; onDark?: boolean }) => (
  <dl className="grid gap-3 text-sm">
    {rows.map(([k, v]) => (
      <div key={k} className={`grid gap-1 border-t pt-3 sm:grid-cols-[130px_1fr] sm:gap-4 ${onDark ? 'border-ink-foreground/15' : 'border-border'}`}>
        <dt className={`label-mono text-[10px] ${onDark ? 'text-secondary' : 'text-muted-foreground'}`}>{k}</dt><dd>{v}</dd>
      </div>
    ))}
  </dl>
)
function PartHead({ id, n, title, intro, image, dark = false }: { id: string; n: number; title: ReactNode; intro: string; image: string; dark?: boolean }) {
  return (
    <section id={id} data-tone={dark ? 'ink' : 'sunrise'} className={`scroll-mt-[88px] ${dark ? 'bg-ink-glow text-ink-foreground' : 'bg-brand-wash'}`}>
      <div className="mx-auto grid max-w-site items-center gap-8 px-5 py-12 md:grid-cols-[1.3fr_0.7fr] md:px-8 md:py-16">
        <div>
          <p className={`label-mono text-[11px] tracking-[0.16em] ${dark ? 'text-secondary' : 'text-primary-strong'}`}>Part {n}</p>
          <h2 className="display mt-3 text-display-md">{title}</h2>
          <p className={`mt-4 max-w-2xl text-lg ${dark ? 'text-ink-foreground/80' : 'text-foreground/80'}`}>{intro}</p>
        </div>
        <div className="relative hidden aspect-[4/3] overflow-hidden rounded-card ring-4 ring-card/20 md:block">
          <Image src={image} alt="" fill sizes="30vw" className="object-cover" />
        </div>
      </div>
    </section>
  )
}

export default function GcanAnpCourseRoute() {
  const origin = siteOrigin()
  return (
    <>
      <JsonLd data={faqJsonLd(G.GA_FAQS)} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: 'Graduate Certificate in Advanced Nursing (Australian Nursing Practice)',
        alternateName: 'Registered Nurse Bridging Program',
        courseCode: 'CRICOS 107773K',
        description: 'AQF Level 8 Graduate Certificate (N9001, N8001, N8002) studied online, with optional two-week OSCE training in Melbourne.',
        url: `${origin}${G.GA_PATH}`,
        provider: { '@type': 'CollegeOrUniversity', name: 'Institute of Health and Management', url: origin },
        offers: [
          { '@type': 'Offer', category: 'Programme', price: 8000, priceCurrency: 'AUD' },
          { '@type': 'Offer', category: 'Programme + two-week OSCE training', price: 10000, priceCurrency: 'AUD' },
          { '@type': 'Offer', category: 'Micro-Credential Package', price: 5000, priceCurrency: 'AUD' },
        ],
        hasCourseInstance: G.GA_INTAKES.map((r) => ({ '@type': 'CourseInstance', courseMode: 'online', startDate: r[4] })),
      }} />

      {/* Hero */}
      <section data-tone="ink" className="bg-ink-glow relative isolate overflow-hidden text-ink-foreground">
        <HeroRays id="ga-rays" className="-right-28 -bottom-28 -z-10 w-[30rem] opacity-[0.14]" />
        <div className="mx-auto grid max-w-site items-center gap-12 px-5 pt-12 pb-16 md:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:pt-16">
          <div>
            <Eyebrow onDark>IHM · Australian Nursing Practice</Eyebrow>
            <h1 className="display text-[clamp(2.4rem,5.4vw,4.4rem)] leading-[1.03] text-balance">Study Australian Nursing Practice, <em className="text-secondary">your way.</em></h1>
            <p className="mt-2 text-lg font-semibold text-ink-foreground/85">(Registered Nurse Bridging Program)</p>
            <p className="mt-5 max-w-2xl text-lg text-ink-foreground/80">
              Six clear options: the Graduate Certificate in Advanced Nursing (Australian Nursing Practice) studied online, a pathway on to IHM&apos;s two-year Master of Nursing
              on campus, the Australian Nursing Practice Micro-Credential Package, two weeks of simulation in Melbourne, professional experience placements for registered
              nurses, and one week of clinical observation for visiting nurses and students. Taught by Australian registered nurses, with Caring with Passion.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#pathways" className={primary}>Choose your pathway<ArrowRight aria-hidden className="size-4" /></a>
              <a href="#glance" className={`${btn} border border-ink-foreground/50 hover:border-secondary hover:text-secondary`}>Compare the options</a>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2">{G.GA_BADGES.map((b) => <li key={b} className="rounded-full border border-ink-foreground/20 px-3 py-1 text-xs">{b}</li>)}</ul>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-[2rem] ring-4 ring-ink-foreground/10">
            <Image src="/images/bachelor-of-nursing/sim.webp" alt="Nurses with an educator at a simulation bed" fill priority sizes="(min-width: 1024px) 38vw, 92vw" className="object-cover" />
          </div>
        </div>
      </section>

      <nav aria-label="On this page" className="border-b border-border bg-card">
        <ul className="mx-auto flex max-w-site gap-1 overflow-x-auto px-5 py-2 [scrollbar-width:none] md:px-8">
          {G.GA_MENU.map(([id, label]) => <li key={id}><a href={`#${id}`} className="block rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap text-muted-foreground hover:bg-muted hover:text-foreground">{label}</a></li>)}
          <li><a href="#enquire" className="block rounded-full bg-primary px-4 py-2 text-sm font-semibold whitespace-nowrap">Enquire</a></li>
        </ul>
      </nav>

      {/* At a glance */}
      <Section anchorId="glance">
        <Eyebrow>Your options at a glance</Eyebrow>
        <h2 className="display text-display-md">Six options for your <em className="text-primary-strong">Australian nursing journey</em></h2>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {G.GA_OPTIONS.map(([id, part, t, b, cta], i) => (
            <li key={id}>
              <a href={`#${id}`} className="group/o relative flex h-full flex-col overflow-hidden rounded-card border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_-30px_hsl(5_60%_30%/0.45)]">
                <span aria-hidden className="display absolute -top-3 right-3 text-8xl text-primary/10">{i + 1}</span>
                <span className="label-mono text-[10px] text-primary-strong">{part}</span>
                <span className="display mt-2 text-2xl">{t}</span>
                <span className="mt-2 text-sm text-muted-foreground">{b}</span>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-primary-strong">{cta}<ArrowRight aria-hidden className="size-4 transition-transform group-hover/o:translate-x-1" /></span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-xs text-muted-foreground">Fees, 2027 dates, new delivery arrangements, placements and observation places are subject to approval and host agreements.</p>
      </Section>

      {/* PART 1 */}
      <PartHead id="part1" n={1} title={<>Australian Nursing Practice <em className="text-primary-strong">Graduate Certificate</em></>} intro="Choose your pathway, then find everything about the Graduate Certificate in one place: course overview, structure, delivery, intake dates and fees." image="/images/nursing-pathway/study.webp" />

      <Section anchorId="pathways">
        <Eyebrow>One course, three pathways</Eyebrow>
        <h2 className="display text-display-md">Choose Your Australian <em className="text-primary-strong">Nursing Pathway</em></h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">Where are you in your nursing journey? Every student studies the same accredited course — N9001, N8001 and N8002 — and earns the same qualification. Your pathway shapes the advice and support we give you; your study option shapes where and how you learn.</p>
        <ul className="mt-10 grid gap-5 lg:grid-cols-3">
          {G.GA_PATHWAYS.map((p, i) => (
            <li key={p.id} className={`flex flex-col rounded-card p-7 ${i === 1 ? 'bg-ink text-ink-foreground' : 'border border-border bg-card'}`}>
              <p className={`label-mono text-[10px] ${i === 1 ? 'text-secondary' : 'text-primary-strong'}`}>{p.tag}</p>
              <h3 className="display mt-2 text-2xl">{p.title}</h3>
              <p className={`mt-2 text-sm ${i === 1 ? 'text-ink-foreground/75' : 'text-muted-foreground'}`}><strong>Best for:</strong> {p.best}</p>
              <ul className="mt-4 space-y-2 text-sm">{p.points.map((t) => <li key={t} className="flex gap-2"><Check aria-hidden className={`mt-0.5 size-4 shrink-0 ${i === 1 ? 'text-secondary' : 'text-primary-strong'}`} />{t}</li>)}</ul>
              <p className={`mt-4 rounded-xl p-3 text-xs ${i === 1 ? 'bg-ink-foreground/10' : 'bg-muted'}`}><strong>Study option:</strong> {p.option}</p>
              <div className="mt-auto flex gap-2 pt-5"><a href="#compare" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-foreground">Explore this pathway</a><a href="#enquire" className={`rounded-full border px-4 py-2 text-sm font-semibold ${i === 1 ? 'border-ink-foreground/40' : 'border-foreground/25'}`}>Enquire</a></div>
            </li>
          ))}
        </ul>
        <div className="mt-8"><PathwayQuiz /></div>
        <div id="compare" className="mt-8 scroll-mt-28 overflow-x-auto rounded-card border border-border bg-card">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-muted"><tr><th scope="col" className="px-4 py-3"><span className="sr-only">Compare</span></th>{['Explore', 'Prepare', 'Advance'].map((h) => <th key={h} scope="col" className="display px-4 py-3 text-lg">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-border">
              {G.GA_COMPARE.map(([k, ...v]) => <tr key={k}><th scope="row" className="label-mono px-4 py-3 align-top text-[10px] text-muted-foreground">{k}</th>{v.map((c, i) => <td key={i} className="px-4 py-3 align-top">{c}</td>)}</tr>)}
              <tr><th scope="row" className="label-mono px-4 py-3 text-[10px] text-muted-foreground">Fee</th><td colSpan={3} className="px-4 py-3 font-semibold">AUD $8,000 for the programme, or AUD $10,000 total with the optional two-week OSCE training (subject to approval)</td></tr>
            </tbody>
          </table>
          <p className="border-t border-border px-4 py-3 text-xs text-muted-foreground">*Only N9001 is intended to receive credit towards the Master of Nursing, subject to IHM admission requirements and Credit Policy.</p>
        </div>
      </Section>

      <Section anchorId="structure" tone="muted">
        <div className="grid gap-5 md:grid-cols-2">
          <Card title="Approved course"><p>Graduate Certificate in Advanced Nursing (Australian Nursing Practice), AQF Level 8, 32 credit points</p><p className="mt-2 text-sm text-muted-foreground">Units: N9001 Professional Issues and Policies in Nursing (12 cp), N8001 Australian Nursing Practice (12 cp), N8002 Professional Reflection in Australian Nursing Practice (8 cp)</p></Card>
          <Card title="Delivery plan" tone="sand"><Ticks items={['Six 2027 start dates, with N8001 offered at every intake', 'Hybrid Global Edition: online units, with optional two-week OSCE training in Melbourne', 'Fees: AUD $8,000 for the programme, or AUD $10,000 with OSCE training']} /></Card>
        </div>
        <h2 className="display mt-14 text-display-md">Three units, <em className="text-primary-strong">one unit at a time</em></h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {G.GA_UNITS.map(([k, code, b]) => <li key={code} className="rounded-card border border-border bg-card p-6"><p className="label-mono text-[10px] text-muted-foreground">{k}</p><p className="display mt-1 text-4xl text-primary-strong">{code}</p><p className="mt-2 text-sm">{b}</p></li>)}
        </ol>
        <p className="mt-6 flex flex-wrap items-center gap-2 text-sm font-semibold">
          {['N9001', 'N8001 (N9001 completed or in progress)', 'N8002 (optional two-week OSCE training)', 'Graduate Certificate'].map((s, i, a) => <span key={s} className="inline-flex items-center gap-2"><span className={`rounded-full px-3 py-1 ${i === a.length - 1 ? 'bg-ink text-ink-foreground' : 'bg-card ring-1 ring-border'}`}>{s}</span>{i < a.length - 1 && <ArrowRight aria-hidden className="size-4 text-muted-foreground" />}</span>)}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">Hybrid Global Edition: one unit per seven-week block, 32 credit points at AQF Level 8. N9001 is the unit intended to receive credit towards the Master of Nursing.</p>
      </Section>

      <Section anchorId="intakes">
        <Eyebrow>Timetable and intake dates*</Eyebrow>
        <h2 className="display text-display-md">Six start dates <em className="text-primary-strong">in 2027</em></h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">N9001, N8001 and N8002 are each offered at every 2027 intake in the Australian Nursing Practice stream, so you move from one unit to the next without a gap. The monthly Melbourne simulation training belongs to the micro-credential package; see <a href="#mc-calendar" className="font-semibold text-primary-strong hover:underline">Part 3</a>.</p>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {G.GA_INTAKES.map(([d, m, by]) => <li key={m} className="overflow-hidden rounded-2xl border border-border bg-card text-center"><p className="bg-primary py-1 text-[10px] font-semibold tracking-widest uppercase">Monday</p><p className="display pt-2 text-4xl">{d}</p><p className="font-semibold">{m}</p><p className="pb-3 text-xs text-muted-foreground">{by}</p></li>)}
        </ul>
        <div className="mt-8 overflow-x-auto rounded-card border border-border bg-card">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-muted"><tr>{['Start', 'N9001 online', 'N8001 online', 'Optional OSCE training, Melbourne', 'N8002 online', 'Results'].map((h) => <th key={h} scope="col" className="px-4 py-3 font-semibold">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-border">{G.GA_INTAKES.map((r) => <tr key={r[4]}><th scope="row" className="px-4 py-3 font-semibold">{r[4]}<span className="block text-xs font-normal text-muted-foreground">{r[3]}</span></th>{r.slice(5).map((c, i) => <td key={i} className={`px-4 py-3 ${i === 2 ? 'text-primary-strong' : ''}`}>{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">*Hybrid Global Edition plan shown. Dates subject to approval; 2028 dates are indicative. &quot;Apply by&quot; is the enrolment and fee deadline. An intake may be rescheduled if approvals or minimum enrolments are not met; you would be offered the next intake or a refund under IHM&apos;s fees policy.</p>
      </Section>

      <Section anchorId="gcan-fees" tone="muted">
        <Eyebrow>Graduate Certificate fees</Eyebrow>
        <h2 className="display text-display-md">Choose the programme only, <em className="text-primary-strong">or add OSCE training</em></h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Card><p className="label-mono text-[10px] text-muted-foreground">Programme only</p><p className="display mt-2 text-5xl">AUD $8,000</p><p className="mt-2 font-semibold">Graduate Certificate programme</p><p className="mt-1 text-sm text-muted-foreground">All three units online: N9001, N8001 and N8002. No time in Melbourne required.</p></Card>
          <div className="bg-brand-gradient rounded-card p-7"><p className="label-mono text-[10px]">Programme + optional training</p><p className="display mt-2 text-5xl">AUD $10,000</p><p className="mt-2 font-semibold">Graduate Certificate programme + two weeks of on-campus OSCE training, total</p><p className="mt-1 text-sm">The same three units, plus ten days of OSCE simulation training at North Melbourne, timed at the start of your N8002 block.</p></div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">The two-week OSCE training is optional. Fees are subject to IHM&apos;s formal fee approval. They do not include NMBA or Ahpra examination fees, travel, accommodation, visa or insurance costs. The micro-credential package (Part 3) has its own separate fee.</p>
        <h2 className="display mt-14 text-3xl">Can I apply for the Graduate Certificate?</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Card title="Entry requirements"><Ticks items={G.GA_ENTRY} /><Link href="/english-language-proficiency-entry-requirements/" className="mt-4 inline-flex text-sm font-semibold text-primary-strong hover:underline">English Language Proficiency or English Waiver requirements</Link></Card>
          <Card title="Visas" tone="ink"><Ticks items={G.GA_VISAS} icon="dot" /></Card>
        </div>
      </Section>

      {/* PART 2 */}
      <PartHead id="part2" n={2} dark title={<>Hybrid Global Edition: Australian Nursing Practice + <em className="text-secondary">Master of Nursing on Campus</em></>} intro="A progression option: the Graduate Certificate online, then IHM's two-year Master of Nursing on campus in Melbourne." image="/images/nursing-pathway/lead.webp" />
      <Section anchorId="part2-detail">
        <Eyebrow>Progression option · Two qualifications</Eyebrow>
        <h2 className="display text-display-md">Two qualifications, <em className="text-primary-strong">one pathway</em></h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">Unlike the standalone Graduate Certificate in Part 1, this is a two-qualification progression. The intended pathway for international nurses: start the Graduate Certificate from home, gain the qualification, pursue Australian registration, then come to Melbourne for IHM&apos;s two-year Master of Nursing on campus.</p>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {[['Step 1 · Study online', 'GCAN Australian Nursing Practice, Hybrid Global Edition', 'Complete N9001, N8001 and N8002 online, one unit at a time, with optional two-week OSCE training at North Melbourne.'], ['Step 2 · Qualify, then register', 'Graduate Certificate, then Ahpra registration', 'Completing the course earns the Graduate Certificate in Advanced Nursing. Registration is a separate step: you apply to the NMBA through Ahpra under the pathway that applies to you. The course does not confer registration.'], ['Step 3 · Study in Melbourne', 'Master of Nursing on campus', 'Progress to Australia for the two-year, on-campus Master of Nursing at IHM, subject to admission and visa requirements.']].map(([k, t, b], i) => (
            <li key={k} className="relative rounded-card border border-border bg-card p-6"><span className="bg-brand-gradient grid size-10 place-items-center rounded-full font-bold">{i + 1}</span><p className="label-mono mt-4 text-[10px] text-muted-foreground">{k}</p><h3 className="display mt-1 text-xl">{t}</h3><p className="mt-2 text-sm text-muted-foreground">{b}</p></li>
          ))}
        </ol>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <Card title={<>Hybrid Global Edition <span className="label-mono block text-[10px] text-muted-foreground">Step 1 · Online, with optional Melbourne training · Qualification 1</span></>}><Dl rows={G.GA_STEP1} /><a href="#enquire" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-strong">Enquire about the Hybrid Global Edition<ArrowRight aria-hidden className="size-4" /></a></Card>
          <Card tone="ink" title={<>Master of Nursing <span className="label-mono block text-[10px] text-secondary">Step 3 · On campus in Melbourne · Qualification 2</span></>}><Dl rows={G.GA_STEP3} onDark /><a href="#enquire" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary">Enquire about the Master of Nursing pathway<ArrowRight aria-hidden className="size-4" /></a></Card>
        </div>
        <p className="mt-5 flex gap-2 text-sm text-muted-foreground"><Info aria-hidden className="mt-0.5 size-4 shrink-0 text-primary-strong" />Progression is not automatic. Admission to the Master of Nursing, a student visa and NMBA registration are each separate decisions made by IHM, the Department of Home Affairs and the NMBA respectively. Neither qualification guarantees registration, employment or a migration outcome.</p>
      </Section>

      {/* PART 3 */}
      <PartHead id="part3" n={3} title={<>Micro-Credential <em className="text-primary-strong">Package</em></>} intro="A separate professional development offer: N8001 online plus two weeks of simulation in Melbourne, for individuals, student-visa holders and hospital partners." image="/images/micro-credentials/critical-care-nursing.webp" />
      <Section anchorId="part3-detail">
        <Eyebrow>Flagship international professional development</Eyebrow>
        <h2 className="display text-display-md">Australian Nursing Practice <em className="text-primary-strong">Micro-Credential Package</em></h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">Experience Australian Nursing Practice in Melbourne. Study the postgraduate unit N8001 Australian Nursing Practice online from home, then join two weeks of intensive simulation and practical training with experienced Australian registered nurse educators at our North Melbourne campus. <strong>Not yet open for enrolment.</strong> You can enquire now and we will contact you when approvals are confirmed.</p>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {[['Step 1 · Online', 'Study N8001 online', 'Australian standards, person-centred care and safe practice, studied online in a seven-week block. Six N8001 start dates in 2027.'], ['Step 2 · Get ready', 'Readiness and travel', 'Complete N8001 assessments and pre-arrival modules, then arrange the right visa, travel and insurance with our guidance.'], ['Step 3 · Melbourne', 'Two weeks in Melbourne, every month', 'Ten days of simulation in North Melbourne: handover, the deteriorating patient, medication safety and a specialty focus of your choice.']].map(([k, t, b], i) => (
            <li key={k} className="rounded-card border border-border bg-card p-6"><span className="bg-brand-gradient grid size-10 place-items-center rounded-full font-bold">{i + 1}</span><p className="label-mono mt-4 text-[10px] text-muted-foreground">{k}</p><h3 className="display mt-1 text-xl">{t}</h3><p className="mt-2 text-sm text-muted-foreground">{b}</p></li>
          ))}
        </ol>
        <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <Card title="What you experience"><ul className="space-y-3 text-[15px]">{G.GA_MC_EXPERIENCE.map(([k, v]) => <li key={k} className="flex gap-2.5"><CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-primary-strong" /><span><strong>{k}:</strong> {v}</span></li>)}</ul></Card>
          <Card title="Explore a specialty" tone="sand"><ul className="flex flex-wrap gap-2">{G.GA_SPECIALTIES.map((s) => <li key={s} className="rounded-full bg-card px-3 py-1.5 text-sm">{s}</li>)}</ul><p className="mt-4 text-xs text-muted-foreground">Specialty days run within the two weeks when minimum group numbers are met. Hospitals and institutions can request a customised specialty focus.</p></Card>
        </div>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{G.GA_MC_AUDIENCES.map(([t, b]) => <li key={t} className="rounded-card bg-blush/60 p-5"><p className="font-semibold">{t}</p><p className="mt-1 text-sm text-muted-foreground">{b}</p></li>)}</ul>

        <div className="mt-10 rounded-card bg-ink p-7 text-ink-foreground md:p-10">
          <p className="label-mono text-[10px] text-secondary">Hospitals and healthcare employers · Partnership</p>
          <h3 className="display mt-2 text-3xl">Partner with IHM to Support Internationally Recruited Nurses</h3>
          <p className="mt-3 max-w-3xl text-ink-foreground/80">For Australian hospitals, health services, aged-care providers and other industry organisations recruiting nurses from Ireland, the United Kingdom, New Zealand and other countries. IHM can help your nurses understand Australian professional expectations and prepare for safe practice in the Australian healthcare system.</p>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div><h4 className="font-semibold text-secondary">Registration pathways differ</h4><Ticks items={G.GA_REG_PATHWAYS} icon="dot" className="mt-3 text-sm" /><p className="mt-3 text-xs text-ink-foreground/70">What the NMBA requires: internationally qualified nurses registered through the NMBA assessment process complete the NMBA&apos;s online Orientation Part 2 within six months of registration. The NMBA expects employers to provide local orientation through an induction program. Requirements vary by pathway, so confirm each nurse&apos;s obligations with Ahpra.</p></div>
            <div><h4 className="font-semibold text-secondary">What a partnership could include</h4><Ticks items={G.GA_PARTNER_INCLUDES} className="mt-3 text-sm" /></div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 text-sm">
            <p className="rounded-xl bg-ink-foreground/5 p-4"><strong>Nurses already registered in Australia:</strong> Orientation and simulation-based transition training: Australian practice, communication, escalation, medication safety and documentation in a safe simulated setting. This is not exam preparation.</p>
            <p className="rounded-xl bg-ink-foreground/5 p-4"><strong>Nurses still pursuing registration (Stream B):</strong> OSCE preparation is a separate option for nurses who must sit the NMBA OSCE. It does not guarantee an OSCE result or registration.</p>
            <p className="rounded-xl bg-ink-foreground/5 p-4"><strong>IHM provides:</strong> Australian practice context, structured learning and simulation before or alongside employment.</p>
            <p className="rounded-xl bg-ink-foreground/5 p-4"><strong>Your organisation continues to provide:</strong> Workplace induction, local policies and systems, competency assessment, scope of practice, preceptorship and ongoing support.</p>
          </div>
          <a href="#enquire" className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-foreground">Hospital and industry partnership enquiry<ArrowRight aria-hidden className="size-4" /></a>
          <p className="mt-3 text-xs text-ink-foreground/65">IHM&apos;s training complements, and does not replace, your own induction or any NMBA requirement. The package is not endorsed by the NMBA or Ahpra.</p>
        </div>

        <div id="mc-fee" className="mt-10 grid scroll-mt-28 gap-5 lg:grid-cols-3">
          <div className="bg-brand-gradient rounded-card p-7"><p className="label-mono text-[10px]">Package fee</p><p className="display mt-2 text-5xl">AUD $5,000</p><p className="mt-2 text-sm">Standard package fee, covering N8001 Australian Nursing Practice online and two weeks of simulation training at North Melbourne. Subject to IHM&apos;s formal fee approval. Travel, accommodation, visa and insurance costs are not included.</p></div>
          <Card title="Group discounts"><p className="text-sm">Group discounts are available for industry partners, hospitals, nursing colleges, educational institutions, and recruitment consultants arranging group enrolments.</p><p className="mt-2 text-xs text-muted-foreground">Group discounts are negotiated case by case, based on group size and the partnership agreement. They are not fixed or advertised rates.</p><a href="#enquire" className="mt-4 inline-flex text-sm font-semibold text-primary-strong hover:underline">Enquire About Group Discounts</a></Card>
          <Card title="Key details"><Dl rows={G.GA_MC_KEY} /></Card>
        </div>
        <Card title="Travel and visas" tone="sand" className="mt-5"><Ticks items={G.GA_MC_VISA} icon="dot" /></Card>

        <div id="mc-calendar" className="mt-10 scroll-mt-28">
          <h3 className="display text-3xl">2027 calendar: online intakes and monthly Melbourne training</h3>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">These are two separate calendars. N8001 is the online academic unit, with six intakes a year. The Melbourne simulation training runs every month and can be taken on its own, or after you finish N8001 as the full package.</p>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {G.GA_MONTHLY.map(([m, d, intake, note]) => <li key={m} className={`rounded-2xl p-4 ${intake ? 'bg-ink text-ink-foreground' : 'border border-border bg-card'}`}><p className="display text-2xl">{m}</p><p className="text-sm font-semibold">{d}</p>{intake && <p className="label-mono mt-1 text-[9px] text-secondary">N8001 intake month</p>}{note && <p className={`mt-1 text-[11px] ${intake ? 'text-ink-foreground/70' : 'text-muted-foreground'}`}>{note}</p>}</li>)}
          </ul>
          <div className="mt-6 overflow-x-auto rounded-card border border-border bg-card">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-muted"><tr>{['N8001 online start', 'N8001 block ends', 'Earliest Melbourne training for the full package'].map((h) => <th key={h} scope="col" className="px-4 py-3">{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-border">{G.GA_PACKAGE_DATES.map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i} className="px-4 py-3">{c}</td>)}</tr>)}</tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Dates subject to approval and minimum numbers. You may also choose any later monthly run. Each run is ten training days; where a Victorian public holiday falls in a run, a make-up day is scheduled.</p>
        </div>

        <div id="mc-students" className="mt-10 scroll-mt-28 rounded-card border border-border bg-card p-7">
          <h3 className="display text-3xl">Studying in Australia on a student visa? You may be able to join</h3>
          <p className="mt-2 text-muted-foreground">International students already enrolled in nursing, public health, healthcare or other postgraduate courses in Australia can enquire now. Whether you can take part depends on your own visa conditions and on the final approved structure of the package, so we check each enquiry individually.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-muted p-5"><h4 className="font-semibold">Melbourne simulation training only</h4><Ticks items={['Two weeks, no academic credit', 'A short course taken alongside your main course, ideally in your semester break']} icon="dot" className="mt-2 text-sm" /></div>
            <div className="rounded-xl bg-muted p-5"><h4 className="font-semibold">Full package with N8001 as CPD</h4><Ticks items={['Undertake N8001 Australian Nursing Practice as a CPD programme without any summative assessment.', 'Followed by the two weeks of Melbourne simulation training', 'Certificate of completion; no academic transcript or credit']} icon="dot" className="mt-2 text-sm" /></div>
          </div>
          <p className="mt-4 text-sm">Keep your main course on track: under visa condition 8202 you must stay enrolled in your main course and keep satisfactory attendance and progress. Choose a Melbourne run that fits your timetable. Check your visa conditions in VEVO (Visa Entitlement Verification Online) before you enquire.</p>
          <p className="mt-2 text-xs text-muted-foreground">About the 12-week or three-month rule: Home Affairs does not set a general extra-study allowance for student-visa holders. The three-month study limit applies to visitor visas. Your eligibility comes from your student visa conditions and the course rules above.</p>
          <div className="mt-5 flex flex-wrap gap-3"><a href="#enquire" className={primary}>Explore Australian Nursing Practice in Melbourne</a><a href="#enquire" className={line}>Hospital and group enquiries</a></div>
        </div>
        <p className="mt-5 text-xs text-muted-foreground">The package does not lead to NMBA registration and does not guarantee an OSCE result, employment or a visa outcome. N8001 is a unit of the accredited Graduate Certificate in Advanced Nursing (Australian Nursing Practice); online standalone delivery, the Melbourne training and fees are subject to Academic Board and regulatory approval. CPD hours and academic credit will be stated only once formally approved.</p>
      </Section>

      {/* PART 4 */}
      <PartHead id="part4" n={4} dark title={<>Two Weeks in <em className="text-secondary">Melbourne</em></>} intro="A standalone two-week offer: OSCE preparation and Australian nursing simulation at North Melbourne, every month. Only AUD $2,000." image="/images/bachelor-of-nursing/hero.webp" />
      <Section anchorId="part4-detail">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow>Standalone offer · North Melbourne</Eyebrow>
            <h2 className="display text-display-md">OSCE Preparation and <em className="text-primary-strong">Nursing Simulation</em></h2>
            <p className="mt-4 text-muted-foreground">Ten training days in IHM&apos;s North Melbourne simulation laboratory with experienced Australian registered nurse educators. Choose exam-focused OSCE preparation, or broader Australian nursing simulation if you are not preparing for the OSCE.</p>
            <div className="mt-6 flex flex-wrap gap-3"><a href="#enquire" className={primary}>Enquire as an individual</a><a href="#enquire" className={line}>University or institutional group</a></div>
          </div>
          <div className="bg-brand-gradient rounded-card p-7"><p className="label-mono text-[10px]">Only</p><p className="display text-6xl">AUD $2,000</p><Dl rows={[['Where', 'IHM North Melbourne campus'], ['Length', 'Two weeks, ten training days'], ['Starts', 'First Monday of every month, 2027'], ['Groups', 'Small cohorts; university and institutional groups by arrangement']]} /></div>
        </div>
        <h3 className="display mt-12 text-3xl">2027 commencement dates</h3>
        <p className="mt-1 text-sm text-muted-foreground">Every run starts on the first Monday of the month.</p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{G.GA_TWO_WEEKS.map(([m, d, note]) => <li key={m} className={`rounded-2xl border p-4 ${note ? 'border-secondary/50 bg-sand/60' : 'border-border bg-card'}`}><p className="font-semibold">{m}</p><p className="text-sm">{d}</p>{note && <p className="mt-1 text-xs text-muted-foreground">{note}</p>}</li>)}</ul>
        <p className="mt-3 text-xs text-muted-foreground">Three runs include a Victorian public holiday: Labour Day (8 Mar), King&apos;s Birthday (14 Jun) and Melbourne Cup Day (2 Nov). No training is held on the holiday, and the run extends to the following Monday so every cohort receives the full ten days. The AFL Grand Final eve holiday is not yet set for 2027 and usually falls after the September run. Dates are subject to minimum numbers.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Card title="OSCE preparation focus"><p className="-mt-2 mb-3 text-sm text-muted-foreground">For nurses in the NMBA assessment process who will sit the OSCE</p><Ticks items={G.GA_OSCE_FOCUS} /></Card>
          <Card title="Australian nursing simulation experience" tone="sand"><p className="-mt-2 mb-3 text-sm text-muted-foreground">For nurses and nursing students who are not preparing for the OSCE</p><Ticks items={G.GA_SIM_FOCUS} /></Card>
        </div>
        <h3 className="display mt-12 text-3xl">Who could benefit? Four groups, two kinds of learning</h3>
        <ol className="mt-6 grid gap-4 md:grid-cols-2">{G.GA_FOUR_GROUPS.map(([t, kind, b, note], i) => <li key={t} className="flex gap-4 rounded-card border border-border bg-card p-6"><span className="bg-brand-gradient grid size-10 shrink-0 place-items-center rounded-full font-bold">{i + 1}</span><div><p className="label-mono text-[10px] text-primary-strong">{kind}</p><h4 className="display mt-1 text-xl">{t}</h4><p className="mt-2 text-sm">{b}</p><p className="mt-2 text-xs text-muted-foreground">{note}</p></div></li>)}</ol>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Card title="Eligibility and travel"><Ticks items={G.GA_TW_ELIGIBILITY} icon="dot" className="text-sm" /></Card>
          <Card title="What this experience is, and is not" tone="ink"><Ticks items={G.GA_TW_ISNOT} icon="dot" className="text-sm" /></Card>
        </div>
        <p id="combo46" className="mt-6 scroll-mt-28 text-sm text-muted-foreground">Add a week of clinical observation for a three-week program at AUD $3,000; see <a href="#part6" className="font-semibold text-primary-strong">Part 6</a>. Graduate Certificate students can add these two weeks through the AUD $10,000 option in <a href="#gcan-fees" className="font-semibold text-primary-strong">Part 1</a>. The 2027 schedule and the broader audiences above are subject to IHM approval.</p>
      </Section>

      {/* PART 5 */}
      <PartHead id="part5" n={5} title={<>Professional Experience <em className="text-primary-strong">Placement</em></>} intro="For internationally qualified nurses who already hold Australian registration: four weeks of supervised experience in an Australian healthcare setting to support your transition into practice." image="/images/nursing-pathway/hero.webp" />
      <Section anchorId="part5-detail">
        <Eyebrow>For registered nurses · Expressions of interest open</Eyebrow>
        <h2 className="display max-w-4xl text-display-md">Australian registration is a milestone. <em className="text-primary-strong">Australian experience helps you take the next step.</em></h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">Many internationally qualified nurses gain registration with Ahpra but find that employers ask about local experience. This placement is designed to help you become familiar with how care is delivered in an Australian workplace, with support from IHM along the way.</p>
        <div className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-brand-gradient rounded-card p-7"><h3 className="display text-2xl">Four weeks of Australian clinical experience</h3><p className="label-mono mt-4 text-[10px]">Proposed fee</p><p className="display text-5xl">AUD $3,000</p><p className="mt-3 text-sm">Supervised professional experience with an IHM partner organisation, such as a hospital, an aged care home or a community service, plus IHM orientation, reflective sessions and career-readiness support.</p><div className="mt-4"><Dl rows={[['Length', 'Four weeks'], ['Settings', 'Hospitals, aged care homes and other partners, subject to availability'], ['Eligible for', 'Nurses with current Ahpra registration'], ['Status', 'Proposed; subject to approval and partner capacity']]} /></div></div>
          <div className="space-y-5">
            <Card title="Who could benefit?"><Ticks items={G.GA_PEP_WHO} /><p className="mt-3 text-sm text-muted-foreground">Not yet registered? Start with <a href="#part1" className="font-semibold text-primary-strong">Part 1</a> or <a href="#part4" className="font-semibold text-primary-strong">Part 4</a>. You must hold Australian registration before taking part in this placement.</p></Card>
            <p className="rounded-xl bg-blush/60 p-4 text-sm"><strong>Why it matters:</strong> registration confirms you meet the NMBA&apos;s requirements to practise. Local experience helps you understand Australian systems, documentation, teamwork and expectations, and gives you real examples to discuss when you apply for jobs.</p>
          </div>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          <Card title="What the four weeks could involve"><Dl rows={G.GA_PEP_WEEKS} /></Card>
          <Card title="How it supports your transition" tone="sand"><Ticks items={G.GA_PEP_SUPPORTS} /></Card>
          <Card title="Please note" tone="ink"><Ticks items={G.GA_PEP_NOTE} icon="dot" className="text-sm" /></Card>
        </div>
        <div className="mt-8 overflow-x-auto rounded-card border border-border bg-card">
          <table className="w-full min-w-[720px] text-left text-sm">
            <caption className="display p-4 text-left text-2xl">Simulation, clinical observation or professional experience?</caption>
            <thead className="bg-muted"><tr><th scope="col" className="px-4 py-3"><span className="sr-only">Compare</span></th>{['Simulation training (Parts 1, 3 and 4)', 'Clinical Observation (Part 6)', 'Professional Experience Placement (Part 5)'].map((h) => <th key={h} scope="col" className="px-4 py-3">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-border">{G.GA_SOP.map(([k, ...v]) => <tr key={k}><th scope="row" className="label-mono px-4 py-3 align-top text-[10px] text-muted-foreground">{k}</th>{v.map((c, i) => <td key={i} className="px-4 py-3 align-top">{c}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <div id="eoi5" className="mt-8 scroll-mt-28 rounded-card bg-ink p-7 text-ink-foreground">
          <h3 className="display text-2xl">Register your interest</h3>
          <p className="mt-2 text-ink-foreground/80">Tell us about your registration, experience and preferences. An IHM adviser will contact you to check your eligibility and suitability, discuss the settings and timing that may be available, and explain the requirements, fee and next steps. Registering interest does not reserve or guarantee a placement.</p>
          <div className="mt-5 flex flex-wrap gap-3"><a href="#enquire" className={primary}>Register my interest</a><a href="https://industryhub.ihm.edu.au/industry-partnership/rn-transition-program" target="_blank" rel="noopener noreferrer" className={`${btn} border border-ink-foreground/40 hover:border-secondary`}>Employers: IHM Industry Hub<ArrowUpRight aria-hidden className="size-4" /></a></div>
          <p className="mt-4 text-xs text-ink-foreground/65">Part 5 is a proposed offer. The fee, placement model, host partnerships and start dates are subject to IHM approval and partner agreements.</p>
        </div>
      </Section>

      {/* PART 6 */}
      <PartHead id="part6" n={6} dark title={<>Clinical <em className="text-secondary">Observation</em></>} intro="For visiting overseas nurses, nursing professionals and nursing students: one week observing how nursing is practised in Australian healthcare settings, on its own or combined with Part 4." image="/images/nursing-pathway/community.webp" />
      <Section anchorId="part6-detail">
        <Eyebrow>For visiting nurses, nursing professionals and students · Expressions of interest open</Eyebrow>
        <h2 className="display text-display-md">See how nursing is practised <em className="text-primary-strong">in Australia</em></h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">Spend a week alongside Australian nursing teams in hospitals or aged care homes, observing person-centred care, teamwork and patient safety in action. IHM educators prepare you, debrief with you each day and help you turn what you see into learning you can take home.</p>
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="rounded-card border border-border bg-card p-7"><h3 className="display text-2xl">One week of clinical observation</h3><p className="label-mono mt-4 text-[10px] text-muted-foreground">Proposed fee</p><p className="display text-5xl text-primary-strong">AUD $1,000</p><p className="mt-3 text-sm">An observation-only week with an approved host organisation, with IHM briefing, daily debriefs and a certificate of attendance.</p><div className="mt-4"><Dl rows={[['Length', 'One week (five weekdays)'], ['Settings', 'Hospitals and aged care homes, subject to host approval'], ['Eligible for', 'Visiting nurses, nursing professionals and students'], ['Status', 'Proposed; subject to approval and host agreements']]} /></div></div>
          <div className="bg-brand-gradient rounded-card p-7"><h3 className="display text-2xl">Three weeks in Melbourne: Part 4 + Part 6</h3><ol className="mt-4 space-y-3 text-sm"><li className="rounded-xl bg-card/85 p-4"><strong>Weeks 1–2 · Part 4 · AUD $2,000</strong> On-campus training at North Melbourne. Choose OSCE preparation if you are a nurse in the NMBA assessment process, or the Australian nursing simulation experience if you are a visiting nurse, professional or student</li><li className="rounded-xl bg-card/85 p-4"><strong>Week 3 · Part 6 · AUD $1,000</strong> One week of clinical observation, subject to host availability</li></ol><p className="display mt-4 text-4xl">AUD $3,000 <span className="text-lg">for three weeks</span></p><p className="mt-2 text-sm">Practise in simulation first, then see Australian care in a real setting. Ideal for visiting groups and individuals who want the most from their time in Melbourne.</p></div>
        </div>
        <h3 className="display mt-12 text-3xl">Who could benefit?</h3>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{G.GA_OBS_WHO.map(([t, b, note]) => <li key={t} className="rounded-card border border-border bg-card p-6"><h4 className="display text-xl">{t}</h4><p className="mt-2 text-sm">{b}</p><p className="mt-2 text-xs text-muted-foreground">{note}</p></li>)}</ul>
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          <Card title="What the week could involve"><Dl rows={G.GA_OBS_WEEK} /></Card>
          <Card title="Observation means you watch, not do" tone="ink"><Ticks items={G.GA_OBS_RULES} icon="dot" className="text-sm" /></Card>
          <Card title="What you will need" tone="sand"><Ticks items={G.GA_OBS_NEED} icon="dot" className="text-sm" /></Card>
        </div>
        <Card title="Group programs for Southeast Asia and China" className="mt-5"><p className="text-sm text-muted-foreground">We welcome enquiries from nursing schools, hospitals, associations and approved study-tour partners. A group program can combine two weeks of simulation at North Melbourne with a week of clinical observation, timed to your semester break where host places allow.</p><Ticks items={G.GA_OBS_GROUP} className="mt-4" /></Card>
        <div id="eoi6" className="mt-8 scroll-mt-28 rounded-card bg-ink p-7 text-ink-foreground">
          <h3 className="display text-2xl">Register your interest</h3>
          <p className="mt-2 text-ink-foreground/80">Tell us who you are and what you would like to observe. An IHM adviser will contact you to check your suitability and the requirements that apply to you, discuss possible settings, timing and host availability, and explain the fee, the combined option and next steps. Registering interest does not reserve or guarantee an observation place.</p>
          <a href="#enquire" className={`${primary} mt-5`}>Register interest in the three-week program</a>
          <p className="mt-4 text-xs text-ink-foreground/65">Part 6 is a proposed offer. The fee, host arrangements, settings and dates are subject to IHM approval and host agreements. Clinical observation does not lead to NMBA registration, employment, academic credit or a clinical placement, and access to any healthcare setting is not guaranteed.</p>
        </div>
      </Section>

      {/* Straight answers + FAQ */}
      <Section anchorId="answers" tone="muted">
        <Eyebrow>Straight answers</Eyebrow>
        <h2 className="display text-display-md">What this course does, <em className="text-primary-strong">and does not do</em></h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Card title="It does"><Ticks items={G.GA_DOES} /></Card>
          <Card title="It does not" tone="ink"><Ticks items={G.GA_DOES_NOT} icon="x" /></Card>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">NMBA examination fees (MCQ USD 200 + USD 150 international scheduling fee; OSCE AUD 4,000) are paid to Pearson VUE and Ahpra, not to IHM.</p>
      </Section>
      <Section anchorId="faq">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div><Eyebrow>Questions</Eyebrow><h2 className="display text-display-md">Frequently asked <em className="text-primary-strong">questions</em></h2></div>
          <Faq items={G.GA_FAQS} />
        </div>
      </Section>

      {/* Team + enquire */}
      <Section anchorId="contact" tone="muted">
        <Eyebrow>Course contacts</Eyebrow>
        <h2 className="display text-display-md">Your course <em className="text-primary-strong">team</em></h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:max-w-3xl">
          {G.GA_TEAM.map((t) => {
            const src = onDisk(t.photo)
            return (
              <li key={t.name}>
                <Link href={t.profile} className="group/t flex items-center gap-5 rounded-card border border-border bg-card p-5 transition-colors hover:border-primary">
                  <span className="bg-brand-wash relative grid size-20 shrink-0 place-items-center overflow-hidden rounded-full">
                    {src ? <Image src={src} alt="" fill sizes="80px" className="object-cover" /> : <span className="display text-2xl text-primary-strong">{t.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>}
                  </span>
                  <span><span className="label-mono block text-[10px] text-primary-strong">{t.label}</span><span className="display block text-xl group-hover/t:text-primary-strong">{t.name}</span><span className="block text-sm text-muted-foreground">{t.role}</span></span>
                </Link>
              </li>
            )
          })}
        </ul>
      </Section>
      <section id="enquire" data-tone="ink" className="bg-ink-glow scroll-mt-[88px] text-ink-foreground">
        <div className="mx-auto grid max-w-site gap-10 px-5 py-16 md:px-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow onDark>Talk to us</Eyebrow>
            <h2 className="display text-display-md">Find your pathway with an <em className="text-secondary">IHM adviser</em></h2>
            <p className="mt-4 text-ink-foreground/80">Tell us about your registration, goals and where you want to study. We will recommend a pathway and study option and give you a written study plan before you decide.</p>
            <ul className="mt-6 space-y-2 text-sm">
              <li className="flex gap-2"><Phone aria-hidden className="size-4 text-secondary" />Phone (international): <a href="tel:+61370467777" className="font-semibold hover:text-secondary">+61 3 7046 7777</a></li>
              <li className="flex gap-2"><Phone aria-hidden className="size-4 text-secondary" />Within Australia: <a href="tel:1800763757" className="font-semibold hover:text-secondary">1800 763 757</a></li>
              <li className="flex gap-2"><Mail aria-hidden className="size-4 text-secondary" />Email: <a href="mailto:enquiry@ihm.edu.au" className="font-semibold hover:text-secondary">enquiry@ihm.edu.au</a></li>
            </ul>
            <a href={G.GA_APPLY} target="_blank" rel="noopener noreferrer" className={`${primary} mt-6`}>Apply online<ArrowUpRight aria-hidden className="size-4" /></a>
            <p className="mt-8 flex gap-2 text-xs text-ink-foreground/60"><MapPin aria-hidden className="size-4 shrink-0" />Institute of Health &amp; Management Pty Ltd · Institute of Higher Education · TEQSA PRV14040 · CRICOS 03407G · GCAN (ANP) CRICOS 107773K. Information current as at October 2026. Delivery options, dates and fees are subject to Academic Board and regulatory approval. General information only, not migration advice.</p>
          </div>
          <div id="enq" className="scroll-mt-28 overflow-hidden rounded-card bg-card text-foreground">
            <IframeEmbed url={G.GA_ENQUIRY_FORM} title="Talk to us: IHM enquiry form" height={900} />
          </div>
        </div>
      </section>
    </>
  )
}
