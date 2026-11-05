'use client'

import { useEffect, useState } from 'react'
import { CalendarDays } from 'lucide-react'
import type { KeyDateYear } from '@/content/key-dates'
import { cn } from '@/lib/cn'

/** Year tabs for /key-dates/. Each panel keeps the old `#nav-<year>` anchor; the latest year opens by default. */
export function KeyDatesTabs({ years }: { years: KeyDateYear[] }) {
  const [active, setActive] = useState(years[years.length - 1]?.year)
  useEffect(() => {
    const sync = () => { const m = /^#nav-(\d{4})/.exec(window.location.hash); if (m && years.some((y) => y.year === m[1])) setActive(m[1]) }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [years])
  return (
    <div>
      <div role="tablist" aria-label="Year" className="inline-flex rounded-full border border-border bg-card p-1">
        {years.map((y) => (
          <button key={y.year} role="tab" id={`tab-${y.year}`} aria-selected={active === y.year} aria-controls={`nav-${y.year}`} onClick={() => { setActive(y.year); history.replaceState(null, '', `#nav-${y.year}`) }}
            className={cn('rounded-full px-5 py-2 text-sm font-semibold transition-colors', active === y.year ? 'bg-ink text-ink-foreground' : 'hover:text-primary-strong')}>{y.year}</button>
        ))}
      </div>
      {years.map((y) => (
        <div key={y.year} id={`nav-${y.year}`} role="tabpanel" aria-labelledby={`tab-${y.year}`} hidden={active !== y.year} className="mt-8 scroll-mt-32">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {y.intakes.map((it) => (
              <article key={it.name} className="animate-rise overflow-hidden rounded-card border border-border bg-card">
                <header className="flex items-center gap-3 bg-ink px-5 py-4 text-ink-foreground"><CalendarDays aria-hidden className="size-5 text-secondary" /><h3 className="font-semibold">{it.name}</h3></header>
                <dl className="divide-y divide-border">
                  {it.rows.map(([k, v]) => (
                    <div key={k} className={cn('flex items-baseline justify-between gap-4 px-5 py-2.5 text-sm', k === 'Census Date' && 'bg-blush/60')}>
                      <dt className="text-muted-foreground">{k}</dt><dd className="text-right font-semibold tabular-nums">{v}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
