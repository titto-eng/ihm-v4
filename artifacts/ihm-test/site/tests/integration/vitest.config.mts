import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// All enquiry/payment/portal tests, including TSX pages that test:int's historical
// *.test.ts patterns do not collect. Archive-import checks remain in test:int.
export default defineConfig({
  plugins: [tsconfigPaths({ projects: ['./tsconfig.json'] }), react()],
  test: {
    environment: 'node',
    setupFiles: ['./vitest.setup.ts', './tests/integration/network.ts'],
    globalSetup: ['./tests/global-setup.ts', './tests/integration/inventory.ts'],
    include: ['tests/{enquiries,payments,portal}/**/*.test.{ts,tsx}'],
    // Shared fixture DB and Mailpit: reconciliation scans must not race other files.
    fileParallelism: false,
    maxWorkers: 1,
    testTimeout: 60_000,
    hookTimeout: 180_000,
    reporters: ['default', 'junit'],
    outputFile: { junit: 'generated-artifacts/integration/results.xml' },
  },
})
