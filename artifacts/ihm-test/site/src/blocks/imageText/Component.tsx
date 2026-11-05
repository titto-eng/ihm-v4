import Image from '@/components/blocks/MediaImage'
import type { ImageTextBlock as Block } from '@/payload-types'
import { Section } from '@/components/layout/Section'
import { Prose, proseClassName } from '@/components/layout/Prose'
import { CtaRow } from '@/components/CtaLink'
import { Emphasis } from '@/components/Emphasis'
import { Badge } from '@/components/ui/badge'
import { mediaOf } from '@/components/blocks/media'
import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'
import type { BlockProps } from '../types'

// `children` replaces the Lexical `content` on hardcoded pages (src/components/page).
export function ImageTextView({ block, ctx, children }: BlockProps<Block> & { children?: ReactNode }) {
  const image = mediaOf(block.media)
  const right = block.imageSide === 'right'
  return (
    <Section tone={block.tone ?? 'default'} spacing={block.spacing ?? 'default'} anchorId={block.anchorId} depth={ctx?.depth}>
      <div className={cn('grid items-center gap-10 lg:gap-16', image && 'lg:grid-cols-[0.9fr_1.1fr]')}>
        {image && (
          <div className={cn('relative pb-3 md:pb-4', right ? 'pr-3 md:pr-4 lg:order-2' : 'pl-3 md:pl-4')}>
          {/* offset brand frame behind the photo, kept inside the column so it never widens the page */}
          <span aria-hidden className={cn('bg-brand-gradient absolute top-3 bottom-0 rounded-card opacity-30 md:top-4', right ? 'right-0 left-3 md:left-4' : 'right-3 left-0 md:right-4')} />
          <figure className="relative overflow-hidden rounded-card bg-muted">
            <Image src={image.url!} alt={image.alt ?? ''} width={image.width ?? 1200} height={image.height ?? 960} sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[5/4] w-full object-cover" />
            {block.imageCaption && (
              <figcaption className="label-mono absolute bottom-3 left-3 rounded-full bg-foreground/70 px-3 py-1 text-[10px] tracking-widest text-background">
                {block.imageCaption}
              </figcaption>
            )}
          </figure>
          </div>
        )}
        <div>
          {block.eyebrow && (
            <p className="label-mono mb-5 flex items-center gap-3 text-primary-strong">
              <span aria-hidden className="bg-brand-gradient h-0.5 w-8 shrink-0 rounded-full" />{block.eyebrow}
            </p>
          )}
          {block.heading && <h2 className="display mb-6 text-display-md"><Emphasis text={block.heading} /></h2>}
          {children ? <div className={cn(proseClassName, 'max-w-none')}>{children}</div> : <Prose data={block.content} className="max-w-none" />}
          {block.chips && block.chips.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {block.chips.map((c, i) => (
                <li key={c.id ?? i}><Badge variant="outline" className="rounded-full border-border bg-card px-4 py-2 text-sm font-medium">{c.text}</Badge></li>
              ))}
            </ul>
          )}
          <CtaRow items={block.ctas} />
        </div>
      </div>
    </Section>
  )
}

export const ImageText = (props: BlockProps<Block>) => <ImageTextView {...props} />
