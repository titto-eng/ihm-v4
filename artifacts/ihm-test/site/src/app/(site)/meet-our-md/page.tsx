// /meet-our-md/ — WordPress page 720: Dr. Bijo Kunnumpurath, Founder, Managing Director and CEO — biography, awards, press,
// the "Talk to Bijo" form (monday.com), WhatsApp and LinkedIn, and the HCI organisations. The personal phone number and
// mailbox from the old page are not republished. Copy in src/content/about.ts (MD).
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Award, Building2, MapPin, MessageCircle, Newspaper, Quote, Users } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { JsonLd } from '@/components/seo/JsonLd'
import { AboutShell } from '@/components/about/parts'
import { Lead, Ticks, heroBtn } from '@/components/student-support/parts'
import { MD } from '@/content/about'
import { legacyImage } from '@/lib/legacy-image'
import { siteOrigin } from '@/lib/seo/metadata'

export const metadata: Metadata = pageMetadata({
  title: 'Meet Our MD',
  path: '/meet-our-md/',
  metaTitle: 'Dr. Bijo Kunnumpurath | Founder, Managing Director & CEO | IHM',
  description: 'Meet Dr. Bijo Kunnumpurath, Founder, Managing Director and CEO of IHM and HCI Australia, whose passion for education, entrepreneurship and technology shapes healthcare education.',
})

const STAT_ICONS = [Building2, MapPin, Users]

export default function MeetOurMdRoute() {
  const photo = legacyImage('/images/about/dr-bijo.webp', '/images/people/bijo-kunnumpurath.webp')
  return (
    <AboutShell
      path="/meet-our-md/"
      eyebrow={MD.role}
      title={<>{MD.name.replace('Kunnumpurath', '')}<em className="text-secondary">Kunnumpurath</em></>}
      intro={MD.tagline}
      image={{ src: photo, alt: 'Dr. Bijo Kunnumpurath, Founder and Managing Director of IHM' }}
      actions={<><a href={MD.talk} target="_blank" rel="noopener noreferrer" className={heroBtn(true)}>Talk to Bijo<ArrowUpRight aria-hidden className="size-4" /></a><a href={MD.linkedin} target="_blank" rel="noopener noreferrer" className={heroBtn()}>LinkedIn<ArrowUpRight aria-hidden className="size-4" /></a></>}
    >
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Person', name: MD.name, jobTitle: 'Founder, Managing Director & CEO', worksFor: { '@type': 'CollegeOrUniversity', name: 'Institute of Health & Management', url: siteOrigin() }, sameAs: [MD.linkedin] }} />
      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5 text-[17px] leading-relaxed">
            <p className="display text-2xl leading-snug">{MD.bio[0].replace(/\*\*/g, '')}</p>
            {MD.bio.slice(1).map((p) => <p key={p.slice(0, 30)}>{p}</p>)}
          </div>
          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <ul className="grid grid-cols-3 gap-3">{MD.stats.map(([n, l], i) => { const Icon = STAT_ICONS[i]; return <li key={l} className="rounded-2xl border border-border bg-card p-4 text-center"><Icon aria-hidden className="mx-auto size-5 text-primary-strong" /><span className="display mt-2 block text-3xl">{n}</span><span className="text-xs text-muted-foreground">{l}</span></li> })}</ul>
            <a href={MD.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-card bg-ink p-5 text-ink-foreground transition-transform hover:-translate-y-1"><MessageCircle aria-hidden className="size-8 shrink-0 text-secondary" /><span><span className="block font-semibold">Chat with our CEO now</span><span className="text-sm text-ink-foreground/75">{MD.whatsappText}</span></span></a>
          </aside>
        </div>
      </Section>

      <Section tone="ink" className="bg-ink-glow">
        <Quote aria-hidden className="size-10 text-secondary" />
        <p className="display mt-4 max-w-4xl text-[clamp(1.6rem,3vw,2.6rem)] leading-tight">{MD.quote1}</p>
      </Section>

      <Section anchorId="recognition">
        <Lead eyebrow="Recognition" title="Awards and press" />
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          <figure className="overflow-hidden rounded-card border border-border bg-card"><Image src="/images/about/bijo-awards.webp" alt="Dr. Bijo Kunnumpurath's awards" width={775} height={621} className="h-auto w-full" /><figcaption className="flex items-center gap-2 p-4 text-sm font-semibold"><Award aria-hidden className="size-4 text-primary-strong" />Awards and honours</figcaption></figure>
          <figure className="overflow-hidden rounded-card border border-border bg-card"><Image src="/images/about/indian-express-news.webp" alt="Indian Express feature: NRI helps nurses settle in Australia" width={781} height={493} className="h-auto w-full" /><figcaption className="p-4 text-sm"><span className="flex items-center gap-2 font-semibold"><Newspaper aria-hidden className="size-4 text-primary-strong" />{MD.press[0]}</span><span className="text-muted-foreground">{MD.press[1]}</span></figcaption></figure>
          <figure className="overflow-hidden rounded-card border border-border bg-card"><Image src="/images/about/bijo-certificate.webp" alt="Advance HE fellowship certificate" width={593} height={800} className="h-auto w-full" /><figcaption className="p-4 text-sm text-muted-foreground">{MD.certificate}</figcaption></figure>
        </div>
      </Section>

      <Section tone="muted" anchorId="organisations">
        <Lead eyebrow="HCI Australia" title="Our organisations"><p>{MD.quote2}</p></Lead>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <article className="rounded-card border border-border bg-card p-6 md:p-8">
            <p className="label-mono text-[11px] text-primary-strong">{MD.ihna.tag}</p><h3 className="display mt-2 text-2xl">{MD.ihna.name}</h3>
            <p className="mt-3 text-[15px] text-muted-foreground">{MD.ihna.body}</p>
            <div className="mt-5"><Ticks items={MD.ihna.awards} /></div>
            <p className="mt-5 text-sm font-semibold">{MD.ihna.schoolsLead}</p>
            <ul className="mt-2 flex flex-wrap gap-2">{MD.ihna.schools.map((s) => <li key={s} className="rounded-full bg-blush px-3 py-1 text-xs font-semibold">{s}</li>)}</ul>
            <a href="https://ihna.edu.au/" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 font-semibold text-primary-strong">Visit IHNA<ArrowUpRight aria-hidden className="size-4" /></a>
          </article>
          <article className="rounded-card bg-ink p-6 text-ink-foreground md:p-8">
            <p className="label-mono text-[11px] text-secondary">{MD.ihm.tag}</p><h3 className="display mt-2 text-2xl">{MD.ihm.name}</h3>
            <p className="mt-3 text-[15px] text-ink-foreground/80">{MD.ihm.body}</p>
            <Link href="/about-us/" className="mt-6 inline-flex items-center gap-2 font-semibold text-secondary">About IHM<ArrowUpRight aria-hidden className="size-4" /></Link>
          </article>
        </div>
        <div className="mt-10 text-center"><a href={MD.talk} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-foreground hover:bg-secondary">Talk to Bijo<ArrowUpRight aria-hidden className="size-4" /></a></div>
      </Section>
    </AboutShell>
  )
}
