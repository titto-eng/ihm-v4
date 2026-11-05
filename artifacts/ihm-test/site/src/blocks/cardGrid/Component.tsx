import Image from '@/components/blocks/MediaImage'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { CardGridBlock as Block } from '@/payload-types'
import { Section } from '@/components/layout/Section'
import { SectionHeader } from '@/components/blocks/SectionHeader'
import { CardCarousel } from '@/components/blocks/CardCarousel'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mediaOf } from '@/components/blocks/media'
import { cn } from '@/lib/cn'
import type { BlockProps } from '../types'

type CardData = NonNullable<Block['cards']>[number]

function CardItem({ card }: { card: CardData }) {
  const image = mediaOf(card.image)
  const inner = (
    <Card className={cn('group/card relative h-full gap-0 overflow-hidden py-0 transition-[transform,box-shadow] duration-300', card.href && 'hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_hsl(5_60%_30%/0.45)]')}>
      {/* brand rule: always on text-only cards, grows in on hover over image cards */}
      <span aria-hidden className={cn('bg-brand-gradient absolute inset-x-0 top-0 z-10 h-1 origin-left transition-transform duration-500', image ? 'scale-x-0 group-hover/card:scale-x-100' : 'scale-x-100')} />
      {image && <Image src={image.url!} alt={image.alt ?? ''} width={image.width ?? 800} height={image.height ?? 600} sizes="(min-width: 1024px) 30vw, 90vw" className="aspect-[4/3] w-full object-cover" />}
      <CardContent className="flex flex-1 flex-col gap-3 p-6 md:p-8">
        {card.badge && <Badge variant="secondary" className="label-mono w-fit rounded-full px-3 text-[10px] tracking-widest">{card.badge}</Badge>}
        <h3 className="display flex items-start justify-between gap-3 text-2xl leading-snug">
          {card.title}
          {card.href && <ArrowUpRight aria-hidden className="mt-1 size-5 shrink-0 text-primary-strong transition-transform group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />}
        </h3>
        {card.body && <p className="text-muted-foreground">{card.body}</p>}
      </CardContent>
    </Card>
  )
  if (!card.href) return inner
  const external = /^https?:\/\//i.test(card.href)
  const cls = 'block h-full rounded-card focus-visible:outline-2 focus-visible:outline-offset-2'
  return external
    ? <a href={card.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
    : <Link href={card.href} className={cls}>{inner}</Link>
}

const grid: Record<string, string> = { '2': 'md:grid-cols-2', '3': 'md:grid-cols-2 lg:grid-cols-3', '4': 'sm:grid-cols-2 lg:grid-cols-4' }

export function CardGrid({ block, ctx }: BlockProps<Block>) {
  const cards = block.cards ?? []
  const cols = block.columns ?? '3'
  const items = cards.map((c, i) => <CardItem key={c.id ?? i} card={c} />)
  return (
    <Section tone={block.tone ?? 'default'} spacing={block.spacing ?? 'default'} anchorId={block.anchorId} depth={ctx?.depth}>
      <SectionHeader heading={block.heading} intro={block.intro} onDark={block.tone === 'ink'} />
      {block.variant === 'carousel' ? (
        <CardCarousel perView={cols === '2' ? 2 : cols === '4' ? 4 : 3} label={block.heading ?? 'Cards'}>{items}</CardCarousel>
      ) : (
        <div className={cn('grid grid-cols-1 gap-6', grid[cols])}>{items}</div>
      )}
    </Section>
  )
}
