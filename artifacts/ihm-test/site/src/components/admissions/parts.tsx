import type { ReactNode } from 'react'
import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import { HeroRays } from '@/blocks/hero/Component'
import { Section } from '@/components/layout/Section'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { KitBlocks, sections, type KitBlock } from '@/components/page-kit/Kit'
import { SupportShell } from '@/components/student-support/parts'
import { APPLY_URL } from '@/content/admissions'
import { site } from '@/content/site'
import { cn } from '@/lib/cn'

export const ADMISSIONS_NAV = [
  { href: '/how-to-apply/', label: 'How to apply' },
  { href: '/fees-and-charges/', label: 'Fees & charges' },
  { href: '/fee-help/', label: 'FEE-HELP' },
  { href: '/key-dates/', label: 'Key dates' },
  { href: '/credit-and-recognition-of-prior-learning/', label: 'Credit & RPL' },
  { href: '/scholarship/', label: 'Scholarship' },
  { href: '/refer-a-student/', label: 'Refer a student' },
] as const

/** The admissions pages: SupportShell with the admissions sub-navigation and the admissions contact band. */
export function AdmissionsShell(props: { path: string; eyebrow?: string; title: ReactNode; intro?: string; image?: { src: string; alt: string }; actions?: ReactNode; children: ReactNode }) {
  return <SupportShell {...props} eyebrow={props.eyebrow ?? 'Admissions'} nav={ADMISSIONS_NAV} navLabel="Admissions" band={<AdmissionsBand />} />
}

export function AdmissionsBand() {
  const tel = `+61${site.phone.replace(/\s/g, '').slice(1)}`
  return (
    <section data-tone="sunrise" className="bg-sunrise-glow">
      <div className="mx-auto grid max-w-site gap-4 px-5 py-12 md:grid-cols-[1.2fr_1fr_1fr_1fr] md:items-center md:px-8">
        <p className="display text-2xl md:text-3xl">Questions about applying? Talk to our admissions team.</p>
        <a href={`tel:${tel}`} className="flex items-center gap-4 rounded-card bg-card/90 p-5 transition-transform hover:-translate-y-1"><span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-ink text-secondary"><Phone aria-hidden className="size-5" /></span><span><span className="block font-semibold">Toll free</span><span className="block text-sm text-muted-foreground">{site.phone}</span></span></a>
        <a href={`mailto:${site.email}`} className="flex items-center gap-4 rounded-card bg-card/90 p-5 transition-transform hover:-translate-y-1"><span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-ink text-secondary"><Mail aria-hidden className="size-5" /></span><span className="min-w-0"><span className="block font-semibold">Email admissions</span><span className="block truncate text-sm text-muted-foreground">{site.email}</span></span></a>
        <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-card bg-ink p-5 text-ink-foreground transition-transform hover:-translate-y-1"><span className="min-w-0"><span className="block font-semibold">Apply online</span><span className="block text-sm text-ink-foreground/70">application.ihm.edu.au</span></span><ArrowUpRight aria-hidden className="ml-auto size-5 text-secondary" /></a>
      </div>
    </section>
  )
}

const slug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/**
 * Long-form kit content laid out as numbered sections: the heading sits in a sticky left column, the copy on the right, and
 * any h5 sub-sections inside a section become cards. Used by the admissions pages and other text-heavy pages.
 */
export function KitChapters({ blocks, level = 2, eyebrow, startIndex = 1, tones = ['default', 'muted'] }: {
  blocks: KitBlock[]; level?: number; eyebrow?: string; startIndex?: number; tones?: readonly ('default' | 'muted' | 'card')[]
}) {
  const { lead, items } = sections(blocks, level)
  return (
    <>
      {lead.length > 0 && <Section tone={tones[0]}><div className="max-w-3xl"><KitBlocks blocks={lead} className="text-lg" /></div></Section>}
      {items.map((it, i) => (
        <Section key={it.title} tone={tones[(i + (lead.length ? 1 : 0)) % tones.length]} anchorId={slug(it.title)}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow>{eyebrow ?? String(i + startIndex).padStart(2, '0')}</Eyebrow>
              <h2 className={cn('display', it.title.length > 42 ? 'text-3xl leading-tight md:text-4xl' : 'text-display-md')}>{it.title}</h2>
            </div>
            <ChapterBody blocks={it.blocks} />
          </div>
        </Section>
      ))}
    </>
  )
}

export function ChapterBody({ blocks }: { blocks: KitBlock[] }) {
  const sub = sections(blocks, 5)
  const subOnly = sub.items.every((s) => s.blocks.length > 0)
  if (!sub.items.length || !subOnly) return <KitBlocks blocks={blocks} />
  return (
    <div className="space-y-6">
      {sub.lead.length > 0 && <KitBlocks blocks={sub.lead} />}
      <div className={cn('grid items-start gap-4', sub.items.length > 1 && 'md:grid-cols-2')}>
        {sub.items.map((s) => (
          <article key={s.title} className="rounded-card border border-border bg-card p-6 transition-shadow hover:shadow-lg">
            <h3 className="display text-xl">{s.title}</h3>
            <KitBlocks blocks={s.blocks} className="mt-3 text-[15px]" />
          </article>
        ))}
      </div>
    </div>
  )
}

/** Ink hero split: copy on the left, a white card (a form or an embedded application) on the right. */
export function FormSplit({ eyebrow, title, intro, aside, children, cardTitle, cardNote, dataKey }: {
  eyebrow: string; title: ReactNode; intro?: ReactNode; aside?: ReactNode; children: ReactNode; cardTitle?: string; cardNote?: ReactNode; dataKey?: string
}) {
  return (
    <section data-tone="ink" className="bg-ink-glow relative isolate overflow-hidden text-ink-foreground">
      <HeroRays id="form-rays" className="-bottom-24 -left-24 -z-10 w-[30rem] opacity-[0.12]" />
      <div className="mx-auto grid max-w-site gap-12 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="animate-rise">
          <Eyebrow onDark>{eyebrow}</Eyebrow>
          <h1 className="display text-[clamp(2.3rem,5vw,4rem)] leading-[1.04]">{title}</h1>
          {intro && <div className="mt-5 max-w-xl space-y-3 text-lg text-ink-foreground/80">{intro}</div>}
          {aside && <div className="mt-8">{aside}</div>}
        </div>
        <div className="min-w-0 self-start rounded-card bg-card p-6 text-foreground shadow-[0_30px_60px_-30px_hsl(0_0%_0%/0.5)] md:p-10" data-form-key={dataKey}>
          {cardTitle && <h2 className="display text-3xl">{cardTitle}</h2>}
          {cardNote && <div className="mt-1 mb-6 text-sm text-muted-foreground">{cardNote}</div>}
          {children}
        </div>
      </div>
    </section>
  )
}
