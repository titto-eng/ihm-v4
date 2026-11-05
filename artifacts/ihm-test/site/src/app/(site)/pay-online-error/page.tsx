// /pay-online-error/ — the old payment error page, kept at its URL. Not indexed (payment pages, 45).
import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle, ArrowLeft, Mail, Phone } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { site } from '@/content/site'

export const metadata: Metadata = pageMetadata({
  title: 'Pay Online Error',
  path: '/pay-online-error/',
  description: 'The online payment cannot be processed. Check your details and that JavaScript is enabled, then try again.',
  noindex: true,
})

export default function PayOnlineErrorRoute() {
  return (
    <Section>
      <div className="mx-auto max-w-2xl rounded-card border border-border bg-card p-8 text-center md:p-12">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-blush text-primary-strong"><AlertTriangle aria-hidden className="size-8" /></span>
        <h1 className="display mt-6 text-[clamp(2rem,5vw,3.2rem)] leading-tight">Error occurred</h1>
        <p className="mt-4 text-lg font-semibold">The online payment cannot be processed.</p>
        <p className="mt-2 text-muted-foreground">Please check whether you have entered all the details properly and also make sure that JavaScript is enabled in your browser.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/make-a-payment/" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-foreground hover:bg-secondary"><ArrowLeft aria-hidden className="size-4" />Try again</Link>
          <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border px-6 font-semibold hover:border-primary"><Phone aria-hidden className="size-4" />{site.phone}</a>
          <a href={`mailto:${site.email}`} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border px-6 font-semibold hover:border-primary"><Mail aria-hidden className="size-4" />{site.email}</a>
        </div>
      </div>
    </Section>
  )
}
