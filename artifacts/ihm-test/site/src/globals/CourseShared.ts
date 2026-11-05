import type { GlobalConfig } from 'payload'
import { anyone, roles, staffOnly } from '@/lib/access'
import { layoutField } from '@/collections/shared/fields'
import { revalidateGlobalAfterChange } from '@/collections/shared/hooks'

// DEC-22: the section every course page shares is stored once here.
// CourseDetail renders it after a course's own blocks, so marketing edits it in one place.
export const CourseShared: GlobalConfig = {
  slug: 'courseShared',
  label: 'Shared course section',
  admin: { group: 'Settings', description: 'Rendered at the end of every course page.' },
  versions: { drafts: { autosave: { interval: 1500 }, schedulePublish: true }, max: 25 },
  access: { read: anyone, update: roles('marketing'), readVersions: staffOnly },
  hooks: { afterChange: [revalidateGlobalAfterChange('courseShared', ['collection:courses', 'courses'])] },
  fields: [layoutField()],
}
