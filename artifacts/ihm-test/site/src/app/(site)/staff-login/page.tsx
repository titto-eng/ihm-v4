// /staff-login/ — WordPress page 235 "Our Staff Hub": links to the systems staff sign in to.
import type { Metadata } from 'next'
import { GraduationCap, Headset, Newspaper, UserPlus } from 'lucide-react'
import { pageMetadata } from '@/components/page'
import { LoginHub, type HubTile } from '@/components/hub/LoginHub'

export const metadata: Metadata = pageMetadata({
  title: 'Staff Login',
  path: '/staff-login/',
  metaTitle: 'Staff Login | IHM Staff Hub',
  description: 'Sign in to the IHM staff systems: Staff Support Hub, student referrals, the staff intranet and Canvas LMS.',
})

const TILES: HubTile[] = [
  { title: 'Staff Support Hub', href: 'https://hcistaff.powerappsportals.com/', note: 'IT, HR and service requests', Icon: Headset },
  { title: 'Refer a Student', href: 'https://hcipartnerportal.powerappsportals.com/Referral-Partner-Home/', note: 'The HCI referral partner portal', Icon: UserPlus },
  { title: 'Staff Hub', href: 'https://hcig.sharepoint.com/sites/ThePerspective', note: 'The Perspective: news and resources', Icon: Newspaper },
  { title: 'Canvas LMS', href: 'https://ihm.instructure.com/', note: 'Teaching and course administration', Icon: GraduationCap },
]

export default function StaffLoginRoute() {
  return <LoginHub eyebrow="IHM staff" title={<>Our <em className="text-secondary">Staff Hub</em></>} intro="Quick access to the systems you use every day." tiles={TILES} />
}
