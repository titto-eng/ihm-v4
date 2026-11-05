import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Download, Mail, MapPin, Phone } from 'lucide-react'
import { footer } from '@/content/footer'
import { site } from '@/content/site'
import { HeroRays } from '@/blocks/hero/Component'
import { EnquiryDialog } from '@/components/forms/EnquiryDialog'
import { EnquiryFormClient } from '@/components/forms/EnquiryFormClient'
import { getFormView } from '@/lib/enquiries/formView'
import { SiteLogo } from './SiteLogo'
import { SocialIcon, networkLabel } from './SocialIcon'
import { WhatsAppButton } from './WhatsAppButton'

type Column = (typeof footer.columns)[number]
const linkCls = 'text-ink-foreground/80 underline-offset-4 transition-colors hover:text-secondary hover:underline'

/** "From within Australia : 1800 763 757" → label + value; a download link becomes a pill. */
function ContactColumn({ col }: { col: Column }) {
  return (
    <ul className="space-y-4 text-[15px]">
      {col.links.map((l) => {
        const [label, value] = l.label.includes(':') ? l.label.split(/\s*:\s*/, 2) : [null, l.label]
        if (/download/i.test(l.label)) {
          return (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-secondary/60 px-4 py-2 text-sm font-semibold text-secondary transition-colors hover:bg-secondary hover:text-secondary-foreground">
                <Download aria-hidden className="size-4" />{l.label}
              </a>
            </li>
          )
        }
        const Icon = l.href.startsWith('mailto:') ? Mail : Phone
        return (
          <li key={l.href} className="flex gap-3">
            <Icon aria-hidden className="mt-1 size-4 shrink-0 text-secondary" />
            <span>
              {label && <span className="block text-xs text-ink-foreground/60">{label}</span>}
              <a href={l.href} className={`${linkCls} font-semibold [overflow-wrap:anywhere]`}>{value}</a>
            </span>
          </li>
        )
      })}
    </ul>
  )
}

function Links({ col }: { col: Column }) {
  if (col.kind === 'contact') return <ContactColumn col={col} />
  return (
    <ul className={col.kind === 'campuses' ? 'grid grid-cols-2 gap-2 text-[15px] lg:grid-cols-1' : 'space-y-2.5 text-[15px] [overflow-wrap:anywhere]'}>
      {col.links.map((l) => (
        <li key={l.href + l.label}>
          {col.kind === 'campuses' ? (
            <Link href={l.href} className="group flex items-center gap-2 rounded-xl border border-ink-foreground/15 px-3 py-2 font-semibold transition-colors hover:border-secondary hover:text-secondary">
              <MapPin aria-hidden className="size-4 text-secondary" />{l.label}<ArrowUpRight aria-hidden className="ml-auto size-4 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ) : (
            <Link href={l.href} className={linkCls}>{l.label}</Link>
          )}
        </li>
      ))}
    </ul>
  )
}

// Content from src/content/footer.ts and site.ts (05 §4.2). Same sections as the ihm.edu.au footer — Acknowledgement of Country,
// the brand column (logo, registration lines, Study Australia and E4E marks), Quick Links, Contact Us, Campuses and the legal line —
// on the ink theme with the Aboriginal design line on top. Columns 4 → 2 → 1.
export async function Footer() {
  const year = new Date().getFullYear()
  const news = footer.newsletter
  const newsView = news.enabled ? await getFormView(news.formKey).catch(() => null) : null
  return (
    <>
      <footer className="relative isolate overflow-hidden bg-ink-glow text-ink-foreground">
        {footer.borderImage
          ? <div aria-hidden className="h-4 bg-[length:auto_100%] bg-repeat-x md:h-5" style={{ backgroundImage: `url(${footer.borderImage})` }} />
          : <span aria-hidden className="bg-brand-gradient block h-1.5" />}
        <HeroRays id="footer-rays" className="-right-40 -bottom-40 -z-10 w-[34rem] opacity-[0.06]" />

        {footer.acknowledgement && (
          <div className="border-b border-ink-foreground/10">
            <div className="mx-auto grid max-w-site gap-4 px-5 py-10 md:grid-cols-[auto_1fr] md:items-center md:gap-10 md:px-8">
              <h2 className="display bg-gradient-to-r from-primary to-secondary bg-clip-text text-3xl text-transparent md:text-4xl">{footer.acknowledgementHeading}</h2>
              <p className="max-w-3xl leading-relaxed text-secondary/90">{footer.acknowledgement}</p>
            </div>
          </div>
        )}

        <div className="mx-auto max-w-site px-5 pt-14 pb-8 md:px-8">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1.1fr_0.9fr]">
            <div>
              <SiteLogo onDark imgClassName="h-20 sm:h-24" />
              <p className="display mt-6 text-xl">{footer.brand.name}</p>
              <ul className="mt-3 space-y-1 text-sm text-ink-foreground/70">{footer.brand.registration.map((r) => <li key={r}>{r}</li>)}</ul>
              <ul className="mt-6 flex flex-wrap items-center gap-5" aria-label="Recognition">
                {footer.brand.marks.map((m) => (
                  <li key={m.src}><Image src={m.src} alt={m.alt} width={m.width} height={m.height} unoptimized className="h-10 w-auto opacity-90" /></li>
                ))}
              </ul>
              {footer.social.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Social media">
                  {footer.social.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={networkLabel[s.network]} className="grid size-10 place-items-center rounded-full border border-ink-foreground/25 transition-colors hover:border-secondary hover:bg-secondary hover:text-secondary-foreground">
                        <SocialIcon network={s.network} />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {footer.columns.map((c) => (
              <nav key={c.heading} aria-label={c.heading} className="min-w-0">
                <h2 className="label-mono mb-5 flex items-center gap-2 text-[11px] tracking-widest text-secondary"><span aria-hidden className="bg-brand-gradient h-0.5 w-6 rounded-full" />{c.heading}</h2>
                <Links col={c} />
              </nav>
            ))}
          </div>

          {newsView && (
            <div id="newsletter" className="mt-14 grid gap-6 rounded-card border border-ink-foreground/10 bg-ink-foreground/[0.04] p-6 md:p-8 lg:grid-cols-[1fr_1fr] lg:items-center">
              <div>
                <h2 className="display text-2xl">{news.heading}</h2>
                <p className="mt-2 max-w-md text-sm text-ink-foreground/75">{news.text}</p>
              </div>
              <div className="rounded-2xl bg-card px-5 pt-1 pb-5 text-foreground" data-form-key={news.formKey} id="newsletterForm">
                <EnquiryFormClient def={newsView.def} campuses={newsView.campuses} courses={newsView.courses} layout="sidebar" submitLabel="Subscribe" />
              </div>
            </div>
          )}

          <div className="mt-12 flex flex-col gap-4 border-t border-ink-foreground/15 pt-6 text-xs text-ink-foreground/65 md:flex-row md:items-center md:justify-between">
            <p>{footer.legalLines.join(' ')} &copy; {year}. All Rights Reserved.</p>
            {footer.legalLinks.length > 0 && (
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {footer.legalLinks.map((l) => (
                  <li key={l.href + l.label}><Link href={l.href} className="underline-offset-4 hover:text-ink-foreground hover:underline">{l.label}</Link></li>
                ))}
              </ul>
            )}
            {site.phone && <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`} className="inline-flex items-center gap-2 font-semibold text-secondary"><Phone aria-hidden className="size-3.5" />{site.phone}</a>}
          </div>
        </div>
      </footer>
      <EnquiryDialog />
      <WhatsAppButton number={site.whatsappNumber} />
    </>
  )
}
