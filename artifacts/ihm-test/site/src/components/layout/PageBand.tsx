import type { ReactNode } from 'react'
import { HeroRays } from '@/blocks/hero/Component'
import { Container } from './Container'

// Title band for templates that render their own h1 (course listing, blog/news, search): the same brand wash, emblem
// rays and coral-to-gold rule as the hero block, so every page opens the same way.
export function PageBand({ eyebrow, title, intro, narrow, children }: { eyebrow?: string; title: ReactNode; intro?: ReactNode; narrow?: boolean; children?: ReactNode }) {
  return (
    <header className="bg-brand-wash relative isolate overflow-hidden py-12 md:py-16">
      <HeroRays id="band-rays" className="-top-24 -right-24 -z-10 w-[24rem] opacity-[0.13] md:-top-32 md:right-[-4rem] md:w-[32rem]" />
      <span aria-hidden className="bg-brand-gradient absolute inset-x-0 bottom-0 -z-10 h-1 opacity-80" />
      <Container narrow={narrow}>
        {eyebrow && (
          <p className="label-mono mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-card/80 px-3.5 py-1.5 text-primary-strong shadow-sm ring-1 ring-primary/20">
            <span aria-hidden className="bg-brand-gradient size-1.5 rounded-full" />{eyebrow}
          </p>
        )}
        <h1 className="display text-display-md">{title}</h1>
        <span aria-hidden className="bg-brand-gradient mt-6 block h-1 w-16 rounded-full" />
        {intro && <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{intro}</p>}
        {children}
      </Container>
    </header>
  )
}
