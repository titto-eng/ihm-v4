// /research-innovation/ — Research Ethics and Integrity: the Low-Risk Human Research Ethics Panel (LR-HREP) overview, governance team,
// Research Integrity Advisors, application guidelines, quarterly deadlines, policies, forms and FAQ (FAQPage JSON-LD). The old page
// showed these as tabs; here they are anchored sections with a sticky jump list. Copy in src/content/research.ts (ETHICS).
import type { Metadata } from 'next'
import { AlertTriangle, CalendarClock, CheckCircle2, FileText, Mail, XCircle } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { JsonLd } from '@/components/seo/JsonLd'
import { Inline, KitBlocks, KitFaq, kitFaqJsonLd } from '@/components/page-kit/Kit'
import { heroBtn } from '@/components/student-support/parts'
import { PersonCard, ResearchShell } from '@/components/research/parts'
import { cn } from '@/lib/cn'
import { ETHICS as E, ETHICS_EMAIL } from '@/content/research'

const PATH = '/research-innovation/'
export const revalidate = 86400 // the "next deadline" marker follows the date

export const metadata: Metadata = pageMetadata({
  title: 'Research & Innovation',
  path: PATH,
  metaTitle: 'Research Ethics and Integrity | Low-Risk Human Research Ethics Panel | IHM',
  description: 'IHM Research & Innovation: the Low-Risk Human Research Ethics Panel (LR-HREP), Research Integrity Advisors, how to apply, 2026 submission deadlines, policies, forms and FAQ.',
})

const JUMP = [
  ['overview', 'Overview'], ['guidelines', 'Application guidelines'], ['dates', 'Application dates'],
  ['policies', 'Policies & procedures'], ['forms', 'Forms & resources'], ['faq', 'FAQ & contact'],
] as const

function Checklist({ title, items, tone }: { title: string; items: string[]; tone: 'ok' | 'no' }) {
  const Icon = tone === 'ok' ? CheckCircle2 : XCircle
  return (
    <div className="rounded-card border border-border bg-card p-6">
      <h4 className="font-semibold">{title}</h4>
      <ul className="mt-3 space-y-2 text-[15px]">{items.map((i) => <li key={i} className="flex gap-2.5"><Icon aria-hidden className={cn('mt-0.5 size-5 shrink-0', tone === 'ok' ? 'text-emerald-600' : 'text-primary-strong')} />{i}</li>)}</ul>
    </div>
  )
}

function DocList({ items }: { items: { t: string; href: string }[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((d) => (
        <li key={d.href + d.t}><a href={d.href} target="_blank" rel="noopener" className="group flex h-full items-start gap-4 rounded-card border border-border bg-card p-5 transition-colors hover:border-primary">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-blush text-primary-strong"><FileText aria-hidden className="size-5" /></span>
          <span><span className="block font-semibold group-hover:text-primary-strong">{d.t}</span><span className="label-mono mt-1 block text-muted-foreground">PDF</span></span>
        </a></li>
      ))}
    </ul>
  )
}

