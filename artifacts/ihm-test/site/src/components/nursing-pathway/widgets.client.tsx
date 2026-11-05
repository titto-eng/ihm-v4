'use client'

import { useId, useState, type ReactNode } from 'react'
import Image from 'next/image'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { cn } from '@/lib/cn'
import { NP_FILTERS, NP_SPECS, type NpGroup } from '@/content/nursing-pathway'

/** Generic tab switcher: tab buttons (pre-rendered labels) and panels; every panel is in the HTML, inactive ones hidden. */
export function Switcher({ tabs, panels, onDark = false, className }: { tabs: { id: string; label: ReactNode }[]; panels: Record<string, ReactNode>; onDark?: boolean; className?: string }) {
  const [active, setActive] = useState(tabs[0]?.id)
  const base = useId()
  return (
    <div className={className}>
      <div role="tablist" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0">
        {tabs.map((t) => {
          const on = t.id === active
          return (
            <button
              key={t.id}
              id={`${base}-t-${t.id}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls={`${base}-p-${t.id}`}
              onClick={() => setActive(t.id)}
              className={cn(
                'shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-all duration-300',
                on ? (onDark ? 'bg-secondary text-foreground' : 'bg-ink text-ink-foreground') : onDark ? 'bg-ink-foreground/5 text-ink-foreground/80 ring-1 ring-ink-foreground/15 hover:bg-ink-foreground/10' : 'border border-border bg-card hover:border-primary',
              )}
            >
              {t.label}
            </button>
          )
        })}
      </div>
      {tabs.map((t) => (
        <div key={t.id} id={`${base}-p-${t.id}`} role="tabpanel" aria-labelledby={`${base}-t-${t.id}`} hidden={t.id !== active} className="mt-8">
          {panels[t.id]}
        </div>
      ))}
    </div>
  )
}

/** "Twelve ways in": filter chips, a numbered list, and the selected specialisation's detail card. */
export function SpecExplorer() {
  const [group, setGroup] = useState<NpGroup | 'all'>('all')
  const [active, setActive] = useState(0)
  const list = NP_SPECS.map((s, i) => ({ s, i })).filter(({ s }) => group === 'all' || s.group === group)
  const current = list.find((x) => x.i === active) ?? list[0]
  return (
    <div>
      <div role="group" aria-label="Filter specialisations" className="flex flex-wrap gap-2">
        {NP_FILTERS.map(([id, label]) => (
          <button key={id} type="button" aria-pressed={group === id} onClick={() => { setGroup(id); const first = NP_SPECS.findIndex((s) => id === 'all' || s.group === id); setActive(first) }}
            className={cn('rounded-full px-4 py-2 text-sm font-semibold transition-colors', group === id ? 'bg-ink text-ink-foreground' : 'border border-border bg-card hover:border-primary hover:text-primary-strong')}>
            {label}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
          {list.map(({ s, i }) => (
            <li key={s.title}>
              <button type="button" aria-pressed={current?.i === i} onClick={() => setActive(i)}
                className={cn('flex w-full items-center gap-4 rounded-2xl border px-4 py-3 text-left transition-all duration-300', current?.i === i ? 'border-transparent bg-ink text-ink-foreground shadow-lg' : 'border-border bg-card hover:border-primary')}>
                <span className={cn('label-mono text-xs', current?.i === i ? 'text-secondary' : 'text-primary-strong')}>{String(i + 1).padStart(2, '0')}</span>
                <span className="flex-1">
                  <span className="block font-semibold">{s.title}</span>
                  <span className={cn('block text-xs', current?.i === i ? 'text-ink-foreground/70' : 'text-muted-foreground')}>{s.settings}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
        {current && (
          <article key={current.s.title} className="animate-rise overflow-hidden rounded-card border border-border bg-card shadow-[0_24px_48px_-32px_hsl(348_35%_13%/0.45)] lg:sticky lg:top-28 lg:self-start">
            <div className="relative aspect-[16/9]">
              <Image src={current.s.image} alt="" fill sizes="(min-width: 1024px) 45vw, 92vw" className="object-cover" />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent" />
              <p className="label-mono absolute bottom-4 left-5 text-[11px] text-ink-foreground">Specialisation {String(current.i + 1).padStart(2, '0')} of 12</p>
            </div>
            <div className="p-6 md:p-8">
              <h3 className="display text-3xl">{current.s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-foreground/85">{current.s.summary}</p>
              <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-3">
                <div><dt className="label-mono text-[10px] text-muted-foreground">Suited to nurses working in</dt><dd className="mt-1 flex gap-1.5 font-semibold"><MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-primary-strong" />{current.s.settings}</dd></div>
                <div><dt className="label-mono text-[10px] text-muted-foreground">Structure</dt><dd className="mt-1">1 common core unit + 2 specialisation units · 26 weeks full-time / 52 weeks part-time</dd></div>
                <div><dt className="label-mono text-[10px] text-muted-foreground">Then</dt><dd className="mt-1">Pathway to Master of Nursing (Online), subject to admission and credit assessment</dd></div>
              </dl>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={current.s.course} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary">Unit details on IHM<ArrowUpRight aria-hidden className="size-4" /></a>
                <a href="#enquire" className="inline-flex items-center gap-2 rounded-full border border-foreground/25 px-5 py-2.5 text-sm font-semibold hover:border-primary">Enquire about this</a>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">Specialisation unit titles are listed on each official course page.</p>
            </div>
          </article>
        )}
      </div>
    </div>
  )
}
