// /academic-integrity/ — WordPress page 9451. Content in src/content/academic-integrity.ts. The old page's tabs (#home, #intro,
// #breach, #policy, #matters, #staff) are sections here, keeping those anchors; the full procedure stays on the page.
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  AlertTriangle, ArrowRight, ArrowUpRight, BadgeCheck, Ban, BookMarked, Check, ChevronDown, FileText, Gavel, GraduationCap,
  HeartPulse, Lightbulb, Scale, Search, ShieldCheck, Sparkles, Users, X,
} from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { HeroRays } from '@/blocks/hero/Component'
import { JsonLd } from '@/components/seo/JsonLd'
import { Eyebrow, Faq, faqJsonLd } from '@/components/micro-credentials/parts'
import { cn } from '@/lib/cn'
import { ACADEMIC_INTEGRITY as A, AI_PROCEDURE, type ProcBlock } from '@/content/academic-integrity'

export const metadata: Metadata = pageMetadata({
  title: 'Academic Integrity',
  path: '/academic-integrity/',
  metaTitle: 'Academic Integrity at IHM | Plagiarism, AI Use, Turnitin, Breach Process and Penalties',
  description: 'Academic integrity at IHM: accepted practices, types of academic dishonesty, responsible AI use, Turnitin, the five-step breach process, penalties and the Academic Honesty and Integrity Procedure (IHM-AHIP2-5.1).',
})

const NAV = [
  ['home', 'Home'], ['intro', 'Introduction to Academic Integrity'], ['breach', 'Breach Process'], ['policy', 'Policy and Procedure'], ['matters', 'Academic Integrity Matters'], ['staff', 'For Staff'],
] as const

const HEALTH_ICONS = [HeartPulse, BadgeCheck, Users, Scale]
const TIP_ICONS = [ShieldCheck, FileText, Search, Sparkles, AlertTriangle, GraduationCap]
const faqs = A.faqs as [string, string][]

function Ticks({ items, tone = 'ok' }: { items: string[]; tone?: 'ok' | 'no' | 'dot' }) {
  return (
    <ul className="grid gap-2.5">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-[15px]">
          <span className={cn('mt-0.5 grid size-6 shrink-0 place-items-center rounded-full', tone === 'ok' ? 'bg-brand-gradient text-foreground' : tone === 'no' ? 'bg-ink text-secondary' : 'bg-muted')}>
            {tone === 'ok' ? <Check aria-hidden className="size-3.5" /> : tone === 'no' ? <X aria-hidden className="size-3.5" /> : <span className="size-1.5 rounded-full bg-foreground/60" />}
          </span>{t}
        </li>
      ))}
    </ul>
  )
}

function DocButtons({ dark = false }: { dark?: boolean }) {
  const cls = dark ? 'bg-card text-foreground hover:bg-secondary' : 'bg-ink text-ink-foreground hover:bg-primary hover:text-foreground'
  return (
    <div className="flex flex-wrap gap-3">
      <a href={A.docs.policy} target="_blank" rel="noopener" className={cn('inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-2.5 font-semibold transition-colors', cls)}><FileText aria-hidden className="size-4" />Academic Honesty and Integrity Policy</a>
      <a href={A.docs.procedure} target="_blank" rel="noopener" className={cn('inline-flex min-h-12 items-center gap-2 rounded-full px-6 py-2.5 font-semibold transition-colors', dark ? 'border border-ink-foreground/30 hover:border-secondary hover:text-secondary' : 'border border-foreground/25 hover:border-primary')}><FileText aria-hidden className="size-4" />Procedure IHM-AHIP2-5.1</a>
    </div>
  )
}