export default function ResearchInnovationRoute() {
  const today = new Date().toISOString().slice(0, 10)
  const next = E.deadlines.find((d) => d.date >= today)?.date
  return (
    <ResearchShell path={PATH} title={E.title} intro={E.panel}
      image={{ src: '/images/research/allied-health-banner.webp', alt: 'Researcher using virtual reality in a lab' }}
      actions={<><a href="#guidelines" className={heroBtn(true)}>How to apply</a><a href={`mailto:${ETHICS_EMAIL}`} className={heroBtn()}><Mail aria-hidden className="size-4" />Email the panel</a></>}>
      <JsonLd data={kitFaqJsonLd(E.faq)} />
      <nav aria-label="On this page" className="sticky top-16 z-20 border-b border-border bg-background/90 backdrop-blur">
        <ul className="mx-auto flex max-w-site gap-1 overflow-x-auto px-5 py-2 [scrollbar-width:none] md:px-8">
          {JUMP.map(([id, label]) => <li key={id} className="shrink-0"><a href={`#${id}`} className="inline-block rounded-full px-3.5 py-1.5 text-sm font-semibold text-muted-foreground hover:bg-blush hover:text-foreground">{label}</a></li>)}
        </ul>
      </nav>

      <Section anchorId="overview">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div><Eyebrow>Overview</Eyebrow><h2 className="display text-display-md">What is low-risk human research?</h2></div>
          <KitBlocks blocks={E.overview} className="text-[17px]" />
        </div>
      </Section>

      <Section tone="muted">
        <Eyebrow>Purpose of LR-HREP</Eyebrow>
        <h2 className="display max-w-3xl text-3xl leading-tight md:text-4xl">{E.purposeIntro}</h2>
        <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {E.purpose.map((p, i) => (
            <li key={p.t} className="rounded-card border border-border bg-card p-6">
              <span className="display text-4xl text-primary">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 font-semibold">{p.t}</h3>
              <p className="mt-2 text-[15px] text-muted-foreground">{p.b}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow>Oversight</Eyebrow>
            <h2 className="display text-display-md">Research governance</h2>
            <div className="mt-5 space-y-4 text-[17px] leading-relaxed text-muted-foreground">{E.governance.map((p) => <p key={p.slice(0, 40)}><Inline text={p} /></p>)}</div>
          </div>
          <ul className="grid grid-cols-2 gap-4 self-start">{E.governanceTeam.map((p) => <li key={p.name}><PersonCard person={p} compact /></li>)}</ul>
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <Eyebrow>Confidential advice</Eyebrow>
            <h2 className="display text-display-md">Research Integrity Advisors (RIAs)</h2>
            <div className="mt-5 space-y-4 text-[17px] leading-relaxed text-muted-foreground">{E.ria.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}</div>
            <p className="mt-6 font-semibold">{E.riaAdviceIntro}</p>
            <ul className="mt-3 space-y-2.5">{E.riaAdvice.map((a) => <li key={a} className="flex gap-3"><CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-primary-strong" />{a}</li>)}</ul>
            <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-muted-foreground">{E.riaAfter.map((p) => <p key={p.slice(0, 40)}><Inline text={p} /></p>)}</div>
          </div>
          <ul className="max-w-xs self-start lg:sticky lg:top-32">{E.riaTeam.map((p) => <li key={p.name}><PersonCard person={p} /></li>)}</ul>
        </div>
      </Section>

      <Section anchorId="guidelines">
        <Eyebrow>Application guidelines</Eyebrow>
        <h2 className="display text-display-md">Guidelines for applying to LR-HREP</h2>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{E.guidelinesIntro}</p>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[0.4fr_1.6fr]">
          <h3 className="display text-2xl"><span className="text-primary">1.</span> Who must apply?</h3>
          <div>
            <p className="font-semibold">{E.whoMustApply.lead}</p>
            <ul className="mt-3 grid gap-3 md:grid-cols-3">{E.whoMustApply.items.map((i) => <li key={i} className="rounded-2xl bg-blush px-4 py-3 text-[15px]">{i}</li>)}</ul>
          </div>

          <h3 className="display text-2xl"><span className="text-primary">2.</span> Projects suitable for LR-HREP review</h3>
          <div>
            <p>{E.suitableIntro}</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">{E.suitable.map((g) => <Checklist key={g.t} title={g.t} items={g.items} tone="ok" />)}</div>
          </div>

          <h3 className="display text-2xl"><span className="text-primary">3.</span> Projects LR-HREP cannot review</h3>
          <div>
            <p className="flex gap-3 rounded-2xl border border-primary/40 bg-blush p-4 font-semibold"><AlertTriangle aria-hidden className="size-5 shrink-0 text-primary-strong" />{E.notSuitableWarning}</p>
            <p className="mt-4">{E.notSuitableIntro}</p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">{E.notSuitable.map((g) => <Checklist key={g.t} title={g.t} items={g.items} tone="no" />)}</div>
            <p className="mt-4 text-muted-foreground">{E.needGuidance}</p>
          </div>

          <h3 className="display text-2xl"><span className="text-primary">4.</span> Application process</h3>
          <div>
            <ol className="relative space-y-6 border-l-2 border-dashed border-primary/40 pl-8">
              {E.steps.map((s, i) => (
                <li key={s.t} className="relative">
                  <span className="bg-brand-gradient absolute -left-[3.05rem] grid size-10 place-items-center rounded-full font-bold text-foreground">{i + 1}</span>
                  <h4 className="text-lg font-semibold">{s.t}</h4>
                  <KitBlocks blocks={s.blocks} className="mt-2 text-[15px] text-muted-foreground" />
                </li>
              ))}
            </ol>
            <p className="mt-8 rounded-card bg-ink p-5 text-ink-foreground"><Inline text={E.outcome} /></p>
          </div>
        </div>
      </Section>

      <Section tone="muted" anchorId="dates">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Application dates</Eyebrow>
            <h2 className="display text-display-md">Low-risk ethics application dates</h2>
            <p className="mt-4 text-muted-foreground">{E.datesIntro}</p>
          </div>
          <div>
            <h3 className="display text-2xl">{E.deadlinesTitle}</h3>
            <p className="mt-2 text-[15px] text-muted-foreground">{E.deadlinesNote}</p>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {E.deadlines.map((d) => {
                const isNext = d.date === next
                const past = d.date < today
                return (
                  <li key={d.date} className={cn('rounded-card border p-5 transition-colors', isNext ? 'border-primary bg-card shadow-lg' : 'border-border bg-card', past && 'opacity-60')}>
                    <p className="flex items-center gap-2 text-sm font-semibold text-muted-foreground"><CalendarClock aria-hidden className="size-4" />{d.quarter}{isNext && <span className="ml-auto rounded-full bg-primary px-2.5 py-0.5 text-xs text-foreground">Next</span>}</p>
                    <p className="display mt-2 text-2xl">Deadline: {d.label}</p>
                  </li>
                )
              })}
            </ul>
            <div className="mt-8 rounded-card border border-border bg-card p-6">
              <h3 className="font-semibold">Request a date</h3>
              <p className="mt-2 text-[15px] text-muted-foreground">{E.requestDate}</p>
              <p className="mt-3 text-[15px]">For enquiries or to submit a request, please contact: <a href={`mailto:${ETHICS_EMAIL}`} className="font-semibold text-primary-strong hover:underline">{ETHICS_EMAIL}</a></p>
            </div>
          </div>
        </div>
      </Section>

      <Section anchorId="policies">
        <Eyebrow>Policies &amp; procedures</Eyebrow>
        <h2 className="display text-display-md">Policies &amp; procedures</h2>
        <p className="mb-8 mt-3 max-w-2xl text-muted-foreground">{E.policiesIntro}</p>
        <DocList items={E.policies} />
      </Section>

      <Section tone="muted" anchorId="forms">
        <Eyebrow>Forms &amp; resources</Eyebrow>
        <h2 className="display text-display-md">Assets for you</h2>
        <p className="mb-8 mt-3 max-w-2xl text-muted-foreground">{E.formsIntro}</p>
        <DocList items={E.forms} />
      </Section>

      <Section anchorId="faq">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="display text-display-md">Frequently asked questions</h2>
            <p className="mt-3 text-muted-foreground">{E.faqIntro}</p>
            <div className="mt-8 rounded-card bg-ink p-6 text-ink-foreground">
              <h3 className="display text-2xl">Contact us</h3>
              <p className="mt-2 text-[15px] text-ink-foreground/80">{E.contact}</p>
              <a href={`mailto:${ETHICS_EMAIL}`} className="mt-4 inline-flex items-center gap-2 font-semibold text-secondary hover:underline"><Mail aria-hidden className="size-4" />{ETHICS_EMAIL}</a>
            </div>
          </div>
          <KitFaq items={E.faq} />
        </div>
      </Section>
    </ResearchShell>
  )
}
