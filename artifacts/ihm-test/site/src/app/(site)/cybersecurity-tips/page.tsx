// /cybersecurity-tips/ — WordPress page 5776: cybersecurity tips, MFA set-up for Microsoft 365, phishing examples and the
// Atlassian advisory. Copy in src/content/student-support.ts (CYBER); images via legacy-assets.ts.
import type { Metadata } from 'next'
import Image from 'next/image'
import { AlertTriangle, ArrowUpRight, DatabaseBackup, KeyRound, Phone, RefreshCw, ShieldCheck, Smartphone, Siren } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { Eyebrow } from '@/components/micro-credentials/parts'
import { Lead, SupportShell, heroBtn } from '@/components/student-support/parts'
import { legacyImage } from '@/lib/legacy-image'
import { CYBER as C } from '@/content/student-support'

export const metadata: Metadata = pageMetadata({
  title: 'Cybersecurity Tips',
  path: '/cybersecurity-tips/',
  metaTitle: 'Cybersecurity Tips for IHM Students and Staff | MFA, Phishing, Passphrases and Scams',
  description: 'Stay safe online: keep devices updated, turn on multi-factor authentication for Microsoft 365, back up your data, use passphrases, spot phishing emails and report incidents to cyber.gov.au.',
})

const TIP_ICONS = [RefreshCw, Smartphone, DatabaseBackup, KeyRound, Siren]

