// /brisbane-campus/ — the Brisbane campus page: the city, photos, 3D tour, campus team (no personal
// mailboxes), address and map, courses taught there and the enquiry form. Copy in src/content/campus-pages.ts; layout in
// src/components/campus/parts.tsx (CampusDetail).
import type { Metadata } from 'next'
import { pageMetadata } from '@/components/page'
import { CampusDetail } from '@/components/campus/parts'

export const metadata: Metadata = pageMetadata({
  title: 'Brisbane Campus',
  path: '/brisbane-campus/',
  metaTitle: 'Brisbane Campus (Brisbane CBD) | IHM Australia',
  description: "IHM's Brisbane campus at 47-59 Adelaide St in the Brisbane CBD: 3D virtual tour, campus team, map and the courses taught in Brisbane.",
})

export default function BrisbaneCampusRoute() {
  return <CampusDetail slug="brisbane" />
}
