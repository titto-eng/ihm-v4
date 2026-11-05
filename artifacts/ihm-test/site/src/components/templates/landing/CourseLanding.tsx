import { RenderBlocks, type AnyBlock } from '@/components/RenderBlocks'
import { hasBrochure } from '@/lib/courses/brochure'
import { BodyWithForm, FORM_END_ANCHOR, LandingArticle, StickyEnquiryCta, formBlock, heroBlock, landingCtx, type LandingProps } from './shared'

// F4-F7, F10, F11 (60 §4): Hero(split, form) -> CourseFacts -> body -> Testimonials -> Accordion -> BrochureDownload -> CTA + EnquiryForm.
export function CourseLanding({ doc, hero, body, trail, ownForm, has = [] }: LandingProps) {
  const ctx = landingCtx(doc)
  const { course } = doc
  const closing: AnyBlock[] = [
    ...(has.includes('brochureDownload') || !hasBrochure(course) ? [] : [{ blockType: 'brochureDownload' } as AnyBlock]),
    { blockType: 'cta', heading: 'Ready to *start*?', body: doc.entry.title, variant: 'banner', tone: 'ink', links: [{ label: 'Enquire now', href: `#${FORM_END_ANCHOR}`, style: 'primary' }] } as AnyBlock,
    ...(ownForm ? [] : [formBlock(doc, { variant: 'card', anchorId: FORM_END_ANCHOR, heading: 'Enquire about this course' })]),
  ]
  return (
    <LandingArticle doc={doc} template="CourseLanding">
      <RenderBlocks blocks={[heroBlock(hero, { variant: 'split', eyebrow: course?.title ? 'Course' : null })]} ctx={ctx} />
      {course && <RenderBlocks blocks={[{ blockType: 'courseFacts' } as AnyBlock]} ctx={ctx} />}
      <BodyWithForm doc={doc} heading="Enquire about this course">{body}</BodyWithForm>
      {trail}
      <RenderBlocks blocks={closing} ctx={ctx} />
      <StickyEnquiryCta />
    </LandingArticle>
  )
}
