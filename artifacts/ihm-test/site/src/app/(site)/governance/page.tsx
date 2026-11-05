// /governance/ — WordPress page 21: compliance, the Board of Directors, constitution, the board and committee structure, Academic
// Board, Audit and Risk, student policies and procedures, IHM's approach and educational philosophy. Copy in src/content/about.ts.
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Building2, FileText, GraduationCap, ShieldCheck } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { AboutShell } from '@/components/about/parts'
import { KitBlocks, KitFaq } from '@/components/page-kit/Kit'
import { Lead, heroBtn } from '@/components/student-support/parts'
import { GOVERNANCE as G } from '@/content/about'
import { legacyImage } from '@/lib/legacy-image'

export const metadata: Metadata = pageMetadata({
  title: 'Governance',
  path: '/governance/',
  metaTitle: 'Governance | Board, Academic Board, Policies and Educational Philosophy | IHM',
  description: 'How IHM is governed: the Board of Directors, Academic Board and Audit and Risk Committee, our constitution, student policies and procedures, and our student-centred educational philosophy.',
})

const BODY_ICONS = { 'Board of Directors': Building2, 'Academic Board': GraduationCap, 'Audit and Risk': ShieldCheck } as Record<string, typeof Building2>
const find = (t: string) => G.governance.find((s) => s.title.startsWith(t))

export default function GovernanceRoute() {
  const chart = legacyImage('/images/about/governance-structure.webp', '')
  const chartMobile = legacyImage('/images/about/governance-structure-mobile.svg', '')
  const bodies = ['Board of Directors', 'Academic Board', 'Audit and Risk'].map(find).filter((s): s is NonNullable<typeof s> => Boolean(s))
  const constitution = find('Constitution')
  const policies = find('IHM Policies')
  const procedures = find('IHM Procedures')
  return (
    <AboutShell path="/governance/" title={<>Our <em className="text-secondary">governance</em></>} intro={G.lead}
      actions={<><a href="#policies" className={heroBtn(true)}>Policies & procedures</a><Link href="/policies-procedures/" className={heroBtn()}>All policies<ArrowRight aria-hidden className="size-4" /></Link></>}>
      <Section>
        <p className="max-w-4xl text-xl leading-relaxed">{G.intro}</p>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {bodies.map((b) => { const Icon = BODY_ICONS[b.title] ?? Building2; return (
            <article key={b.title} id={b.title.toLowerCase().replace(/[^a-z]+/g, '-')} className="scroll-mt-28 rounded-card border border-border bg-card p-6">
              <span className="bg-brand-gradient grid size-12 place-items-center rounded-2xl text-foreground"><Icon aria-hidden className="size-6" /></span>
              <h2 className="display mt-4 text-2xl">{b.title}</h2>
              <KitBlocks blocks={b.blocks} className="mt-3 text-[15px]" />
            </article>
          ) })}
        </div>
        {constitution && <div className="mt-8 flex flex-col gap-4 rounded-card bg-ink p-6 text-ink-foreground md:flex-row md:items-center md:justify-between"><div><p className="display text-xl">{constitution.title}</p><KitBlocks blocks={constitution.blocks.filter((b) => 'p' in b)} onDark className="mt-2 text-[15px]" /></div><KitBlocks blocks={constitution.blocks.filter((b) => 'btn' in b).map((b) => ('btn' in b ? { btn: b.btn.map((x) => ({ ...x, t: 'IHM Constitution (PDF)' })) } : b))} onDark /></div>}
      </Section>

      {(chart || chartMobile) && (
        <Section tone="muted" anchorId="structure">
          <Lead eyebrow="Structure" title="Board & committee structure" />
          {chart && <Image src={chart} alt="Board and committee structure of the Institute of Health & Management" width={1800} height={1000} className={chartMobile ? 'hidden h-auto w-full rounded-card bg-card md:block' : 'h-auto w-full rounded-card bg-card'} />}
          {chartMobile && <Image src={chartMobile} alt="Board and committee structure of the Institute of Health & Management" width={600} height={1400} className="h-auto w-full rounded-card bg-card md:hidden" unoptimized />}
        </Section>
      )}

      <Section anchorId="policies">
        <Lead eyebrow="For students" title="Policies & procedures" />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {[policies, procedures].filter(Boolean).map((s) => <div key={s!.title} className="rounded-card border border-border bg-card p-6"><h3 className="mb-4 flex items-center gap-2 font-semibold"><FileText aria-hidden className="size-5 text-primary-strong" />{s!.title}</h3><KitBlocks blocks={s!.blocks} /></div>)}
        </div>
      </Section>

      <Section tone="ink" className="bg-ink-glow" anchorId="our-approach">
        <Lead onDark eyebrow="Our approach" title={G.approachTitle}><p>{G.approach}</p></Lead>
      </Section>

      <Section anchorId="educational-philosophy">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="lg:sticky lg:top-28 lg:self-start"><Lead eyebrow="Our educational philosophy" title={G.philosophyTitle} /></div>
          <KitFaq items={G.philosophy} numbered={false} />
        </div>
      </Section>
    </AboutShell>
  )
}
