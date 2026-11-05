'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { CalendarDays, ChevronLeft, ChevronRight, LayoutGrid, List, MapPin, MonitorPlay, X } from 'lucide-react'
import { cn } from '@/lib/cn'
import type { CalData, CalEntry } from './load'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
// Brand-derived course colours (coral, gold, plum, teal, rose, amber, slate), assigned in order of first appearance.
const SWATCH = ['#d9483b', '#edab37', '#6d2e46', '#1f7a74', '#c2416b', '#9a5f12', '#41506b', '#7a4fb0']
/** Dark text on the light swatch (gold), white on the rest. */
const ink = (bg: string) => (bg === '#edab37' ? '#2b1419' : '#ffffff')

const longDate = (iso: string) => new Intl.DateTimeFormat('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`))

/**
 * The intake month calendar: month-by-month over the next 12 months, a course filter that doubles as the legend, and a grid or
 * list view (list on phones). Each intake links to its course page. Every intake of every month is in the server HTML.
 */
export function MonthCalendar({ data, initial }: { data: CalData; initial?: { year: number; month: number } | null }) {
  // A requested month (?month=&year=) opens first; otherwise the first month that has an intake.
  const has = (m: { year: number; month: number }) => data.entries.some((e) => e.date.startsWith(`${m.year}-${String(m.month).padStart(2, '0')}`))
  const start = Math.max(0, initial ? data.months.findIndex((m) => m.year === initial.year && m.month === initial.month) : data.months.findIndex(has))
  const [i, setI] = useState(start)
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [course, setCourse] = useState<string | null>(null)
  const courses = useMemo(() => [...new Map(data.entries.map((e) => [e.course, e])).keys()], [data.entries])
  const colour = (c: string) => SWATCH[courses.indexOf(c) % SWATCH.length]
  const { year, month } = data.months[i]
  const key = `${year}-${String(month).padStart(2, '0')}`
  const inMonth = data.entries.filter((e) => e.date.startsWith(key) && (!course || e.course === course))
  const counts = data.months.map((m) => data.entries.filter((e) => e.date.startsWith(`${m.year}-${String(m.month).padStart(2, '0')}`) && (!course || e.course === course)).length)

  const first = new Date(Date.UTC(year, month - 1, 1)).getUTCDay()
  const days = new Date(Date.UTC(year, month, 0)).getUTCDate()
  const cells = [...Array(first).fill(null), ...Array.from({ length: days }, (_, d) => d + 1)]
  while (cells.length % 7) cells.push(null)
  const byDay = (d: number) => inMonth.filter((e) => Number(e.date.slice(8, 10)) === d)

  return (
    <div>
      {/* Course filter = legend */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by course">
        <button type="button" aria-pressed={!course} onClick={() => setCourse(null)} className={cn('rounded-full px-4 py-2 text-sm font-semibold', !course ? 'bg-ink text-ink-foreground' : 'border border-border bg-card hover:border-primary')}>All courses</button>
        {courses.map((c) => (
          <button key={c} type="button" aria-pressed={course === c} onClick={() => setCourse(course === c ? null : c)} className={cn('inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors', course === c ? 'bg-ink text-ink-foreground' : 'border border-border bg-card hover:border-primary')}>
            <span aria-hidden className="size-2.5 rounded-full" style={{ backgroundColor: colour(c) }} />{c}{course === c && <X aria-hidden className="size-3.5" />}
          </button>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-card border border-border bg-card shadow-[0_24px_50px_-36px_hsl(348_35%_13%/0.45)]">
        {/* Month bar */}
        <div className="bg-ink flex flex-wrap items-center justify-between gap-4 px-5 py-4 text-ink-foreground md:px-7">
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setI(i - 1)} disabled={i === 0} aria-label="Previous month" className="grid size-10 place-items-center rounded-full bg-ink-foreground/10 hover:bg-primary hover:text-foreground disabled:opacity-30 disabled:hover:bg-ink-foreground/10 disabled:hover:text-ink-foreground"><ChevronLeft className="size-5" /></button>
            <h2 className="display min-w-[11ch] text-center text-2xl md:text-3xl" aria-live="polite">{MONTHS[month - 1]} <span className="text-secondary">{year}</span></h2>
            <button type="button" onClick={() => setI(i + 1)} disabled={i === data.months.length - 1} aria-label="Next month" className="grid size-10 place-items-center rounded-full bg-ink-foreground/10 hover:bg-primary hover:text-foreground disabled:opacity-30 disabled:hover:bg-ink-foreground/10 disabled:hover:text-ink-foreground"><ChevronRight className="size-5" /></button>
          </div>
          <div className="hidden gap-1 rounded-full bg-ink-foreground/10 p-1 md:flex" role="group" aria-label="View">
            {([['grid', LayoutGrid, 'Month'], ['list', List, 'List']] as const).map(([v, Icon, l]) => (
              <button key={v} type="button" aria-pressed={view === v} onClick={() => setView(v)} className={cn('inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold', view === v ? 'bg-card text-foreground' : 'text-ink-foreground/80')}><Icon aria-hidden className="size-4" />{l}</button>
            ))}
          </div>
        </div>
        {/* Month strip */}
        <ol className="flex gap-1.5 overflow-x-auto border-b border-border px-4 py-3 [scrollbar-width:thin]">
          {data.months.map((m, n) => (
            <li key={`${m.year}-${m.month}`}>
              <button type="button" onClick={() => setI(n)} aria-current={n === i ? 'true' : undefined} className={cn('flex flex-col items-center rounded-xl px-3 py-1.5 text-xs font-semibold whitespace-nowrap', n === i ? 'bg-primary text-foreground' : 'hover:bg-muted')}>
                {MONTHS[m.month - 1].slice(0, 3)} {String(m.year).slice(2)}
                <span className={cn('mt-0.5 text-[10px] font-normal', n === i ? 'text-foreground/80' : 'text-muted-foreground')}>{counts[n] ? `${counts[n]} intake${counts[n] === 1 ? '' : 's'}` : '—'}</span>
              </button>
            </li>
          ))}
        </ol>

        {/* Grid (md+) */}
        <div className={cn('hidden', view === 'grid' && 'md:block')}>
          <div className="grid grid-cols-7 border-b border-border bg-muted/60 text-center">
            {DAYS.map((d) => <div key={d} className="label-mono py-2 text-[10px] text-muted-foreground">{d}</div>)}
          </div>
          <div className="grid grid-cols-7">
            {cells.map((d, n) => {
              const list = d ? byDay(d) : []
              const isToday = d && `${key}-${String(d).padStart(2, '0')}` === data.today
              return (
                <div key={n} className={cn('min-h-28 border-r border-b border-border p-1.5 [&:nth-child(7n)]:border-r-0', !d && 'bg-muted/30', list.length > 0 && 'bg-blush/40')}>
                  {d && <p className={cn('mb-1 grid size-7 place-items-center rounded-full text-xs font-semibold', isToday ? 'bg-ink text-ink-foreground' : 'text-muted-foreground')}>{d}</p>}
                  <ul className="grid gap-1">
                    {list.map((e) => (
                      <li key={`${e.khId}-${e.campus}`}>
                        <Link href={e.path} title={`${e.course} · ${e.campus} · ${e.mode}`} className="block rounded-md px-1.5 py-1 text-[11px] leading-tight font-semibold transition-transform hover:-translate-y-0.5" style={{ backgroundColor: colour(e.course), color: ink(colour(e.course)) }}>
                          <span className="line-clamp-2">{e.course}</span>
                          <span className="block font-normal opacity-85">{e.campus}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>

        {/* List (phones, or chosen) */}
        <div className={cn('p-4 md:p-6', view === 'grid' && 'md:hidden')}>
          {inMonth.length ? (
            <ul className="grid gap-3">{inMonth.map((e) => <Row key={`${e.date}-${e.khId}-${e.campus}`} e={e} colour={colour(e.course)} />)}</ul>
          ) : (
            <p className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">No intakes{course ? ` for ${course}` : ''} in {MONTHS[month - 1]} {year}.{counts.some(Boolean) && <> <button type="button" onClick={() => setI(counts.findIndex(Boolean))} className="font-semibold text-primary-strong underline">Go to the next intake</button></>}</p>
          )}
        </div>
      </div>

      {/* Every intake, for crawlers and no-JS readers */}
      <div className="sr-only">
        <h2>All upcoming intakes</h2>
        <ul>{data.entries.map((e) => <li key={`${e.date}-${e.khId}-${e.campus}`}><a href={e.path}>{e.course}</a>: {longDate(e.date)}, IHM {e.campus}, {e.mode}</li>)}</ul>
      </div>
    </div>
  )
}

function Row({ e, colour }: { e: CalEntry; colour: string }) {
  const d = new Date(`${e.date}T00:00:00Z`)
  return (
    <li>
      <Link href={e.path} className="group/r flex items-center gap-4 rounded-2xl border border-border bg-card p-3 transition-all hover:-translate-y-0.5 hover:border-primary/50">
        <span className="grid w-16 shrink-0 overflow-hidden rounded-xl text-center" style={{ backgroundColor: colour, color: ink(colour) }}>
          <span className="bg-black/15 py-0.5 text-[10px] font-bold uppercase">{new Intl.DateTimeFormat('en-AU', { weekday: 'short', timeZone: 'UTC' }).format(d)}</span>
          <span className="display py-1 text-2xl leading-none">{d.getUTCDate()}</span>
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold group-hover/r:text-primary-strong">{e.course}</span>
          <span className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1"><CalendarDays aria-hidden className="size-3.5" />{longDate(e.date)}</span>
            <span className="inline-flex items-center gap-1"><MapPin aria-hidden className="size-3.5" />IHM, {e.campus}</span>
            <span className="inline-flex items-center gap-1"><MonitorPlay aria-hidden className="size-3.5" />{e.mode}</span>
          </span>
        </span>
        <ChevronRight aria-hidden className="size-5 shrink-0 text-muted-foreground" />
      </Link>
    </li>
  )
}
