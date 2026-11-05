// /library/ — WordPress page 377 (template-library-pages.php): catalogue search, references & other services, digital resources.
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { JsonLd } from '@/components/seo/JsonLd'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { LibraryShell } from '@/components/library/LibraryShell'
import { VideoGallery } from '@/components/media/VideoGallery.client'
import { legacyImage } from '@/lib/legacy-image'
import { siteOrigin } from '@/lib/seo/metadata'
import { LIBRARY_SERVICES, LIBRARY_VIDEOS, PRIMO } from '@/content/library'

export const metadata: Metadata = pageMetadata({
  title: 'Library',
  path: '/library/',
  metaTitle: 'IHM Library | eBooks, Journals, Library Guides, Referencing and Research Support',
  description: 'Search the IHM Library for books, eBooks, journals, eJournals and audio-visual materials, with library guides, APA referencing, copyright, search tips, Grammarly, EndNote and video tutorials.',
})

export default function LibraryRoute() {
  const origin = siteOrigin()
  return (
    <LibraryShell
      path="/library/"
      title={<>Our <em className="text-secondary">Library</em></>}
      intro="Search for books, eBooks, journals, eJournals and audio-visual materials, then explore the guides and tools that support your study and research."
      image="/images/library/banner.webp"
    >
      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'Library', name: 'IHM Library', url: `${origin}/library/`,
        parentOrganization: { '@type': 'CollegeOrUniversity', name: 'Institute of Health and Management', url: origin },
        potentialAction: { '@type': 'SearchAction', target: `${PRIMO.action}?vid=${encodeURIComponent(PRIMO.vid)}&tab=Everything&search_scope=MyInst_and_CI&query=any,contains,{search_term_string}`, 'query-input': 'required name=search_term_string' },
      }} />
      <Section>
        <div className="mb-10 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <Eyebrow>Let&apos;s join hands and build a better future!</Eyebrow>
            <h2 className="display text-display-md">References &amp; <em className="text-primary-strong">other services</em></h2>
          </div>
          <p className="text-muted-foreground">Guides, policies and tools for finding, using and citing information well — from library guides for your course to Grammarly, EndNote and one-to-one academic support.</p>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LIBRARY_SERVICES.map((s) => {
            const ext = s.href.startsWith('http')
            const src = s.fallback ? legacyImage(s.image, s.fallback) : s.image
            const inner = (
              <>
                <span className="relative block aspect-[16/9] overflow-hidden bg-muted">
                  <Image src={src} alt="" fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw" className="object-cover transition-transform duration-700 group-hover/s:scale-105" />
                </span>
                <span className="flex flex-1 flex-col p-5">
                  <span className="display text-xl">{s.title}</span>
                  <span className="mt-2 line-clamp-3 text-sm text-muted-foreground">{s.body}</span>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary-strong">Learn more{ext ? <ArrowUpRight aria-hidden className="size-4" /> : <ArrowRight aria-hidden className="size-4 transition-transform group-hover/s:translate-x-1" />}</span>
                </span>
              </>
            )
            const cls = 'group/s flex h-full flex-col overflow-hidden rounded-card border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_24px_48px_-32px_hsl(5_60%_30%/0.5)]'
            return <li key={s.title}>{ext ? <a href={s.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a> : <Link href={s.href} className={cls}>{inner}</Link>}</li>
          })}
        </ul>
      </Section>
      <Section tone="muted" anchorId="digital-resources">
        <Eyebrow>Watch and learn</Eyebrow>
        <h2 className="display text-display-md mb-10">Digital Resources</h2>
        <VideoGallery videos={LIBRARY_VIDEOS} />
      </Section>
    </LibraryShell>
  )
}
