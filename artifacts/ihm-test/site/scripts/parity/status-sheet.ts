/**
 * `npm run status-sheet`: refreshes the URL status sheet.
 * With the inventory folder (../inventory/v2/status_sheet.py) it runs that script, which rewrites ../inventory/v2/ihm/*.csv and the
 * workbook (30-import §status sheet). Without it, it builds the sheet here from the last parity crawl
 * (scripts/parity/out/parity-ihm.csv, `npm run parity`): scripts/parity/out/status-ihm.csv with one row per URL and a status
 * (done / check), plus a per-category count. Read-only on the old site.
 */
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { parse } from 'csv-parse/sync'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(HERE, '..', '..')
const PY = path.resolve(ROOT, '..', 'inventory', 'v2', 'status_sheet.py')
const OUT = path.join(HERE, 'out')
const PARITY = path.join(OUT, 'parity-ihm.csv')
const SHEET = path.join(OUT, 'status-ihm.csv')

if (fs.existsSync(PY)) {
  const py = process.platform === 'win32' ? 'python' : 'python3'
  const r = spawnSync(py, [PY, 'ihm'], { stdio: 'inherit', cwd: ROOT })
  process.exit(r.status ?? 1)
}

if (!fs.existsSync(PARITY)) {
  console.error(`No inventory at ${path.dirname(PY)} and no parity results at ${PARITY}.\nRun \`npm run dev\` and \`npm run parity\` first, then \`npm run status-sheet\` again.`)
  process.exit(1)
}

type Row = Record<string, string>
const rows = parse(fs.readFileSync(PARITY, 'utf8'), { columns: true, skip_empty_lines: true, bom: true }) as Row[]
const cell = (v: string) => (/[",\n\r]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v)
// done: answers as intended (parity OK, or only the <title> differs); check: anything else needs a look.
const statusOf = (r: Row) => (r.result === 'OK' || r.result === 'TITLE_DIFF' ? 'done' : 'check')

const header = ['url', 'category', 'status', 'result', 'live_status', 'new_status', 'new_final', 'note', 'checked']
const today = new Date().toISOString().slice(0, 10)
const lines = [header.join(',')]
const byCat: Record<string, { total: number; done: number; check: number }> = {}
for (const r of rows) {
  const s = statusOf(r)
  lines.push([r.url, r.category, s, r.result, r.live_status, r.new_status, r.new_final, r.note, today].map((v) => cell(v ?? '')).join(','))
  const c = (byCat[r.category || 'unknown'] ??= { total: 0, done: 0, check: 0 })
  c.total++
  c[s]++
}
fs.writeFileSync(SHEET, lines.join('\n') + '\n')

const done = rows.filter((r) => statusOf(r) === 'done').length
console.log(`wrote ${SHEET}`)
console.log(`${rows.length} URLs: ${done} done, ${rows.length - done} to check`)
console.table(byCat)
