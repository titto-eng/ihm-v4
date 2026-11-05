// /research-allied-health-research-centre/ — the Allied Health Research Centre: Smart Aging, Public Health and Rehabilitation.
// Copy in src/content/research.ts (ALLIED, CENTRES).
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Accessibility, ArrowRight, Cpu, HeartPulse } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { heroBtn } from '@/components/student-support/parts'
import { ResearchShell } from '@/components/research/parts'
import { ALLIED as A, CENTRES } from '@/content/research'

const PATH = '/research-allied-health-research-centre/'

export const metadata: Metadata = pageMetadata({
  title: 'Research – Allied Health Research Centre',
  path: PATH,
  metaTitle: 'Allied Health Research Centre | Smart Aging, Public Health, Rehabilitation | IHM',
  description: 'IHM’s Allied Health Research Centre: interdisciplinary research in Smart Aging, Public Health and Rehabilitation that improves quality of life for ageing populations.',
})

const FOCUS_ICONS = [Cpu, HeartPulse, Accessibility]

export default function AlliedHealthResearchRoute() {
  const centre = CENTRES.centres.find((c) => c.href === PATH)
  return (
    <ResearchShell path={PATH} eyebrow="Allied Health Research Centre" title={A.title}
      actions={<><a href="#focus" className={heroBtn(true)}>Our focus</a><Link href="/research-centres/" className={heroBtn()}>All research centres</Link></>}>
      <section className="relative">
        <div className="relative mx-auto aspect-[1520/581] max-h-[34rem] w-full max-w-site overflow-hidden md:rounded-b-[2rem]">
          <Image src="/images/research/allied-health-banner.webp" alt="Researcher using virtual reality alongside lab equipment" fill priority sizes="100vw" className="object-cover" />
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5 text-[17px] leading-relaxed text-muted-foreground">{A.body.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}</div>
          {centre?.director && (
            <aside className="self-start rounded-card bg-ink p-7 text-ink-foreground">
              <p className="label-mono text-secondary">Centre Director</p>
              <p className="display mt-2 text-2xl">{centre.director}</p>
              <p className="mt-2 text-sm text-ink-foreground/75">{centre.subtitle}</p>
            </aside>
          )}
        </div>
      </Section>

      <Section tone="muted" anchorId="focus">
        <Eyebrow>Research focus</Eyebrow>
        <h2 className="display text-display-md">Where we focus</h2>
        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {A.focusAreas.map((f, i) => {
            const Icon = FOCUS_ICONS[i]
            return <li key={f} className="flex items-center gap-4 rounded-card border border-border bg-card p-6"><span className="bg-brand-gradient grid size-14 shrink-0 place-items-center rounded-2xl text-foreground"><Icon aria-hidden className="size-7" /></span><span className="display text-2xl">{f}</span></li>
          })}
        </ul>
        {centre && (
          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="rounded-card border border-border bg-card p-6"><h3 className="label-mono text-primary-strong">Key research areas</h3><ul className="mt-3 space-y-2">{centre.areas.map((a) => <li key={a} className="flex gap-2.5"><span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />{a}</li>)}</ul></div>
            <div className="rounded-card border border-border bg-card p-6"><h3 className="label-mono text-primary-strong">Impact</h3><p className="mt-3">{centre.impact}</p><Link href="/research-centres/" className="mt-5 inline-flex items-center gap-2 font-semibold text-primary-strong">All research centres<ArrowRight aria-hidden className="size-4" /></Link></div>
          </div>
        )}
      </Section>
    </ResearchShell>
  )
}
