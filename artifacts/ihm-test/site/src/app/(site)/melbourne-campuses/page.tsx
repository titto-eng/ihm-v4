// /melbourne-campuses/ — the Melbourne campus page: the city, photos, campus video, campus team (no personal
// mailboxes), address and map, courses taught there and the enquiry form. Copy in src/content/campus-pages.ts; layout in
// src/components/campus/parts.tsx (CampusDetail).
import type { Metadata } from 'next'
import { pageMetadata } from '@/components/page'
import { CampusDetail } from '@/components/campus/parts'

export const metadata: Metadata = pageMetadata({
  title: 'Melbourne Campuses',
  path: '/melbourne-campuses/',
  metaTitle: 'Melbourne Campuses (North Melbourne & CBD) | IHM Australia',
  description: "IHM's two Melbourne campuses: 187 Boundary Rd, North Melbourne and 399 Lonsdale St in the CBD. Campus video, team, maps and the courses taught in Melbourne.",
})

export default function MelbourneCampusesRoute() {
  return <CampusDetail slug="melbourne" />
}
