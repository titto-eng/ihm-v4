// /dataflow/ — WordPress page 7079: the IHM–DataFlow Group partnership for primary source verification. Images are live-only
// (src/content/legacy-assets.ts). Copy in src/content/about.ts (DATAFLOW).
import type { Metadata } from 'next'
import Image from 'next/image'
import { BadgeCheck, Lock, Rocket, ScanSearch, ShieldCheck, Target, Zap } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { AboutShell } from '@/components/about/parts'
import { KitBlocks } from '@/components/page-kit/Kit'
import { Lead } from '@/components/student-support/parts'
import { DATAFLOW as F } from '@/content/about'
import { legacyImage } from '@/lib/legacy-image'

export const metadata: Metadata = pageMetadata({
  title: 'DataFlow',
  path: '/dataflow/',
  metaTitle: 'IHM and DataFlow | Primary Source Verification Partnership',
  description: 'IHM partners with DataFlow Group, a global leader in primary source verification, to strengthen the credibility and recognition of IHM qualifications for healthcare licensing in the Gulf and beyond.',
})

const ADV_ICONS = [ScanSearch, BadgeCheck, Target, Rocket, Zap, Zap, Lock]

export default function DataflowRoute() {
  const banner = legacyImage('/images/about/dataflow/main-banner.webp', '')
  const photos = ['/images/about/dataflow/shake-hand.webp', '/images/about/dataflow/people.webp'].map((p) => legacyImage(p, '')).filter(Boolean)
  const logos = F.clients.map((c) => ({ ...c, src: legacyImage(c.src, '') })).filter((c) => c.src)
  return (
    <AboutShell path="" eyebrow="Partnership" title={<>IHM and <em className="text-secondary">DataFlow</em></>} intro={F.title} image={banner ? { src: banner, alt: 'IHM and DataFlow partnership' } : undefined}>
      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <p className="text-xl leading-relaxed">{F.intro}</p>
          <ul className="grid grid-cols-2 gap-3 lg:self-start">{F.stats.map(([v, l]) => <li key={l} className="bg-brand-gradient rounded-card p-5 text-foreground"><span className="display block text-4xl">{v}</span><span className="text-sm font-semibold">{l}</span></li>)}</ul>
        </div>
      </Section>
      <Section tone="muted" anchorId="about-dataflow">
        <Lead eyebrow="About" title={F.aboutTitle}><p>{F.about}</p></Lead>
        {logos.length > 0 && <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">{logos.map((c) => <li key={c.src} className="grid aspect-[3/2] place-items-center rounded-2xl border border-border bg-card p-3"><Image src={c.src} alt="DataFlow client regulator logo" width={160} height={100} className="h-full w-full object-contain" unoptimized /></li>)}</ul>}
        <p className="mt-6 max-w-4xl text-muted-foreground">{F.clientsNote}</p>
      </Section>
      <Section anchorId="advantages">
        <Lead eyebrow="For healthcare professionals" title={F.advTitle} />
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{F.advantages.map((a, i) => { const Icon = ADV_ICONS[i] ?? ShieldCheck; return <li key={a.title} className="rounded-card border border-border bg-card p-6"><Icon aria-hidden className="size-7 text-primary-strong" /><h3 className="display mt-3 text-xl">{a.title}</h3><KitBlocks blocks={a.blocks} className="mt-2 text-[15px]" /></li> })}</ul>
      </Section>
      <Section tone="ink" className="bg-ink-glow" anchorId="why-this-matters">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <Lead onDark eyebrow="Why this matters" title={F.whyTitle}><p>{F.why}</p></Lead>
          {photos.length > 0 && <div className="grid grid-cols-2 gap-4">{photos.map((p) => <Image key={p} src={p} alt="IHM and DataFlow partnership meeting" width={700} height={500} className="h-full w-full rounded-card object-cover" />)}</div>}
        </div>
      </Section>
      <Section anchorId="looking-ahead"><Lead eyebrow="Next" title={F.aheadTitle}><p>{F.ahead}</p></Lead></Section>
    </AboutShell>
  )
}
