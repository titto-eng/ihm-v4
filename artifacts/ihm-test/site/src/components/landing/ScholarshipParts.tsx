import type { ReactNode } from 'react'
import Image from 'next/image'
import { HeroRays } from '@/blocks/hero/Component'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { RenderBlocks } from '@/components/RenderBlocks'
import { FORM_ANCHOR, FORM_END_ANCHOR, LandingArticle, StickyEnquiryCta, formBlock, landingCtx, nestedCtx, type LandingDoc } from '@/components/templates/landing/shared'
import { loadLanding } from '@/components/templates/landing/pages'

/** The registry row for a landing route (src/content/landing.ts); the route file is a programming error without it. */
export async function landingDoc(path: string): Promise<LandingDoc> {
  const doc = await loadLanding(path)
  if (!doc) throw new Error(`landing page ${path} is not in src/content/landing.ts`)
  return doc
}

/** Bespoke landing layout (60 §4 "EnquiryPage" family): photo hero, content beside the sticky registered form on lg+, the same form
 *  again at #enquiry-end (every "Enquire" button targets it) and a sticky mobile button. The form is the row's `formKey`, so the thank-you URL and tracking are unchanged. */
export function LandingLayout({ doc, eyebrow, title, intro, image, actions, formHeading, children, after }: {
  doc: LandingDoc; eyebrow: string; title: ReactNode; intro?: ReactNode; image: { src: string; alt: string }; actions?: ReactNode; formHeading: string; children: ReactNode; after?: ReactNode
}) {
  return (
    <LandingArticle doc={doc} template={doc.entry.template} className="pb-20 lg:pb-0">
      <section data-tone="ink" className="relative isolate overflow-hidden bg-ink text-ink-foreground">
        <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="-z-20 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
        <HeroRays id="landing-rays" className="-right-24 -bottom-28 -z-10 w-[28rem] opacity-[0.12]" />
        <div className="mx-auto max-w-site px-5 pt-20 pb-16 md:px-8 md:pt-28 md:pb-20">
          <div className="max-w-2xl animate-rise">
            <Eyebrow onDark>{eyebrow}</Eyebrow>
            <h1 className="display text-[clamp(2.3rem,5.5vw,4.4rem)] leading-[1.04]">{title}</h1>
            {intro && <div className="mt-5 text-lg text-ink-foreground/85">{intro}</div>}
            {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
          </div>
        </div>
      </section>
      <div className="mx-auto grid max-w-site grid-cols-[minmax(0,1fr)] gap-10 px-5 py-14 md:px-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
        <div className="min-w-0 space-y-16" data-landing-slot="body">{children}</div>
        <aside className="hidden lg:sticky lg:top-24 lg:block" data-landing-slot="form" aria-label="Enquiry form">
          <RenderBlocks blocks={[formBlock(doc, { variant: 'sidebar', anchorId: FORM_ANCHOR, heading: formHeading, spacing: 'none' })]} ctx={nestedCtx(doc)} />
        </aside>
      </div>
      {after}
      <RenderBlocks blocks={[formBlock(doc, { variant: 'card', anchorId: FORM_END_ANCHOR, heading: formHeading, tone: 'muted' })]} ctx={landingCtx(doc)} />
      <StickyEnquiryCta label={formHeading} />
    </LandingArticle>
  )
}
