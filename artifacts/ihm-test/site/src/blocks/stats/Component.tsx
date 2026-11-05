import type { StatsBlock as Block } from '@/payload-types'
import { Section } from '@/components/layout/Section'
import { SectionHeader } from '@/components/blocks/SectionHeader'
import { cn } from '@/lib/cn'
import type { BlockProps } from '../types'

const cols: Record<number, string> = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4', 5: 'md:grid-cols-5', 6: 'md:grid-cols-3 lg:grid-cols-6' }

export function Stats({ block, ctx }: BlockProps<Block>) {
  const items = block.items ?? []
  if (!items.length) return null
  const dark = block.tone === 'ink'
  return (
    <Section tone={block.tone ?? 'default'} spacing={block.spacing ?? 'default'} anchorId={block.anchorId} depth={ctx?.depth}>
      <SectionHeader heading={block.heading} onDark={dark} />
      <dl className={cn('grid grid-cols-2 gap-y-10', cols[Math.min(Math.max(items.length, 2), 6)])}>
        {items.map((s, i) => (
          <div key={s.id ?? i} className={cn('px-5 md:px-8', i > 0 && 'md:border-l', dark ? 'border-ink-foreground/20' : 'border-border')}>
            {/* plain string, not cn(): tailwind-merge would read text-display-stat as a colour and drop it */}
            <dd className={`display text-display-stat ${dark ? (i % 2 ? 'text-secondary' : 'text-primary') : i % 2 ? 'text-secondary-strong' : 'text-primary-strong'}`}>{s.value}</dd>
            <dt className="label-mono mt-2">{s.label}</dt>
            {s.note && <dd className={cn('mt-1 text-sm', dark ? 'text-ink-foreground/70' : 'text-muted-foreground')}>{s.note}</dd>}
          </div>
        ))}
      </dl>
    </Section>
  )
}
