import { cp, mkdir, readdir, stat, lstat } from 'node:fs/promises'
import path from 'node:path'
const [sourcePublic, staticFiles, mediaFiles] = process.argv.slice(2)
if (!sourcePublic || !staticFiles || !mediaFiles) throw new Error('Usage: npm run local:assets -- /source/public /extracted-static /extracted-media')
for (const name of ['images', 'brand']) {
  if (!(await stat(path.join(sourcePublic, name))).isDirectory()) throw new Error('First argument must be the extracted source public/ directory')
}
const staticEntries = await readdir(staticFiles)
if (!staticEntries.some(name => ['pdf', 'brochures', 'IHM_Domestic_SHB', 'International-SHB'].includes(name))) {
  throw new Error('Second argument must be the extracted public-static archive, not the source repository')
}
async function copy(from, to) {
  if (path.resolve(from) === path.resolve(to)) return
  await mkdir(to, { recursive: true })
  await cp(from, to, { recursive: true, errorOnExist: false, filter: async source => {
    if (/^\.env|^\.git$|\.dump(?:\.|$)/i.test(path.basename(source))) throw new Error('Refusing to put a credential, Git directory or database dump in public assets')
    if ((await lstat(source)).isSymbolicLink()) throw new Error('Asset directories must not contain symlinks')
    return true
  } })
}
await copy(sourcePublic, 'public')
await copy(staticFiles, 'public')
// The handover contains public media at its root, documents in a subfolder.
// Never import private application files into a developer asset kit.
await mkdir('.local-data/uploads/media', { recursive: true })
for (const entry of await readdir(mediaFiles, { withFileTypes: true })) {
  if (entry.isFile()) await cp(path.join(mediaFiles, entry.name), path.join('.local-data/uploads/media', entry.name))
}
await copy(path.join(mediaFiles, 'documents'), '.local-data/uploads/documents')
console.log('Copied public static files, CMS media and documents. No private application files were imported.')
