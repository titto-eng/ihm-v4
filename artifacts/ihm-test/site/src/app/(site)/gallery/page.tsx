// /gallery/ — WordPress page 72 "Campus wise images from IHM": highlights and the Sydney, Perth, Melbourne CBD and North
// Melbourne campus photos (public/images/gallery/), with a lightbox. Data in src/content/about.ts (GALLERY).
import type { Metadata } from 'next'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { AboutShell } from '@/components/about/parts'
import { PhotoGallery } from '@/components/gallery/PhotoGallery.client'
import { GALLERY } from '@/content/about'

export const metadata: Metadata = pageMetadata({
  title: 'Gallery',
  path: '/gallery/',
  metaTitle: 'Campus Gallery | Sydney, Perth and Melbourne Campuses | IHM',
  description: 'Campus-wise photos from IHM: nursing labs, classrooms, libraries and student spaces at our Sydney, Perth, Melbourne CBD and North Melbourne campuses.',
})

export default function GalleryRoute() {
  const sets = GALLERY.map((g) => ({ campus: g.campus === 'Intro' ? 'Highlights' : g.campus, images: g.images }))
  return (
    <AboutShell path="/gallery/" eyebrow="Gallery" title={<>Campus-wise images <em className="text-secondary">from IHM</em></>} intro={`${sets.reduce((n, s) => n + s.images.length, 0)} photos of our nursing labs, classrooms and student spaces across four campuses.`}>
      <Section><PhotoGallery sets={sets} /></Section>
    </AboutShell>
  )
}
