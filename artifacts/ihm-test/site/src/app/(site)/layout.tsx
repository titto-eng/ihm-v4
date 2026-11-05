import type { Metadata } from 'next'
import { Bricolage_Grotesque, Fraunces, Spline_Sans_Mono } from 'next/font/google'
import type { ReactNode } from 'react'
import '@/styles/theme.css'
import { AudienceProvider } from '@/components/audience/AudienceProvider'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Toaster } from '@/components/ui/sonner'
import { Tracking } from '@/components/tracking/Tracking'

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', axes: ['opsz', 'SOFT'], style: ['normal', 'italic'], display: 'swap' })
const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage', display: 'swap' })
const splineMono = Spline_Sans_Mono({ subsets: ['latin'], variable: '--font-spline-mono', weight: ['400', '500'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: { default: 'Institute of Health and Management', template: '%s | IHM' },
}

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning: browser extensions (Grammarly, password managers) add attributes to <html>/<body> before React
    // hydrates. It applies to these two elements' own attributes only; mismatches inside the page are still reported.
    <html lang="en-AU" className={`${fraunces.variable} ${bricolage.variable} ${splineMono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Tracking />
        <AudienceProvider>
          <a href="#main" className="sr-only z-50 rounded-full bg-foreground px-4 py-2 text-background focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
            Skip to content
          </a>
          <Header />
          <main id="main" className="flex-1">{children}</main>
          <Footer />
        </AudienceProvider>
        <Toaster />
      </body>
    </html>
  )
}
