import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import type { SectionProps } from '@/blocks/sectionFields'

const tones: Record<NonNullable<SectionProps['tone']>, string> = {
  default: 'bg-background text-foreground',
  card: 'bg-card text-card-foreground',
  muted: 'bg-muted text-foreground',
  ink: 'bg-ink text-ink-foreground',
  sunrise: 'bg-brand-wash text-foreground',
}

const spacings: Record<NonNullable<SectionProps['spacing']>, string> = {
  default: 'py-14 md:py-20',
  compact: 'py-8 md:py-12',
  none: 'py-0',
}

// Full-bleed background, 1320px inner column (05-design-system §4.2).
// depth > 0 (a block nested in tabs/accordion): no background and no container, the parent provides both.
// `data-tone` lets theme.css drop the top padding of a section that follows one with the same background, so stacked
// blocks keep one gap instead of two. `surface` overrides it when a className paints its own background (the hero wash).
export function Section({
  tone = 'default', spacing = 'default', anchorId, className, depth = 0, surface, children,
}: SectionProps & { className?: string; depth?: number; surface?: string; children: ReactNode }) {
  if (depth > 0) {
    return <div id={anchorId ?? undefined} className={cn('scroll-mt-24', spacing === 'none' ? 'py-0' : 'py-4', className)}>{children}</div>
  }
  return (
    <section id={anchorId ?? undefined} data-tone={surface ?? tone ?? 'default'} className={cn('scroll-mt-[88px]', tones[tone ?? 'default'], spacings[spacing ?? 'default'], className)}>
      <div className="mx-auto w-full max-w-site px-5 md:px-8">{children}</div>
    </section>
  )
}
