import type { IframeEmbedBlock as Block } from '@/payload-types'
import { Section } from '@/components/layout/Section'
import { site } from '@/content/site'
import { hostAllowed } from '../embeds'
import type { BlockProps } from '../types'

// Presentational part: receives the allowlist (DEC-5). Renders nothing if the host is not allowed.
export function IframeEmbedView({ block, ctx, allowedHosts }: BlockProps<Block> & { allowedHosts: string[] }) {
  if (!hostAllowed(block.url, allowedHosts)) {
    if (process.env.NODE_ENV !== 'production') console.warn(`[iframeEmbed] host not in allowedEmbedHosts, skipped: ${block.url}`)
    return null
  }
  return (
    <Section tone={block.tone ?? 'default'} spacing={block.spacing ?? 'default'} anchorId={block.anchorId} depth={ctx?.depth}>
      <iframe
        src={block.url}
        title={block.title}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        height={block.height ?? undefined}
        className={block.height ? 'w-full rounded-card border border-border' : 'aspect-video w-full rounded-card border border-border'}
      />
    </Section>
  )
}

export function IframeEmbed(props: BlockProps<Block>) {
  return <IframeEmbedView {...props} allowedHosts={[...site.allowedEmbedHosts]} />
}
