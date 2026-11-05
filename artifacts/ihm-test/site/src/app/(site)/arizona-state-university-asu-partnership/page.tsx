// /arizona-state-university-asu-partnership/ — "Powered by ASU": rankings posters, the partnership video, study-abroad campuses and
// what students and faculty gain. Copy in src/content/partnerships.ts (ASU).
import type { Metadata } from 'next'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { VideoGallery } from '@/components/media/VideoGallery.client'
import { heroBtn } from '@/components/student-support/parts'
import { Feature, PartnerCards, PartnerShell } from '@/components/research/parts'
import { legacyImage } from '@/lib/legacy-image'
import { ASU as A } from '@/content/partnerships'

const PATH = '/arizona-state-university-asu-partnership/'

export const metadata: Metadata = pageMetadata({
  title: 'Arizona State University (ASU) Partnership',
  path: PATH,
  metaTitle: 'Arizona State University (ASU) Partnership | Powered by ASU | IHM',
  description: 'IHM is Powered by ASU, the most innovative university in the U.S.: study abroad in Phoenix, Washington D.C. or Los Angeles, coordinated programmes and faculty research collaboration.',
})

export default function AsuPartnershipRoute() {
  const rankings = A.rankings.map((r) => ({ ...r, src: legacyImage(r.src, '') })).filter((r) => r.src)
  return (
    <PartnerShell path={PATH} eyebrow="Powered by ASU" title={A.title}
      image={{ src: '/images/partnerships/cintana-arizona.webp', alt: 'IHM and partner leaders at the ASU partnership launch' }}
      actions={<><a href="#study-abroad" className={heroBtn(true)}>Study abroad</a><a href="#video" className={heroBtn()}>Watch the video</a></>}>
      <Section anchorId="study-abroad">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="relative mb-6 h-16 w-36"><Image src="/images/partnerships/asu-logo.webp" alt="Arizona State University logo" fill sizes="144px" className="object-contain object-left" /></div>
            <p className="text-lg leading-relaxed text-muted-foreground">{A.intro}</p>
          </div>
          <div className="rounded-card bg-ink p-7 text-ink-foreground">
            <p className="label-mono text-secondary">Study at ASU campuses in</p>
            <ul className="mt-4 space-y-3">{A.campuses.map((c) => <li key={c} className="display flex items-center gap-3 text-2xl"><MapPin aria-hidden className="size-5 text-primary" />{c}</li>)}</ul>
          </div>
        </div>
      </Section>

      {rankings.length > 0 && (
        <Section tone="muted" anchorId="rankings">
          <Eyebrow>Recognition</Eyebrow>
          <h2 className="display mb-10 text-display-md">ASU&apos;s impressive rankings</h2>
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {rankings.map((r) => <li key={r.src} className="overflow-hidden rounded-card border border-border bg-card p-3 transition-transform hover:-translate-y-1"><Image src={r.src} alt={r.alt} width={600} height={600} className="h-auto w-full" /></li>)}
          </ul>
        </Section>
      )}

      <Section anchorId="video">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <Eyebrow>Pioneering partnership</Eyebrow>
            <h2 className="display text-display-md">HCI, ASU and Ramsay Health Care</h2>
            <p className="mt-4 text-lg text-muted-foreground">Hear from Judy Karshmer on how the partnership brings global learning to IHM students.</p>
          </div>
          <VideoGallery videos={[A.video]} columns={1} />
        </div>
      </Section>

      {A.sections.map((s, i) => (
        <Section key={s.title} tone={i % 2 ? 'default' : 'muted'}>
          <Feature title={s.title} body={<p>{s.body}</p>} image={{ src: legacyImage(s.image.src, '/images/partnerships/cintana-arizona.webp'), alt: s.image.alt }} flip={i % 2 === 1} />
        </Section>
      ))}

      <PartnerCards except={PATH} title="Explore our other partners" />
    </PartnerShell>
  )
}
