'use client'

import { useId, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Search, X } from 'lucide-react'
import { cn } from '@/lib/cn'
import type { Person, PeopleTab } from '@/content/people'

/** A tab with each person's resolved portrait (CMS staff photo, then public/images/people, else initials). */
export type DirectoryTab = Omit<PeopleTab, 'groups'> & { groups: { title: string; people: (Person & { src?: string })[] }[] }

const initials = (name: string) =>
  name.replace(/^(Adjunct Prof\.|Assoc\. Prof\.|Professor Emeritus|Professor|Prof\.?|Dr\.?|Mr\.?|Ms\.?|Mrs\.?)\s*/i, '').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase()

const fold = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9 ]/g, '')

// /our-people/ directory: one tab per body (Board, Academic Board, Executive, Academic Staff) with the WordPress grouping, and a
// search that looks across every tab. All four panels are in the server HTML (inactive ones are `hidden`), so crawlers and
// no-JS visitors read every name.
export function PeopleDirectory({ tabs }: { tabs: DirectoryTab[] }) {
  const [active, setActive] = useState(tabs[0]?.id)
  const [query, setQuery] = useState('')
  const base = useId()
  const q = fold(query.trim())

  const results = useMemo(() => {
    if (q.length < 2) return null
    const seen = new Set<string>()
    const out: { person: DirectoryTab['groups'][number]['people'][number]; tab: string }[] = []
    for (const t of tabs) for (const g of t.groups) for (const p of g.people) {
      const key = `${fold(p.name)}|${fold(p.role)}`
      if (seen.has(key) || !fold(`${p.name} ${p.role} ${g.title}`).includes(q)) continue
      seen.add(key)
      out.push({ person: p, tab: t.label })
    }
    return out
  }, [q, tabs])

  return (
    <div>
      <div className="mb-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div role="tablist" aria-label="Teams" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0">
            {tabs.map((t) => {
              const on = !results && t.id === active
              const count = t.groups.reduce((n, g) => n + g.people.length, 0)
              return (
                <button
                  key={t.id}
                  id={`${base}-tab-${t.id}`}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  aria-controls={`${base}-panel-${t.id}`}
                  onClick={() => { setActive(t.id); setQuery('') }}
                  className={cn(
                    'shrink-0 rounded-full border px-5 py-2.5 text-[15px] font-semibold whitespace-nowrap transition-all duration-300',
                    on ? 'border-transparent bg-ink text-ink-foreground shadow-[0_12px_28px_-16px_hsl(348_35%_13%/0.8)]' : 'border-border bg-card hover:border-primary hover:text-primary-strong',
                  )}
                >
                  {t.label}
                  <span className={cn('ml-2 rounded-full px-2 py-0.5 text-xs', on ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground')}>{count}</span>
                </button>
              )
            })}
          </div>
          <label className="relative block w-full lg:max-w-xs">
            <span className="sr-only">Search people by name or role</span>
            <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or role"
              className="h-11 w-full rounded-full border border-border bg-card pr-10 pl-11 text-[15px] shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/25"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="absolute top-1/2 right-2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-muted-foreground hover:bg-muted">
                <X className="size-4" />
              </button>
            )}
          </label>
        </div>
      </div>

      {results && (
        <div aria-live="polite">
          <p className="label-mono mb-6 text-[11px] text-muted-foreground">{results.length} {results.length === 1 ? 'person' : 'people'} match “{query.trim()}”</p>
          {results.length ? (
            <ul className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
              {results.map(({ person, tab }, i) => <li key={`${person.name}-${i}`}><PersonCard person={person} note={tab} /></li>)}
            </ul>
          ) : (
            <p className="rounded-card border border-dashed border-border bg-card p-8 text-center text-muted-foreground">No one matches that search. Try a surname or a role such as “lecturer”.</p>
          )}
        </div>
      )}

      {tabs.map((t) => (
        <div key={t.id} id={`${base}-panel-${t.id}`} role="tabpanel" aria-labelledby={`${base}-tab-${t.id}`} hidden={!!results || t.id !== active}>
          <p className="mb-10 max-w-2xl text-lg text-muted-foreground">{t.intro}</p>
          <div className="space-y-14">
            {t.groups.map((g) => (
              <section key={g.title || t.id} aria-label={g.title || t.label}>
                {g.title && (
                  <h3 className="mb-6 flex items-center gap-3 text-sm font-semibold tracking-wide text-primary-strong uppercase">
                    <span aria-hidden className="bg-brand-gradient h-0.5 w-8 rounded-full" />
                    {g.title}
                    <span className="label-mono text-[10px] text-muted-foreground normal-case">{g.people.length}</span>
                  </h3>
                )}
                <ul className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
                  {g.people.map((p, i) => <li key={`${p.name}-${i}`} className="animate-rise" style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }}><PersonCard person={p} /></li>)}
                </ul>
              </section>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const LINKS = [
  { key: 'linkedin', label: 'LinkedIn', short: 'in' },
  { key: 'orcid', label: 'ORCID', short: 'iD' },
  { key: 'scholar', label: 'Google Scholar', short: 'GS' },
] as const

function PersonCard({ person: p, note }: { person: Person & { src?: string }; note?: string }) {
  return (
    <article className="group/p relative flex h-full flex-col overflow-hidden rounded-card border border-border bg-card shadow-[0_1px_2px_hsl(348_35%_13%/0.04),0_18px_40px_-30px_hsl(348_35%_13%/0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_-30px_hsl(5_60%_30%/0.5)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-blush">
        {p.src ? (
          <Image src={p.src} alt={`Portrait of ${p.name}`} fill sizes="(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 46vw" className="object-cover transition-transform duration-700 group-hover/p:scale-105" />
        ) : (
          <div aria-hidden className="bg-brand-wash grid h-full place-items-center">
            <span className="display grid size-20 place-items-center rounded-full bg-card/80 text-3xl text-primary-strong shadow-sm ring-1 ring-primary/20 sm:size-24 sm:text-4xl">{initials(p.name)}</span>
          </div>
        )}
        {p.src && <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/35 to-transparent" />}
        {note && <span className="label-mono absolute top-3 left-3 rounded-full bg-card/95 px-2.5 py-1 text-[9px] shadow-sm">{note}</span>}
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h4 className="display text-lg leading-snug sm:text-xl">
          {p.bio ? <Link href={p.bio} className="after:absolute after:inset-0 focus-visible:outline-none">{p.name}</Link> : p.name}
        </h4>
        <p className="mt-1.5 text-sm leading-snug text-muted-foreground">{p.role}</p>
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
          {LINKS.map((l) => p.links?.[l.key] && (
            <a key={l.key} href={p.links[l.key]} target="_blank" rel="noopener noreferrer" className="label-mono relative z-10 grid size-8 place-items-center rounded-full border border-border text-[10px] font-semibold transition-colors hover:border-primary hover:bg-primary hover:text-foreground" title={l.label}>
              {l.short}<span className="sr-only"> {l.label} profile of {p.name} (opens in a new tab)</span>
            </a>
          ))}
          {p.bio && (
            <span aria-hidden className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-primary-strong group-hover/p:underline">
              Bio<ArrowUpRight className="size-4" />
            </span>
          )}
        </div>
      </div>
      <span aria-hidden className="bg-brand-gradient absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover/p:scale-x-100" />
    </article>
  )
}
