// /sydney-campus/ — the Sydney campus page: the city, photos, campus video, campus team (no personal
// mailboxes), address and map, courses taught there and the enquiry form. Copy in src/content/campus-pages.ts; layout in
// src/components/campus/parts.tsx (CampusDetail).
import type { Metadata } from 'next'
import { pageMetadata } from '@/components/page'
import { CampusDetail } from '@/components/campus/parts'

export const metadata: Metadata = pageMetadata({
  title: 'Sydney Campus',
  path: '/sydney-campus/',
  metaTitle: 'Sydney Campus (Parramatta) | IHM Australia',
  description: "Study nursing and health at IHM's Sydney campus in Parramatta, NSW: 1 Wentworth St, 30 minutes from the Sydney CBD. Campus video, team, map and courses.",
})

export default function SydneyCampusRoute() {
  return <CampusDetail slug="sydney" />
}
