// /support-staff/ — WordPress page 6681 "Meet Our Support Team": student support staff and campus managers with their roles and
// campuses. Contact goes through the Student Support mailbox and LiveChat (no personal mailboxes). Copy in src/content/about.ts.
import type { Metadata } from 'next'
import { MapPin } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { SupportShell, Lead } from '@/components/student-support/parts'
import { SUPPORT_STAFF as S } from '@/content/about'

export const metadata: Metadata = pageMetadata({
  title: 'Support Staff',
  path: '/support-staff/',
  metaTitle: 'Meet Our Support Team | Student Support and Campus Managers | IHM',
  description: 'Meet the IHM student support team and campus managers in Melbourne, Perth, Sydney and Brisbane, here to help you throughout your academic journey.',
})

const initials = (n: string) => n.replace(/^(Ms|Mr|Dr)\.?\s+/, '').split(/\s+/).slice(0, 2).map((w) => w[0]).join('')

export default function SupportStaffRoute() {
  const groups = [...new Set(S.staff.map((s) => s.group))]
  return (
    <SupportShell path="" title={<>Meet our <em className="text-secondary">support team</em></>} intro={S.intro[0]}>
      {groups.map((g, gi) => (
        <Section key={g} tone={gi % 2 ? 'muted' : 'default'} anchorId={g.toLowerCase().replace(/[^a-z]+/g, '-')}>
          <Lead eyebrow={gi ? 'Campuses' : 'Student support'} title={gi ? g : 'Your key support staff'} />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {S.staff.filter((s) => s.group === g).map((s) => (
              <li key={s.name} className="rounded-card border border-border bg-card p-5 transition-shadow hover:shadow-lg">
                <span className="bg-brand-gradient grid size-14 place-items-center rounded-2xl text-lg font-bold text-foreground">{initials(s.name)}</span>
                <h3 className="display mt-4 text-xl">{s.name}</h3>
                <p className="text-sm font-semibold text-primary-strong">{s.role}</p>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin aria-hidden className="size-4" />{s.location}</p>
              </li>
            ))}
          </ul>
        </Section>
      ))}
    </SupportShell>
  )
}
