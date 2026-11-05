import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { StaffProfile } from '@/components/templates/StaffProfile'
import { pageMetadata } from '@/components/page/metadata'
import { staffPaths } from '@/content/staff-paths'
import { slugsToPath } from '@/lib/paths'
import type { Staff } from '@/payload-types'

// The only dynamic content route left after the 2026-10-19 cut: the old staff profile URLs (`/<person>/`, DEC-9), served from the
// `staff` collection through src/content/staff-paths.ts. Every other page is a route file; anything else here is a 404.
// Exact-path redirects live in next.config.ts (src/content/redirects.ts), prefix rules in src/proxy.ts. `/` is its own route file.

type Params = Promise<{ slug: string[] }>

async function getStaff(path: string): Promise<Staff | null> {
  const slug = staffPaths[path]
  if (!slug) return null
  const payload = await getPayload({ config })
  const { docs } = await payload.find({ collection: 'staff', where: { and: [{ slug: { equals: slug } }, { active: { not_equals: false } }] }, limit: 1, depth: 1 })
  return (docs[0] as Staff | undefined) ?? null
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const path = slugsToPath((await params).slug)
  const staff = await getStaff(path)
  if (!staff) return {}
  return pageMetadata({ title: staff.name, path, description: staff.position ? `${staff.name}, ${staff.position} at IHM.` : undefined })
}

export default async function Page({ params }: { params: Params }) {
  const staff = await getStaff(slugsToPath((await params).slug))
  if (!staff) notFound()
  return <StaffProfile staff={staff} />
}
