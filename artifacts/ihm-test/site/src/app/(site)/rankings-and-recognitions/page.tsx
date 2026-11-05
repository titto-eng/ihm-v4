// /rankings-and-recognitions/ — WordPress page 5358: QILT Student Experience Survey results, the Webometrics ranking,
// professional affiliations, registration and the regulators. Copy in src/content/about.ts (RANKINGS, ABOUT).
import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowUpRight, Trophy } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { CountUp } from '@/components/home/CountUp.client'
import { AboutShell, Registration, Regulators } from '@/components/about/parts'
import { KitBlocks } from '@/components/page-kit/Kit'
import { Lead, heroBtn } from '@/components/student-support/parts'
import { RANKINGS as R } from '@/content/about'
import { legacyImage } from '@/lib/legacy-image'

export const metadata: Metadata = pageMetadata({
  title: 'Rankings and Recognitions',
  path: '/rankings-and-recognitions/',
  metaTitle: 'Rankings and Recognitions | QILT Top 10 Postgraduate Nursing | IHM',
  description: 'IHM ranks among Australia’s top 10 postgraduate nursing institutes in the QILT Student Experience Survey: 96% positive about skills development. Webometrics ranking, affiliations and registration.',
})

const LOGO: Record<string, string> = {
  CATSINaM: '/images/about/affiliates/catsinam.webp', 'Affiliate Gold': '/images/about/affiliates/affiliate-gold.webp', CAPHIA: '/images/about/affiliates/caphia.svg',
  'HEPP-QN': '/images/about/affiliates/hepp-qn.webp', PHAA: '/images/about/affiliates/phaa.webp', 'ieaa 20': '/images/about/affiliates/ieaa.svg',
  'WIL Australia': '/images/about/affiliates/wil-australia.webp', ANZSWWER: '/images/about/affiliates/anzswwer.webp', ACHSWE: '/images/about/affiliates/achswe.webp',
  AIDH: '/images/about/affiliates/aidh.webp', iteca: '/images/about/affiliates/iteca.webp', 'Koori Kinnections': '/images/about/affiliates/koori-kinnections.webp',
  ReconciliationWA: '/images/about/affiliates/reconciliation-wa.webp', 'WILLUM WARRAIN': '/images/about/affiliates/willum-warrain.webp',
  NATSIAACC: '/images/about/affiliates/natsiaacc.webp', 'IASSW AIETS': '/images/about/affiliates/iassw.webp',
}
const num = (s: string) => Number.parseFloat(s)

export default function RankingsRoute() {
  return (
    <AboutShell path="/rankings-and-recognitions/" eyebrow="Rankings and recognitions" title={<>Setting new benchmarks for <em className="text-secondary">excellence</em></>} intro={R.intro}
      actions={<a href={R.qiltUrl} target="_blank" rel="noopener noreferrer" className={heroBtn(true)}>Check the survey<ArrowUpRight aria-hidden className="size-4" /></a>}>
      <Section anchorId="qilt">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <Image src="/images/about/affiliates/qilt.svg" alt="QILT logo" width={180} height={60} className="mb-6 h-12 w-auto" unoptimized />
            <Lead eyebrow="QILT surveys" title={R.qiltTitle} />
            <KitBlocks blocks={R.qilt} />
          </div>
          <ul className="grid grid-cols-2 gap-3 lg:self-center">
            {R.stats.map(([v, l], i) => (
              <li key={l + i} className={i === 0 ? 'bg-brand-gradient col-span-2 rounded-card p-6 text-foreground' : 'rounded-card border border-border bg-card p-5'}>
                <CountUp value={num(v)} decimals={v.includes('.') ? 1 : 0} suffix="%" className={i === 0 ? 'display text-6xl' : 'display text-4xl text-primary-strong'} />
                <p className={i === 0 ? 'mt-1 font-semibold' : 'mt-1 text-sm text-muted-foreground'}>{l}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="ink" className="bg-ink-glow" anchorId="webometrics">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div><Trophy aria-hidden className="size-9 text-secondary" /><Lead onDark eyebrow="Webometrics" title={R.webTitle}>{R.web.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}</Lead></div>
          <div className="grid grid-cols-2 gap-4">{['/images/about/webometrics-1.svg', '/images/about/webometrics-2.svg'].map((s, i) => <Image key={s} src={s} alt={`IHM Webometrics ranking ${i + 1}`} width={600} height={600} className="h-auto w-full rounded-card bg-card p-3" unoptimized />)}</div>
        </div>
      </Section>

      <Section anchorId="affiliations">
        <Lead eyebrow="Professional affiliations" title="Affiliate member of" />
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {R.affiliates.map((n) => { const src = LOGO[n] ? legacyImage(LOGO[n], '') : ''; return (
            <li key={n} className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-card p-3 text-center transition-shadow hover:shadow-lg">
              {src ? <Image src={src} alt={`${n} logo`} width={160} height={90} className="h-14 w-full object-contain" unoptimized={src.endsWith('.svg')} /> : null}
              <span className={src ? 'text-[11px] font-semibold text-muted-foreground' : 'display text-lg'}>{n}</span>
            </li>
          ) })}
        </ul>
      </Section>

      <Registration tone="muted" />
      <Regulators tone="default" />
      <Section tone="sunrise" className="bg-sunrise-glow"><p className="display mx-auto max-w-4xl text-center text-2xl md:text-3xl">{R.closing}</p></Section>
    </AboutShell>
  )
}
