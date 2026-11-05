// /ihm-australias-reconciliation-action-plan/ — WordPress page 7373: IHM's Innovate RAP — commitments, what a RAP is, what it
// means for IHM, engagement and reporting, the HCI RAP documents (2025, 2026) and how to join. Copy in src/content/about2.ts.
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, FileText, Handshake, HeartHandshake, Mail, Scale } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { AboutShell } from '@/components/about/parts'
import { Inline } from '@/components/page-kit/Kit'
import { Lead, heroBtn } from '@/components/student-support/parts'
import { RAP } from '@/content/about2'

export const metadata: Metadata = pageMetadata({
  title: 'IHM Australia’s Reconciliation Action Plan',
  path: '/ihm-australias-reconciliation-action-plan/',
  metaTitle: 'Reconciliation Action Plan (Innovate RAP) | IHM Australia',
  description: 'IHM’s Innovate Reconciliation Action Plan, accredited by Reconciliation Australia: our commitments to relationships, respect and opportunities for Aboriginal and Torres Strait Islander peoples.',
})

const ICONS = [Handshake, Scale, HeartHandshake]
const Grid = ({ items, cols = 3 }: { items: string[][]; cols?: 2 | 3 }) => (
  <ul className={cols === 3 ? 'grid gap-4 md:grid-cols-3' : 'grid gap-4 md:grid-cols-2'}>{items.map(([t, d], i) => { const Icon = ICONS[i % 3]; return <li key={t} className="rounded-card border border-border bg-card p-6"><Icon aria-hidden className="size-7 text-primary-strong" /><h3 className="display mt-3 text-xl">{t}</h3><p className="mt-2 text-muted-foreground">{d}</p></li> })}</ul>
)

export default function RapRoute() {
  return (
    <AboutShell path="" image={{ src: '/images/cultural-events/naidoc-week-2025/dsc04005.webp', alt: 'IHM staff and students at NAIDOC Week' }} eyebrow="IHM Australia’s" title={<>Reconciliation <em className="text-secondary">Action Plan</em></>} intro={RAP.intro}
      actions={<><a href="#our-rap" className={heroBtn(true)}>Read our RAP</a><Link href="/aboriginal-and-torres-strait-islander/" className={heroBtn()}>Education & support<ArrowRight aria-hidden className="size-4" /></Link></>}>
      <Section><Lead eyebrow="Our reconciliation commitment" title="Relationships, respect and opportunities" /><Grid items={RAP.commitment} /></Section>
      <Section tone="muted"><Lead eyebrow="The framework" title={RAP.whatTitle} /><Grid items={RAP.what} cols={2} /></Section>
      <Section><Lead eyebrow="For IHM" title={RAP.meansTitle} /><Grid items={RAP.means} /></Section>
      <Section tone="muted"><Lead eyebrow="Accountability" title={RAP.reportTitle} /><Grid items={RAP.report} /></Section>
      <Section tone="ink" className="bg-ink-glow" anchorId="our-rap">
        <Lead onDark eyebrow="Documents" title="Our RAP" />
        <ul className="grid gap-4 md:grid-cols-2">{RAP.plans.map((p) => <li key={p.href}><a href={p.href} target="_blank" rel="noopener" className="flex items-center gap-5 rounded-card bg-ink-foreground/5 p-6 ring-1 ring-ink-foreground/10 transition-transform hover:-translate-y-1"><FileText aria-hidden className="size-10 shrink-0 text-secondary" /><span><span className="display block text-2xl">{p.label}</span><span className="text-sm text-ink-foreground/70">{p.file}</span></span></a></li>)}</ul>
      </Section>
      <Section><Lead eyebrow="Engagement" title={RAP.engagementTitle} /><Grid items={RAP.engagement} cols={2} /></Section>
      <Section tone="sunrise" className="bg-sunrise-glow">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_1fr] md:items-center">
          <h2 className="display text-display-md">{RAP.joinTitle}</h2>
          <ul className="grid gap-2">{RAP.join.map((j) => <li key={j} className="flex items-center gap-3 rounded-2xl bg-card/90 p-4"><Mail aria-hidden className="size-5 shrink-0 text-primary-strong" /><span><Inline text={j} /></span></li>)}</ul>
        </div>
      </Section>
    </AboutShell>
  )
}
