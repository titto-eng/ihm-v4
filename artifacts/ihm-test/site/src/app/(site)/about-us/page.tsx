// /about-us/ — WordPress page 11: who IHM is, quality of education (SES), vision, mission and purpose, values, the college
// mission, registration, accreditations, financial standing, enrolments and the regulators. Copy in src/content/about.ts.
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Compass, Eye, Gem, HandHeart, Heart, Lightbulb, Quote, Scale, Sparkles, Target, Users } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { JsonLd } from '@/components/seo/JsonLd'
import { AboutShell, Registration, Regulators } from '@/components/about/parts'
import { KitBlocks } from '@/components/page-kit/Kit'
import { Lead, heroBtn } from '@/components/student-support/parts'
import { ABOUT as A } from '@/content/about'
import { siteOrigin } from '@/lib/seo/metadata'

export const metadata: Metadata = pageMetadata({
  title: 'About Us',
  path: '/about-us/',
  metaTitle: 'About IHM | Institute of Health & Management, Australia',
  description: 'Since 2015 the Institute of Health & Management has delivered TEQSA-accredited nursing, social work and healthcare education. Our vision, mission, values, registration, accreditations and financial standing.',
})

const VMP_ICONS = [Eye, Target, Compass]
const VALUE_ICONS = [Lightbulb, Heart, Gem, Scale, Users, HandHeart]

export default function AboutUsRoute() {
  return (
    <AboutShell
      path="/about-us/"
      title={<>Looking to advance your <em className="text-secondary">global career</em> in healthcare?</>}
      intro="Your first step starts right here."
      image={{ src: '/images/about/about-hero.webp', alt: 'IHM students in a nursing simulation lab' }}
      actions={<><a href={A.profileUrl} target="_blank" rel="noopener noreferrer" className={heroBtn(true)}>Corporate Profile<ArrowUpRight aria-hidden className="size-4" /></a><Link href="/courses/" className={heroBtn()}>Explore courses</Link></>}
    >
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'CollegeOrUniversity', name: 'Institute of Health & Management', alternateName: 'IHM Australia', url: siteOrigin(), foundingDate: '2015', slogan: A.vmp[1][1] }} />
      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Lead eyebrow="Institute of Health & Management" title={<>Technology-rich learning, <em className="text-primary-strong">outcome-driven</em> practice</>} />
            <div className="space-y-4 text-[17px] leading-relaxed">{A.intro.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}</div>
          </div>
          <aside className="rounded-card bg-sunrise-glow p-7 lg:self-start">
            <Sparkles aria-hidden className="size-7" />
            <h2 className="display mt-4 text-2xl">Quality of education experience at IHM</h2>
            <KitBlocks blocks={[A.quality]} className="mt-3 text-[15px]" />
          </aside>
        </div>
      </Section>

      <Section tone="ink" className="bg-ink-glow" anchorId="vision-mission-purpose">
        <Lead onDark eyebrow="Who we are" title="Our vision, mission & purpose" />
        <ul className="grid gap-4 md:grid-cols-3">{A.vmp.map(([t, v], i) => { const Icon = VMP_ICONS[i]; return <li key={t} className="rounded-card bg-ink-foreground/5 p-6 ring-1 ring-ink-foreground/10"><Icon aria-hidden className="size-7 text-secondary" /><p className="label-mono mt-4 text-[11px] text-secondary">{t}</p><p className="display mt-2 text-2xl">{v}</p></li> })}</ul>
        <h3 className="display mt-14 text-3xl">Our values</h3>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{A.values.map((v, i) => { const Icon = VALUE_ICONS[i]; return <li key={v} className="flex flex-col items-center gap-3 rounded-2xl bg-ink-foreground/5 p-5 text-center ring-1 ring-ink-foreground/10 transition-transform hover:-translate-y-1"><span className="bg-brand-gradient grid size-12 place-items-center rounded-full text-foreground"><Icon aria-hidden className="size-5" /></span><span className="font-semibold">{v}</span></li> })}</ul>
      </Section>

      <Section anchorId="college-mission">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start"><Lead eyebrow="College mission for IHM" title={A.missionQuote.replace(/[“”]/g, '')} /><Quote aria-hidden className="size-10 text-secondary" /></div>
          <div className="space-y-4 text-[17px] leading-relaxed">{A.mission.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}<p className="font-semibold">{A.missionBy}</p></div>
        </div>
      </Section>

      <Registration tone="muted" />
      <Regulators tone="default" />
      <Section tone="muted">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto]">
          <p className="display text-2xl md:text-3xl">Meet the founder behind IHM’s vision.</p>
          <Link href="/meet-our-md/" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-semibold text-ink-foreground hover:bg-primary hover:text-foreground">Meet our MD<ArrowRight aria-hidden className="size-4" /></Link>
        </div>
      </Section>
    </AboutShell>
  )
}
