// /hci-australia/ — WordPress page 82: HCI Australia, the group behind IHM and IHNA. Copy in src/content/about.ts (HCI).
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { AboutShell } from '@/components/about/parts'
import { Lead, heroBtn } from '@/components/student-support/parts'
import { HCI as H } from '@/content/about'
import { legacyImage } from '@/lib/legacy-image'

export const metadata: Metadata = pageMetadata({
  title: 'HCI Australia',
  path: '/hci-australia/',
  metaTitle: 'HCI Australia | The Group Behind IHM and IHNA',
  description: 'First established in 2007, HCI Australia is a group of 8 companies specialising in healthcare education and systems, including IHM and IHNA.',
})

export default function HciAustraliaRoute() {
  return (
    <AboutShell path="/hci-australia/" eyebrow="Our group" title={<>HCI <em className="text-secondary">Australia</em></>} intro={H.tagline}
      image={{ src: '/images/about/hci-banner.webp', alt: 'HCI Australia team' }}
      actions={<Link href="/partner-with-us/" className={heroBtn(true)}>Partner with us<ArrowRight aria-hidden className="size-4" /></Link>}>
      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div><Lead eyebrow="Take a look" title={H.aboutTitle} /><p className="text-[17px] leading-relaxed">{H.about}</p></div>
          <div><Lead eyebrow="Since 2007" title={H.title2} /><div className="space-y-4 text-[17px] leading-relaxed">{H.body.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}</div></div>
        </div>
      </Section>
      <Section tone="muted">
        <Lead eyebrow="Our institutes" title="Enhancing lives through education" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {H.orgs.map((o) => { const logo = legacyImage(o.logo, ''); const ext = o.href.startsWith('http'); return (
            <article key={o.name} className="group overflow-hidden rounded-card border border-border bg-card">
              <div className="relative aspect-[16/9]"><Image src={o.image} alt="" fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /></div>
              <div className="p-6">
                {logo && <Image src={logo} alt={`${o.name} logo`} width={160} height={50} className="mb-4 h-10 w-auto" unoptimized={logo.endsWith('.svg')} />}
                <h3 className="display text-2xl">{o.name}</h3>
                <p className="mt-1 text-muted-foreground">{o.tag}</p>
                {o.meta.length > 0 && <p className="mt-2 text-sm font-semibold">{o.meta.join(' · ')}</p>}
                {ext ? <a href={o.href} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 font-semibold text-primary-strong">Learn more<ArrowUpRight aria-hidden className="size-4" /></a> : <Link href={o.href} className="mt-5 inline-flex items-center gap-2 font-semibold text-primary-strong">Learn more<ArrowRight aria-hidden className="size-4" /></Link>}
              </div>
            </article>
          ) })}
        </div>
      </Section>
    </AboutShell>
  )
}
