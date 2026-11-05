'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Search, X } from 'lucide-react'

export type SiteMapGroup = { id: string; title: string; note?: string; links: { label: string; href: string }[] }

const external = (h: string) => /^https?:/.test(h)

/** The /site-map/ groups with a filter box and jump chips. Every link is in the server HTML; filtering only hides. */
export function SiteMapBrowser({ groups }: { groups: SiteMapGroup[] }) {
  const [q, setQ] = useState('')
  const needle = q.trim().toLowerCase()
  const shown = useMemo(
    () => groups.map((g) => ({ ...g, links: needle ? g.links.filter((l) => `${l.label} ${l.href} ${g.title}`.toLowerCase().includes(needle)) : g.links })).filter((g) => g.links.length),
    [groups, needle],
  )
  const total = shown.reduce((n, g) => n + g.links.length, 0)
  return (
    <div>
      <div className="sticky top-16 z-20 -mx-5 border-b border-border bg-background/90 px-5 py-4 backdrop-blur md:mx-0 md:rounded-card md:border md:px-5">
        <label className="relative block">
          <span className="sr-only">Filter pages</span>
          <Search aria-hidden className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter pages, e.g. fees, nursing, Perth" className="h-12 w-full rounded-full border border-border bg-card pr-12 pl-12 outline-none focus:border-primary" />
          {q && <button type="button" onClick={() => setQ('')} aria-label="Clear filter" className="absolute top-1/2 right-3 grid size-8 -translate-y-1/2 place-items-center rounded-full hover:bg-blush"><X className="size-4" /></button>}
        </label>
        <div className="mt-3 flex items-center gap-2 overflow-x-auto [scrollbar-width:none]">
          <span className="label-mono shrink-0 text-muted-foreground" aria-live="polite">{total} pages</span>
          {shown.map((g) => <a key={g.id} href={`#${g.id}`} className="shrink-0 rounded-full bg-blush px-3 py-1 text-xs font-semibold hover:bg-primary">{g.title}</a>)}
        </div>
      </div>
      {shown.length === 0 && <p className="mt-10 text-center text-muted-foreground">No pages found. Try another word.</p>}
      <div className="mt-8 columns-1 gap-6 md:columns-2 xl:columns-3">
        {shown.map((g) => (
          <section key={g.id} id={g.id} className="mb-6 scroll-mt-40 break-inside-avoid rounded-card border border-border bg-card p-6">
            <h2 className="display text-2xl">{g.title}</h2>
            {g.note && <p className="mt-1 text-sm text-muted-foreground">{g.note}</p>}
            <ul className="mt-4 space-y-1.5">
              {g.links.map((l) => (
                <li key={l.href + l.label}>
                  {external(l.href)
                    ? <a href={l.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 text-[15px] hover:text-primary-strong">{l.label}<ArrowUpRight aria-hidden className="size-3.5 opacity-60" /></a>
                    : <Link href={l.href} className="text-[15px] hover:text-primary-strong hover:underline">{l.label}</Link>}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
