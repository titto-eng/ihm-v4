'use client'

import { useState } from 'react'
import { ArrowUpRight, BookOpen, ChevronDown, Search } from 'lucide-react'
import type { LibraryUnit } from '@/content/library-guides'

/** A course's core units as expandable panels of readings, with a filter over unit names, authors and titles. */
export function UnitReadings({ units }: { units: LibraryUnit[] }) {
  const [q, setQ] = useState('')
  const term = q.trim().toLowerCase()
  const match = (s: string) => s.toLowerCase().includes(term)
  const list = units
    .map((u) => ({ ...u, books: !term || match(`${u.code} ${u.title}`) ? u.books : u.books.filter((b) => match(`${b.author} ${b.title}`)) }))
    .filter((u) => !term || match(`${u.code} ${u.title}`) || u.books.length)
  return (
    <div>
      <label className="relative block max-w-xl">
        <span className="sr-only">Filter units and readings</span>
        <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter by unit, author or title…" className="h-12 w-full rounded-full border border-border bg-card pr-4 pl-11 outline-none focus:border-primary focus:ring-2 focus:ring-primary/25" />
      </label>
      <p className="label-mono mt-4 text-[11px] text-muted-foreground" aria-live="polite">{list.length} {list.length === 1 ? 'unit' : 'units'} · {list.reduce((n, u) => n + u.books.length, 0)} readings</p>
      <ul className="mt-4 grid gap-3">
        {list.map((u) => (
          <li key={`${u.code}-${u.title}`}>
            <details className="group/d overflow-hidden rounded-card border border-border bg-card open:shadow-[0_24px_48px_-36px_hsl(348_35%_13%/0.45)]" open={Boolean(term)}>
              <summary className="flex cursor-pointer list-none items-center gap-4 p-5 [&::-webkit-details-marker]:hidden">
                {u.code && <span className="label-mono shrink-0 rounded-full bg-ink px-3 py-1 text-[10px] text-secondary">{u.code}</span>}
                <span className="min-w-0 flex-1 font-semibold">{u.title}</span>
                <span className="hidden text-sm text-muted-foreground sm:inline">{u.books.length} readings</span>
                <ChevronDown aria-hidden className="size-5 shrink-0 transition-transform group-open/d:rotate-180" />
              </summary>
              {u.books.length ? (
                <ul className="grid gap-3 border-t border-border bg-muted/40 p-5 sm:grid-cols-2 lg:grid-cols-3">
                  {u.books.map((b) => (
                    <li key={b.url + b.title}>
                      <a href={b.url} target="_blank" rel="noopener noreferrer" className="group/b flex h-full flex-col rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/50">
                        <BookOpen aria-hidden className="size-5 text-primary-strong" />
                        <span className="mt-2 text-sm font-semibold">{b.author}</span>
                        <span className="mt-1 flex-1 text-sm text-muted-foreground">{b.title}</span>
                        <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-strong">Click to view<ArrowUpRight aria-hidden className="size-4" /></span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : <p className="border-t border-border p-5 text-sm text-muted-foreground">Readings for this unit are coming soon. Search the catalogue above.</p>}
            </details>
          </li>
        ))}
      </ul>
    </div>
  )
}
