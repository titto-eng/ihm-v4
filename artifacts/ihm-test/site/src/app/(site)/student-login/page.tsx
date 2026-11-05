// /student-login/ — WordPress page 186 "Our Student Hub": links to the systems students sign in to.
import type { Metadata } from 'next'
import { Award, BookOpen, GraduationCap, LifeBuoy, Mail, MessageCircleQuestion, NotebookPen, PenLine, UserRound, Video } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { LoginHub, type HubTile } from '@/components/hub/LoginHub'

export const metadata: Metadata = pageMetadata({
  title: 'Student Login',
  path: '/student-login/',
  metaTitle: 'Student Login | IHM Student Hub',
  description: 'Sign in to the IHM student systems: Ace LMS, Student Hub, virtual classroom, student email, library, student support portal, Grammarly, EndNote and credit/RPL.',
})

const TILES: HubTile[] = [
  { title: 'Need Help?', href: '/talk-to-rishi/', note: 'Ask Rishi, our virtual assistant', Icon: MessageCircleQuestion },
  { title: 'Ace LMS', href: 'https://canvas.ihna.edu.au/login', note: 'Units, assessments and learning materials', Icon: GraduationCap },
  { title: 'Student Hub', href: 'https://student.ihm.edu.au', note: 'Your enrolment, timetable and results', Icon: UserRound },
  { title: 'Virtual Classroom', href: 'https://teams.microsoft.com/go', note: 'Join your live classes in Microsoft Teams', Icon: Video },
  { title: 'Student Email', href: 'https://outlook.office.com/mail/', note: 'Your IHM Outlook mailbox', Icon: Mail },
  { title: 'Library', href: '/library/', note: 'Catalogue, e-resources and guides', Icon: BookOpen },
  { title: 'Student Support Portal', href: 'https://myihm.powerappsportals.com/', note: 'Requests and support cases', Icon: LifeBuoy },
  { title: 'Grammarly', href: '/grammarly/', note: 'Writing support for your assignments', Icon: PenLine },
  { title: 'EndNote', href: '/end-note/', note: 'Manage references and citations', Icon: NotebookPen },
  { title: 'Credit & RPL', href: '/credit-and-recognition-of-prior-learning/', note: 'Apply for credit for prior learning', Icon: Award },
]

export default function StudentLoginRoute() {
  return <LoginHub eyebrow="Current students" title={<>Our <em className="text-secondary">Student Hub</em></>} intro="Everything you sign in to as an IHM student, in one place." tiles={TILES} />
}
