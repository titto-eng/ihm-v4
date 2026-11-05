// The policy, procedure and form links come from the `documents` collection (marketing edits titles, order and files in /admin);
// the tabs, headings and the "IHM Forms" prose are code. The data is read through the cached index tagged `documents`, which the
// collection's hooks revalidate, so a change in the admin shows here without a deploy.
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { pageMetadata, Hero, Rich, Tabs } from '@/components/page'
import type { DocumentSection } from '@/collections/Documents'
import { documentHref, documentsIn, getDocumentIndex, type DocumentEntry } from '../pdf/documents'

export const metadata: Metadata = pageMetadata({
  title: 'Policies & Procedures',
  path: '/policies-procedures/',
  description: '1. All IHM staff members and members of governance committees must lodge a “IHM Conflict of Interest Declaration Form” in an appropriate case. For details',
})

function DocList({ docs }: { docs: DocumentEntry[] }) {
  return (
    <ul>
      {docs.map((d) => (
        <li key={d.publicPath}>
          <a href={documentHref(d.publicPath)}>{d.title}</a>
        </li>
      ))}
    </ul>
  )
}

export default async function PoliciesProceduresRoute() {
  const docs = await getDocumentIndex()
  const byPath = new Map(docs.map((d) => [d.publicPath, d]))
  const section = (s: DocumentSection) => <DocList docs={documentsIn(docs, s)} />
  // A document named in the forms prose: its current title, or the words given here when it is not in the collection.
  const doc = (publicPath: string, fallback: string): ReactNode => <a href={documentHref(publicPath)}>{byPath.get(publicPath)?.title ?? fallback}</a>

  return (
    <>
      <Hero heading="Our Policies & Procedures" variant="compact" audienceSwitch={false} eyebrow="Policy" />
      <Tabs
        tabs={[
          {
            label: 'IHM Policies for Students',
            content: (
              <Rich depth={1}>
                <h4>IHM Policies for Students</h4>
                {section('student-policies')}
              </Rich>
            ),
          },
          {
            label: 'IHM Procedures for Students',
            content: (
              <Rich depth={1}>
                <h4>IHM Procedures Students</h4>
                {section('student-procedures')}
              </Rich>
            ),
          },
          {
            label: 'IHM Policies and Procedures for Staff',
            content: (
              <Rich depth={1}>
                <h4>Policies</h4>
                {section('staff-policies')}
                <h4>Procedures</h4>
                {section('staff-procedures')}
              </Rich>
            ),
          },
          {
            label: 'IHM Glossary of Terms',
            content: (
              <Rich depth={1}>
                <h4>IHM Glossary of Terms</h4>
                {section('glossary')}
              </Rich>
            ),
          },
          {
            label: 'IHM Forms',
            content: (
              <Rich depth={1}>
                <h4>IHM Forms</h4>
                <p><strong>1.</strong> All IHM staff members and members of governance committees must lodge a “IHM Conflict of Interest Declaration Form” in an appropriate case. For details, please refer to the IHM Conflict of Interest Disclosure Framework at: {doc('/pdf/IHM_Policies_and_Procedures_for_Staff/IHM_Conflict_of_Interest_Disclosure_Framework.pdf', 'IHM Conflict of Interest Disclosure Framework')}</p>
                <ul>
                  <li>{doc('/pdf/IHM_Conflict_of_Interest_Declaration_Form.pdf', 'IHM Conflict of Interest Declaration Form')}</li>
                </ul>
                <p><strong>2.</strong>Learning Access Plan (LAP): A LAP should be adopted for a student with a disability by the Course Coordinator in consultation with the Accessibility Liaison Officer (ALO). The Form can be accessed here</p>
                <ul>
                  <li>{doc('/pdf/Learning_Access_Plan.pdf', 'Learning Access Plan')}</li>
                </ul>
                <p><strong>3.</strong>Critical Incident Reporting: Critical Incident is a traumatic event, or the threat of such (within or outside Australia), which causes extreme stress, fear or injury. Please report any such incident immediately by submitting the IHM Critical Incident Report Form. This helps us respond promptly, manage effectively, and prevent recurrence. The Form can be accessed here</p>
                <ul>
                  <li><a href="https://www.superform.spot-nik.com/form/65039ede93cf693508bb77cf" rel="noopener noreferrer">IHM Critical Incident Report Form</a></li>
                </ul>
              </Rich>
            ),
          },
        ]}
      />
    </>
  )
}
