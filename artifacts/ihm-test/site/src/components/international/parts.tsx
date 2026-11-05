import type { ReactNode } from 'react'
import { ArrowUpRight, FileText, Mail, Phone } from 'lucide-react'
import { SupportShell } from '@/components/student-support/parts'
import { ENQUIRY_EMAIL, ENQUIRY_PHONE, INTL_NAV } from '@/content/international'

/** The international student pages: SupportShell with the international sub-navigation and a help strip. */
export function IntlShell(props: { path: string; eyebrow?: string; title: ReactNode; intro?: string; image?: { src: string; alt: string }; actions?: ReactNode; children: ReactNode }) {
  return <SupportShell {...props} eyebrow={props.eyebrow ?? 'International students'} nav={INTL_NAV} navLabel="International students">{props.children}<HelpStrip /></SupportShell>
}

export function HelpStrip() {
  return (
    <div className="mx-auto max-w-site px-5 pb-16 md:px-8">
      <div className="flex flex-col gap-4 rounded-card border border-border bg-card p-6 md:flex-row md:items-center md:justify-between">
        <p className="display text-2xl">Do you have a question? IHM can assist you.</p>
        <div className="flex flex-wrap gap-3">
          <a href={`tel:+61${ENQUIRY_PHONE.replace(/\s/g, '').slice(1)}`} className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-semibold text-ink-foreground"><Phone aria-hidden className="size-4 text-secondary" />{ENQUIRY_PHONE}</a>
          <a href={`mailto:${ENQUIRY_EMAIL}`} className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-semibold hover:border-primary"><Mail aria-hidden className="size-4" />{ENQUIRY_EMAIL}</a>
        </div>
      </div>
    </div>
  )
}

export function DocLinks({ items, dark = false }: { items: { label: string; href: string }[]; dark?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((d) => {
        const ext = d.href.startsWith('http')
        return <li key={d.href}><a href={d.href} target="_blank" rel={ext ? 'noopener noreferrer' : 'noopener'} className={dark ? 'inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary' : 'inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-ink-foreground hover:bg-primary hover:text-foreground'}>{ext ? <ArrowUpRight aria-hidden className="size-4" /> : <FileText aria-hidden className="size-4" />}{d.label}</a></li>
      })}
    </ul>
  )
}
