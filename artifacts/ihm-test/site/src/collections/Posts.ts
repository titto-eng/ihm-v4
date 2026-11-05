import type { CollectionConfig } from 'payload'
import { isAdmin, publishedOrStaff, roles, staffOnly } from '@/lib/access'
import { normalisePath, postUrl } from '@/lib/paths'
import { previewUrl } from '@/lib/preview-url'
import { importGroup, pathField, seoExtras, slugField } from './shared/fields'
import { assertPathFree, contentHooks, validateEmbedHosts } from './shared/hooks'

// Blog and news posts. Every post lives at /blog/<slug>/ (10-content-model §5).
export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', '_status', 'updatedAt'],
    group: 'Content',
    livePreview: { url: ({ data }) => previewUrl(data?.path ?? '/blog/') },
  },
  versions: { drafts: { autosave: { interval: 1500 }, schedulePublish: true }, maxPerDoc: 25 },
  defaultSort: '-publishedAt',
  access: {
    read: publishedOrStaff,
    create: roles('marketing'),
    update: roles('marketing'),
    delete: isAdmin,
    readVersions: staffOnly,
  },
  hooks: {
    beforeValidate: [
      validateEmbedHosts('posts'), // DEC-29 (posts hold Lexical only today; no-op until they get a layout)
      async ({ data, req, originalDoc }) => {
        if (!data) return data
        const slug = String(data.slug ?? originalDoc?.slug ?? '').trim()
        if (!slug) return data
        // 9 live posts sit under /news/ (pages.csv, rule 1): the `news` category keeps that prefix.
        const category = (data.category ?? originalDoc?.category) as string | undefined
        const path = category === 'news' ? normalisePath(`/news/${slug}`) : postUrl(slug)
        await assertPathFree({ req, collection: 'posts', path, id: originalDoc?.id })
        data.path = path
        return data
      },
    ],
    ...contentHooks('posts', { docTags: (d) => [`post:${d.slug}`] }),
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField({ required: true, unique: true }),
    pathField(),
    { name: 'category', type: 'select', required: true, index: true, defaultValue: 'blog', options: ['blog', 'news'], admin: { position: 'sidebar' } },
    { name: 'publishedAt', type: 'date', required: true, index: true, defaultValue: () => new Date().toISOString(), admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'author', type: 'text', admin: { position: 'sidebar' } },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'excerpt', type: 'textarea' },
    { name: 'readTime', type: 'number', min: 0, admin: { position: 'sidebar', description: 'Minutes' } },
    { name: 'content', type: 'richText', required: true },
    seoExtras(),
    importGroup(),
  ],
}
