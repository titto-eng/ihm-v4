// /cintana-education-partnership-how-are-we-leveraging-global-expertise/ — about Cintana Education and the ASU-Cintana Alliance,
// with the partnership FAQ (FAQPage JSON-LD). Copy in src/content/partnerships.ts (CINTANA).
import type { Metadata } from 'next'
import Image from 'next/image'
import { Globe2, GraduationCap, Plane } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { JsonLd } from '@/components/seo/JsonLd'
import { KitFaq, kitFaqJsonLd } from '@/components/page-kit/Kit'
import { heroBtn } from '@/components/student-support/parts'
import { PartnerCards, PartnerShell } from '@/components/research/parts'
import { legacyImage } from '@/lib/legacy-image'
import { CINTANA as C } from '@/content/partnerships'

const PATH = '/cintana-education-partnership-how-are-we-leveraging-global-expertise/'

export const metadata: Metadata = pageMetadata({
  title: 'Cintana Education Partnership: How Are We Leveraging Global Expertise',
  path: PATH,
  metaTitle: 'Cintana Education Partnership | Global Expertise at IHM',
  description: 'How IHM leverages Cintana Education and the ASU-Cintana Alliance: global classrooms, dual degrees, student and faculty mobility across 20+ universities.',
})

const ICONS = [Globe2, GraduationCap, Plane]
const faq = C.faq.map((f) => ({ title: f.q, blocks: [{ p: f.a }] }))

export default function CintanaEducationRoute() {
  const photos = C.photos.map((p) => ({ ...p, src: legacyImage(p.src, '/images/partnerships/cintana-arizona.webp') }))
  return (
    <PartnerShell path={PATH} title={C.title} intro="Part of the ASU-Cintana Alliance: an international network of more than 20 forward-looking universities."
      image={{ src: photos[0].src, alt: photos[0].alt }}
      actions={<><a href="#alliance" className={heroBtn(true)}>The alliance</a><a href="#faq" className={heroBtn()}>Questions answered</a></>}>
      <JsonLd data={kitFaqJsonLd(faq)} />
      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>Who they are</Eyebrow>
            <h2 className="display text-display-md">About Cintana Education</h2>
          </div>
          <p className="text-lg leading-relaxed text-muted-foreground first-letter:float-left first-letter:mr-3 first-letter:text-6xl first-letter:font-bold first-letter:leading-none first-letter:text-primary-strong">{C.about}</p>
        </div>
      </Section>

      <Section tone="muted" anchorId="alliance">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {C.highlights.map((h, i) => {
            const Icon = ICONS[i]
            return (
              <article key={h.title} className="flex flex-col rounded-card border border-border bg-card p-7 transition-transform hover:-translate-y-1">
                <span className="grid size-12 place-items-center rounded-2xl bg-brand-gradient text-foreground"><Icon aria-hidden className="size-6" /></span>
                <h3 className="display mt-5 text-2xl">{h.title}</h3>
                <p className="mt-3 text-[15px] text-muted-foreground">{h.body}</p>
              </article>
            )
          })}
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {photos.map((p, i) => (
            <div key={p.alt} className={i === 2 ? 'relative aspect-[16/7] overflow-hidden rounded-[2rem] sm:col-span-2' : 'relative aspect-[4/3] overflow-hidden rounded-[2rem]'}>
              <Image src={p.src} alt={p.alt} fill sizes={i === 2 ? '92vw' : '(min-width: 640px) 45vw, 92vw'} className="object-cover transition-transform duration-700 hover:scale-105" />
            </div>
          ))}
        </div>
      </Section>

      <Section tone="muted" anchorId="faq">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="display text-display-md">What the partnership means for you</h2>
          </div>
          <KitFaq items={faq} />
        </div>
      </Section>

      <PartnerCards except="/cintana-education-partnership-how-are-we-leveraging-global-expertise/" tone="default" title="Explore our other partners" />
    </PartnerShell>
  )
}
