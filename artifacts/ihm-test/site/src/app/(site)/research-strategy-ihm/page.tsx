// /research-strategy-ihm/ — Research Strategy 2026–2030: the five focus areas, key initiatives and the four priority research themes.
// Copy in src/content/research.ts (STRATEGY).
import type { Metadata } from 'next'
import { Cpu, Globe2, HeartPulse, Stethoscope } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { heroBtn } from '@/components/student-support/parts'
import { ResearchShell } from '@/components/research/parts'
import { STRATEGY as S } from '@/content/research'

const PATH = '/research-strategy-ihm/'

export const metadata: Metadata = pageMetadata({
  title: 'Research Strategy – IHM',
  path: PATH,
  metaTitle: 'Research Strategy 2026–2030 | IHM',
  description: 'IHM’s Research Strategy 2026–30: a sustainable research culture, more high-quality publications, support for early-career academics, collaboration and research-led teaching.',
})

const THEME_ICONS = [Stethoscope, HeartPulse, Cpu, Globe2]

export default function ResearchStrategyRoute() {
  return (
    <ResearchShell path={PATH} title={S.title} intro={S.initiatives}
      actions={<><a href="#focus" className={heroBtn(true)}>Strategic focus</a><a href="#themes" className={heroBtn()}>Research themes</a></>}>
      <Section anchorId="focus">
        <Eyebrow>2026–2030</Eyebrow>
        <h2 className="display text-display-md">{S.focusTitle}</h2>
        <ol className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {S.focus.map((f, i) => (
            <li key={f} className="relative overflow-hidden rounded-card border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary">
              <span aria-hidden className="display absolute -right-2 -top-4 text-8xl text-blush">{i + 1}</span>
              <p className="relative mt-10 font-semibold">{f}</p>
            </li>
          ))}
        </ol>
        <p className="bg-sunrise-glow mt-8 rounded-card p-6 text-lg font-semibold md:p-8">{S.initiatives}</p>
      </Section>

      <Section tone="muted" anchorId="themes">
        <Eyebrow>Research themes</Eyebrow>
        <h2 className="display max-w-3xl text-display-md">{S.themesIntro}</h2>
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {S.themes.map((t, i) => {
            const Icon = THEME_ICONS[i]
            return (
              <article key={t.t} className="rounded-card border border-border bg-card p-7">
                <div className="flex items-center gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-blush text-primary-strong"><Icon aria-hidden className="size-6" /></span><h3 className="display text-2xl leading-tight">{t.t}</h3></div>
                <ul className="mt-5 space-y-2.5">{t.items.map((x) => <li key={x} className="flex gap-2.5 text-[15px]"><span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />{x}</li>)}</ul>
              </article>
            )
          })}
        </div>
      </Section>
    </ResearchShell>
  )
}
