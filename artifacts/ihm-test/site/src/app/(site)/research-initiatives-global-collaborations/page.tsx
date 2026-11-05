// /research-initiatives-global-collaborations/ — research agenda, the collaboration interest form (asps.ihm.edu.au), the ASU and Ramsay
// partnership, key research pillars and benefits for students and faculty. Copy in src/content/research.ts (INITIATIVES).
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Brain, HeartPulse, Cpu, Stethoscope } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { heroBtn } from '@/components/student-support/parts'
import { ResearchShell } from '@/components/research/parts'
import { legacyImage } from '@/lib/legacy-image'
import { INITIATIVES as I } from '@/content/research'

const PATH = '/research-initiatives-global-collaborations/'

export const metadata: Metadata = pageMetadata({
  title: 'Research Initiatives & Global Collaborations',
  path: PATH,
  metaTitle: 'Research Initiatives & Global Collaborations | IHM',
  description: 'Applied, ethical research in nursing, mental health, digital health and aged care at IHM, with global partners ASU and Ramsay Health Care. Researchers can register their interest to collaborate.',
})

const PILLAR_ICONS = [Stethoscope, Brain, Cpu, HeartPulse]

export default function ResearchInitiativesRoute() {
  return (
    <ResearchShell path={PATH} title={I.title} intro={I.intro[1]}
      image={{ src: '/images/research/allied-health-banner.webp', alt: 'Researcher using virtual reality in a lab' }}
      actions={<><a href={I.form.href} target="_blank" rel="noopener noreferrer" className={heroBtn(true)}>Collaborate with us<ArrowUpRight aria-hidden className="size-4" /></a><a href="#pillars" className={heroBtn()}>Research pillars</a></>}>
      <Section>
        <p className="display max-w-4xl text-2xl leading-snug md:text-3xl">{I.intro[0]}</p>
      </Section>

      <Section tone="muted" anchorId="collaborate">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Eyebrow>Research collaboration</Eyebrow>
            <h2 className="display text-display-md">{I.collaborateTitle}</h2>
            <div className="mt-5 space-y-4 text-[17px] leading-relaxed text-muted-foreground">{I.collaborate.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}</div>
          </div>
          <div className="bg-sunrise-glow rounded-card p-8 md:p-10">
            <p className="label-mono">Researchers worldwide</p>
            <p className="display mt-3 text-3xl">Tell us about your research idea</p>
            <a href={I.form.href} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-semibold text-ink-foreground hover:bg-primary hover:text-foreground">{I.form.t}<ArrowUpRight aria-hidden className="size-4" /></a>
          </div>
        </div>
      </Section>

      <Section>
        <Eyebrow>Education to employment</Eyebrow>
        <h2 className="display text-display-md">{I.strategicTitle}</h2>
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{I.strategic}</p>
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {I.strategicPartners.map((p) => (
            <Link key={p.t} href={p.href} className="group flex gap-6 rounded-card border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl">
              <div className="relative size-20 shrink-0"><Image src={p.logo} alt={p.alt} fill sizes="80px" className="object-contain" /></div>
              <div>
                <h3 className="display text-2xl">{p.t}</h3>
                <p className="mt-2 text-[15px] text-muted-foreground">{p.b}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="ink" className="bg-ink-glow" anchorId="pillars">
        <Eyebrow onDark>{I.pillarsTitle}</Eyebrow>
        <h2 className="display max-w-3xl text-display-md">{I.pillarsIntro}</h2>
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {I.pillars.map((p, i) => {
            const Icon = PILLAR_ICONS[i]
            const img = legacyImage(p.image, '')
            return (
              <li key={p.t} className="group overflow-hidden rounded-card bg-ink-foreground/5 ring-1 ring-ink-foreground/10 transition-colors hover:bg-ink-foreground/10">
                {img ? <div className="relative aspect-[4/3]"><Image src={img} alt={p.t} fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /></div>
                  : <div className="bg-brand-gradient grid aspect-[4/3] place-items-center"><Icon aria-hidden className="size-12 text-foreground" /></div>}
                <div className="p-6"><h3 className="display text-xl">{p.t}</h3><p className="mt-2 text-sm text-ink-foreground/75">{p.b}</p></div>
              </li>
            )
          })}
        </ul>
      </Section>

      <Section>
        <Eyebrow>{I.benefitsTitle}</Eyebrow>
        <h2 className="display max-w-3xl text-display-md">Global opportunities for our community</h2>
        <ul className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {I.benefits.map((b) => {
            const img = legacyImage(b.image, '')
            return (
              <li key={b.t} className="overflow-hidden rounded-card border border-border bg-card">
                {img && <div className="relative aspect-[16/10]"><Image src={img} alt={b.t} fill sizes="(min-width: 768px) 30vw, 92vw" className="object-cover" /></div>}
                <div className="p-6"><h3 className="display text-2xl">{b.t}</h3><p className="mt-2 text-[15px] text-muted-foreground">{b.b}</p></div>
              </li>
            )
          })}
        </ul>
        <div className="bg-sunrise-glow mt-12 rounded-card p-8 md:p-12">
          <h3 className="display text-3xl">{I.closingTitle}</h3>
          <p className="mt-3 max-w-2xl text-lg">{I.closing}</p>
        </div>
      </Section>
    </ResearchShell>
  )
}
