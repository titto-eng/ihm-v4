import { defineConfig, devices } from '@playwright/test'
import 'dotenv/config'

// Alumni e2e. Runs against the dev server that is already up on :3000 (the app's preview): this config never starts or stops it.
// Run: npm run test:e2e:alumni
// NODE_ENV=test keeps the test process's Payload instance out of schema push mode (it would wait on a prompt); the dev server owns the schema.
;(process.env as Record<string, string | undefined>).NODE_ENV = 'test'
export default defineConfig({
  testDir: './e2e',
  timeout: 120_000,
  expect: { timeout: 20_000 },
  fullyParallel: false,
  workers: 1,
  reporter: [['list']],
  use: { baseURL: 'http://localhost:3000', trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
})
