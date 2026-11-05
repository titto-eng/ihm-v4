// /research-centres/ — IHM's three research centres (nursing; allied health / aged care and chronic disease; digital health and
// health systems): focus, key research areas and impact. Copy in src/content/research.ts (CENTRES).
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Cpu, HeartPulse, Stethoscope } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { heroBtn } from '@/components/student-support/parts'
import { ResearchShell } from '@/components/research/parts'
import { CENTRES as C } from '@/content/research'

const PATH = '/research-centres/'

export const metadata: Metadata = pageMetadata({
  title: 'Research Centres',
  path: PATH,
  metaTitle: 'IHM Research Centres | Nursing, Allied Health, Digital Health',
  description: 'IHM’s research centres: the Centre for Nursing Research, the Allied Health Research Centre (aged care and chronic disease) and the Centre for Digital Health and Health Systems Research.',
})

const ICONS = [Stethoscope, HeartPulse, Cpu]
const anchor = (s: string) => s.toLowerCase().replace(/\(.*?\)/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export default function ResearchCentresRoute() {
  return (
    <ResearchShell path={PATH} title={C.title} intro={C.intro}
      actions={C.centres.map((c, i) => <a key={c.name} href={`#${anchor(c.name)}`} className={heroBtn(i === 0)}>{c.name.replace(/^Centre for /, '').replace(/ \(NRC\)$/, '')}</a>)}>
      {C.centres.map((c, i) => {
        const Icon = ICONS[i]
        return (
          <Section key={c.name} tone={i % 2 ? 'muted' : 'default'} anchorId={anchor(c.name)}>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <span className="bg-brand-gradient grid size-16 place-items-center rounded-2xl text-foreground"><Icon aria-hidden className="size-8" /></span>
                <Eyebrow className="mt-6">Centre {String(i + 1).padStart(2, '0')}</Eyebrow>
                <h2 className="display text-3xl leading-tight md:text-4xl">{c.name}</h2>
                {c.subtitle && <p className="mt-2 text-lg font-semibold text-primary-strong">{c.subtitle}</p>}
                {c.director && <p className="mt-4 text-[15px]"><span className="font-semibold">Centre Director:</span> {c.director}</p>}
                {c.href && <Link href={c.href} className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 font-semibold text-ink-foreground hover:bg-primary hover:text-foreground">Our research<ArrowRight aria-hidden className="size-4" /></Link>}
              </div>
              <div className="space-y-5">
                <div className="rounded-card border border-border bg-card p-6"><h3 className="label-mono text-primary-strong">Focus</h3><p className="mt-2 text-lg">{c.focus}</p></div>
                <div className="rounded-card border border-border bg-card p-6">
                  <h3 className="label-mono text-primary-strong">Key research areas</h3>
                  <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">{c.areas.map((a) => <li key={a} className="flex gap-2.5 text-[15px]"><span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />{a}</li>)}</ul>
                </div>
                <div className="rounded-card bg-ink p-6 text-ink-foreground"><h3 className="label-mono text-secondary">Impact</h3><p className="mt-2">{c.impact}</p></div>
              </div>
            </div>
          </Section>
        )
      })}
    </ResearchShell>
  )
}
