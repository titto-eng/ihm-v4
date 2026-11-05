import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// Shared constants for every import step (30-import §6). No secrets here (rule 3).
const here = dirname(fileURLToPath(import.meta.url))

export const SITE = 'ihm'
export const ROOT = resolve(here, '../../..')
export const OUT_DIR = resolve(ROOT, 'scripts/import/out')
export const CACHE_DIR = resolve(OUT_DIR, 'cache')
/**
 * `../inventory` (the original crawl) when it holds the IHM data, else `.data/inventory` (written by `npm run inventory:wp`,
 * git-ignored). A `../inventory` folder without `data/ihm/pages.json` (another project's, or a partial copy) is not used.
 */
const hasInventory = (dir: string) => existsSync(resolve(dir, 'data/ihm/pages.json')) && existsSync(resolve(dir, 'v2/ihm/pages.csv'))
export const INVENTORY_DIR = [resolve(ROOT, '../inventory'), resolve(ROOT, '.data/inventory')].find(hasInventory) ?? resolve(ROOT, '.data/inventory')
/** The old WordPress install (theme assets, uploads, static PDF stores). */
export const LEGACY_ROOT = resolve(ROOT, '../ihmv3')
export const LEGACY_BASE_URL = (process.env.LEGACY_BASE_URL ?? 'https://ihm.edu.au').replace(/\/$/, '')

/** Pages (and posts) below this confidence get `reviewStatus: check` (30-import "Confidence"; tuned only in the validation loop). */
export const CONFIDENCE_THRESHOLD = 0.85
/** Extracted text / source text below this is `check` too. */
export const COVERAGE_THRESHOLD = 0.98

/** `siteSettings.allowedEmbedHosts` seed (DEC-5). The wp-pages step makes sure these three exist. */
export const SEED_EMBED_HOSTS = ['my.matterport.com', 'forms.monday.com', 'portal.ihm.edu.au']

/** Media allowlist (task, AGENTS.md rule 3/4): no svg, no theme assets. */
export const MEDIA_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'pdf'] as const
export const MEDIA_MAX_BYTES = 25 * 1024 * 1024
export const CONCURRENCY = 4

export const reportPath = (step: string) => resolve(OUT_DIR, `${SITE}-${step}.report.json`)
export const MEDIA_MAP_PATH = resolve(OUT_DIR, `${SITE}-media-map.json`)

/** Bumped when the extractor's output changes on purpose, so every document is re-evaluated on the next run. */
export const EXTRACTOR_VERSION = 1

/**
 * Rule 4: a `mailto:` whose local part is not a role mailbox, and a `tel:` that is a mobile number, is a person's contact detail.
 * The link is removed (the visible words stay) and counted without its value. Role inboxes and organisation lines are kept.
 */
export const ROLE_MAILBOXES = [
  'enquiry', 'enquiries', 'info', 'admissions', 'support', 'ihmstudentsupport', 'studentsupport', 'governance', 'events', 'partner',
  'researchethics', 'hr', 'itsupport', 'visasuccess', 'ihmaccounts', 'accounts', 'complaints', 'appeals', 'careers', 'library', 'privacy',
]
