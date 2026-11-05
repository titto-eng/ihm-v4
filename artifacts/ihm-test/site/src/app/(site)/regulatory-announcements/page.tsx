// /regulatory-announcements/ — WordPress page 4046: regulatory announcements for students, parents and staff, the commercial
// cheating presentation (kept at its old /wp-content/ URL in public/) and the TEQSA "Do your own work" posters.
import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowUpRight, Download, Megaphone } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { SupportShell, Lead, heroBtn } from '@/components/student-support/parts'
import { Inline } from '@/components/page-kit/Kit'
import { REGULATORY as R } from '@/content/about'

export const metadata: Metadata = pageMetadata({
  title: 'Regulatory Announcements',
  path: '/regulatory-announcements/',
  metaTitle: 'Regulatory Announcements | IHM',
  description: 'The latest regulatory announcements affecting IHM and Australian higher education, including TEQSA guidance on academic integrity and commercial cheating.',
})

export default function RegulatoryAnnouncementsRoute() {
  return (
    <SupportShell path="" eyebrow="Announcements" title={<>Regulatory <em className="text-secondary">announcements</em></>} intro="Your first step starts right here."
      actions={<><a href={R.pptx} className={heroBtn(true)}><Download aria-hidden className="size-4" />Presentation on Commercial Cheating</a><a href={R.teqsa} target="_blank" rel="noopener noreferrer" className={heroBtn()}>TEQSA academic integrity<ArrowUpRight aria-hidden className="size-4" /></a></>}>
      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div><Megaphone aria-hidden className="size-9 text-primary-strong" /><Lead eyebrow="Notice" title={R.greeting} /></div>
          <div className="space-y-4 text-[17px] leading-relaxed">{R.body.map((p) => <p key={p.slice(0, 20)}><Inline text={p} /></p>)}</div>
        </div>
      </Section>
      <Section tone="muted" anchorId="do-your-own-work">
        <Lead eyebrow="TEQSA" title="Do your own work"><p>Academic integrity resources from Australia’s higher education regulator.</p></Lead>
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">{R.posters.map((p) => <li key={p.src}><Image src={p.src} alt={p.alt} width={900} height={900} className="h-auto w-full rounded-card border border-border" /></li>)}</ul>
        <a href={R.teqsa} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 font-semibold text-primary-strong">Visit www.teqsa.gov.au<ArrowUpRight aria-hidden className="size-4" /></a>
      </Section>
    </SupportShell>
  )
}
