import Image from '@/components/blocks/MediaImage'
import type { HeroBlock as HeroBlockType } from '@/payload-types'
import { mediaOf } from '@/components/blocks/media'
import { pickSize } from '@/lib/media-sizes'
import { Section } from '@/components/layout/Section'
import { CtaRow } from '@/components/CtaLink'
import { Emphasis } from '@/components/Emphasis'
import { AudienceSwitch } from '@/components/audience/AudienceSwitch'
import { cn } from '@/lib/cn'
import type { BlockProps } from '../types'

// Sun rays from the IHM emblem, a soft decoration behind the hero copy (hidden from assistive tech).
export const HeroRays = ({ className, id = 'hero-rays' }: { className?: string; id?: string }) => (
  <svg viewBox="0 0 400 400" className={cn('pointer-events-none absolute', className)} aria-hidden="true">
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#edab37" />
        <stop offset="1" stopColor="#f15c4e" />
      </linearGradient>
    </defs>
    <g fill={`url(#${id})`}>
      {/* the rays turn once every two minutes and the core breathes (theme.css .sun-rays / .sun-core; off for reduced motion) */}
      <g className="sun-rays">
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x="192" y="8" width="16" height="120" rx="8" transform={`rotate(${i * 30} 200 200)`} />
        ))}
      </g>
      <circle cx="200" cy="200" r="46" className="sun-core" />
    </g>
  </svg>
)

const Pulse = () => (
  <svg viewBox="0 0 600 40" className="my-8 h-8 w-full max-w-[520px] text-primary" aria-hidden="true">
    <path d="M0 20 H190 L208 20 L222 4 L240 36 L256 20 H600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

type SlideOptions = {
  /** The page h1 by default; carousel slides after the first use h2. */
  headingAs?: 'h1' | 'h2'
  /** Preload the image (the first screen); later carousel slides load lazily. */
  priority?: boolean
}

/** Copy and image of a split / compact hero, without the section: one hero, or one slide of `HeroCarousel`. */
export function HeroContent({ block, headingAs = 'h1', priority = true }: { block: HeroBlockType } & SlideOptions) {
  const image = mediaOf(block.image)
  const pic = pickSize(image, 'hero')
  const variant = block.variant === 'compact' ? 'compact' : 'split'
  const dark = block.tone === 'ink'
  const split = variant === 'split'
  const H = headingAs
  const rise = headingAs === 'h1'
  return (
    <div className={cn('grid gap-10', split && pic && 'lg:grid-cols-[1.15fr_1fr] lg:items-center')}>
      <HeroCopy block={block} dark={dark} split={split} compact={!split} centered={false} H={H} rise={rise} />
      {split && pic && (
        <div className="relative">
          <div className="bg-sunrise-glow absolute -top-6 -right-10 h-[110%] w-[85%] rounded-bl-[120px] sm:-top-10 sm:-right-24 sm:h-[115%] sm:rounded-bl-[180px]" aria-hidden />
          <figure className="relative mx-auto aspect-[4/3] w-full max-w-[520px] overflow-hidden sm:aspect-[4/5] lg:mr-0 rounded-t-[999px] rounded-b-card shadow-[0_40px_80px_-30px_hsl(5_60%_30%/0.45)] ring-1 ring-white/60">
            <Image src={pic.url} alt={pic.alt} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" style={{ objectPosition: pic.position }} priority={priority} />
            {block.imageCaption && (
              <figcaption className="label-mono absolute bottom-3 left-3 rounded-full bg-foreground/70 px-3 py-1 text-[10px] tracking-widest text-background">
                {block.imageCaption}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </div>
  )
}

function HeroCopy({ block, dark, split, compact, centered, H, rise }: { block: HeroBlockType; dark: boolean; split: boolean; compact: boolean; centered: boolean; H: 'h1' | 'h2'; rise: boolean }) {
  return (
    <div className={cn('relative z-10 flex flex-col justify-center', centered && 'items-center text-center')}>
      {block.eyebrow && (
        <p className={cn('label-mono mb-6 inline-flex w-fit max-w-full items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] tracking-[0.14em] sm:text-xs sm:tracking-[0.2em]', dark ? 'bg-ink-foreground/10 text-secondary' : 'bg-card/80 text-primary-strong shadow-sm ring-1 ring-primary/20')}>
          <span aria-hidden className="bg-brand-gradient size-1.5 rounded-full" />
          {block.eyebrow}
        </p>
      )}
      <H className={cn('display', rise && 'animate-rise', compact ? 'text-display-md' : 'text-display-xl')}>
        <Emphasis text={block.heading} tone={dark ? 'secondary' : 'primary'} />
      </H>
      {split ? <Pulse /> : <span aria-hidden className={cn('bg-brand-gradient mt-6 block h-1 w-16 rounded-full', centered && 'mx-auto')} />}
      {block.subheading && (
        <p className={cn('max-w-2xl text-lg leading-relaxed', rise && 'animate-rise [animation-delay:120ms]', !split && 'mt-6', dark ? 'text-ink-foreground/75' : 'text-muted-foreground')}>
          {block.subheading}
        </p>
      )}
      <CtaRow items={block.ctas} onDark={dark} className={cn('mt-8 flex flex-wrap items-center gap-3', centered && 'justify-center')} />
      {block.audienceSwitch && <AudienceSwitch className="mt-10" onDark={dark} />}
    </div>
  )
}

export function Hero({ block, ctx }: BlockProps<HeroBlockType>) {
  const image = mediaOf(block.image)
  const pic = pickSize(image, 'hero')
  const variant = block.variant ?? 'split'

  if (variant === 'full' && pic) {
    return (
      <Section tone="ink" spacing={block.spacing ?? 'default'} anchorId={block.anchorId} depth={ctx?.depth} className="relative isolate overflow-hidden">
        <Image src={pic.url} alt={pic.alt} fill sizes="100vw" className="-z-20 object-cover" style={{ objectPosition: pic.position }} priority />
        <div className="absolute inset-0 -z-10 bg-ink/75" aria-hidden />
        <div className="max-w-3xl py-10 md:py-20">
          <HeroCopy block={block} dark split={false} compact={false} centered={false} H="h1" rise />
        </div>
      </Section>
    )
  }

  // A hero without its own tone gets the brand wash and the emblem rays; an explicit tone (muted, ink, ...) is kept.
  const washed = !block.tone || block.tone === 'default'
  return (
    <Section
      tone={block.tone ?? 'default'}
      spacing={block.spacing ?? 'default'}
      anchorId={block.anchorId}
      depth={ctx?.depth}
      surface={washed ? 'hero' : undefined}
      className={cn('relative isolate overflow-hidden', washed && 'bg-brand-wash')}
    >
      {washed && !ctx?.depth && (
        <>
          <HeroRays className={cn('-z-10 opacity-[0.13]', variant === 'compact' ? '-top-24 -right-24 w-[26rem] md:-top-32 md:right-[-4rem] md:w-[34rem]' : '-bottom-40 -left-40 w-[30rem]')} />
          <span aria-hidden className="bg-brand-gradient absolute inset-x-0 bottom-0 -z-10 h-1 opacity-80" />
        </>
      )}
      {variant === 'full' ? (
        <HeroCopy block={block} dark={block.tone === 'ink'} split={false} compact={false} centered H="h1" rise />
      ) : (
        <HeroContent block={block} />
      )}
    </Section>
  )
}
