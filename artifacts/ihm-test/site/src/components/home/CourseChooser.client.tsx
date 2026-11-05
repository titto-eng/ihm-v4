'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Clock, GraduationCap } from 'lucide-react'
import { cn } from '@/lib/cn'

export type ChooserCourse = { title: string; href: string; duration: string; award: 'Awarded' | 'Non-Awarded'; image: string; enrol: string }
export type ChooserGroup = { id: string; label: string; blurb?: string; courses: ChooserCourse[] }

// "Choose the best course for you!" (WordPress front page, #courseSelect): one tab per school, course cards with the
// duration, award type and an Enrol link. All panels are in the server HTML; inactive ones are hidden, not removed.
export function CourseChooser({ groups }: { groups: ChooserGroup[] }) {
  const [active, setActive] = useState(groups[0]?.id)
  return (
    <div>
      <div role="tablist" aria-label="Schools" className="-mx-5 mb-10 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0">
        {groups.map((g) => {
          const on = g.id === active
          return (
            <button
              key={g.id}
              id={`tab-${g.id}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls={`panel-${g.id}`}
              onClick={() => setActive(g.id)}
              className={cn(
                'shrink-0 rounded-full border px-5 py-3 text-[15px] font-semibold whitespace-nowrap transition-all duration-300',
                on ? 'border-transparent bg-ink text-ink-foreground shadow-[0_12px_28px_-16px_hsl(348_35%_13%/0.8)]' : 'border-border bg-card hover:border-primary hover:text-primary-strong',
              )}
            >
              {g.label}
              <span className={cn('ml-2 rounded-full px-2 py-0.5 text-xs', on ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground')}>{g.courses.length}</span>
            </button>
          )
        })}
      </div>
      {groups.map((g) => (
        <div key={g.id} id={`panel-${g.id}`} role="tabpanel" aria-labelledby={`tab-${g.id}`} hidden={g.id !== active}>
          {g.blurb ? <p className="mb-8 max-w-2xl text-muted-foreground">{g.blurb}</p> : null}
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {g.courses.map((c, i) => (
              <li key={c.href} className="animate-rise" style={{ animationDelay: `${i * 70}ms` }}>
                <article className="group/c relative flex h-full flex-col overflow-hidden rounded-card border border-border bg-card shadow-[0_1px_2px_hsl(348_35%_13%/0.04),0_18px_40px_-28px_hsl(348_35%_13%/0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_-30px_hsl(5_60%_30%/0.5)]">
                  <div className="relative aspect-[671/520] overflow-hidden bg-muted">
                    <Image src={c.image} alt="" fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw" className="object-cover transition-transform duration-700 group-hover/c:scale-105" />
                    <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/60 to-transparent" />
                    <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-card/95 px-3 py-1 text-sm font-semibold shadow-sm">
                      <Clock aria-hidden className="size-3.5 text-primary-strong" />{c.duration}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="display text-2xl leading-snug">
                      <Link href={c.href} className="after:absolute after:inset-0 focus-visible:outline-none">{c.title}</Link>
                    </h3>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                      <span className={cn('label-mono inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px]', c.award === 'Awarded' ? 'bg-sand text-secondary-strong' : 'bg-blush text-primary-strong')}>
                        <GraduationCap aria-hidden className="size-3.5" />{c.award}
                      </span>
                      <a href={c.enrol} target="_blank" rel="noopener noreferrer" className="relative z-10 inline-flex items-center gap-1 text-sm font-semibold text-primary-strong underline-offset-4 hover:underline">
                        Enrol now<ArrowUpRight aria-hidden className="size-4" /><span className="sr-only"> in {c.title} (opens in a new tab)</span>
                      </a>
                    </div>
                  </div>
                  <span aria-hidden className="bg-brand-gradient absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover/c:scale-x-100" />
                </article>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
