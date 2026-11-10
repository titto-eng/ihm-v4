import { spawnSync } from 'node:child_process'
const commands = [
  ['node_modules/payload/bin.js', 'generate:types'],
  ['--test', 'vendor/deepmerge-safe/test.cjs'],
  ['--import', 'tsx', '--test', 'tests/local/local.test.ts'],
  ['--test', 'tests/local/content-kit.test.mjs'],
  ['node_modules/typescript/bin/tsc', '--noEmit'],
  ['node_modules/eslint/bin/eslint.js', '.'],
  ['--import', 'tsx', 'scripts/check-blocks.ts'],
]
for (const args of commands) {
  const result = spawnSync(process.execPath, args, { stdio: 'inherit', env: process.env })
  if (result.error || result.status !== 0) process.exit(result.status || 1)
}
