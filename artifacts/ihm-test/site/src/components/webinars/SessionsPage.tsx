import type { ReactNode } from 'react'
import { pageMetadata } from '@/components/page'
import { EnquiryForm } from '@/components/page'
import { Section } from '@/components/layout/Section'
import { SupportShell } from '@/components/student-support/parts'
import { AdmissionsBand } from '@/components/admissions/parts'
import { MARKETS, PRESENTERS, type Session } from '@/content/webinars'
import { legacyImage } from '@/lib/legacy-image'
import { SessionsBoard, type BoardSession } from './SessionsBoard.client'

const today = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'Australia/Melbourne' }).format(new Date())
const label = (iso: string) => new Intl.DateTimeFormat('en-AU', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`))

export const sessionsMetadata = (title: string, path: string, what: string) => pageMetadata({
  title,
  path,
  metaTitle: `${title} | Free Nursing Career Webinars | IHM`,
  description: `Unlock global nursing career pathways: upcoming and previous ${what} webinars and events from IHM, filtered by location and presenter, with free registration.`,
})

/** /mon-events-and-webinars/ and /gcan-events-and-webinars/. */
export function SessionsPage({ title, sessions }: { title: ReactNode; sessions: Session[] }) {
  const now = today()
  const board: BoardSession[] = sessions.map((s) => ({ ...s, image: s.image ? legacyImage(s.image, '') || undefined : undefined, label: label(s.date), past: s.date < now }))
  return (
    <SupportShell path="" eyebrow="Professional growth" title={title} intro="Unlock global nursing career pathways. Explore live upcoming interactive sessions and review past knowledge accelerators compiled from our international qualification portfolios." nav={[]} band={<AdmissionsBand />}>
      <Section anchorId="sessions">
        <SessionsBoard sessions={board} markets={MARKETS} presenters={PRESENTERS} />
      </Section>
      <EnquiryForm tone="muted" formKey="event-registration" heading="Register your interest" variant="card" anchorId="register" />
    </SupportShell>
  )
}
