// /student-testimonials/ — WordPress page 388: 67 student video stories (filter by programme, one shared player) and 56
// written testimonials. Copy in src/content/testimonials-page.ts.
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { JsonLd } from '@/components/seo/JsonLd'
import { SupportShell, Lead, heroBtn } from '@/components/student-support/parts'
import { QuoteWall, StoriesBrowser } from '@/components/testimonials/StoriesBrowser.client'
import { VIDEO_STORIES, WRITTEN_TESTIMONIALS } from '@/content/testimonials-page'
import { siteOrigin } from '@/lib/seo/metadata'

export const metadata: Metadata = pageMetadata({
  title: 'Student Testimonials',
  path: '/student-testimonials/',
  metaTitle: 'Student Testimonials | Nursing and Social Work Success Stories | IHM',
  description: 'Watch 67 IHM student stories and read testimonials from Master of Nursing, GCAN, Bachelor of Social Work, GDN, OSCE and NCLEX students and graduates.',
})

export default function StudentTestimonialsRoute() {
  return (
    <SupportShell
      path=""
      eyebrow="Student stories"
      title={<>Hear from our <em className="text-secondary">students</em></>}
      intro="Graduates and current students share their journeys with IHM across nursing, social work and OSCE/NCLEX preparation."
      actions={<><a href="#videos" className={heroBtn(true)}>Watch the stories</a><Link href="/courses/" className={heroBtn()}>Explore courses<ArrowRight aria-hidden className="size-4" /></Link></>}
      nav={[]}
    >
      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'ItemList', name: 'IHM student video stories', url: `${siteOrigin()}/student-testimonials/`,
        itemListElement: VIDEO_STORIES.map((v, i) => ({ '@type': 'ListItem', position: i + 1, name: v.name ? `${v.title} | ${v.name}` : v.title, url: `https://www.youtube.com/watch?v=${v.id}` })),
      }} />
      <Section anchorId="videos">
        <Lead eyebrow="Video stories" title={<>{VIDEO_STORIES.length} journeys, <em className="text-primary-strong">in their own words</em></>} />
        <StoriesBrowser videos={VIDEO_STORIES} />
      </Section>
      <Section tone="muted" anchorId="testimonials">
        <Lead eyebrow="Testimonials" title="What our students say" />
        <QuoteWall quotes={WRITTEN_TESTIMONIALS} />
      </Section>
    </SupportShell>
  )
}
