import { AudienceOnly } from '@/components/audience/AudienceOnly'
import type { Audience } from '@/blocks/types'
import { cn } from '@/lib/cn'
import { factListsFor, type FactKey, type FactsCourse, type ResolvedFact } from './facts'

export { audiencesOf, courseFactsFor, factListsFor, hasCourseFacts, FACT_KEYS, FACT_LABELS, type FactKey, type FactsCourse, type ResolvedFact } from './facts'

/** strip: the BON row under a hero; cards: one card per fact (course template); compact: label/value rows for a sidebar. */
export type FactsVariant = 'strip' | 'cards' | 'compact'

type Props = {
  course: FactsCourse
  variant?: FactsVariant
  /** Render one audience only. Omitted: the course's audiences; a `both` course renders both lists and the site-wide
   *  audience switch (AudienceProvider + AudienceOnly) shows one. */
  audience?: Audience
  /** Restrict to these facts (display order stays FACT_KEYS order). */
  only?: readonly FactKey[] | null
  className?: string
}

function FactList({ facts, audience, className, variant = 'strip' }: { facts: ResolvedFact[]; audience?: Audience; className?: string; variant?: FactsVariant }) {
  if (variant === 'cards') {
    return (
      <dl className={cn('grid grid-cols-2 gap-3 md:grid-cols-[repeat(auto-fit,minmax(11rem,1fr))]', className)} data-course-facts="" data-audience={audience}>
        {facts.map((f) => (
          <div key={f.key} data-fact={f.key} className="rounded-2xl border border-border bg-card/90 p-4 shadow-[0_10px_30px_-24px_hsl(348_35%_13%/0.5)] backdrop-blur transition-transform hover:-translate-y-0.5">
            <dt className="label-mono text-[10px] tracking-widest text-muted-foreground">{f.label}</dt>
            <dd className="display mt-1.5 text-xl leading-tight">{f.value}</dd>
            {f.detail && <dd className="mt-1 text-xs text-muted-foreground">{f.detail}</dd>}
          </div>
        ))}
      </dl>
    )
  }
  if (variant === 'compact') {
    return (
      <dl className={cn('divide-y divide-current/10', className)} data-course-facts="" data-audience={audience}>
        {facts.map((f) => (
          <div key={f.key} data-fact={f.key} className="flex items-baseline justify-between gap-4 py-2.5">
            <dt className="label-mono shrink-0 text-[10px] tracking-widest opacity-70">{f.label}</dt>
            <dd className="text-right text-sm font-semibold">{f.value}{f.detail && <span className="block text-xs font-normal opacity-70">{f.detail}</span>}</dd>
          </div>
        ))}
      </dl>
    )
  }
  return (
    <dl
      className={cn('grid grid-cols-2 gap-x-6 gap-y-6 border-y border-border py-6 md:grid-cols-3 lg:grid-cols-4', className)}
      data-course-facts=""
      data-audience={audience}
    >
      {facts.map((f) => (
        <div key={f.key} data-fact={f.key}>
          <dt className="label-mono text-muted-foreground">{f.label}</dt>
          <dd className="display mt-1 text-xl md:text-2xl">{f.value}</dd>
          {f.detail && <dd className="mt-1 text-xs text-muted-foreground">{f.detail}</dd>}
        </div>
      ))}
    </dl>
  )
}

const same = (a: ResolvedFact[], b: ResolvedFact[]) => JSON.stringify(a) === JSON.stringify(b)

// BON key-facts strip (bon/index.html, the `dl` under the hero): mono label, display value, muted detail.
// Pure server component: drop it into any hand-written course page with the course doc (depth >= 1).
export function CourseFacts({ course, audience, only, className, variant }: Props) {
  const lists = factListsFor(course, audience, only)
  if (!lists.some((l) => l.facts.length)) return null
  if (lists.length === 1) return <FactList facts={lists[0].facts} audience={lists[0].audience} className={className} variant={variant} />
  // both audiences resolve to the same strip: render it once, no switch needed
  if (same(lists[0].facts, lists[1].facts)) return <FactList facts={lists[0].facts} className={className} variant={variant} />
  return (
    <>
      {lists.map((l) => (
        <AudienceOnly key={l.audience} audience={l.audience}>
          {l.facts.length ? <FactList facts={l.facts} audience={l.audience} className={className} variant={variant} /> : null}
        </AudienceOnly>
      ))}
    </>
  )
}
