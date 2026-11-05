import { defineConfig, devices } from '@playwright/test'
import 'dotenv/config'

// Enquiry e2e. Runs against the dev server that is already up on :3000 (the app's preview): this config never starts or stops it.
// Everything is localhost: DRY_RUN=1 means no adapter calls a real CRM; email lands in Mailpit.
// Run: npm run test:e2e:enquiries
process.env.ENQUIRY_AUTORUN = '0' // this test process must not run the queue; the dev server does

export default defineConfig({
  testDir: './e2e',
  timeout: 180_000,
  expect: { timeout: 20_000 },
  fullyParallel: false,
  workers: 1,
  reporter: [['list']],
  use: { baseURL: 'http://localhost:3000', trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
})
