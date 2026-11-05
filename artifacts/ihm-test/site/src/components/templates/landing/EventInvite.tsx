import { RenderBlocks } from '@/components/RenderBlocks'
import { FORM_END_ANCHOR, LandingArticle, StickyEnquiryCta, formBlock, heroBlock, landingCtx, type LandingProps } from './shared'

// F9 webinar / agent invite and scholarship (60 §4): Hero(full-image) -> body -> Steps -> EnquiryForm.
export function EventInvite({ doc, hero, lead, body, trail, ownForm }: LandingProps) {
  const ctx = landingCtx(doc)
  return (
    <LandingArticle doc={doc} template="EventInvite">
      <RenderBlocks blocks={[heroBlock(hero, { variant: 'full' })]} ctx={ctx} />
      {lead}
      {body}
      {trail}
      {!ownForm && <RenderBlocks blocks={[formBlock(doc, { variant: 'card', anchorId: FORM_END_ANCHOR, heading: 'Register your interest' })]} ctx={ctx} />}
      <StickyEnquiryCta label="Register" />
    </LandingArticle>
  )
}
