import Image from 'next/image'
import { Mail, MessageCircle, Phone } from 'lucide-react'
import { HeroRays } from '@/blocks/hero/Component'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { RenderBlocks } from '@/components/RenderBlocks'
import { FORM_END_ANCHOR, LandingArticle, formBlock, landingCtx } from '@/components/templates/landing/shared'
import { landingDoc } from '@/components/landing/ScholarshipParts'
import { QUICK_ENQUIRY } from '@/content/landing-enquiry'
import { site } from '@/content/site'
import { LIVECHAT } from '@/content/student-support'

/** The short /lp/ enquiry pages: split screen, the pitch and counsellors on the left, the row's registered form on the right
 *  (anchor #enquiry-end, so campaign links and "Enquire" buttons land on it). Copy in src/content/landing-enquiry.ts. */
export async function QuickEnquiry({ path }: { path: string }) {
  const doc = await landingDoc(path)
  const copy = QUICK_ENQUIRY[path] ?? { title: 'Talk to our Counsellor' }
  return (
    <LandingArticle doc={doc} template="EnquiryPage" className="pb-0">
      <section data-tone="ink" className="bg-ink-glow relative isolate overflow-hidden text-ink-foreground">
        <HeroRays id="enquiry-rays" className="-left-24 -bottom-28 -z-10 w-[28rem] opacity-[0.1]" />
        <div className="mx-auto grid max-w-site grid-cols-1 gap-10 px-5 pt-14 pb-16 md:px-8 lg:grid-cols-[1fr_minmax(0,30rem)] lg:items-start lg:pt-20">
          <div className="animate-rise lg:sticky lg:top-24">
            <Eyebrow onDark>IHM Enquiry Form</Eyebrow>
            <h1 className="display text-[clamp(2.4rem,5.5vw,4.4rem)] leading-[1.04]">{copy.title}</h1>
            {copy.pitch && <p className="mt-5 max-w-xl text-lg text-ink-foreground/85">{copy.pitch}</p>}
            <div className="relative mt-8 hidden aspect-[946/774] max-w-md lg:block">
              <span aria-hidden className="absolute inset-8 rounded-full bg-primary/30 blur-3xl" />
              <Image src="/images/landing/counsellors.webp" alt="IHM student counsellors" fill priority sizes="28rem" className="object-contain" />
            </div>
            <ul className="mt-8 flex flex-wrap gap-2 text-sm">
              <li><a href={`tel:${site.phone.replace(/\s/g, '')}`} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink-foreground/10 px-4 font-semibold hover:bg-ink-foreground/20"><Phone aria-hidden className="size-4 text-secondary" />{site.phone} (toll free)</a></li>
              <li><a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink-foreground/10 px-4 font-semibold hover:bg-ink-foreground/20"><Mail aria-hidden className="size-4 text-secondary" />{site.email}</a></li>
              <li><a href={LIVECHAT} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink-foreground/10 px-4 font-semibold hover:bg-ink-foreground/20"><MessageCircle aria-hidden className="size-4 text-secondary" />Live chat</a></li>
            </ul>
          </div>
          <div className="text-foreground">
            <RenderBlocks blocks={[formBlock(doc, { variant: 'sidebar', anchorId: FORM_END_ANCHOR, heading: 'Your details', spacing: 'none' })]} ctx={landingCtx(doc)} />
          </div>
        </div>
      </section>
    </LandingArticle>
  )
}
