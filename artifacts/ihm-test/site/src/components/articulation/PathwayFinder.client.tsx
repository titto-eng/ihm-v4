'use client'

import { useState } from 'react'
import { ArrowRight, ChevronDown, CircleCheck, Mail, MapPin, Search, X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { FLOWS, MAIL_STUDENT, PATHWAYS, type Field, type Pathway } from '@/content/articulation'

const hay = (p: Pathway) => [p.destination, p.code, p.field, p.credit, p.progression, ...p.eligible.flatMap((e) => [e.code, e.title])].join(' ').toLowerCase()
const byId = (id: string) => PATHWAYS.find((p) => p.id === id)!

// Pathway Finder on /articulation-pathway/: field chips + free-text search (qualification name or code) over the two
// diploma-to-degree flows and the four course detail panels. Everything is in the server HTML; filtering only hides.
export function PathwayFinder() {
  const [field, setField] = useState<'All' | Field>('All')
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState<string | null>(PATHWAYS[0].id)
  const q = query.trim().toLowerCase()
  const match = (p: Pathway) => (field === 'All' || p.field === field) && (!q || hay(p).includes(q))
  const flows = FLOWS.filter((f) => match(byId(f.from)) || match(byId(f.to)))
  const any = PATHWAYS.some(match)

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div role="group" aria-label="Field of study" className="flex flex-wrap gap-2">
          {(['All', 'Nursing', 'Community services'] as const).map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={field === f}
              onClick={() => setField(f)}
              className={cn('rounded-full px-4 py-2 text-sm font-semibold transition-colors', field === f ? 'bg-secondary text-foreground' : 'bg-ink-foreground/5 text-ink-foreground/80 ring-1 ring-ink-foreground/15 hover:bg-ink-foreground/10')}
            >
              {f === 'All' ? 'All fields' : f}
            </button>
          ))}
        </div>
        <label className="relative block w-full lg:ml-auto lg:max-w-sm">
          <span className="sr-only">Search by qualification name or code</span>
          <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-foreground/50" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Qualification or code, e.g. CHC33021"
            className="h-11 w-full rounded-full border border-ink-foreground/20 bg-ink-foreground/5 pr-10 pl-11 text-[15px] text-ink-foreground outline-none placeholder:text-ink-foreground/45 focus:border-secondary"
          />
          {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="absolute top-1/2 right-2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-ink-foreground/60 hover:bg-ink-foreground/10"><X className="size-4" /></button>}
        </label>
      </div>

      {!any && (
        <div className="mt-8 rounded-card border border-dashed border-ink-foreground/25 p-8 text-center" aria-live="polite">
          <p className="display text-2xl">No documented pathway matches that yet.</p>
          <p className="mx-auto mt-2 max-w-lg text-ink-foreground/75">That doesn&apos;t mean your learning won&apos;t count. A Pathway Advisor can look at your record individually.</p>
          <a href={MAIL_STUDENT} className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-semibold text-foreground"><Mail aria-hidden className="size-4" />Email a Pathway Advisor</a>
        </div>
      )}

      <div className="mt-8 grid gap-6">
        {FLOWS.map((f) => {
          const a = byId(f.from), b = byId(f.to)
          return (
            <div key={f.label} hidden={!flows.includes(f)} className="rounded-card border border-ink-foreground/15 bg-ink-foreground/[0.04] p-5 md:p-7">
              <p className="label-mono mb-4 text-[11px] tracking-[0.14em] text-secondary">{f.label}</p>
              <div className="grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr]">
                <FlowStep n="01" step={`Step 1 · ${a.institute}`} title={a.destination} sub={a.code ?? ''} line={`Entry from ${a.eligible.length} eligible certificate-level ${a.eligible.length === 1 ? 'qualification' : 'qualifications'}`} onView={() => setOpen(a.id)} target={a.id} />
                <div className="flex flex-col items-center justify-center gap-2 px-2 text-center lg:w-56">
                  <ArrowRight aria-hidden className="size-6 rotate-90 text-secondary lg:rotate-0" />
                  <p className="text-sm font-semibold">{f.credit}</p>
                  <p className="text-xs text-ink-foreground/60">Credit assessed individually, in writing</p>
                  <p className="rounded-full bg-ink-foreground/10 px-3 py-1 text-xs">{f.require}</p>
                </div>
                <FlowStep n="02" step={`Step 2 · ${b.institute}`} title={b.destination} sub={b.field} line={b.progression} onView={() => setOpen(b.id)} target={b.id} accent />
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        {(['Diploma', 'Bachelor'] as const).map((inst) => {
          const list = PATHWAYS.filter((p) => p.institute === inst)
          const shown = list.filter(match)
          return (
            <div key={inst}>
              <h3 className="display mb-4 text-2xl">{inst === 'Diploma' ? 'Diploma courses' : 'Bachelor degrees'}</h3>
              <div className="space-y-3">
                {list.map((p) => {
                  const isOpen = open === p.id
                  return (
                    <div key={p.id} id={p.id} hidden={!shown.includes(p)} className="scroll-mt-28 overflow-hidden rounded-2xl bg-card text-foreground">
                      <h4>
                        <button type="button" aria-expanded={isOpen} aria-controls={`${p.id}-panel`} onClick={() => setOpen(isOpen ? null : p.id)} className="flex w-full items-start justify-between gap-4 p-5 text-left">
                          <span>
                            <span className="label-mono block text-[10px] text-muted-foreground">{p.institute} · {p.field}{p.code ? ` · ${p.code}` : ''}</span>
                            <span className="display mt-1 block text-xl">{p.destination}</span>
                          </span>
                          <ChevronDown aria-hidden className={cn('mt-2 size-5 shrink-0 text-muted-foreground transition-transform duration-300', isOpen && 'rotate-180')} />
                        </button>
                      </h4>
                      <dl id={`${p.id}-panel`} hidden={!isOpen} className="grid gap-4 border-t border-border p-5 text-sm">
                        <Row label="Eligible qualifications">
                          <ul className="space-y-1.5">
                            {p.eligible.map((e) => (
                              <li key={`${e.code}-${e.title}`} className="flex flex-wrap items-baseline gap-2">
                                {e.code && <span className="label-mono rounded bg-muted px-1.5 py-0.5 text-[10px]">{e.code}</span>}
                                <span>{e.title}</span>
                                {e.note && <span className="text-xs text-muted-foreground">({e.note})</span>}
                              </li>
                            ))}
                          </ul>
                        </Row>
                        <Row label="Destination">{p.code ? `${p.code} ` : ''}{p.destination}</Row>
                        <Row label="Credit">{p.credit}</Row>
                        <Row label="Progression">{p.progression}</Row>
                        <Row label="Conditions">
                          <ul className="space-y-1.5">{p.conditions.map((c) => <li key={c} className="flex gap-2"><CircleCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-primary-strong" />{c}</li>)}</ul>
                        </Row>
                        <Row label="Locations and modes"><span className="flex gap-2"><MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-primary-strong" />{p.locations}</span></Row>
                      </dl>
                    </div>
                  )
                })}
                {shown.length === 0 && <p className="rounded-2xl border border-dashed border-ink-foreground/25 p-5 text-sm text-ink-foreground/70">No {inst === 'Diploma' ? 'diploma' : 'bachelor degree'} courses match your current filters.</p>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function FlowStep({ n, step, title, sub, line, target, onView, accent = false }: { n: string; step: string; title: string; sub: string; line: string; target: string; onView: () => void; accent?: boolean }) {
  return (
    <a href={`#${target}`} onClick={onView} className={cn('group/s flex flex-col rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-0.5', accent ? 'bg-brand-gradient text-foreground' : 'bg-card text-foreground')}>
      <span className="label-mono text-[10px] opacity-70">{n} · {step}</span>
      <span className="display mt-2 text-2xl">{title}</span>
      {sub && <span className="mt-0.5 text-sm font-semibold opacity-75">{sub}</span>}
      <span className="mt-3 text-sm opacity-80">{line}</span>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold">View course details<ArrowRight aria-hidden className="size-4 transition-transform group-hover/s:translate-x-1" /></span>
    </a>
  )
}

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="grid gap-1 sm:grid-cols-[150px_1fr] sm:gap-4">
    <dt className="label-mono text-[10px] text-muted-foreground sm:pt-0.5">{label}</dt>
    <dd className="leading-relaxed">{children}</dd>
  </div>
)
