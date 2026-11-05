// /external-services/ — WordPress page 138: emergency contacts, IHM campuses and external services by category, and student
// accommodation by city. Data in src/content/student-support.ts.
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Building2, Bus, Gavel, HeartPulse, Home, Landmark, MapPin, Phone, ShieldAlert, ShoppingBag, Smile, Users, Wallet } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { JsonLd } from '@/components/seo/JsonLd'
import { Lead, SupportShell, heroBtn } from '@/components/student-support/parts'
import { cn } from '@/lib/cn'
import { ACCOMMODATION, EXTERNAL_SERVICES } from '@/content/student-support'

export const metadata: Metadata = pageMetadata({
  title: 'External Services',
  path: '/external-services/',
  metaTitle: 'External Services for IHM Students | Emergency, Health, Legal, Housing and Accommodation',
  description: 'Emergency numbers, IHM campus contacts, and external services for students in Melbourne, Sydney and Perth: health, mental health, legal aid, money, consumer affairs, transport, housing and student accommodation.',
})

const ICONS: Record<string, typeof Phone> = { emergency: ShieldAlert, campuses: Building2, community: Users, health: HeartPulse, money: Wallet, legal: Gavel, 'mental-health': Smile, consumer: ShoppingBag, transport: Bus, housing: Home }
const tel = (p: string) => `tel:${p.replace(/\s/g, '')}`

export default function ExternalServicesRoute() {
  const [emergency, ...rest] = EXTERNAL_SERVICES
  return (
    <SupportShell
      path="/external-services/"
      image={{ src: '/images/landing/bsw/counselling.webp', alt: 'A support worker talking with a student' }}
      eyebrow="Student support · External Services"
      title={<>External <em className="text-secondary">Services</em></>}
      intro="Help beyond IHM, from emergency numbers to legal aid, housing, transport and somewhere to live while you study."
      actions={<><a href="tel:000" className={heroBtn(true)}><Phone aria-hidden className="size-4" />Emergency: 000</a><a href="#accommodation" className={heroBtn()}>Student accommodation</a></>}
    >
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'ItemList', name: 'External services for IHM students', itemListElement: EXTERNAL_SERVICES.flatMap((g) => g.items).filter((s) => s.href?.startsWith('http')).map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.name, url: s.href })) }} />
      <Section spacing="compact">
        <div className="rounded-card bg-ink p-6 text-ink-foreground md:p-8">
          <p className="label-mono text-[10px] text-secondary">{emergency.title}</p>
          <ul className="mt-4 grid gap-3 md:grid-cols-3">
            {emergency.items.map((s) => (
              <li key={s.name}>
                <a href={s.phone ? tel(s.phone) : s.href} {...(!s.phone && { target: '_blank', rel: 'noopener noreferrer' })} className="flex h-full items-center justify-between gap-4 rounded-2xl bg-ink-foreground/5 p-5 hover:bg-ink-foreground/10">
                  <span><span className="block font-semibold">{s.name}</span>{s.phone ? <span className="display mt-1 block text-3xl text-secondary">{s.phone}</span> : <span className="mt-1 block text-sm text-secondary">View more</span>}</span>
                  {s.phone ? <Phone aria-hidden className="size-6 shrink-0 text-secondary" /> : <ArrowUpRight aria-hidden className="size-5 shrink-0" />}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>
      <Section>
        <Lead eyebrow="Where to go for what" title="Services by category" />
        <nav aria-label="Categories" className="mb-8 flex flex-wrap gap-2">{rest.map((g) => <a key={g.id} href={`#${g.id}`} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary-strong">{g.title.replace('Important Information: ', '')}</a>)}</nav>
        <div className="columns-1 gap-5 md:columns-2 xl:columns-3 [&>*]:mb-5">
          {rest.map((g) => {
            const Icon = ICONS[g.id] ?? Landmark
            return (
              <div key={g.id} id={g.id} className="break-inside-avoid scroll-mt-28 rounded-card border border-border bg-card p-6">
                <h3 className="flex items-center gap-3 font-semibold"><span className="bg-brand-gradient grid size-10 place-items-center rounded-xl text-foreground"><Icon aria-hidden className="size-5" /></span>{g.title}</h3>
                <ul className="mt-4 grid gap-3">
                  {g.items.map((s) => (
                    <li key={s.name} className="rounded-2xl bg-muted/50 p-4">
                      <p className="font-semibold">{s.name}</p>
                      {s.note && <p className="mt-1 flex gap-1.5 text-sm text-muted-foreground"><MapPin aria-hidden className="mt-0.5 size-4 shrink-0" />{s.note}</p>}
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                        {s.phone && <a href={tel(s.phone)} className="inline-flex items-center gap-1.5 font-semibold text-primary-strong"><Phone aria-hidden className="size-4" />{s.phone}</a>}
                        {s.href && (s.href.startsWith('/') ? <Link href={s.href} className="inline-flex items-center gap-1 font-semibold text-primary-strong">View more</Link> : <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary-strong">View more<ArrowUpRight aria-hidden className="size-4" /></a>)}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </Section>
      <Section tone="muted" anchorId="accommodation">
        <Lead eyebrow="Somewhere to live" title="Student Accommodation" />
        <div className="grid gap-5 md:grid-cols-3">
          {ACCOMMODATION.map((c, i) => (
            <div key={c.city} className={cn('rounded-card p-6', i === 1 ? 'bg-ink text-ink-foreground' : 'border border-border bg-card')}>
              <h3 className="display text-2xl">Student Accommodations in {c.city}</h3>
              <ul className="mt-4 grid gap-2">{c.items.map((a) => <li key={a.name}><a href={a.href} target="_blank" rel="noopener noreferrer" className={cn('flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold', i === 1 ? 'bg-ink-foreground/5 hover:bg-ink-foreground/10' : 'bg-muted/60 hover:bg-blush hover:text-primary-strong')}>{a.name}<ArrowUpRight aria-hidden className="size-4" /></a></li>)}</ul>
            </div>
          ))}
        </div>
      </Section>
    </SupportShell>
  )
}
