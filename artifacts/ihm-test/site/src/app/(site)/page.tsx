// The home page, migrated from the WordPress front page (05 §4.5). Copy: src/components/home/homeContent.ts.
import type { Metadata } from 'next'
import { pageMetadata, img } from '@/components/page'
import { HomeLanding } from '@/components/home/HomeLanding'

export const metadata: Metadata = pageMetadata({
  title: 'Home',
  path: '/',
  metaTitle: 'Institute of Health and Management (IHM) | Nursing & Social Work Courses in Australia',
  description:
    'Study nursing and social work at the Institute of Health and Management (IHM), a TEQSA-registered institute of higher education with campuses in Melbourne, Sydney, Perth and Brisbane. Bachelor and Master of Nursing, Graduate Certificates, Bachelor of Social Work, NCLEX and OSCE preparation.',
  image: img({ src: '/images/home/hero/community.webp', alt: 'IHM students and staff gathered in front of the city skyline', width: 1920, height: 705 }),
})

export default function HomeRoute() {
  return <HomeLanding />
}
