import { bucket } from './replit-storage.mjs'
import { readdir, mkdir, stat } from 'node:fs/promises'
import path from 'node:path'
const mode = process.argv[2]
const root = path.resolve(process.argv[3] || 'public')
const prefix = process.argv[4] || 'ihm-test/static'
if (!['upload', 'download'].includes(mode)) throw new Error('Use upload or download')
if (mode === 'upload') {
  const pending = []
  async function walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true })
    for (const e of entries) {
      const file = path.join(dir, e.name)
      if (e.isDirectory()) await walk(file)
      else if (e.isFile()) pending.push(file)
    }
  }
  await walk(root)
  let done = 0
  await Promise.all(Array.from({length: 12}, async () => {
    while (pending.length) {
      const file = pending.pop()
      await bucket().upload(file, { destination: `${prefix}/${path.relative(root, file)}`, resumable: false })
      if (++done % 200 === 0) console.log(`${done} assets stored`)
    }
  }))
} else {
  const [files] = await bucket().getFiles({ prefix: `${prefix}/` })
  if (!files.length) throw new Error('Static asset archive is missing from App Storage')
  for (const file of files) {
    const dest = path.resolve(root, file.name.slice(prefix.length + 1))
    if (!dest.startsWith(root + path.sep)) throw new Error('Unsafe object path')
    if (await stat(dest).catch(() => null)) continue
    await mkdir(path.dirname(dest), { recursive: true })
    await file.download({ destination: dest })
  }
}
console.log(`Asset ${mode} complete`)
