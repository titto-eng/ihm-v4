import { existsSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

export default function inventoryReport() {
  const required = ['data/ihm/courses.json', 'v2/ihm/pages.csv', 'v2/ihm/enquiries.csv']
  const missing = required.filter(file =>
    !['../inventory', '.data/inventory'].some(root => existsSync(resolve(root, file))))
  const report = [
    'CI covers every enquiry, payment and portal test file (TS and TSX).',
    'Archive course import/section-mapper checks belong to npm run test:int, not this job.',
    ...(missing.length ? [
      `Missing legacy inventory: ${missing.join(', ')}.`,
      'The enquiries.csv provenance cross-check cannot run without that source CSV.',
      'Committed adapter JSON fixtures still run; no live inventory is downloaded or fabricated.',
    ] : ['Legacy inventory inputs are present.']),
  ].join('\n')
  mkdirSync('generated-artifacts/integration', { recursive: true })
  writeFileSync('generated-artifacts/integration/coverage.txt', `${report}\n`)
  console.log(report)
  if (missing.length) console.warn(`::warning title=Legacy inventory coverage unavailable::${missing.join(', ')}. See integration coverage.txt; this is not a full archive-import validation.`)
}
