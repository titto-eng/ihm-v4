import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BadgeCheck } from 'lucide-react'
import { FORM_END_ANCHOR } from '@/components/templates/landing/shared'
import { cn } from '@/lib/cn'
import type { CourseOffer } from '@/content/landing-enquiry-ihm'

/** One course on a multi-course landing page: photo, pitch, key facts, eligibility, "Enquire now" (to #enquiry-end) and course link. */
export function CourseOfferCard({ c, flip = false }: { c: CourseOffer; flip?: boolean }) {
  return (
    <article id={`course-${c.n}`} className="scroll-mt-24 overflow-hidden rounded-card border border-border bg-card">
      <div className={cn('grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr]', flip && 'md:[&>*:first-child]:order-2')}>
        <div className="relative min-h-56">
          <Image src={c.image} alt={c.title} fill sizes="(min-width: 768px) 30vw, 92vw" className="object-cover" />
          <span className="display absolute top-4 left-4 grid size-12 place-items-center rounded-full bg-ink/85 text-xl text-secondary backdrop-blur">{c.n}</span>
        </div>
        <div className="p-6 md:p-8">
          <h3 className="display text-2xl leading-tight md:text-3xl">{c.title}</h3>
          <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-muted-foreground">{c.body.map((b) => <p key={b.slice(0, 20)}>{b}</p>)}</div>
          {c.highlight && <p className="mt-4 rounded-2xl bg-blush px-4 py-3 text-[15px] font-semibold">{c.highlight}</p>}
          {c.note && <p className="mt-3 text-sm italic text-muted-foreground">{c.note}</p>}
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`#${FORM_END_ANCHOR}`} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 font-semibold text-foreground hover:bg-secondary">Enquire now!</a>
            <Link href={c.href} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-5 font-semibold hover:border-primary">Course details<ArrowRight aria-hidden className="size-4" /></Link>
          </div>
        </div>
      </div>
      <dl className="grid grid-cols-[repeat(auto-fit,minmax(9.5rem,1fr))] gap-px border-t border-border bg-border">
        {c.facts.map((f) => <div key={f.label} className="bg-card p-4"><dt className="label-mono text-muted-foreground">{f.label}</dt><dd className="mt-1 font-semibold">{f.value}</dd></div>)}
      </dl>
      <details className="group border-t border-border">
        <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-4 font-semibold md:px-8 [&::-webkit-details-marker]:hidden">Eligibility<span aria-hidden className="text-primary-strong transition-transform group-open:rotate-45">+</span></summary>
        <div className="space-y-3 px-6 pb-6 text-[15px] md:px-8">
          {c.eligibilityIntro && <p>{c.eligibilityIntro}</p>}
          <ul className="space-y-2">{c.eligibility.map((e) => <li key={e} className="flex gap-2.5"><BadgeCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-primary-strong" />{e}</li>)}</ul>
          {c.eligibilitySub && <ul className="ml-8 list-disc space-y-1 pl-4 text-muted-foreground">{c.eligibilitySub.map((e) => <li key={e}>{e}</li>)}</ul>}
          {c.englishTitle && <p className="pt-2 font-semibold">{c.englishTitle}</p>}
          {c.english && <ul className="ml-1 list-disc space-y-1 pl-5">{c.english.map((e) => <li key={e}>{e}</li>)}</ul>}
          {c.englishNote && <p className="text-muted-foreground">{c.englishNote}</p>}
        </div>
      </details>
    </article>
  )
}
