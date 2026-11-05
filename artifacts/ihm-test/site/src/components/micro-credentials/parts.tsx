import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'
import { MC_COURSES, MC_LINKS, mcArea, mcPath, type McCourse } from '@/content/micro-credentials'

// Shared pieces of the micro-credentials module (overview, 12 specialties, requirements, industry partners).

export const btnPrimary =
  'inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-[15px] font-semibold text-foreground shadow-[0_12px_28px_-14px_hsl(5_85%_55%/0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary'
export const btnLine =
  'inline-flex min-h-12 items-center gap-2 rounded-full border border-foreground/25 bg-card px-6 py-2.5 text-[15px] font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary-strong'
export const btnOnDark =
  'inline-flex min-h-12 items-center gap-2 rounded-full border border-ink-foreground/50 px-6 py-2.5 text-[15px] font-semibold transition-colors hover:border-secondary hover:text-secondary'

export function Enquire({ label = 'Enquire with IHM', className }: { label?: string; className?: string }) {
  return <Link href={MC_LINKS.contact} className={cn(btnPrimary, className)}>{label}<ArrowUpRight aria-hidden className="size-4" /></Link>
}

export function ApplyPortal({ label = 'Application portal', className = btnLine }: { label?: string; className?: string }) {
  return (
    <a href={MC_LINKS.apply} target="_blank" rel="noopener noreferrer" className={className}>
      {label}<ArrowUpRight aria-hidden className="size-4" /><span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

/** Mono eyebrow with the brand dash. */
export function Eyebrow({ children, onDark = false, className }: { children: ReactNode; onDark?: boolean; className?: string }) {
  return (
    <p className={cn('label-mono mb-4 flex items-center gap-3 text-[11px] tracking-[0.16em]', onDark ? 'text-secondary' : 'text-primary-strong', className)}>
      <span aria-hidden className="bg-brand-gradient h-0.5 w-8 shrink-0 rounded-full" />{children}
    </p>
  )
}

/** "To be confirmed" pill. */
export const Tbc = ({ children = 'To be confirmed' }: { children?: ReactNode }) => (
  <span className="label-mono inline-flex items-center rounded-full border border-dashed border-secondary-strong/50 bg-sand px-2.5 py-0.5 text-[10px] text-secondary-strong">{children}</span>
)

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="label-mono mb-6 text-[11px] tracking-[0.12em]">
      <ol className="flex flex-wrap items-center gap-2 text-muted-foreground">
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {it.href ? <Link href={it.href} className="hover:text-primary-strong">{it.label}</Link> : <span aria-current="page" className="text-foreground">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export const courseIndex = (slug: string) => MC_COURSES.findIndex((c) => c.slug === slug)

/** A specialty card: photo, area, number, title, tagline, audience, unit code. */
export function McCard({ course: c, className }: { course: McCourse; className?: string }) {
  const area = mcArea(c.area)
  return (
    <article className={cn('group/m relative flex h-full flex-col overflow-hidden rounded-card border border-border bg-card shadow-[0_1px_2px_hsl(348_35%_13%/0.04),0_18px_40px_-30px_hsl(348_35%_13%/0.35)] transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_28px_50px_-30px_hsl(5_60%_30%/0.5)]', className)}>
      <div className="relative aspect-[671/420] overflow-hidden bg-muted">
        <Image src={c.image} alt="" fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw" className="object-cover transition-transform duration-700 group-hover/m:scale-105" />
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/55 to-transparent" />
        <span className="label-mono absolute top-3 left-3 rounded-full bg-card/95 px-2.5 py-1 text-[10px] shadow-sm">{String(courseIndex(c.slug) + 1).padStart(2, '0')} / {MC_COURSES.length}</span>
        {area && <span className="absolute top-3 right-3 rounded-full bg-ink/80 px-2.5 py-1 text-[11px] font-semibold text-ink-foreground backdrop-blur">{area.label}</span>}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <span aria-hidden className="h-9 w-1 shrink-0 rounded-full" style={{ background: `linear-gradient(${c.accent}, #edab37)` }} />
          <h3 className="display text-2xl leading-tight">
            <Link href={mcPath(c.slug)} className="after:absolute after:inset-0 focus-visible:outline-none">{c.title}</Link>
          </h3>
        </div>
        <p className="mt-3 text-lg leading-snug text-foreground/75 italic">{c.tagline}</p>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{c.forWho}</p>
        <div className="mt-auto flex items-center justify-between border-t border-border pt-4 text-sm">
          <span className="text-xs text-muted-foreground">Based on unit <span className="font-semibold text-foreground">{c.unitCode}</span></span>
          <span aria-hidden className="inline-flex items-center gap-1.5 font-semibold text-primary-strong">Explore<ArrowRight className="size-4 transition-transform duration-300 group-hover/m:translate-x-1" /></span>
        </div>
      </div>
      <span aria-hidden className="bg-brand-gradient absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover/m:scale-x-100" />
    </article>
  )
}

/** FAQ accordion on native <details>: works without JS, every answer is in the HTML. */
export function Faq({ items }: { items: readonly (readonly [string, string])[] }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map(([q, a], i) => (
        <details key={q} className="group/f">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-left text-base font-semibold transition-colors hover:text-primary-strong md:text-lg [&::-webkit-details-marker]:hidden">
            <span className="flex items-start gap-5"><span className="label-mono mt-1.5 text-[11px] text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>{q}</span>
            <ChevronDown aria-hidden className="mt-1 size-5 shrink-0 text-primary-strong transition-transform duration-300 group-open/f:rotate-180" />
          </summary>
          <p className="max-w-3xl pb-7 pl-10 text-[15px] leading-relaxed text-muted-foreground">{a}</p>
        </details>
      ))}
    </div>
  )
}

export const faqJsonLd = (items: readonly (readonly [string, string])[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
})

/** Closing band shared by the module pages. */
export function McClosing({ heading, body, children }: { heading: ReactNode; body: string; children?: ReactNode }) {
  return (
    <section data-tone="sunrise" className="bg-sunrise-glow relative isolate overflow-hidden">
      <div className="mx-auto max-w-site px-5 py-16 text-center md:px-8 md:py-20">
        <h2 className="display mx-auto max-w-3xl text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.08] text-balance">{heading}</h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-foreground/80">{body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">{children ?? <Enquire className="bg-ink text-ink-foreground shadow-[0_16px_32px_-16px_hsl(348_35%_13%/0.8)] hover:bg-ink/90" />}</div>
      </div>
    </section>
  )
}
