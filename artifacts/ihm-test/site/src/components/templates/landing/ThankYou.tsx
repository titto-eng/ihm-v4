import Link from 'next/link'
import { Section } from '@/components/layout/Section'
import { RenderBlocks, type AnyBlock } from '@/components/RenderBlocks'
import { ThankYouEvent } from '@/components/tracking/ConversionEvents'
import { Button } from '@/components/ui/button'
import { hasBrochure } from '@/lib/courses/brochure'
import { LandingArticle, landingCtx, type LandingDoc } from './shared'
import { ThankYouIntent } from './ThankYouIntent'

// ThankYou view (60 §4): Hero(compact) -> message -> BrochureDownload when `?intent=brochure`; pushes `thank_you_view` (80 §4).
// It lives at the old handler URL (`thanks.php`, `thankyou.php`) because GTM counts conversions on it; always noindex (route metadata).
export function ThankYou({ doc }: { doc: LandingDoc }) {
  const ctx = landingCtx(doc)
  const { course } = doc
  const hero = { blockType: 'hero', variant: 'compact', eyebrow: 'Enquiry received', heading: 'Thank *you*', subheading: `We have your details for ${doc.entry.title} and a member of our admissions team will be in touch shortly.` } as AnyBlock
  return (
    <LandingArticle doc={doc} template="ThankYou" className="pb-0">
      <ThankYouEvent />
      <RenderBlocks blocks={[hero]} ctx={ctx} />
      <Section spacing="compact">
        <div className="max-w-2xl space-y-6" data-landing-slot="thank-you">
          <p className="text-lg leading-relaxed text-muted-foreground">
            If your question is urgent, call us or explore our courses while you wait. Check your inbox (and junk folder) for a confirmation from us.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild><Link href="/courses/">Explore courses</Link></Button>
            <Button asChild variant="outline"><Link href="/">Back to the home page</Link></Button>
          </div>
        </div>
      </Section>
      {hasBrochure(course) && (
        <ThankYouIntent intent="brochure">
          <RenderBlocks blocks={[{ blockType: 'brochureDownload' } as AnyBlock]} ctx={ctx} />
        </ThankYouIntent>
      )}
    </LandingArticle>
  )
}
