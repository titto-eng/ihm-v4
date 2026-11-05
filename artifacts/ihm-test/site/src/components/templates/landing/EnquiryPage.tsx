import { RenderBlocks } from '@/components/RenderBlocks'
import { FORM_END_ANCHOR, LandingArticle, formBlock, heroBlock, landingCtx, type LandingProps } from './shared'

// F1, enquirenow, F8 enquiry-ihm (60 §4): Hero(compact) -> EnquiryForm -> body. The form comes first, so the page needs no sticky bar.
// `?course=` is read by the form itself on the client (the page stays cacheable).
export function EnquiryPage({ doc, hero, lead, body, trail, ownForm }: LandingProps) {
  const ctx = landingCtx(doc)
  return (
    <LandingArticle doc={doc} template="EnquiryPage" className="pb-0">
      <RenderBlocks blocks={[heroBlock(hero, { variant: 'compact' }), ...(ownForm ? [] : [formBlock(doc, { variant: 'card', anchorId: FORM_END_ANCHOR, heading: 'Your details', tone: 'muted' })])]} ctx={ctx} />
      {lead}
      {body}
      {trail}
    </LandingArticle>
  )
}
