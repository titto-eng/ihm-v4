// /end-note/ — WordPress page 3086: EndNote 25 for IHM students and staff (features, installers, support).
import type { Metadata } from 'next'
import { Apple, ArrowUpRight, Check, Download, MonitorDown } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { JsonLd } from '@/components/seo/JsonLd'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { LibraryShell } from '@/components/library/LibraryShell'

export const metadata: Metadata = pageMetadata({
  title: 'EndNote',
  path: '/end-note/',
  metaTitle: 'EndNote 25 for IHM Students | Reference Manager Download for Windows and Mac',
  description: 'EndNote 25, the reference management tool for IHM students and staff: Cite While You Write in Word, 7,000+ reference styles, shared libraries, PDF annotation and Windows and Mac installers.',
})

const FEATURES = [
  'Look for references and PDFs in hundreds of internet resources.',
  'Ensure your bibliography is accurate with refreshed journal and referencing styles.',
  'With a single click, you can access full-text research articles.',
  'Use the cloud to access your research at any time and from any location. Switch between online, desktop, and iPad applications with ease.',
  'Read, review, annotate, and search PDFs in your library with ease.',
  'Share some or all your library with collaborators worldwide.',
  'Create rules to automatically organize references as you write.',
  'Provide write or read-only access to your library.',
  'Keep your data accurate with automatic reference and link updating.',
  'Use the new Tabs feature for easier multitasking.',
  'Quickly deduplicate the content in your library by searching on unique identifiers.',
  'Track your teammates’ changes and view their activity in your shared library.',
  'Insert in-text citations from your library with the Cite While You Write feature in Microsoft® Word.',
  'Match your paper with relevant, reputable journals using Manuscript Matcher.',
  'Automatically build your bibliography using the library of 7,000+ reference types or your own customized style.',
  'Conduct large-scale literature reviews with ease and speed using the powerful analysis tools.',
]
const INSTALLERS = [
  { label: 'Windows Installer', href: 'https://download.endnote.com/downloads/2025/EN2025Inst.exe', icon: MonitorDown },
  { label: 'Mac Installer', href: 'https://download.endnote.com/downloads/2025/EndNote2025Installer.dmg', icon: Apple },
]

export default function EndNoteRoute() {
  return (
    <LibraryShell path="/end-note/" eyebrow="Library · Research tools" title="EndNote" intro="Did you know that every year, researchers waste over 200,000 hours formatting citations? Imagine if you could reclaim that time to devote to your studies." image="/images/library/end-note.webp">
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'EndNote 25', applicationCategory: 'ReferenceManager', operatingSystem: 'Windows, macOS', downloadUrl: INSTALLERS.map((i) => i.href) }} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="space-y-4 text-[17px] leading-relaxed">
            <Eyebrow>Focus on your ideas</Eyebrow>
            <h2 className="display text-display-md">The world&apos;s leading reference manager</h2>
            <p>EndNote 25 speeds up your research process, allowing you to focus on what really matters: conducting and sharing new research.</p>
            <p>EndNote 25, the world&apos;s leading reference management tool, assists you in saving time, staying organised, collaborating with colleagues, and, eventually, publishing. As a result, you can concentrate on what is most important: your ideas.</p>
          </div>
          <dl className="grid grid-cols-3 gap-3">
            {[['200,000+', 'hours lost to formatting citations each year'], ['7,000+', 'reference types and styles'], ['3', 'apps: online, desktop and iPad']].map(([v, l]) => (
              <div key={l} className="rounded-card bg-ink p-5 text-ink-foreground"><dd className="display text-3xl text-secondary">{v}</dd><dt className="mt-2 text-xs text-ink-foreground/75">{l}</dt></div>
            ))}
          </dl>
        </div>
      </Section>
      <Section tone="muted">
        <Eyebrow>What you can do</Eyebrow>
        <h2 className="display text-display-md mb-10">Accelerate your research</h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => <li key={f} className="flex gap-3 rounded-2xl border border-border bg-card p-4 text-sm"><span className="bg-brand-gradient mt-0.5 grid size-6 shrink-0 place-items-center rounded-full"><Check aria-hidden className="size-3.5" /></span>{f}</li>)}
        </ul>
      </Section>
      <Section anchorId="install">
        <div className="grid gap-8 rounded-card bg-ink p-7 text-ink-foreground md:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <Eyebrow onDark>Installing EndNote</Eyebrow>
            <h2 className="display text-3xl">Get EndNote 25 for Windows or Mac</h2>
            <p className="mt-3 text-ink-foreground/80">EndNote 25 can be used on Windows and Mac. For information on compatibility and system requirements, <a href="https://endnote.com/product-details/compatibility" target="_blank" rel="noopener noreferrer" className="font-semibold text-secondary underline underline-offset-4">please visit the EndNote website</a>. Please select the installer for your operating system.</p>
            <p className="mt-3 text-sm text-ink-foreground/70">For questions about EndNote, contact <a href="https://endnote.com/contact" target="_blank" rel="noopener noreferrer" className="font-semibold text-secondary underline underline-offset-4">Customer Support</a>.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            {INSTALLERS.map(({ label, href, icon: Icon }) => <a key={href} href={href} className="inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 font-semibold text-foreground hover:bg-secondary"><Icon aria-hidden className="size-5" />{label}<Download aria-hidden className="ml-auto size-4" /></a>)}
          </div>
        </div>
        <p className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground"><ArrowUpRight aria-hidden className="size-4" />Downloads come directly from endnote.com.</p>
      </Section>
    </LibraryShell>
  )
}
