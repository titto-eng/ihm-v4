// /logo-statement/ — WordPress page 4926: what the IHM logo stands for — the Phoenix (innovation), the Shield (caring) and the
// Southern Cross (excellence). Artwork in public/images/about/logo-statement/. Copy in src/content/about.ts (LOGO_STATEMENT).
import type { Metadata } from 'next'
import Image from 'next/image'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { AboutShell } from '@/components/about/parts'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { LOGO_STATEMENT as L } from '@/content/about'
import { cn } from '@/lib/cn'

export const metadata: Metadata = pageMetadata({
  title: 'Logo Statement',
  path: '/logo-statement/',
  metaTitle: 'Our Logo Statement | Innovation, Caring and Excellence | IHM',
  description: 'The IHM logo: the Phoenix stands for innovation, the Shield for caring and the Southern Cross for excellence as an Australian institution.',
})

export default function LogoStatementRoute() {
  return (
    <AboutShell path="/logo-statement/" eyebrow="Logo statement" title={<>What our logo <em className="text-secondary">stands for</em></>} intro="Three symbols, three commitments: innovation, caring and excellence.">
      <Section>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="relative grid aspect-square place-items-center overflow-hidden rounded-[2rem] bg-sunrise-glow p-10">
            <Image src="/images/about/logo-statement/ihm-pattern.svg" alt="" fill className="object-cover opacity-30" unoptimized />
            <Image src="/brand/ihm-logo.svg" alt="IHM Australia logo" width={420} height={160} className="relative h-auto w-4/5" unoptimized />
          </div>
          <div>
            <Image src="/images/about/logo-statement/ihm-text.svg" alt="" width={400} height={80} className="mb-6 h-12 w-auto" unoptimized />
            <div className="grid grid-cols-2 gap-4">
              <Image src="/images/about/logo-statement/ihm-qilt.svg" alt="QILT top 10 postgraduate nursing institute" width={300} height={300} className="h-auto w-full rounded-card border border-border bg-card p-4" unoptimized />
              <Image src="/images/about/logo-statement/ihm-webometrics.svg" alt="Webometrics ranking" width={300} height={300} className="h-auto w-full rounded-card border border-border bg-card p-4" unoptimized />
            </div>
          </div>
        </div>
      </Section>
      {L.pillars.map((p, i) => (
        <Section key={p.title} tone={i % 2 ? 'default' : 'muted'} anchorId={p.title.toLowerCase()}>
          <div className={cn('grid grid-cols-1 items-center gap-10 lg:grid-cols-2', i % 2 && 'lg:[&>*:first-child]:order-2')}>
            <div className="grid place-items-center rounded-[2rem] bg-card p-10 ring-1 ring-border"><Image src={p.art} alt={`${p.title} artwork from the IHM logo`} width={480} height={480} className="h-auto w-full max-w-sm" unoptimized /></div>
            <div>
              <Image src={p.icon} alt="" width={64} height={64} className="mb-4 size-16" unoptimized />
              <Eyebrow>{String(i + 1).padStart(2, '0')}</Eyebrow>
              <h2 className="display text-display-md">{p.title}</h2>
              <p className="mt-4 text-xl leading-relaxed">{p.body}</p>
            </div>
          </div>
        </Section>
      ))}
    </AboutShell>
  )
}
