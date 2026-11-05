// /contact/ — every campus address with phone, map and directions, the global contact numbers, the founder (links to
// /meet-our-md/), social accounts and the quick-enquiry form. Copy in src/content/campus-pages.ts (CONTACT, CAMPUS_PAGES).
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Globe2, Mail, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { JsonLd } from '@/components/seo/JsonLd'
import { SocialIcon, networkLabel } from '@/components/layout/SocialIcon'
import { CampusHero, EnquireSection, prettyTel, telHref } from '@/components/campus/parts'
import { CAMPUS_PAGES, CONTACT, oneLine } from '@/content/campus-pages'
import { footer } from '@/content/footer'
import { site } from '@/content/site'
import { LIVECHAT } from '@/content/student-support'

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  path: '/contact/',
  metaTitle: 'Contact IHM | Campuses, Phone and Enquiries',
  description: 'Contact the Institute of Health & Management: 1800 763 757 in Australia, +61 3 7046 7777 overseas, enquiry@ihm.edu.au, and campuses in Melbourne, Sydney, Perth and Brisbane.',
})

const locations = CAMPUS_PAGES.flatMap((c) => c.locations.map((l) => ({ ...l, city: c.city, path: c.path })))

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollegeOrUniversity',
  name: 'Institute of Health & Management',
  url: 'https://ihm.edu.au/',
  email: site.email,
  telephone: '+61-1800-763-757',
  contactPoint: CONTACT.global.map((g) => ({ '@type': 'ContactPoint', contactType: 'admissions', telephone: g.value, areaServed: g.label.includes('within') ? 'AU' : undefined })),
  location: locations.map((l) => ({
    '@type': 'Place', name: `IHM ${l.name}`, ...(l.tel ? { telephone: l.tel } : {}),
    address: { '@type': 'PostalAddress', streetAddress: oneLine(l), addressCountry: 'AU' },
  })),
  sameAs: footer.social.map((s) => s.href),
}

export default function ContactRoute() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <CampusHero path="/contact/" eyebrow="Contact us" title={<>We are here to <em className="text-secondary not-italic">help you</em></>} intro={CONTACT.intro}
        image={{ src: '/images/campuses/melbourne-header.webp', alt: 'Melbourne skyline' }}
        actions={<><a href="#quickContact" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-foreground hover:bg-secondary"><Mail aria-hidden className="size-4" />Send a message</a><a href={LIVECHAT} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink-foreground/40 px-6 font-semibold backdrop-blur hover:border-secondary hover:text-secondary"><MessageCircle aria-hidden className="size-4" />Live chat</a></>} />

      <Section>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {CONTACT.global.map((g) => (
            <a key={g.label} href={g.href} className="group flex items-center gap-4 rounded-card border border-border bg-card p-6 transition-colors hover:border-primary">
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-foreground">{g.label.includes('within') ? <Phone aria-hidden className="size-6" /> : <Globe2 aria-hidden className="size-6" />}</span>
              <span><span className="label-mono block text-muted-foreground">{g.label}</span><span className="display block text-2xl group-hover:text-primary-strong">{g.value}</span></span>
            </a>
          ))}
          <a href={`mailto:${site.email}`} className="group flex items-center gap-4 rounded-card border border-border bg-card p-6 transition-colors hover:border-primary">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-foreground"><Mail aria-hidden className="size-6" /></span>
            <span><span className="label-mono block text-muted-foreground">Email</span><span className="display block text-2xl group-hover:text-primary-strong">{site.email}</span></span>
          </a>
        </div>
      </Section>

      <Section tone="muted" anchorId="campuses">
        <Eyebrow>Our campuses</Eyebrow>
        <h2 className="display mb-10 text-display-md">Visit us</h2>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {locations.map((l) => (
            <li key={l.name} className="flex flex-col rounded-card border border-border bg-card p-6">
              <p className="label-mono text-primary-strong">{l.city}</p>
              <h3 className="display mt-1 text-2xl">{l.name}</h3>
              <p className="mt-3 flex flex-1 gap-2.5 text-[15px] text-muted-foreground"><MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-primary-strong" />{oneLine(l)}, Australia</p>
              {l.tel && <a href={telHref(l.tel)} className="mt-3 flex items-center gap-2.5 font-semibold hover:text-primary-strong"><Phone aria-hidden className="size-5 text-primary-strong" />{prettyTel(l.tel)}</a>}
              <div className="mt-5 flex flex-wrap gap-2">
                <a href={l.directions} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-ink px-4 text-sm font-semibold text-ink-foreground hover:bg-primary hover:text-foreground"><Navigation aria-hidden className="size-4" />Locate us on Google map</a>
                <Link href={l.path} className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-border px-4 text-sm font-semibold hover:border-primary">Campus page<ArrowRight aria-hidden className="size-4" /></Link>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="grid grid-cols-1 overflow-hidden rounded-card bg-ink text-ink-foreground md:grid-cols-[0.8fr_1.2fr]">
          <div className="relative min-h-72"><Image src={CONTACT.founder.image} alt={`Portrait of ${CONTACT.founder.name}`} fill sizes="(min-width: 768px) 38vw, 92vw" className="object-cover object-top" /></div>
          <div className="p-7 md:p-12">
            <Eyebrow onDark>{CONTACT.founder.title}</Eyebrow>
            <h2 className="display text-display-md">{CONTACT.founder.name}</h2>
            <p className="mt-4 text-lg text-ink-foreground/80">{CONTACT.founder.body}</p>
            <Link href={CONTACT.founder.cta.href} className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-foreground hover:bg-secondary">{CONTACT.founder.cta.t}<ArrowRight aria-hidden className="size-4" /></Link>
            <h3 className="label-mono mt-10 text-ink-foreground/60">Follow IHM</h3>
            <ul className="mt-3 flex gap-2">
              {footer.social.map((s) => <li key={s.href}><a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`IHM on ${networkLabel[s.network]}`} className="grid size-11 place-items-center rounded-full bg-ink-foreground/10 transition-colors hover:bg-primary hover:text-foreground"><SocialIcon network={s.network} /></a></li>)}
            </ul>
          </div>
        </div>
      </Section>

      <EnquireSection heading="Send us a message" />
    </>
  )
}
