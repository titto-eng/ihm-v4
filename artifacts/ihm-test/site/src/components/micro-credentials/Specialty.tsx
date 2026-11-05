import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, BadgeCheck, BookOpenCheck, Clock, MapPin, Monitor } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { JsonLd } from '@/components/seo/JsonLd'
import { ApplyPortal, Breadcrumb, btnLine, courseIndex, Enquire, Eyebrow, McCard } from './parts'
import { MC_COURSES, MC_DELIVERY, MC_GLANCE, MC_LINKS, mcArea, mcCourse, mcPath } from '@/content/micro-credentials'
import { siteOrigin } from '@/lib/seo/metadata'

// One view for the 12 specialty pages (WordPress template-mc-specialty.php). Each route file is two lines:
// `metadata = specialtyMetadata(slug)` and `<Specialty slug={slug} />`.

export function specialtyMetadata(slug: string): Metadata {
  const c = mcCourse(slug)
  if (!c) return {}
  return pageMetadata({
    title: c.title,
    path: mcPath(slug),
    metaTitle: `${c.title} Micro-credential (${c.unitCode}) Online | IHM`,
    description: `${c.tagline} ${c.forWho} One 12-credit-point unit (${c.unitCode}) from the Graduate Certificate in Advanced Nursing, studied fully online over seven weeks.`,
  })
}

const TOC = [
  ['overview', 'Overview'], ['topics', 'Topics'], ['learning', 'Learning focus'], ['assessment', 'Assessment'],
  ['duration', 'Duration and delivery'], ['eligibility', 'Eligibility'], ['credit', 'Credit and pathway'], ['enrol', 'How to enrol'],
] as const
const DELIVERY_ICONS = [Clock, BookOpenCheck, Monitor]

const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={`${id}-h`} className="display text-[clamp(1.75rem,3vw,2.3rem)] leading-tight">{children}</h2>
)

