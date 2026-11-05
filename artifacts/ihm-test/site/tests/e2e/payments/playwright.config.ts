import { defineConfig, devices } from '@playwright/test'
import 'dotenv/config'

// Payments e2e (45 §8). Runs against the dev server already up on :3000 (the app's preview): this config never starts or stops it.
// Gateways are the in-memory FakeGateway (PAYMENTS_GATEWAY_MODE=fake), the portal is the Docker fixture, DRY_RUN=1, email lands in Mailpit.
// The dev server must have been (re)started after the payment routes were added: Next only registers new `(site)` pages at start.
// Run: npm run test:e2e:payments
process.env.ENQUIRY_AUTORUN = '0' // this test process must not run the job queue; the dev server does
process.env.DISABLE_DB_PUSH = '1' // the dev server owns the schema; a second Payload instance must not push (it waits on a prompt)

export default defineConfig({
  testDir: '.',
  testMatch: /.*\.pay\.e2e\.spec\.ts/,
  timeout: 180_000,
  expect: { timeout: 20_000 },
  fullyParallel: false,
  workers: 1,
  reporter: [['list']],
  use: { baseURL: 'http://localhost:3000', trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
})
