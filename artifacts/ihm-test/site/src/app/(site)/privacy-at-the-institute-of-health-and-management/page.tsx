// /privacy-at-the-institute-of-health-and-management/ — the website privacy statement (what the websites collect, cookies, sharing,
// rights, complaints). Copy in src/content/legal.ts (WEBSITE_PRIVACY).
import type { Metadata } from 'next'
import { Mail, ShieldAlert } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { LegalShell, PolicyDoc } from '@/components/legal/parts'
import { WEBSITE_PRIVACY as W } from '@/content/legal'

const PATH = '/privacy-at-the-institute-of-health-and-management/'

export const metadata: Metadata = pageMetadata({
  title: 'Privacy at the Institute of Health and Management',
  path: PATH,
  metaTitle: 'Website Privacy Statement | IHM',
  description: 'How IHM handles personal information collected through its websites: what we collect, cookies, how we use and share it, your rights, and how to make a privacy complaint.',
})

export default function WebsitePrivacyRoute() {
  return (
    <LegalShell path={PATH} eyebrow="Privacy" title={W.title} intro={W.intro}
      actions={<>
        <a href="mailto:itsupport@hci.edu.au" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-foreground hover:bg-secondary"><ShieldAlert aria-hidden className="size-4" />Report a breach</a>
        <a href="mailto:registrar@ihm.edu.au" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink-foreground/30 px-6 font-semibold hover:border-secondary hover:text-secondary"><Mail aria-hidden className="size-4" />Privacy complaint</a>
      </>}>
      <PolicyDoc chapters={W.chapters} />
    </LegalShell>
  )
}
