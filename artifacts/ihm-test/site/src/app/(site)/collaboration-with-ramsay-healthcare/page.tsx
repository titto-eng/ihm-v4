// /collaboration-with-ramsay-healthcare/ — IHM as Ramsay Health Care's valued partner, and "The Ramsay Way".
// Copy in src/content/partnerships.ts (RAMSAY).
import type { Metadata } from 'next'
import Image from 'next/image'
import { HeartHandshake } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { heroBtn } from '@/components/student-support/parts'
import { Feature, PartnerCards, PartnerShell } from '@/components/research/parts'
import { legacyImage } from '@/lib/legacy-image'
import { RAMSAY as R } from '@/content/partnerships'

const PATH = '/collaboration-with-ramsay-healthcare/'

export const metadata: Metadata = pageMetadata({
  title: 'Collaboration with Ramsay Healthcare',
  path: PATH,
  metaTitle: 'Collaboration with Ramsay Health Care | IHM',
  description: "IHM is a valued partner of Ramsay Health Care, Australia's largest private hospital operator: industry expertise, clinical placements and Education for Employment.",
})

export default function RamsayRoute() {
  return (
    <PartnerShell path={PATH} title={R.title} intro="Australia's largest private hospital operator and IHM: building a highly skilled healthcare workforce together."
      image={{ src: legacyImage('/images/partnerships/ramsay-1.webp', '/images/partnerships/cintana-arizona.webp'), alt: 'IHM and Ramsay Health Care partnership' }}
      actions={<a href="#ramsay-way" className={heroBtn(true)}>The Ramsay Way</a>}>
      <Section>
        <div className="flex flex-col items-start gap-6 rounded-card border border-border bg-card p-7 md:flex-row md:items-center md:p-10">
          <div className="relative h-24 w-28 shrink-0"><Image src="/images/partnerships/ramsay-logo.webp" alt="Ramsay Health Care logo" fill sizes="112px" className="object-contain" /></div>
          <p className="display text-2xl leading-snug md:text-3xl">IHM is a <span className="text-primary-strong">valued partner</span> of Ramsay Health Care.</p>
        </div>
      </Section>

      {R.sections.map((s, i) => (
        <Section key={s.title} tone={i % 2 ? 'default' : 'muted'}>
          <Feature title={s.title} body={<p>{s.body}</p>} image={{ src: legacyImage(s.image.src, '/images/partnerships/cintana-arizona.webp'), alt: s.image.alt }} flip={i % 2 === 1} />
        </Section>
      ))}

      <section data-tone="ink" id="ramsay-way" className="bg-ink-glow scroll-mt-24 text-ink-foreground">
        <div className="mx-auto grid max-w-site grid-cols-1 gap-10 px-5 py-16 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <HeartHandshake aria-hidden className="size-10 text-secondary" />
            <Eyebrow onDark>Shared values</Eyebrow>
            <h2 className="display text-display-md">{R.valuesTitle}</h2>
            <ul className="mt-6 flex flex-wrap gap-2">{R.valueTags.map((t) => <li key={t} className="rounded-full bg-ink-foreground/10 px-4 py-2 text-sm font-semibold">{t}</li>)}</ul>
          </div>
          <p className="text-lg leading-relaxed text-ink-foreground/80">{R.values}</p>
        </div>
      </section>

      <PartnerCards except={PATH} title="Explore our other partners" />
    </PartnerShell>
  )
}
