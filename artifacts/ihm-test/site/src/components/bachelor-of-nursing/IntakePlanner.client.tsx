'use client'

import { useState } from 'react'
import { ArrowUpRight, CalendarDays, MapPin } from 'lucide-react'
import { cn } from '@/lib/cn'
import { BN_APPLY, BN_CAMPUSES } from '@/content/bachelor-of-nursing'

const YEARS = [...new Set(BN_CAMPUSES.flatMap((c) => c.dates.map((d) => d.slice(0, 4))))].sort()
const toDate = (s: string) => { const [y, m, d] = s.split('-').map(Number); return new Date(Date.UTC(y, m - 1, d)) }
// Fixed locale and UTC so the server and the browser format identically (no hydration mismatch).
const fmt = (s: string, o: Intl.DateTimeFormatOptions) => toDate(s).toLocaleDateString('en-AU', { ...o, timeZone: 'UTC' })

/** Intake planner: year chips, then one card per campus listing that year's course commencement dates. */
export function IntakePlanner() {
  const [year, setYear] = useState(YEARS[0])
  return (
    <div>
      <div role="radiogroup" aria-label="Year" className="flex flex-wrap gap-2">
        {YEARS.map((y) => (
          <button key={y} type="button" role="radio" aria-checked={y === year} onClick={() => setYear(y)}
            className={cn('rounded-full px-4 py-2 text-sm font-semibold transition-colors', y === year ? 'bg-ink text-ink-foreground' : 'border border-border bg-card hover:border-primary')}>
            {y}
          </button>
        ))}
      </div>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {BN_CAMPUSES.map((c) => {
          const dates = c.dates.filter((d) => d.startsWith(year))
          return (
            <li key={c.id}>
              <article aria-labelledby={`campus-${c.id}`} className="flex h-full flex-col overflow-hidden rounded-card border border-border bg-card">
                <header className="bg-ink px-6 pt-6 pb-5 text-ink-foreground">
                  <p className="label-mono flex items-center gap-1.5 text-[10px] text-secondary"><MapPin aria-hidden className="size-3" />{c.state} campus</p>
                  <h3 id={`campus-${c.id}`} className="display mt-1 text-3xl">{c.name}</h3>
                  <p className="mt-1 text-xs text-ink-foreground/70">{dates.length} commencement {dates.length === 1 ? 'date' : 'dates'} in {year}</p>
                </header>
                <div className="flex-1 p-4">
                  {dates.length ? (
                    <ol className="ml-3 space-y-2 border-l-2 border-dashed border-primary/35 pl-4">
                      {dates.map((d) => (
                        <li key={d} className="relative grid grid-cols-[3rem_1fr] items-center gap-3 rounded-2xl border border-border bg-background p-3">
                          <span aria-hidden className="absolute top-1/2 -left-[23px] size-3 -translate-y-1/2 rounded-full border-2 border-card bg-primary" />
                          <span aria-hidden className="grid w-12 overflow-hidden rounded-lg border border-border text-center">
                            <span className="bg-primary py-0.5 text-[10px] font-semibold uppercase">{fmt(d, { month: 'short' })}</span>
                            <span className="display py-0.5 text-xl leading-tight">{fmt(d, { day: '2-digit' })}</span>
                          </span>
                          <span className="min-w-0 text-sm leading-tight">
                            <span className="font-semibold">{fmt(d, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            <span className="block text-[11px] text-muted-foreground">Course commencement</span>
                          </span>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <div className="flex h-full min-h-40 flex-col items-center justify-center rounded-2xl border border-dashed border-border p-6 text-center">
                      <CalendarDays aria-hidden className="size-6 text-muted-foreground" />
                      <p className="mt-2 text-sm font-semibold">No scheduled dates</p>
                      <p className="mt-1 text-xs text-muted-foreground">No {c.name} commencement dates are scheduled for {year}.</p>
                    </div>
                  )}
                </div>
                {dates.length > 0 && (
                  <a href={BN_APPLY} target="_blank" rel="noopener noreferrer" className="m-4 mt-0 inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary">
                    Apply now<ArrowUpRight aria-hidden className="size-4" /><span className="sr-only"> for {c.name} (opens in a new tab)</span>
                  </a>
                )}
              </article>
            </li>
          )
        })}
      </ul>
      <p className="mt-5 text-sm text-muted-foreground">Dates are from planning timetables and subject to institutional confirmation and campus availability; applying early does not guarantee a place.</p>
    </div>
  )
}
