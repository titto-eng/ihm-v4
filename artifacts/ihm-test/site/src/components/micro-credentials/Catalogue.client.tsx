'use client'

import { useMemo, useState, type ReactNode } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/cn'
import type { McArea, McCourse } from '@/content/micro-credentials'

// The twelve-specialty catalogue on /micro-credentials/: free-text search (title, unit code, settings, topics) and a care-area
// filter. Cards are rendered on the server and passed in, so every card is in the HTML; filtering only hides them.
export function Catalogue({ courses, areas, cards, empty }: { courses: McCourse[]; areas: McArea[]; cards: Record<string, ReactNode>; empty: ReactNode }) {
  const [area, setArea] = useState<string>('all')
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  const haystack = useMemo(
    () => Object.fromEntries(courses.map((c) => [c.slug, [c.title, c.unitCode, c.unitName, c.tagline, c.forWho, ...c.topics, ...c.settings].join(' ').toLowerCase()])),
    [courses],
  )
  const visible = courses.filter((c) => (area === 'all' || c.area === area) && (!q || haystack[c.slug].includes(q)))
  const filters = [{ id: 'all', label: 'All specialties', count: courses.length }, ...areas.map((a) => ({ id: a.id, label: a.label, count: courses.filter((c) => c.area === a.id).length }))]

  return (
    <div>
      <label className="relative mx-auto block max-w-2xl">
        <span className="sr-only">Search micro-credentials</span>
        <Search aria-hidden className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by specialty, unit code, setting or topic"
          className="h-14 w-full rounded-full border border-border bg-card pr-12 pl-14 text-base shadow-[0_18px_40px_-30px_hsl(348_35%_13%/0.4)] outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/25"
        />
        {query && (
          <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="absolute top-1/2 right-3 grid size-8 -translate-y-1/2 place-items-center rounded-full text-muted-foreground hover:bg-muted">
            <X className="size-4" />
          </button>
        )}
      </label>

      <div role="group" aria-label="Filter by care area" className="-mx-5 mt-6 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:justify-center md:px-0">
        {filters.map((f) => {
          const on = f.id === area
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={on}
              onClick={() => setArea(f.id)}
              className={cn(
                'shrink-0 rounded-full border px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all duration-300',
                on ? 'border-transparent bg-ink text-ink-foreground' : 'border-border bg-card hover:border-primary hover:text-primary-strong',
              )}
            >
              {f.label}<span className={cn('ml-2 rounded-full px-1.5 py-0.5 text-xs', on ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground')}>{f.count}</span>
            </button>
          )
        })}
      </div>

      <p className="label-mono mt-8 mb-6 text-center text-[11px] text-muted-foreground" aria-live="polite">Showing {visible.length} of {courses.length} micro-credentials</p>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <li key={c.slug} hidden={!visible.includes(c)}>{cards[c.slug]}</li>
        ))}
      </ul>
      {visible.length === 0 && (
        <div className="mt-2">
          {empty}
          <p className="mt-4 text-center">
            <button type="button" onClick={() => { setQuery(''); setArea('all') }} className="font-semibold text-primary-strong underline underline-offset-4">Show all twelve</button>
          </p>
        </div>
      )}
    </div>
  )
}
