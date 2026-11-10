import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { env } from './env'
import { replitStorage } from './lib/replitStorage'
import { collections } from './collections'
import { globals } from './globals'
import { blockConfigs } from './blocks'
import { jobsConfig } from './jobs'
import { buildEmailAdapter } from './lib/adapters/transport'
import { courseUrl, normalisePath, postUrl } from './lib/paths'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: env.NEXT_PUBLIC_SITE_URL,
  admin: {
    user: 'users',
    importMap: { baseDir: path.resolve(dirname) },
    meta: { titleSuffix: ' · IHM CMS' },
  },
  collections,
  globals,
  blocks: blockConfigs, // DEC-6: defined once, referenced by `layout` fields via blockReferences
  editor: lexicalEditor(),
  secret: env.PAYLOAD_SECRET,
  // Tests exercise refused logins, bad tokens and rate limits on purpose; Payload would print each as an ERROR with a stack.
  // In tests only fatal messages are logged (change 'fatal' to 'info' here to see them while debugging a test).
  ...(process.env.NODE_ENV === 'test' ? { logger: { options: { level: 'fatal' } } } : {}),
  graphQL: { disable: true }, // DEC-14 / 90-security
  telemetry: false, // no usage data sent to payloadcms.com (and no failed lookups on servers without outbound access)
  jobs: jobsConfig, // 40-enquiries: deliverEnquiry on queue `enquiries`
  email: buildEmailAdapter(), // Resend, or SMTP (Mailpit) in dev
  // Fixture tests may omit hosted plugins; never rewrite committed types from
  // that narrower config. Generate once during schema setup / generate:types.
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts'), autoGenerate: env.NODE_ENV !== 'test' },
  db: postgresAdapter({
    pool: { connectionString: env.DATABASE_URL },
    blocksAsJSON: true, // D9: layouts are JSON; new block types need no migration
    // Dev pushes schema from the running app only; scripts (imports, seeds) must not race it (DISABLE_DB_PUSH=1).
    push: env.NODE_ENV === 'development' && process.env.DISABLE_DB_PUSH !== '1',
  }),
  sharp,
  upload: { limits: { fileSize: 50 * 1024 * 1024 }, requestSizeLimit: 51 * 1024 * 1024 }, // 90-security §4 Uploads: 50 MB per file (PDFs); `media` caps images at 20 MB in its hook
  // Pages, landing pages and redirects are code (src/app/(site)/**, src/content/redirects.ts); the SEO plugin covers the two
  // collections that render pages. `generateTitle` is the bare title: `site.titleTemplate` adds the suffix at render (70 §4).
  plugins: [
    ...(env.REPLIT_TEST_SITE === '1' ? [replitStorage] : []),
    seoPlugin({
      collections: ['courses', 'posts'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle: ({ doc }) => `${doc?.title ?? ''}`,
      generateURL: ({ doc, collectionSlug }) => {
        const slug = String(doc?.slug ?? '')
        const path = doc?.path ?? (collectionSlug === 'courses' ? courseUrl(slug) : collectionSlug === 'posts' ? postUrl(slug) : '/')
        return `${env.NEXT_PUBLIC_SITE_URL}${normalisePath(String(path))}`
      },
    }),
  ],
})
