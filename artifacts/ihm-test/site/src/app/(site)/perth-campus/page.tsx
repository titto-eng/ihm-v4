// /perth-campus/ — the Perth campus page: the city, photos, public transport, campus team (no personal
// mailboxes), address and map, courses taught there and the enquiry form. Copy in src/content/campus-pages.ts; layout in
// src/components/campus/parts.tsx (CampusDetail).
import type { Metadata } from 'next'
import { pageMetadata } from '@/components/page'
import { CampusDetail } from '@/components/campus/parts'

export const metadata: Metadata = pageMetadata({
  title: 'Perth Campus',
  path: '/perth-campus/',
  metaTitle: 'Perth Campus (Perth CBD) | IHM Australia',
  description: "IHM's Perth campus at Level 4, 12 St Georges Terrace in the Perth CBD: free CAT buses, train stations nearby, the campus team, map and courses.",
})

export default function PerthCampusRoute() {
  return <CampusDetail slug="perth" />
}
