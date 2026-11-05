// /enquirenow/scholarship/ — NCAP Gateway to Global Nursing Scholarship (landing row in src/content/landing.ts, form `scholarship`,
// thank-you /enquirenow/scholarship/thanks.php). Apply Online goes to the monday.com application form; the enquiry form posts to
// /api/enquire/. Copy in src/content/scholarship.ts; layout in src/components/landing/ScholarshipParts.tsx.
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, BadgeCheck, BookOpen, Clock, Globe2, GraduationCap, Handshake, Languages, Stethoscope, Wallet } from 'lucide-react'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { landingMetadata } from '@/components/templates/landing/pages'
import { FORM_END_ANCHOR } from '@/components/templates/landing/shared'
import { LandingLayout, landingDoc } from '@/components/landing/ScholarshipParts'
import { SCHOLARSHIP as S, SCHOLARSHIP_APPLY_URL } from '@/content/scholarship'

const PATH = '/enquirenow/scholarship/'
export const metadata: Metadata = landingMetadata(PATH)

const PATH_ICONS = [BookOpen, GraduationCap, Stethoscope]

export default async function ScholarshipRoute() {
  const doc = await landingDoc(PATH)
  return (
    <LandingLayout doc={doc} eyebrow="Scholarship" formHeading="Enquire now"
      title={<>NCAP Gateway to <em className="text-secondary not-italic">Global Nursing</em> Scholarship Program</>}
      intro={<p>Save {S.scholarshipValue} on the GCN, GDN or Master of Nursing pathway and prepare for nursing registration around the world.</p>}
      image={{ src: '/images/scholarship/banner.webp', alt: 'Graduates throwing their caps in the air' }}
      actions={<>
        <a href={SCHOLARSHIP_APPLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-foreground hover:bg-secondary">Apply Online<ArrowUpRight aria-hidden className="size-4" /></a>
        <a href="#pathways" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink-foreground/40 px-6 font-semibold backdrop-blur hover:border-secondary hover:text-secondary">See the pathways</a>
      </>}>

      <section className="grid grid-cols-1 gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
        <div className="relative mx-auto aspect-[363/460] w-full max-w-xs overflow-hidden rounded-[2rem]">
          <Image src="/images/scholarship/about.webp" alt="IHM nursing student smiling in class" fill sizes="(min-width: 768px) 30vw, 80vw" className="object-cover" />
        </div>
        <div>
          <Eyebrow>Introduction</Eyebrow>
          <div className="space-y-4 text-[17px] leading-relaxed text-muted-foreground">{S.intro.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}</div>
          <p className="mt-4 text-sm italic text-muted-foreground">{S.disclaimer}</p>
        </div>
      </section>

      <section>
        <Eyebrow>About the scholarship</Eyebrow>
        <h2 className="display text-display-md">Nursing is global. Your career can be too.</h2>
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {S.stats.map((s) => <li key={s.label} className="rounded-card bg-ink p-6 text-ink-foreground"><p className="display text-4xl text-secondary">{s.value}</p><p className="mt-2 text-sm text-ink-foreground/75">{s.label}</p></li>)}
        </ul>
        <div className="mt-8 space-y-4 text-[17px] leading-relaxed text-muted-foreground">{S.about.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}</div>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <Globe2 aria-hidden className="size-5 text-primary-strong" />
          {S.countries.map((c) => <span key={c} className="rounded-full bg-blush px-3 py-1 text-sm font-semibold">{c}</span>)}
          {S.alsoCountries.map((c) => <span key={c} className="rounded-full border border-border px-3 py-1 text-sm">{c}</span>)}
        </div>
      </section>

      <section id="pathways" className="scroll-mt-24">
        <Eyebrow>Scholarship pathways</Eyebrow>
        <h2 className="display text-display-md">Choose your pathway</h2>
        <ol className="mt-8 space-y-6">
          {S.pathways.map((p, i) => {
            const Icon = PATH_ICONS[i]
            return (
              <li key={p.n} className="overflow-hidden rounded-card border border-border bg-card">
                <div className="flex flex-col gap-4 border-b border-border bg-blush/60 p-6 sm:flex-row sm:items-center">
                  <span className="bg-brand-gradient grid size-14 shrink-0 place-items-center rounded-2xl text-foreground"><Icon aria-hidden className="size-7" /></span>
                  <div><p className="label-mono text-primary-strong">Pathway {p.n}</p><h3 className="display text-2xl leading-tight">{p.title}</h3></div>
                </div>
                <div className="space-y-4 p-6">
                  {p.lead && <p className="font-semibold">{p.lead}</p>}
                  {p.body.map((b) => <p key={b.slice(0, 20)} className="text-[15px] leading-relaxed text-muted-foreground">{b}</p>)}
                  {p.note && <p className="text-sm italic text-muted-foreground">{p.note}</p>}
                  <dl className="grid gap-3 sm:grid-cols-2">
                    <div className="flex gap-3 rounded-2xl bg-ink p-4 text-ink-foreground"><Wallet aria-hidden className="mt-0.5 size-5 shrink-0 text-secondary" /><div><dt className="label-mono text-ink-foreground/60">Fee</dt><dd className="mt-1 font-semibold">{p.fee}</dd></div></div>
                    {p.duration && <div className="flex gap-3 rounded-2xl border border-border p-4"><Clock aria-hidden className="mt-0.5 size-5 shrink-0 text-primary-strong" /><div><dt className="label-mono text-muted-foreground">Duration</dt><dd className="mt-1 font-semibold">{p.duration}</dd></div></div>}
                  </dl>
                  {p.extras.length > 0 && (
                    <div>
                      <p className="mt-2 font-semibold">As a part of the scholarship pathway, we also offer:</p>
                      <ul className="mt-3 grid gap-3 sm:grid-cols-2">{p.extras.map((x, k) => <li key={x.t} className="flex gap-3 rounded-2xl border border-border p-4">{k === 0 ? <Stethoscope aria-hidden className="size-5 shrink-0 text-primary-strong" /> : <Languages aria-hidden className="size-5 shrink-0 text-primary-strong" />}<span><span className="block font-semibold">{x.t}</span><span className="text-sm text-muted-foreground">{x.b}</span></span></li>)}</ul>
                    </div>
                  )}
                </div>
              </li>
            )
          })}
        </ol>
      </section>

      <section id="eligibility" className="scroll-mt-24 rounded-card bg-ink p-7 text-ink-foreground md:p-10">
        <Eyebrow onDark>Eligibility</Eyebrow>
        <h2 className="display text-3xl">{S.eligibilityIntro}</h2>
        <ul className="mt-6 space-y-3">
          {S.eligibility.map((e) => <li key={e} className="flex gap-3"><BadgeCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-secondary" />{e}</li>)}
        </ul>
        <ul className="mt-3 ml-8 space-y-2 border-l border-ink-foreground/20 pl-5 text-ink-foreground/80">{S.essay.map((e) => <li key={e}>{e}</li>)}</ul>
        <p className="mt-3 flex gap-3"><BadgeCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-secondary" />{S.eligibilityLast}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={SCHOLARSHIP_APPLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-foreground hover:bg-secondary">Apply Online Now<ArrowUpRight aria-hidden className="size-4" /></a>
          <a href={`#${FORM_END_ANCHOR}`} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink-foreground/30 px-6 font-semibold hover:border-secondary hover:text-secondary">Ask a question</a>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 rounded-card border border-border bg-card p-7 md:grid-cols-[auto_1fr] md:p-10">
        <Handshake aria-hidden className="size-10 text-primary-strong" />
        <div>
          <Eyebrow>For institutions</Eyebrow>
          <h2 className="display text-3xl">{S.partnership.title}</h2>
          <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-muted-foreground">{S.partnership.body.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}</div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/enquirenow/scholarship/expression-of-interest/" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 font-semibold text-ink-foreground hover:bg-primary hover:text-foreground">Submit an expression of interest<ArrowRight aria-hidden className="size-4" /></Link>
            <Link href="/contact/" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-5 font-semibold hover:border-primary">Contact Us</Link>
          </div>
        </div>
      </section>
    </LandingLayout>
  )
}
