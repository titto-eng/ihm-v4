// /make-a-payment/ — the old payment chooser: card payment (our /makepayment/ flow, module 45) or an overseas payment through
// Western Union GlobalPay for Students. Not indexed, like every payment page (00-architecture, 45).
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, CreditCard, Globe2, Lock, ShieldCheck } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { HeroRays } from '@/blocks/hero/Component'
import { site } from '@/content/site'

export const metadata: Metadata = pageMetadata({
  title: 'Make a payment',
  path: '/make-a-payment/',
  description: 'Pay IHM by credit or debit card (Visa or MasterCard), or from overseas with Western Union GlobalPay for Students.',
  noindex: true,
})

const WU = 'https://student.globalpay.wu.com/geo-buyer/ihm'

export default function MakeAPaymentRoute() {
  return (
    <>
      <section data-tone="ink" className="bg-ink-glow relative isolate overflow-hidden text-ink-foreground">
        <HeroRays id="pay-rays" className="-right-24 -bottom-28 -z-10 w-[28rem] opacity-[0.13]" />
        <div className="mx-auto max-w-site px-5 pt-16 pb-14 md:px-8 md:pt-24">
          <Eyebrow onDark>Payments</Eyebrow>
          <h1 className="display text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.04]">Make a <em className="text-secondary not-italic">payment</em></h1>
          <p className="mt-4 max-w-xl text-lg text-ink-foreground/80">Please select your option.</p>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-[1fr_auto_1fr]">
          <Link href="/makepayment/" className="group flex flex-col rounded-card border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl">
            <span className="grid size-14 place-items-center rounded-2xl bg-brand-gradient text-foreground"><CreditCard aria-hidden className="size-7" /></span>
            <h2 className="display mt-6 text-3xl">Payment from Credit / Debit Card</h2>
            <p className="mt-2 text-muted-foreground">Visa or MasterCard</p>
            <span className="mt-auto inline-flex items-center gap-2 pt-8 font-semibold text-primary-strong">Pay by card<ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" /></span>
          </Link>
          <p aria-hidden className="label-mono grid place-items-center text-muted-foreground">or</p>
          <a href={WU} target="_blank" rel="noopener noreferrer" className="group flex flex-col rounded-card border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl">
            <span className="grid size-14 place-items-center rounded-2xl bg-ink text-ink-foreground"><Globe2 aria-hidden className="size-7" /></span>
            <h2 className="display mt-6 text-3xl">Payment from Overseas</h2>
            <p className="mt-2 flex items-center gap-3 text-muted-foreground">Powered by <Image src="/images/payments/western-union.webp" alt="Western Union" width={123} height={25} className="h-5 w-auto" /></p>
            <span className="mt-auto inline-flex items-center gap-2 pt-8 font-semibold text-primary-strong">Pay from overseas<ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
          </a>
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <li className="flex items-center gap-2"><Lock aria-hidden className="size-4 text-primary-strong" />Card details are entered on the gateway&apos;s secure page, never on ours</li>
          <li className="flex items-center gap-2"><ShieldCheck aria-hidden className="size-4 text-primary-strong" />Questions about a payment? Call {site.phone} or email {site.email}</li>
        </ul>
      </Section>
    </>
  )
}
