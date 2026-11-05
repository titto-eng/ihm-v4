'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import { cn } from '@/lib/cn'

// Interactive parts of /school-of-social-work/conference-2026/ (DEC-36), as on the microsite: the program by day, the stream filter
// and the "read before you begin" notice that opens once per visit. Without JavaScript every day and every stream stays readable.

export function ProgramTabs({ days }: { days: [string, [string, string][]][] }) {
  const [active, setActive] = useState(0)
  return (
    <div>
      <div role="tablist" aria-label="Conference days" className="grid grid-cols-2 gap-2">
        {days.map(([day], i) => {
          const [label, date] = day.split(/\s+—\s+/)
          return (
            <button key={day} type="button" role="tab" aria-selected={i === active} aria-controls={`day-${i}`} id={`day-tab-${i}`} onClick={() => setActive(i)}
              className={cn('rounded-xl px-5 py-4 text-left transition-colors', i === active ? 'bg-secondary text-secondary-foreground' : 'bg-ink-foreground/[0.06] text-ink-foreground ring-1 ring-ink-foreground/15 hover:bg-ink-foreground/10')}>
              <span className="block font-semibold">{label}</span>
              <span className="block text-xs opacity-80">{date}</span>
            </button>
          )
        })}
      </div>
      {days.map(([day, rows], i) => (
        <section key={day} role="tabpanel" id={`day-${i}`} aria-labelledby={`day-tab-${i}`} className={cn('mt-6', i !== active && 'hidden')}>
          <h3 className="display text-2xl">{day}</h3>
          <ol className="mt-4 divide-y divide-ink-foreground/15 border-y border-ink-foreground/15">
            {rows.map(([time, item]) => (
              <li key={time + item} className="flex gap-6 py-3 text-[15px]">
                <span className="label-mono w-14 shrink-0 pt-0.5 text-[12px] text-secondary">{time}</span>
                <span className="text-ink-foreground/90">{item}</span>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  )
}

const FILTERS = [
  { key: 'all', label: 'All streams', test: () => true },
  { key: 'd1', label: 'Day 1 · A–E', test: (l: string) => l <= 'E' },
  { key: 'd2', label: 'Day 2 · F–J', test: (l: string) => l > 'E' },
] as const

export function StreamFilter({ streams }: { streams: [string, string][] }) {
  const [f, setF] = useState<(typeof FILTERS)[number]['key']>('all')
  const filter = FILTERS.find((x) => x.key === f)!
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="group" aria-label="Filter streams" className="flex flex-wrap gap-2">
          {FILTERS.map((x) => (
            <button key={x.key} type="button" aria-pressed={x.key === f} onClick={() => setF(x.key)}
              className={cn('rounded-full px-4 py-2 text-sm font-semibold transition-colors', x.key === f ? 'bg-ink text-ink-foreground' : 'bg-card text-foreground ring-1 ring-border hover:ring-primary')}>
              {x.label}
            </button>
          ))}
        </div>
        <p className="label-mono text-[11px] text-muted-foreground">{streams.filter(([l]) => filter.test(l)).length} streams</p>
      </div>
      <ul className="mt-6 flex flex-wrap justify-center gap-4 [&>li]:w-full sm:[&>li]:w-[calc((100%-1rem)/2)] lg:[&>li]:w-[calc((100%-2rem)/3)]">
        {streams.filter(([l]) => filter.test(l)).map(([letter, name]) => (
          <li key={letter} className="relative overflow-hidden rounded-card bg-card p-6 shadow-[8px_8px_0_0_hsl(38_83%_57%/0.35)]">
            <span className="display text-3xl text-primary-strong">{letter}</span>
            <p className="mt-3 font-semibold leading-snug">{name}</p>
            <p className="label-mono mt-2 text-[10px] text-muted-foreground">{letter <= 'E' ? 'Day 1 · Monday 16 November' : 'Day 2 · Tuesday 17 November'}</p>
            <span aria-hidden className="bg-brand-gradient absolute inset-x-0 bottom-0 h-1" />
          </li>
        ))}
      </ul>
    </div>
  )
}

/** The microsite's notice: 1.5 s after load, once per browser session; links to the submission guidance PDF. */
export function ConferenceNotice({ image, href, alt }: { image: string; href: string; alt: string }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    let seen = false
    try { seen = sessionStorage.getItem('ssw-conference-notice') === '1' } catch { /* storage blocked: show it */ }
    if (seen) return
    const t = setTimeout(() => {
      ref.current?.showModal()
      try { sessionStorage.setItem('ssw-conference-notice', '1') } catch { /* ignore */ }
    }, 1500)
    return () => clearTimeout(t)
  }, [])
  const close = () => ref.current?.close()
  return (
    <dialog ref={ref} aria-label="Before you begin" onClick={(e) => { if (e.target === ref.current) close() }}
      className="m-auto w-[min(92vw,44rem)] overflow-visible rounded-card bg-transparent p-0 backdrop:bg-ink/70 backdrop:backdrop-blur-sm">
      <div className="relative">
        <a href={href} target="_blank" rel="noopener" className="block overflow-hidden rounded-card shadow-2xl">
          <Image src={image} alt={alt} width={1200} height={920} sizes="44rem" className="h-auto w-full" />
        </a>
        <button type="button" onClick={close} aria-label="Close" className="absolute -top-4 -right-4 grid size-10 place-items-center rounded-full bg-card text-foreground shadow-lg ring-1 ring-border hover:bg-secondary">
          <X aria-hidden className="size-5" />
        </button>
      </div>
    </dialog>
  )
}
