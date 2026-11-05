// /genuine-student-test/ — WordPress page 3621: the Genuine Student (GS) requirement that replaced GTE on 23 March 2024.
import type { Metadata } from 'next'
import { ArrowUpRight, FileText, MessageSquareQuote } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { JsonLd } from '@/components/seo/JsonLd'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { IntlShell } from '@/components/international/parts'
import { Lead, heroBtn } from '@/components/student-support/parts'
import { GST } from '@/content/international'

export const metadata: Metadata = pageMetadata({
  title: 'Genuine Student Test',
  path: '/genuine-student-test/',
  metaTitle: 'Genuine Student (GS) Requirement for Australian Student Visas | GST vs GTE | IHM',
  description: 'The Genuine Student requirement replaced GTE for Australian student visas lodged from 23 March 2024: the four 150-word questions, what to evidence, benefits, and IHM’s Genuine Student Assessment Form.',
})

export default function GenuineStudentRoute() {
  return (
    <IntlShell
      path="/genuine-student-test/"
      title={<>Genuine Student <em className="text-secondary">Test (GST)</em></>}
      intro="From 23 March 2024 the Genuine Student (GS) requirement replaced the Genuine Temporary Entrant (GTE) requirement for Australian student visas."
      image={{ src: '/images/international/genuine-student.webp', alt: 'Nursing students in uniform' }}
      actions={<><a href={GST.form} target="_blank" rel="noopener" className={heroBtn(true)}><FileText aria-hidden className="size-4" />IHM’s Genuine Student Assessment Form</a><a href={GST.gsHref} target="_blank" rel="noopener noreferrer" className={heroBtn()}>Home Affairs: GS requirement</a></>}
    >
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'HowTo', name: 'Answer the Genuine Student questions in the student visa application', step: GST.questions.map(([n, t], i) => ({ '@type': 'HowToStep', position: i + 1, name: n, text: `${t} (Maximum 150 words)` })) }} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div><Eyebrow>What changed</Eyebrow><p className="text-[17px] leading-relaxed">{GST.intro}</p><p className="mt-6 font-semibold">{GST.breakdownIntro}</p></div>
          <div className="grid grid-cols-2 gap-3 self-start">
            <div className="rounded-card border border-border bg-card p-5"><p className="label-mono text-[10px] text-muted-foreground">Before 23 March 2024</p><p className="display mt-1 text-2xl">GTE</p><p className="mt-2 text-sm text-muted-foreground">{GST.gte}</p></div>
            <div className="rounded-card bg-ink p-5 text-ink-foreground"><p className="label-mono text-[10px] text-secondary">From 23 March 2024</p><p className="display mt-1 text-2xl">GS / GST</p><p className="mt-2 text-sm text-ink-foreground/80">{GST.gs}</p></div>
          </div>
        </div>
        <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">{GST.breakdown.map(([t, b], i) => <li key={t} className="rounded-card border border-border bg-card p-5"><span className="display text-3xl text-primary/70">{String(i + 1).padStart(2, '0')}</span><h2 className="display mt-2 text-lg leading-snug">{t}</h2><p className="mt-2 text-sm text-muted-foreground">{b}</p></li>)}</ol>
      </Section>
      <Section tone="muted" anchorId="questions">
        <Lead eyebrow="In the online visa application" title={GST.questionsTitle} />
        <ol className="grid gap-4 md:grid-cols-2">
          {GST.questions.map(([t, b], i) => (
            <li key={t} className="flex gap-4 rounded-card bg-card p-6">
              <span className="bg-brand-gradient grid size-11 shrink-0 place-items-center rounded-2xl font-bold">{i + 1}</span>
              <div><h3 className="display text-xl">{t}</h3><p className="mt-2 text-sm text-muted-foreground">{b}</p><p className="label-mono mt-3 inline-block rounded-full bg-muted px-3 py-1 text-[10px]">Maximum 150 words</p></div>
            </li>
          ))}
        </ol>
        <div className="mt-6 grid gap-4 md:grid-cols-2">{GST.questionsNote.map((n) => <p key={n.slice(0, 30)} className="flex gap-3 rounded-2xl bg-sand/70 p-4 text-sm"><MessageSquareQuote aria-hidden className="size-5 shrink-0 text-primary-strong" />{n}</p>)}</div>
      </Section>
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div><Lead eyebrow="Why it is better" title="Benefits of the Genuine Student Test (GST)" /><dl className="grid gap-3">{GST.benefits.map(([t, b]) => <div key={t} className="rounded-2xl border border-border bg-card p-4"><dt className="font-semibold">{t}</dt><dd className="mt-1 text-sm text-muted-foreground">{b}</dd></div>)}</dl></div>
          <div className="self-start rounded-card bg-ink p-6 text-ink-foreground md:p-8">
            <h2 className="display text-3xl">Comparison Between GST and GTE</h2>
            <p className="mt-3 text-ink-foreground/80">{GST.comparisonIntro}</p>
            <dl className="mt-5 grid gap-3"><div className="rounded-2xl bg-ink-foreground/5 p-4"><dt className="font-semibold text-secondary">Genuine Temporary Entrant (GTE)</dt><dd className="mt-1 text-sm">{GST.gte}</dd></div><div className="rounded-2xl bg-ink-foreground/5 p-4"><dt className="font-semibold text-secondary">Genuine Student Test (GST)</dt><dd className="mt-1 text-sm">{GST.gs}</dd></div></dl>
            <p className="mt-5 text-sm text-ink-foreground/80">{GST.close}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={GST.direction} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-semibold text-foreground"><ArrowUpRight aria-hidden className="size-4" />Ministerial Direction No. 106 (348KB PDF)</a>
              <a href={GST.form} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-foreground"><FileText aria-hidden className="size-4" />IHM’s Genuine Student Assessment Form</a>
            </div>
          </div>
        </div>
      </Section>
    </IntlShell>
  )
}
