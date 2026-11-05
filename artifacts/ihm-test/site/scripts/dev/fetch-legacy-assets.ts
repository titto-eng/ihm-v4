// Downloads the images listed in src/content/legacy-assets.ts from the live site (https://ihm.edu.au) into public/, as WebP (SVG and PDF targets are saved as is).
// Read-only on the old site. Skips files that already exist unless --force.
//   npm run assets:legacy
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import sharp from 'sharp'
import { LEGACY_ASSETS } from '../../src/content/legacy-assets'

const force = process.argv.includes('--force')
let saved = 0
const failed: string[] = []
for (const a of LEGACY_ASSETS) {
  const out = join(process.cwd(), 'public', a.to)
  if (existsSync(out) && !force) continue
  try {
    // `from` is a path on ihm.edu.au, or a full URL when the live page loads the file from another host (e.g. uat.ihm.edu.au).
    const url = /^https?:\/\//.test(a.from) ? a.from : `https://ihm.edu.au${a.from.split('/').map(encodeURIComponent).join('/')}`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    mkdirSync(dirname(out), { recursive: true })
    const buf = Buffer.from(await res.arrayBuffer())
    // An .svg target is kept as vector (logos) and a .pdf as the original document; everything else becomes a resized WebP.
    if (/\.(svg|pdf)$/i.test(a.to)) writeFileSync(out, buf)
    else await sharp(buf).rotate().resize({ width: a.width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out)
    saved++
    console.log(`saved  ${a.to}`)
  } catch (e) {
    failed.push(`${a.from} (${e instanceof Error ? e.message : e})`)
  }
}
console.log(`\n${saved} file(s) downloaded.`)
if (failed.length) console.log(`Could not download:\n  ${failed.join('\n  ')}`)