function Table({ rows, firstColHead = true }: { rows: string[][]; firstColHead?: boolean }) {
  const [head, ...body] = rows
  const cols = head.length
  return (
    <div className="overflow-x-auto rounded-card border border-border bg-card">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead className="bg-ink text-ink-foreground"><tr>{head.map((c) => <th key={c} scope="col" className="p-4 font-semibold">{c}</th>)}</tr></thead>
        <tbody>
          {body.map((r) => (
            <tr key={r[0]} className="border-t border-border align-top even:bg-muted/40">
              {r.map((c, i) => i === 0 && firstColHead ? <th key={i} scope="row" className="p-4 font-semibold">{c}</th> : <td key={i} colSpan={i === r.length - 1 ? cols - r.length + 1 : 1} className="p-4">{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Blocks({ blocks }: { blocks: ProcBlock[] }) {
  return (
    <div className="space-y-3 text-[15px] leading-relaxed">
      {blocks.map((b, i) => b.h ? <p key={i} className="pt-2 font-semibold">{b.h}</p>
        : b.p ? <p key={i}>{b.p}</p>
          : b.list ? <ul key={i} className="grid gap-1.5 border-l-2 border-primary/30 pl-4">{b.list.map((l) => <li key={l}>{l}</li>)}</ul>
            : b.table ? <Table key={i} rows={b.table} /> : null)}
    </div>
  )
}

function H2({ eyebrow, children, intro, onDark }: { eyebrow: string; children: React.ReactNode; intro?: string; onDark?: boolean }) {
  return <div className="mb-10 max-w-3xl"><Eyebrow onDark={onDark}>{eyebrow}</Eyebrow><h2 className="display text-display-md">{children}</h2>{intro && <p className={cn('mt-4 text-lg', onDark ? 'text-ink-foreground/80' : 'text-muted-foreground')}>{intro}</p>}</div>
}

export default function AcademicIntegrityRoute() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <section data-tone="ink" className="bg-ink-glow relative isolate overflow-hidden text-ink-foreground">
        <HeroRays id="ai-rays" className="-right-24 -bottom-28 -z-10 w-[30rem] opacity-[0.14]" />
        <div className="mx-auto max-w-site px-5 py-14 md:px-8 md:py-20">
          <p className="mb-5 text-sm text-ink-foreground/70"><Link href="/" className="hover:text-secondary">Home</Link> / <Link href="/library/" className="hover:text-secondary">Library</Link> / Academic Integrity</p>
          <Eyebrow onDark>Honesty · Trust · Fairness · Respect · Responsibility</Eyebrow>
          <h1 className="display max-w-4xl text-[clamp(2.5rem,5.6vw,4.6rem)] leading-[1.02]">Academic <em className="text-secondary">Integrity</em></h1>
          <p className="mt-5 max-w-2xl text-lg text-ink-foreground/80">{A.why.body[0]}</p>
          <div className="mt-8"><DocButtons dark /></div>
        </div>
      </section>
      <nav aria-label="On this page" className="sticky top-16 z-20 border-b border-border bg-background/90 backdrop-blur md:top-20">
        <ul className="mx-auto flex max-w-site gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none] md:px-8">
          {NAV.map(([id, l]) => <li key={id} className="shrink-0"><a href={`#${id}`} className="inline-block rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary-strong">{l}</a></li>)}
        </ul>
      </nav>

      {/* HOME */}
      <Section anchorId="home">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <H2 eyebrow="Why it matters">{A.why.title}</H2>
            <div className="space-y-4 text-[17px] leading-relaxed">{A.turnitin.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}</div>
          </div>
          <div className="rounded-card border border-border bg-card p-6 md:p-8">
            <h3 className="display text-2xl">Accepted Practices of Academic Integrity</h3>
            <div className="mt-5"><Ticks items={A.accepted} /></div>
            <p className="mt-5 rounded-xl bg-blush p-3 text-sm font-semibold text-primary-strong">{A.acceptedNote}</p>
          </div>
        </div>
        <h3 className="display mt-16 mb-6 text-3xl">Types of Academic Dishonesty</h3>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {A.types.map((t, i) => (
            <li key={t.id} id={t.id} className="group/t relative flex scroll-mt-32 flex-col overflow-hidden rounded-card border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50">
              <span aria-hidden className="bg-brand-gradient absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover/t:scale-x-100" />
              <span className="display text-3xl text-primary/70">{String(i + 1).padStart(2, '0')}</span>
              <h4 className="display mt-3 text-xl">{t.title}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{t.body}</p>
            </li>
          ))}
        </ul>
      </Section>
      <section data-tone="ink" className="bg-ink text-ink-foreground">
        <div className="mx-auto grid max-w-site gap-10 px-5 py-16 md:px-8 lg:grid-cols-2">
          <div>
            <Eyebrow onDark>Consequences</Eyebrow>
            <h2 className="display text-display-md">Serious consequences of academic misconduct</h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {A.consequences.map((c) => <li key={c} className="flex gap-3 rounded-2xl bg-ink-foreground/5 p-4 text-sm"><AlertTriangle aria-hidden className="size-5 shrink-0 text-secondary" />{c}</li>)}
            </ul>
          </div>
          <div className="rounded-card bg-ink-foreground/5 p-6 md:p-8">
            <h3 className="display text-2xl">Turnitin at IHM Australia</h3>
            <div className="mt-4 space-y-3 text-ink-foreground/80">{A.turnitin.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}</div>
            <div className="mt-6"><DocButtons dark /></div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <Section anchorId="intro">
        <H2 eyebrow="Introduction to Academic Integrity" intro={A.what[0]}>What is Academic Integrity?</H2>
        <p className="-mt-6 mb-12 max-w-3xl text-muted-foreground">{A.what[1]}</p>
        <h3 className="display mb-6 text-2xl">Why It Matters in Healthcare Education</h3>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {A.healthcare.map((h, i) => { const Icon = HEALTH_ICONS[i]; return (
            <li key={h.title} className="rounded-card border border-border bg-card p-6"><span className="bg-brand-gradient grid size-11 place-items-center rounded-2xl text-foreground"><Icon aria-hidden className="size-5" /></span><h4 className="display mt-4 text-xl">{h.title}</h4><p className="mt-2 text-sm text-muted-foreground">{h.body}</p></li>
          ) })}
        </ul>
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="rounded-card bg-sand/60 p-6 md:p-8">
            <h3 className="display text-2xl">IHM&apos;s Commitment</h3>
            <p className="mt-3 text-[15px]">{A.commitment}</p>
            <p className="label-mono mt-6 mb-3 text-[10px] text-muted-foreground">Core Principles (Policy Clause 6)</p>
            <dl className="grid gap-2 sm:grid-cols-2">{A.corePrinciples.map(([k, v]) => <div key={k} className="rounded-xl bg-card p-3"><dt className="font-semibold text-primary-strong">{k}</dt><dd className="text-sm">{v}</dd></div>)}</dl>
          </div>
          <div className="space-y-6">
            <div className="rounded-card border border-border bg-card p-6 md:p-8">
              <h3 className="display text-2xl">AI (Artificial Intelligence) Usage Guidelines</h3>
              <p className="mt-3 text-[15px] text-muted-foreground">{A.aiIntro}</p>
              <p className="label-mono mt-5 mb-3 text-[10px] text-muted-foreground">Key AI Guidelines for Students</p>
              <ul className="grid gap-2.5">{A.aiKey.map(([t, s]) => <li key={s} className="flex gap-3 text-[15px]"><span className={cn('mt-0.5 grid size-6 shrink-0 place-items-center rounded-full', t === 'ok' ? 'bg-brand-gradient' : 'bg-ink text-secondary')}>{t === 'ok' ? <Check aria-hidden className="size-3.5" /> : <Ban aria-hidden className="size-3.5" />}</span>{s}</li>)}</ul>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link href="/library/referencing/" className="group/c rounded-card border border-border bg-card p-6 hover:border-primary/50"><BookMarked aria-hidden className="size-6 text-primary-strong" /><h3 className="display mt-3 text-xl">How to Properly Cite and Reference</h3><p className="mt-2 text-sm text-muted-foreground">{A.citeIntro}</p><span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-strong">IHM Referencing &amp; Style Guide<ArrowRight aria-hidden className="size-4" /></span></Link>
              <a href={A.module.href} target="_blank" rel="noopener noreferrer" className="rounded-card bg-ink p-6 text-ink-foreground"><GraduationCap aria-hidden className="size-6 text-secondary" /><h3 className="display mt-3 text-xl">Academic Integrity Training Module</h3><p className="mt-2 text-sm text-ink-foreground/75">{A.module.body}</p><span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-secondary">Open Training Module<ArrowUpRight aria-hidden className="size-4" /></span></a>
            </div>
          </div>
        </div>
      </Section>

      {/* BREACH PROCESS */}
      <Section tone="muted" anchorId="breach">
        <H2 eyebrow="Fair and documented" intro={A.breachIntro}>The Academic Integrity Breach Process</H2>
        <ol className="mb-8 grid gap-2 sm:grid-cols-5">
          {A.steps.map((s, i) => <li key={s.title}><a href={`#step-${i + 1}`} className="flex h-full items-center gap-3 rounded-2xl bg-card p-3 text-sm font-semibold hover:text-primary-strong"><span className="bg-brand-gradient grid size-9 shrink-0 place-items-center rounded-full">{i + 1}</span>{s.title}</a></li>)}
        </ol>
        <ol className="relative grid gap-4 before:absolute before:top-4 before:bottom-4 before:left-[1.4rem] before:w-0.5 before:bg-primary/25">
          {A.steps.map((s, i) => (
            <li key={s.title} id={`step-${i + 1}`} className="relative scroll-mt-32 pl-14">
              <span className="bg-brand-gradient absolute top-4 left-1 grid size-10 place-items-center rounded-full font-bold ring-4 ring-muted">{i + 1}</span>
              <details open={i === 0} className="group/s rounded-card border border-border bg-card">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden"><span><span className="label-mono block text-[10px] text-muted-foreground">Step {i + 1}</span><span className="display text-xl">{s.title}</span></span><ChevronDown aria-hidden className="size-5 shrink-0 transition-transform group-open/s:rotate-180" /></summary>
                <ul className="grid gap-2 border-t border-border p-5 text-[15px]">{s.points.map((p) => <li key={p} className="flex gap-2"><span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />{p}</li>)}</ul>
              </details>
            </li>
          ))}
        </ol>
      </Section>

      {/* POLICY & PROCEDURE */}
      <Section anchorId="policy">
        <H2 eyebrow="Policy Clause 6 · Procedure IHM-AHIP2-5.1 · Student & Staff Obligations" intro={A.policyIntro}>Academic Honesty and Integrity - Policy &amp; Procedure</H2>
        <div className="mb-12"><DocButtons /></div>
        <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
          <nav aria-label="Policy sections" className="hidden lg:sticky lg:top-36 lg:block lg:self-start">
            <p className="label-mono mb-3 text-[10px] text-muted-foreground">On this page</p>
            <ul className="grid gap-1 border-l border-border text-sm">
              {[['policy-overview', 'Procedure Overview'], ['policy-scope', 'Scope'], ['policy-definitions', 'Key Definitions'], ['policy-principles', 'Principles'], ['policy-responsibilities', 'Responsibilities'], ['policy-ai', 'AI Usage Guidelines'], ['policy-turnitin', 'Use of Turnitin'], ['policy-referencing', 'Referencing & Citation'], ['policy-penalties', 'Penalty Framework'], ['policy-rights', 'Rights & Support'], ['policy-contact', 'Contacts'], ['policy-full', 'Full procedure text']].map(([id, l]) => <li key={id}><a href={`#${id}`} className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 hover:border-primary hover:text-primary-strong">{l}</a></li>)}
            </ul>
          </nav>
          <div className="min-w-0 space-y-14">
            <div id="policy-overview" className="scroll-mt-32">
              <h3 className="display text-3xl">Academic Honesty and Integrity Procedure (IHM-AHIP2-5.1)</h3>
              <p className="mt-3 text-muted-foreground">{A.overviewIntro}</p>
              <ol className="mt-6 grid gap-3 sm:grid-cols-5">{A.overviewFlow.map(([k, v], i) => <li key={k} className="rounded-2xl border border-border bg-card p-4"><span className="label-mono text-[10px] text-primary-strong">{i + 1}</span><p className="display mt-1 text-lg">{k}</p><p className="mt-1 text-xs text-muted-foreground">{v}</p></li>)}</ol>
            </div>
            <div id="policy-scope" className="scroll-mt-32"><h3 className="display text-2xl">Scope</h3><p className="mt-2 mb-4 text-muted-foreground">This procedure applies to all documents and media produced by IHM staff and students, including but not limited to:</p><Ticks items={A.scope} tone="dot" /></div>
            <div id="policy-definitions" className="scroll-mt-32"><h3 className="display text-2xl">Key Definitions</h3><p className="mt-2 mb-4 text-muted-foreground">Key terms used in this procedure:</p><dl className="grid gap-3 sm:grid-cols-2">{A.definitions.map(([k, v]) => <div key={k} className="rounded-2xl border border-border bg-card p-4"><dt className="font-semibold">{k}</dt><dd className="mt-1 text-sm text-muted-foreground">{v}</dd></div>)}</dl></div>
            <div id="policy-principles" className="scroll-mt-32"><h3 className="display text-2xl">Principles (Policy Clause 6)</h3><p className="mt-2 mb-4 text-muted-foreground">{A.principlesIntro}</p><Ticks items={A.principles} /><ul className="mt-5 flex flex-wrap gap-2">{A.values.map((v) => <li key={v} className="rounded-full bg-ink px-4 py-1.5 text-sm font-semibold text-secondary">{v}</li>)}</ul></div>
            <div id="policy-responsibilities" className="scroll-mt-32"><h3 className="display mb-4 text-2xl">Responsibilities</h3><div className="grid gap-4 md:grid-cols-2">{A.responsibilities.map((r) => <div key={r.title} className="rounded-card border border-border bg-card p-6"><p className="mb-4 font-semibold">{r.title}</p><Ticks items={r.items} /></div>)}</div></div>
            <div id="policy-ai" className="scroll-mt-32">
              <h3 className="display text-2xl">Artificial Intelligence (AI) Usage Guidelines (Clauses 5.1-5.13)</h3><p className="mt-2 mb-5 text-muted-foreground">{A.aiPolicyIntro}</p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-card border border-border bg-card p-6"><p className="mb-4 flex items-center gap-2 font-semibold"><Check aria-hidden className="size-5 text-primary-strong" />Permitted AI Use (if authorized in unit outline)</p><Ticks items={A.aiPermitted} /></div>
                <div className="rounded-card bg-ink p-6 text-ink-foreground"><p className="mb-4 flex items-center gap-2 font-semibold"><Ban aria-hidden className="size-5 text-secondary" />Prohibited AI Use</p><Ticks items={A.aiProhibited} tone="no" /></div>
              </div>
              <p className="mt-4 flex gap-2 rounded-2xl bg-blush p-4 text-sm"><AlertTriangle aria-hidden className="size-5 shrink-0 text-primary-strong" /><span><strong>Important:</strong> {A.aiImportant}</span></p>
            </div>
            <div id="policy-turnitin" className="scroll-mt-32">
              <h3 className="display text-2xl">Use of Turnitin at IHM (Clause 7)</h3><p className="mt-2 mb-5 text-muted-foreground">{A.turnitinPolicyIntro}</p>
              <div className="grid gap-4 md:grid-cols-3">{A.turnitinPolicy.map((g) => <div key={g.title} className="rounded-card border border-border bg-card p-5"><p className="mb-3 font-semibold">{g.title}</p><Ticks items={g.items} tone="dot" /></div>)}</div>
              <p className="mt-4 flex gap-2 rounded-2xl bg-sand/70 p-4 text-sm"><Lightbulb aria-hidden className="size-5 shrink-0 text-primary-strong" /><span><strong>Student Use of Turnitin:</strong> {A.turnitinTip}</span></p>
            </div>
            <div id="policy-referencing" className="scroll-mt-32">
              <h3 className="display text-2xl">Referencing and Citation Requirements (Clause 8)</h3><p className="mt-2 mb-5 text-muted-foreground">{A.referencingIntro}</p>
              <div className="grid gap-4 md:grid-cols-2">{A.referencing.map((g) => <div key={g.title} className="rounded-card border border-border bg-card p-6"><p className="mb-3 font-semibold">{g.title}</p><Ticks items={g.items} /></div>)}</div>
              <p className="mt-4 rounded-2xl bg-blush p-4 text-sm"><strong>Note:</strong> {A.referencingNote}</p>
            </div>
            <div id="policy-penalties" className="scroll-mt-32">
              <h3 className="display text-2xl">Penalties for Academic Misconduct</h3><p className="mt-2 mb-5 text-muted-foreground">{A.penaltiesIntro}</p>
              <Table rows={A.penalties} />
              <p className="mt-4 flex gap-2 rounded-2xl bg-ink p-4 text-sm text-ink-foreground"><Gavel aria-hidden className="size-5 shrink-0 text-secondary" /><span><strong>Additional Consequences:</strong> {A.penaltiesNote}</span></p>
            </div>
            <div id="policy-rights" className="scroll-mt-32">
              <h3 className="display text-2xl">Student Rights and Support</h3><p className="mt-2 mb-5 text-muted-foreground">Students facing academic integrity allegations have the following rights:</p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-card border border-border bg-card p-6"><p className="mb-3 font-semibold">Procedural Rights</p><Ticks items={A.rights} /></div>
                <div className="rounded-card border border-border bg-card p-6"><p className="mb-3 font-semibold">Support Available</p><Ticks items={A.support} /></div>
              </div>
            </div>
            <div id="policy-contact" className="scroll-mt-32 rounded-card bg-sunrise-glow p-6 md:p-8">
              <h3 className="display text-2xl">Questions or Concerns?</h3>
              <p className="mt-2">If you have questions about academic integrity, this procedure, or need support:</p>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-card/90 p-4"><dt className="font-semibold">Academic Integrity Officer</dt><dd className="text-sm">{A.contact.officer}</dd></div>
                <div className="rounded-2xl bg-card/90 p-4"><dt className="font-semibold">Student Support Services</dt><dd className="text-sm">Email: <a href={`mailto:${A.contact.email}`} className="font-semibold text-primary-strong underline">{A.contact.email}</a><br />Phone: {A.contact.phone}</dd></div>
              </dl>
            </div>
            <div id="policy-full" className="scroll-mt-32">
              <h3 className="display text-2xl">Academic Honesty and Integrity Procedure (IHM-AHIP2-5.1): full text</h3>
              <p className="mt-2 mb-5 text-muted-foreground">The procedure as published, section by section. The <a href={A.docs.procedure} target="_blank" rel="noopener" className="font-semibold text-primary-strong underline">PDF</a> is the authoritative copy.</p>
              <div className="grid gap-3">
                {AI_PROCEDURE.map((s) => (
                  <details key={s.title} className="group/p rounded-card border border-border bg-card">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold [&::-webkit-details-marker]:hidden">{s.title}<ChevronDown aria-hidden className="size-5 shrink-0 transition-transform group-open/p:rotate-180" /></summary>
                    <div className="border-t border-border p-5"><Blocks blocks={s.blocks} /></div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* MATTERS */}
      <Section tone="muted" anchorId="matters">
        <H2 eyebrow="Academic Integrity Matters" intro="Practical guidance to help you maintain academic integrity throughout your studies at IHM.">Student Tips &amp; Resources</H2>
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {A.tips.map((t, i) => { const Icon = TIP_ICONS[i]; return (
            <li key={t.title} className="rounded-card border border-border bg-card p-6"><span className="bg-brand-gradient grid size-11 place-items-center rounded-2xl text-foreground"><Icon aria-hidden className="size-5" /></span><h3 className="display mt-4 mb-4 text-xl">{t.title}</h3><Ticks items={t.items} tone="dot" /></li>
          ) })}
        </ul>
        <div className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h3 className="display text-3xl">Frequently Asked Questions</h3>
            <h4 className="display mt-10 text-2xl">External Resources</h4>
            <p className="mt-2 text-sm text-muted-foreground">Additional resources from external organisations to support your understanding of academic integrity.</p>
            <ul className="mt-4 grid gap-3">{A.external.map(([t, s, h]) => <li key={h}><a href={h} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 hover:border-primary"><span><span className="block font-semibold">{t}</span><span className="text-sm text-muted-foreground">{s}</span></span><ArrowUpRight aria-hidden className="size-4 shrink-0" /></a></li>)}</ul>
          </div>
          <Faq items={faqs} />
        </div>
      </Section>

      {/* STAFF */}
      <section data-tone="ink" id="staff" className="bg-ink-glow scroll-mt-32 text-ink-foreground">
        <div className="mx-auto grid max-w-site gap-10 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <H2 eyebrow="Academic Integrity for Staff" onDark intro="Resources and guidance for IHM academic and teaching staff on maintaining, promoting, and enforcing academic integrity standards.">Staff Responsibilities &amp; Expectations</H2>
          <div>
            <p className="mb-5 text-ink-foreground/80">{A.staffIntro}</p>
            <ul className="grid gap-3 sm:grid-cols-2">{A.staff.map((s) => <li key={s} className="flex gap-3 rounded-2xl bg-ink-foreground/5 p-4 text-sm"><Check aria-hidden className="size-5 shrink-0 text-secondary" />{s}</li>)}</ul>
          </div>
        </div>
      </section>
    </>
  )
}
