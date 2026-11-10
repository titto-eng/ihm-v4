import { spawn } from 'node:child_process'
import { loadLocalEnvironment } from './env.mjs'

const command = process.argv[2] || 'dev'
const commands = {
  dev: ['node_modules/next/dist/bin/next', 'dev', '--hostname', '127.0.0.1', '--port', '3000'],
  build: ['--max-old-space-size=8000', 'node_modules/next/dist/bin/next', 'build'],
  schema: ['--import', 'tsx', 'scripts/local/schema.ts'],
  restore: ['--import', 'tsx', 'scripts/local/restore.ts', ...process.argv.slice(3)],
  kit: ['scripts/content-kit/import.mjs', ...process.argv.slice(3)],
  check: ['scripts/local/check.mjs'],
  types: ['node_modules/payload/bin.js', 'generate:types'],
  migration: ['node_modules/payload/bin.js', 'migrate:create', ...process.argv.slice(3)],
}
if (!commands[command]) throw new Error('Use dev, build, schema, restore, check, types or migration')
const settings = loadLocalEnvironment(command)
// Retain OS/tooling settings, but only the local file may supply application settings.
const os = Object.fromEntries(Object.entries(process.env).filter(([key]) =>
  /^(PATH|Path|HOME|USERPROFILE|SYSTEMROOT|SystemRoot|COMSPEC|ComSpec|TEMP|TMP|TMPDIR|LANG|LC_.*|TERM|CI|SSL_CERT_FILE|SSL_CERT_DIR)$/.test(key)))
const child = spawn(process.execPath, commands[command], { stdio: 'inherit', env: { ...os, ...settings } })
for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => child.kill(signal))
child.on('error', () => { console.error('Unable to start local command'); process.exitCode = 1 })
child.on('exit', code => { process.exitCode = code ?? 1 })
