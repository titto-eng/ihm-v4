import type { CollectionConfig } from 'payload'
import { denyAll, isAdmin } from '@/lib/access'

// Files an applicant attaches to a form (today: the CV of the adjunct application, 40-enquiries §7). Private: only admins read
// them, through Payload's authenticated file route; nothing is public and nobody creates one in the admin. The upload endpoint
// (src/app/api/enquire/upload/route.ts) writes with overrideAccess and hands the browser `publicId`, which the enquiry then
// carries in its `data` (e.g. `cvFile`). Stored with `media` on local disk (gitignored /media tree).
export const APPLICATION_FILE_TYPES = {
  'application/pdf': 'pdf',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
} as const
export const APPLICATION_FILE_MAX_BYTES = 10 * 1024 * 1024

export const ApplicationFiles: CollectionConfig = {
  slug: 'application-files',
  labels: { singular: 'Application file', plural: 'Application files' },
  admin: {
    group: 'Enquiries',
    useAsTitle: 'publicId',
    defaultColumns: ['createdAt', 'formKey', 'publicId', 'filename'],
    listSearchableFields: ['publicId', 'formKey', 'filename'],
    description: 'CVs and other files attached to applications. Find a file by the reference in the enquiry (e.g. its "cvFile" value).',
  },
  access: { read: isAdmin, create: denyAll, update: denyAll, delete: isAdmin },
  upload: {
    staticDir: 'media/application-files',
    mimeTypes: Object.keys(APPLICATION_FILE_TYPES),
  },
  fields: [
    { name: 'publicId', type: 'text', required: true, unique: true, index: true, admin: { readOnly: true, description: 'The reference stored on the enquiry.' } },
    { name: 'formKey', type: 'text', required: true, index: true, admin: { readOnly: true } },
  ],
}
