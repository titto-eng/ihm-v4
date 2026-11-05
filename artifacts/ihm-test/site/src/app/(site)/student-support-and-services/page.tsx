// /student-support-and-services/ — WordPress page 127: the student support hub. Tiles in src/content/student-support.ts.
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, BookOpen, HeartHandshake, MessagesSquare, Wallet } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { Lead, SupportShell, heroBtn, isExternal } from '@/components/student-support/parts'
import { LIVECHAT, SUPPORT_TILES } from '@/content/student-support'

export const metadata: Metadata = pageMetadata({
  title: 'Student Support and Services',
  path: '/student-support-and-services/',
  metaTitle: 'Student Support and Services | Counselling, Accessibility, Complaints and Handbooks | IHM',
  description: 'IHM student support: counselling (external and internal), accessibility and equity, complaints and appeals, credit and RPL, fees and refunds, student handbooks, Yammer and 24/7 LiveChat.',
})

const GROUPS = [
  { name: 'Wellbeing', icon: HeartHandshake, blurb: 'Someone to talk to, adjustments for your needs, and help outside IHM.' },
  { name: 'Your studies', icon: BookOpen, blurb: 'The rules, your rights and the support to succeed.' },
  { name: 'Money & documents', icon: Wallet, blurb: 'Pay, check fees and refunds, and keep your handbook close.' },
  { name: 'Connect', icon: MessagesSquare, blurb: 'Talk to fellow students, or to us, any time.' },
] as const

export default function StudentSupportRoute() {
  return (
    <SupportShell
      path="/student-support-and-services/"
      title={<>Whatever our students need, <em className="text-secondary">we&apos;ve got your back!</em></>}
      intro="At IHM, we offer a wide range of student support services, from online resources to peer forums and personalised counselling sessions with mentors – all designed to help you make the most out of your study experience."
      image={{ src: '/images/student-support/support-hero.webp', alt: 'Students working together around a laptop' }}
      actions={<><Link href="/support-staff/" className={heroBtn(true)}>Our Support Team<ArrowRight aria-hidden className="size-4" /></Link><Link href="/courses/" className={heroBtn()}>Find Your Perfect Course</Link><a href={LIVECHAT} target="_blank" rel="noopener noreferrer" className={heroBtn()}>LiveChat 24/7</a></>}
    >
      <Section>
        <Lead eyebrow="Everything in one place" title="Student Support and Services" />
        <div className="grid gap-6 lg:grid-cols-2">
          {GROUPS.map(({ name, icon: Icon, blurb }) => (
            <div key={name} className="rounded-card border border-border bg-card p-6 md:p-7">
              <div className="flex items-center gap-4"><span className="bg-brand-gradient grid size-12 place-items-center rounded-2xl text-foreground"><Icon aria-hidden className="size-5" /></span><div><h3 className="display text-2xl">{name}</h3><p className="text-sm text-muted-foreground">{blurb}</p></div></div>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {SUPPORT_TILES.filter((t) => t.group === name).map((t) => {
                  const ext = isExternal(t.href)
                  const cls = 'group/t flex h-full items-start justify-between gap-3 rounded-2xl bg-muted/60 p-4 transition-colors hover:bg-blush'
                  const inner = <><span><span className="block font-semibold group-hover/t:text-primary-strong">{t.title}</span>{'body' in t && <span className="mt-1 block text-xs text-muted-foreground">{t.body}</span>}</span>{ext ? <ArrowUpRight aria-hidden className="size-4 shrink-0" /> : <ArrowRight aria-hidden className="size-4 shrink-0 transition-transform group-hover/t:translate-x-1" />}</>
                  return <li key={t.title}>{ext ? <a href={t.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a> : <Link href={t.href} className={cls}>{inner}</Link>}</li>
                })}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </SupportShell>
  )
}