export function Specialty({ slug }: { slug: string }) {
  const c = mcCourse(slug)
  if (!c) notFound()
  const area = mcArea(c.area)
  const i = courseIndex(slug)
  const prev = MC_COURSES[(i - 1 + MC_COURSES.length) % MC_COURSES.length]
  const next = MC_COURSES[(i + 1) % MC_COURSES.length]
  const related = MC_COURSES.filter((x) => x.area === c.area && x.slug !== slug).slice(0, 3)
  const origin = siteOrigin()
  const glance: [string, string][] = [['Based on unit', `${c.unitCode} ${c.unitName}`], ...MC_GLANCE.map(([k, v]) => [k, v] as [string, string])]
  const eligibility = [
    'Proposed: current registration as a registered nurse.',
    'Proposed: domestic students and eligible non-student visa holders only. Not CRICOS registered and not available on a student visa.',
    'Parent-course qualification and English requirements are shown as reference on the requirements page. Standalone admission rules are subject to confirmation.',
    `Please ask IHM admissions to confirm any clinical access requirements relevant to ${c.title.toLowerCase()}.`,
  ]
  const enrol = [
    'Read the common requirements and check the parent-course reference criteria.',
    'Contact IHM to confirm this micro-credential is open, along with dates, fees and clinical access requirements.',
    'Only once IHM confirms availability, follow their guidance to apply through the official portal.',
  ]

  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: `${c.title} (micro-credential)`,
        description: `${c.tagline} ${c.forWho}`,
        courseCode: c.unitCode,
        url: `${origin}${mcPath(slug)}`,
        educationalCredentialAwarded: 'Proposed non-award micro-credential',
        teaches: c.topics,
        provider: { '@type': 'CollegeOrUniversity', name: 'Institute of Health and Management', url: origin },
        offers: { '@type': 'Offer', price: 3000, priceCurrency: 'AUD', category: 'Unit fee' },
        hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', courseWorkload: 'P7W', startDate: '2027-03-08' },
      }} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Courses', item: `${origin}/courses/` },
          { '@type': 'ListItem', position: 2, name: 'Micro-credentials', item: `${origin}/micro-credentials/` },
          { '@type': 'ListItem', position: 3, name: c.title, item: `${origin}${mcPath(slug)}` },
        ],
      }} />

      {/* Hero */}
      <section data-tone="sunrise" className="bg-brand-wash relative isolate overflow-hidden">
        <div className="mx-auto grid max-w-site gap-10 px-5 pt-10 pb-14 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pt-14 lg:pb-20">
          <div>
            <Breadcrumb items={[{ label: 'Courses', href: '/courses/' }, { label: 'Micro-Credentials', href: '/micro-credentials/' }, { label: c.title }]} />
            <p className="flex flex-wrap items-center gap-2 text-sm">
              <span className="label-mono rounded-full bg-ink px-3 py-1 text-[11px] text-ink-foreground">{c.unitCode}</span>
              {area && <span className="rounded-full bg-card px-3 py-1 font-semibold ring-1 ring-border">{area.label}</span>}
              <span className="rounded-full bg-sand px-3 py-1 font-semibold text-secondary-strong">Proposed offering</span>
            </p>
            <h1 className="display mt-6 text-[clamp(2.4rem,5.4vw,4.4rem)] leading-[1.02] text-balance">{c.title}</h1>
            <p className="display mt-4 text-[clamp(1.3rem,2.4vw,1.8rem)] leading-snug text-primary-strong italic">{c.tagline}</p>
            <p className="mt-5 max-w-xl text-lg text-foreground/80">{c.forWho}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Enquire />
              <Link href={MC_LINKS.requirements} className={btnLine}>Check requirements</Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-2">
              {c.settings.map((s) => (
                <li key={s} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-3 py-1.5 text-sm"><MapPin aria-hidden className="size-3.5 text-primary-strong" />{s}</li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="relative aspect-[671/593] overflow-hidden rounded-[2rem] shadow-[0_32px_64px_-36px_hsl(348_35%_13%/0.6)] ring-4 ring-card">
              <Image src={c.image} alt={`${c.title} in practice`} fill priority sizes="(min-width: 1024px) 40vw, 92vw" className="object-cover" />
              <span aria-hidden className="absolute inset-y-0 left-0 w-1.5" style={{ background: `linear-gradient(${c.accent}, #edab37)` }} />
            </div>
            <span className="label-mono absolute -top-4 -right-2 rounded-full bg-card px-4 py-2 text-xs shadow-lg ring-1 ring-border md:-right-4">{String(i + 1).padStart(2, '0')} / {MC_COURSES.length}</span>
          </div>
        </div>
      </section>

      {/* At a glance */}
      <Section anchorId="glance" spacing="compact">
        <div className="grid gap-6 rounded-card border border-border bg-card p-6 shadow-[0_24px_48px_-36px_hsl(348_35%_13%/0.4)] md:p-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h2 className="display text-2xl">At a glance</h2>
            <dl className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
              {glance.map(([k, v]) => (
                <div key={k} className="border-t-2 border-secondary/60 pt-3">
                  <dt className="label-mono text-[10px] text-muted-foreground">{k}</dt>
                  <dd className="mt-1.5 text-[15px] font-semibold leading-snug">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex flex-col gap-3 lg:min-w-60">
            <Enquire label={`Enquire about ${c.short}`} className="justify-center" />
            <Link href={MC_LINKS.requirements} className={`${btnLine} justify-center`}>Requirements</Link>
          </div>
        </div>
      </Section>

      {/* Body with sticky contents */}
      <Section anchorId="details" spacing="compact">
        <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-28">
              <p className="label-mono mb-4 text-[11px] text-muted-foreground">On this page</p>
              <ol className="space-y-1 border-l border-border">
                {TOC.map(([id, label]) => (
                  <li key={id}><a href={`#${id}`} className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground">{label}</a></li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="min-w-0 space-y-16">
            <section id="overview" aria-labelledby="overview-h" className="scroll-mt-28">
              <H2 id="overview">Overview</H2>
              <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-foreground/85">{c.overview.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}</div>
              <p className="mt-4 text-sm text-muted-foreground">
                Overview adapted from the official IHM <Link href={c.sourcePath} className="font-semibold text-primary-strong underline-offset-4 hover:underline">{c.title} specialisation page</Link>.
              </p>
            </section>

            <section id="topics" aria-labelledby="topics-h" className="scroll-mt-28">
              <H2 id="topics">Topics and themes</H2>
              <p className="mt-4 max-w-3xl text-muted-foreground">
                Themes highlighted in the published specialisation content. The unit runs over a seven-week block: orientation in Week 1, then six class weeks (Weeks 2–7)
                with two lectures and two tutorials each week, Assessment 1 due on Friday of Week 4 and the final assessment due on Friday of Week 7.
              </p>
              <ol className="mt-6 grid gap-3 sm:grid-cols-2">
                {c.topics.map((t, n) => (
                  <li key={t} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
                    <span className="label-mono text-sm text-primary-strong">{String(n + 1).padStart(2, '0')}</span>
                    <span className="font-semibold leading-snug">{t}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section id="learning" aria-labelledby="learning-h" className="scroll-mt-28">
              <H2 id="learning">Learning focus and outcomes</H2>
              <p className="mt-4 flex flex-wrap items-center gap-2 font-semibold">Unit learning outcomes: <TbcPill /></p>
              <p className="mt-2 text-muted-foreground">Verbatim accredited learning outcomes for unit {c.unitCode} will be published once confirmed by IHM.</p>
              {c.learningFocus.length > 0 ? (
                <div className="mt-6 rounded-card bg-muted p-6 md:p-8">
                  <h3 className="display text-xl">Parent specialisation learning focus</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Listed on the official Graduate Certificate {c.title} page at award-specialisation level. Shown for context only; these are not the unit learning outcomes.
                  </p>
                  <ol className="mt-5 space-y-3">
                    {c.learningFocus.map((t, n) => (
                      <li key={t} className="flex gap-4">
                        <span className="bg-brand-gradient grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold text-foreground">{n + 1}</span>
                        <span className="text-[15px] leading-relaxed">{t}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : (
                <p className="mt-4 text-muted-foreground">The official {c.title} page does not currently list specialisation learning objectives.</p>
              )}
            </section>

            <section id="assessment" aria-labelledby="assessment-h" className="scroll-mt-28">
              <H2 id="assessment">Assessment</H2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[['Week 4', 'Assessment 1 due on Friday'], ['Week 7', 'Final assessment due on Friday']].map(([w, t]) => (
                  <div key={w} className="rounded-2xl border border-border bg-card p-5">
                    <p className="label-mono text-[11px] text-primary-strong">{w}</p>
                    <p className="mt-1 font-semibold">{t}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 max-w-3xl text-foreground/85">
                Each seven-week block has two assessment points: Assessment 1 is due on Friday of Week 4 and the final assessment on Friday of Week 7. Under the proposal,
                micro-credential learners would complete the same assessment as students in the award unit.
              </p>
              <p className="mt-3 max-w-3xl text-sm text-muted-foreground">For reference, the official GCAN pages describe assessment that can be completed entirely online, without attending an examination centre.</p>
            </section>

            <section id="duration" aria-labelledby="duration-h" className="scroll-mt-28">
              <H2 id="duration">Duration, volume and delivery</H2>
              <dl className="mt-6 grid gap-4 sm:grid-cols-3">
                {MC_DELIVERY.map(([k, v], n) => {
                  const Icon = DELIVERY_ICONS[n]
                  return (
                    <div key={k} className="flex flex-col rounded-2xl border border-border bg-card p-5">
                      <span className="bg-brand-gradient grid size-9 place-items-center rounded-full text-foreground"><Icon aria-hidden className="size-4" /></span>
                      <dt className="mt-4 text-sm font-bold">{k}</dt>
                      <dd className="mt-1 text-sm text-muted-foreground">{v}</dd>
                    </div>
                  )
                })}
              </dl>
              <p className="mt-5 max-w-3xl text-sm text-muted-foreground">The parent Graduate Certificate is delivered online. Course durations and fees published for the full award do not apply to an individual micro-credential.</p>
            </section>

            <section id="eligibility" aria-labelledby="eligibility-h" className="scroll-mt-28">
              <H2 id="eligibility">Eligibility</H2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {eligibility.map((t) => (
                  <li key={t} className="flex gap-3 border-t-[3px] border-secondary pt-4 text-[15px] leading-relaxed"><BadgeCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-primary-strong" />{t}</li>
                ))}
              </ul>
              <Link href={MC_LINKS.requirements} className={`${btnLine} mt-8`}>Full requirements<ArrowRight aria-hidden className="size-4" /></Link>
            </section>

            <section id="credit" aria-labelledby="credit-h" className="scroll-mt-28">
              <H2 id="credit">Credit and pathway</H2>
              <p className="mt-5 max-w-3xl text-foreground/85">
                This micro-credential is proposed to be the same unit as <strong>{c.unitCode} {c.unitName}</strong> in the Graduate Certificate in Advanced Nursing. In the award,
                this specialty is paired with <strong>{c.reflectionCode} {c.reflectionName}</strong> and the core unit N9001 Professional Issues and Policies in Nursing.
              </p>
              <p className="mt-3 max-w-3xl text-foreground/85">
                Credit into the parent award is expected to be assessed under the IHM Credit and Recognition of Prior Learning Policy. Full credit into the Graduate Certificate
                applies if you enrol in the award within 24 months.
              </p>
              <ol aria-label="Pathway" className="mt-6 flex flex-wrap items-center gap-2">
                {[c.unitCode, c.reflectionCode, 'N9001'].map((u, n) => (
                  <li key={u} className="flex items-center gap-2">
                    <span className={n === 0 ? 'bg-brand-gradient rounded-full px-4 py-2 text-sm font-semibold text-foreground' : 'rounded-full border-[1.5px] border-primary bg-card px-4 py-2 text-sm font-semibold'}>{u}</span>
                    <ArrowRight aria-hidden className="size-4 text-muted-foreground" />
                  </li>
                ))}
                <li><Link href={MC_LINKS.gcan} className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-ink-foreground hover:bg-primary-strong">Graduate Certificate in Advanced Nursing</Link></li>
              </ol>
              <p className="mt-5 max-w-3xl text-sm text-muted-foreground">
                This is not an AQF qualification and does not confer registration, endorsement or a specialist title. Credit toward other awards or institutions, including ASU, is not guaranteed.
              </p>
            </section>

            <section id="enrol" aria-labelledby="enrol-h" className="scroll-mt-28 rounded-card bg-sand/60 p-6 md:p-10">
              <H2 id="enrol">How to enrol</H2>
              <ol className="mt-6 grid gap-4 md:grid-cols-3">
                {enrol.map((t, n) => (
                  <li key={t} className="rounded-2xl border border-border bg-card p-5">
                    <span className="bg-brand-gradient grid size-8 place-items-center rounded-full text-sm font-bold text-foreground">{n + 1}</span>
                    <p className="mt-4 text-[15px] leading-relaxed">{t}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-8 flex flex-wrap gap-3"><Enquire /><ApplyPortal /></div>
              <p className="mt-4 text-xs text-muted-foreground">Micro-credential availability must be confirmed with IHM before you apply.</p>
            </section>
          </div>
        </div>
      </Section>

      {related.length > 0 && area && (
        <Section anchorId="related" tone="muted">
          <Eyebrow>{area.label}</Eyebrow>
          <h2 className="display mb-10 text-display-md">Also in <em className="text-primary-strong">{area.label.toLowerCase()}</em></h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((r) => <li key={r.slug}><McCard course={r} /></li>)}</ul>
        </Section>
      )}

      <nav aria-label="More micro-credentials" className="border-t border-border bg-card">
        <div className="mx-auto grid max-w-site grid-cols-2 gap-4 px-5 py-8 md:px-8">
          <Link href={mcPath(prev.slug)} className="group/p flex flex-col rounded-2xl p-4 transition-colors hover:bg-muted">
            <span className="label-mono inline-flex items-center gap-2 text-[11px] text-muted-foreground"><ArrowLeft aria-hidden className="size-4 transition-transform group-hover/p:-translate-x-1" />Previous</span>
            <span className="display mt-1 text-lg sm:text-xl">{prev.title}</span>
          </Link>
          <Link href={mcPath(next.slug)} className="group/n flex flex-col items-end rounded-2xl p-4 text-right transition-colors hover:bg-muted">
            <span className="label-mono inline-flex items-center gap-2 text-[11px] text-muted-foreground">Next<ArrowRight aria-hidden className="size-4 transition-transform group-hover/n:translate-x-1" /></span>
            <span className="display mt-1 text-lg sm:text-xl">{next.title}</span>
          </Link>
        </div>
      </nav>
    </>
  )
}

const TbcPill = () => <span className="label-mono inline-flex items-center rounded-full border border-dashed border-secondary-strong/50 bg-sand px-2.5 py-0.5 text-[10px] text-secondary-strong">To be confirmed</span>
