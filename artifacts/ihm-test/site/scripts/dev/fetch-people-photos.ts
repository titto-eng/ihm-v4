// Downloads the /our-people/ portraits that are not in public/images/people/ yet from the live site's theme folder
// (https://ihm.edu.au/wp-content/themes/mwt-ihm/assets/images/<legacyPhoto>), resized to 480x600 WebP. Read-only on the old site.
//   npm run people:photos            # only missing files
//   npm run people:photos -- --force # re-download every portrait that has a legacyPhoto
import { existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import sharp from 'sharp'
import { PEOPLE_TABS } from '../../src/content/people'

const BASE = 'https://ihm.edu.au/wp-content/themes/mwt-ihm/assets/images/'
const force = process.argv.includes('--force')
const seen = new Set<string>()
let saved = 0
const failed: string[] = []

for (const p of PEOPLE_TABS.flatMap((t) => t.groups.flatMap((g) => g.people))) {
  if (!p.photo || !p.legacyPhoto || seen.has(p.photo)) continue
  seen.add(p.photo)
  const out = join(process.cwd(), 'public', p.photo)
  if (existsSync(out) && !force) continue
  try {
    const res = await fetch(BASE + p.legacyPhoto.split('/').map(encodeURIComponent).join('/'))
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    mkdirSync(dirname(out), { recursive: true })
    await sharp(Buffer.from(await res.arrayBuffer())).rotate().resize(480, 600, { fit: 'cover', position: 'attention' }).webp({ quality: 78 }).toFile(out)
    saved++
    console.log(`saved  ${p.photo}  (${p.name})`)
  } catch (e) {
    failed.push(`${p.name}: ${p.legacyPhoto} (${e instanceof Error ? e.message : e})`)
  }
}
console.log(`\n${saved} portrait(s) downloaded.`)
if (failed.length) console.log(`Not found on the live site (initials shown instead):\n  ${failed.join('\n  ')}`)
