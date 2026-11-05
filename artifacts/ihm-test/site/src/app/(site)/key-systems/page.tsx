// /key-systems/ — WordPress page 6679 "IHM Key Systems": Knowledge Hub, Clinsoft, E-testamur, L-Portfolio and AceLMS.
// Copy in src/content/study.ts (KEY_SYSTEMS).
import type { Metadata } from 'next'
import { ArrowUpRight, Award, BriefcaseMedical, Database, FolderKanban, GraduationCap, type LucideIcon } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { SupportShell } from '@/components/student-support/parts'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { KitBlocks } from '@/components/page-kit/Kit'
import { KEY_SYSTEMS } from '@/content/study'

export const metadata: Metadata = pageMetadata({
  title: 'Key Systems',
  path: '/key-systems/',
  metaTitle: 'IHM Key Systems | Knowledge Hub, Clinsoft, E-testamur, L-Portfolio and AceLMS',
  description: 'The systems behind studying at IHM: the Knowledge Hub ERP, Clinsoft for clinical placements, E-testamur digital certificates, the L-Portfolio and the AceLMS learning platform.',
})

const ICONS: Record<string, LucideIcon> = { 'Knowledge Hub': Database, Clinsoft: BriefcaseMedical, 'E-testamur': Award, 'L-Portfolio': FolderKanban, AceLMS: GraduationCap }
const slug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-')
const NAV = KEY_SYSTEMS.map((s) => ({ href: `#${slug(s.name)}`, label: s.name }))

export default function KeySystemsRoute() {
  return (
    <SupportShell path="" image={{ src: '/images/bachelor-of-nursing/sim.webp', alt: 'Nursing students using simulation technology' }} eyebrow="About IHM" title={<>IHM <em className="text-secondary">key systems</em></>} intro="The in-house and partner platforms that run enrolment, clinical placements, certificates, portfolios and learning at IHM." nav={NAV} navLabel="Systems on this page">
      {KEY_SYSTEMS.map((s, i) => {
        const Icon = ICONS[s.name] ?? Database
        return (
          <Section key={s.name} tone={i % 2 ? 'muted' : 'default'} anchorId={slug(s.name)}>
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <span className="bg-brand-gradient grid size-16 place-items-center rounded-3xl text-foreground"><Icon aria-hidden className="size-8" /></span>
                <Eyebrow className="mt-6">{String(i + 1).padStart(2, '0')}</Eyebrow>
                <h2 className="display text-display-md">{s.name}</h2>
                {s.url && <a href={s.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-ink-foreground hover:bg-primary hover:text-foreground">Visit {s.name}<ArrowUpRight aria-hidden className="size-4" /></a>}
              </div>
              <KitBlocks blocks={s.blocks} />
            </div>
          </Section>
        )
      })}
    </SupportShell>
  )
}