export default function CybersecurityRoute() {
  const hero = legacyImage('/images/student-support/cyber-security.webp', '')
  const shots = [['/images/student-support/phishing-email-desktop.webp', 'Emails received in Outlook on a computer'], ['/images/student-support/phishing-email-mobile.webp', 'Emails received in Outlook on a mobile phone']].map(([s, l]) => ({ src: legacyImage(s, ''), label: l }))
  return (
    <SupportShell
      path="/cybersecurity-tips/"
      eyebrow="Student support · Cybersecurity"
      title={<>Stay Informed, <em className="text-secondary">Stay Safe!</em></>}
      intro={C.intro[0]}
      image={hero ? { src: hero, alt: 'Cyber security illustration' } : undefined}
      actions={<><a href="#mfa" className={heroBtn(true)}>Set up MFA</a><a href="https://www.cyber.gov.au/" target="_blank" rel="noopener noreferrer" className={heroBtn()}>Report an incident</a></>}
    >
      <Section>
        <div className="mb-10 max-w-3xl space-y-3 text-lg text-muted-foreground">{C.intro.slice(1).map((p) => <p key={p.slice(0, 30)}>{p}</p>)}</div>
        <Eyebrow>Cybersecurity Tips</Eyebrow>
        <h2 className="display text-display-md mb-8">Simple Cybersecurity Tips</h2>
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {C.tips.map((t, i) => { const Icon = TIP_ICONS[i]; return (
            <li key={t.title} className="group/t flex flex-col rounded-card border border-border bg-card p-5 transition-transform duration-300 hover:-translate-y-1">
              <span className="bg-brand-gradient grid size-11 place-items-center rounded-2xl text-foreground transition-transform group-hover/t:rotate-6"><Icon aria-hidden className="size-5" /></span>
              <h3 className="display mt-4 text-xl">{t.title}</h3>
              <ul className="mt-2 grid gap-2 text-sm text-muted-foreground">{t.items.map((x) => <li key={x}>{x}</li>)}</ul>
            </li>
          ) })}
        </ol>
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-card bg-sand/60 p-6 md:p-8">
            <h3 className="display text-2xl">Level Up Your Cybersecurity by:</h3>
            <dl className="mt-5 grid gap-3 sm:grid-cols-2">{C.levelUp.map(([k, v]) => <div key={k} className="rounded-2xl bg-card p-4"><dt className="font-semibold">{k}</dt><dd className="text-sm text-muted-foreground">{v}</dd></div>)}</dl>
          </div>
          <div className="rounded-card bg-ink p-6 text-ink-foreground md:p-8">
            <Siren aria-hidden className="size-7 text-secondary" />
            <h3 className="display mt-3 text-2xl">Report Cybersecurity Incidents</h3>
            <ul className="mt-4 grid gap-3">
              <li><a href="https://www.cyber.gov.au/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between rounded-2xl bg-ink-foreground/5 p-4 font-semibold">Visit cyber.gov.au<ArrowUpRight aria-hidden className="size-4" /></a></li>
              <li><a href="tel:1300292371" className="flex items-center gap-3 rounded-2xl bg-ink-foreground/5 p-4"><Phone aria-hidden className="size-5 text-secondary" /><span><span className="block font-semibold">Call 1300 CYBER1</span><span className="text-sm text-ink-foreground/70">1300 292 371</span></span></a></li>
            </ul>
            <p className="mt-4 text-sm text-ink-foreground/70">Explore additional resources at <a href="https://www.cyber.gov.au/learn" target="_blank" rel="noopener noreferrer" className="font-semibold text-secondary underline">cyber.gov.au/learn</a>. Stay safe online!</p>
          </div>
        </div>
      </Section>
      <Section tone="muted" anchorId="mfa">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Lead eyebrow="Secure Your Account with Multi-Factor Authentication (MFA)" title="Setting up MFA for Microsoft 365 Accounts"><p>{C.mfaIntro}</p></Lead>
            <div className="rounded-card border border-border bg-card p-6"><h3 className="flex items-center gap-2 font-semibold"><ShieldCheck aria-hidden className="size-5 text-primary-strong" />What is MFA?</h3><p className="mt-2 text-sm text-muted-foreground">{C.mfaWhat}</p></div>
          </div>
          <div>
            <h3 className="display mb-4 text-2xl">How to Set Up MFA: Step-by-Step Guide</h3>
            <ol className="relative grid gap-4 before:absolute before:top-4 before:bottom-4 before:left-5 before:w-0.5 before:bg-primary/25">
              {C.mfaSteps.map(([t, b], i) => (
                <li key={t} className="relative pl-14">
                  <span className="bg-brand-gradient absolute top-3 left-0 grid size-10 place-items-center rounded-full font-bold ring-4 ring-muted">{i + 1}</span>
                  <div className="rounded-card border border-border bg-card p-5"><p className="label-mono text-[10px] text-muted-foreground">Step {i + 1}</p><p className="font-semibold">{t}</p><p className="mt-1 text-sm text-muted-foreground">{b}</p>
                    {i === 2 && <ul className="mt-3 flex flex-wrap gap-2">{C.apps.map((a) => <li key={a.href}><a href={a.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-ink-foreground">{a.label}<ArrowUpRight aria-hidden className="size-4" /></a></li>)}</ul>}
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-4 rounded-2xl bg-sand/70 p-4 text-sm"><strong>Note:</strong> {C.mfaNote}</p>
          </div>
        </div>
      </Section>
      <Section anchorId="phishing">
        <Lead eyebrow="Don't take the bait" title="Phishing Emails and Messages"><p>{C.phishing}</p></Lead>
        {shots.some((s) => s.src) && (
          <div className="mb-8 grid gap-5 md:grid-cols-2">{shots.filter((s) => s.src).map((s) => <figure key={s.label} className="overflow-hidden rounded-card border border-border bg-card"><Image src={s.src} alt={`Phishing email example: ${s.label}`} width={1000} height={560} className="h-auto w-full" /><figcaption className="p-4 text-sm font-semibold">{s.label}</figcaption></figure>)}</div>
        )}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="rounded-card bg-blush p-5 text-[15px]">{C.phishingScam}</p>
            <p className="flex gap-3 rounded-card bg-ink p-5 text-[15px] text-ink-foreground"><AlertTriangle aria-hidden className="size-6 shrink-0 text-secondary" />{C.phishingNever}</p>
          </div>
          <div>
            <p className="mb-3 font-semibold">To fortify yourself and our organisation against phishing attacks, please adhere to the following guidelines:</p>
            <ol className="grid gap-3">{C.phishingRules.map((r, i) => <li key={r} className="flex gap-3 rounded-2xl border border-border bg-card p-4 text-sm"><span className="display text-2xl text-primary/70">{i + 1}</span>{r}</li>)}</ol>
          </div>
        </div>
      </Section>
      <Section tone="muted" anchorId="atlassian">
        <details className="group/a rounded-card border border-border bg-card">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 [&::-webkit-details-marker]:hidden"><span><span className="label-mono block text-[10px] text-muted-foreground">Advisory</span><span className="display text-2xl">Advisory Regarding Atlassian Products</span></span><span className="text-sm font-semibold text-primary-strong group-open/a:hidden">Read</span></summary>
          <div className="grid gap-6 border-t border-border p-6 lg:grid-cols-2">
            <div><p className="text-[15px]">{C.atlassian.intro}</p><h3 className="mt-5 font-semibold">Background / What has happened?</h3><ul className="mt-2 grid gap-2 text-sm text-muted-foreground">{C.atlassian.background.map((b) => <li key={b}>• {b}</li>)}</ul></div>
            <div><h3 className="font-semibold">Mitigation / How do I stay secure?</h3><ul className="mt-2 grid gap-2 text-sm text-muted-foreground">{C.atlassian.mitigation.map((b) => <li key={b}>• {b}</li>)}</ul><h3 className="mt-5 font-semibold">Additional information: vendor advisories</h3><ul className="mt-2 grid gap-2">{C.atlassian.advisories.map((a) => <li key={a.href}><a href={a.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1.5 text-sm font-semibold text-primary-strong"><ArrowUpRight aria-hidden className="mt-0.5 size-4 shrink-0" />{a.label}</a></li>)}</ul></div>
          </div>
        </details>
      </Section>
    </SupportShell>
  )
}
