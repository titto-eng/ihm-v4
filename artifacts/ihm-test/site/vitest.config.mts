import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'node', // jsdom 28 needs Node >= 22.12 (require(esm)); component tests opt in with a docblock
    setupFiles: ['./vitest.setup.ts'],
    globalSetup: ['./tests/global-setup.ts'], // fails fast with instructions when docker compose is not running
    include: ['tests/int/**/*.int.spec.ts', 'tests/collections/**/*.test.ts', 'tests/portal/**/*.test.ts', 'tests/courses/**/*.test.ts', 'tests/import/**/*.test.ts', 'tests/seo/**/*.test.ts', 'tests/templates/**/*.test.ts', 'tests/enquiries/**/*.test.ts', 'tests/payments/**/*.test.ts', 'tests/alumni/**/*.test.ts', 'tests/legacy-media/**/*.test.ts'],
    testTimeout: 60_000,
    hookTimeout: 180_000,
  },
})
