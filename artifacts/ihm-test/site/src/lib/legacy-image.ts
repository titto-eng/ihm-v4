import { existsSync } from 'node:fs'
import { join } from 'node:path'

/** `path` when that file is in public/ (e.g. after `npm run assets:legacy`), otherwise `fallback`. Server components only. */
export const legacyImage = (path: string, fallback: string): string => (existsSync(join(process.cwd(), 'public', path)) ? path : fallback)
