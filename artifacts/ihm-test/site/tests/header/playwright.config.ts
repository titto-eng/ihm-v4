import { defineConfig, devices } from '@playwright/test'

// Header layout e2e (05 §8). Runs against a dev server that is already up; this config never starts or stops one.
// Run: npx playwright test --config=tests/header/playwright.config.ts   (HEADER_BASE_URL defaults to http://localhost:3000)
export default defineConfig({
  testDir: '.',
  testMatch: '*.e2e.spec.ts',
  timeout: 120_000,
  expect: { timeout: 15_000 },
  fullyParallel: true,
  reporter: [['list']],
  use: { baseURL: process.env.HEADER_BASE_URL ?? 'http://localhost:3000', contextOptions: { reducedMotion: 'reduce' }, trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
})
