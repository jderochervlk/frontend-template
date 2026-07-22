import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

const config = defineConfig({
  plugins: [react()],
  test: {
    browser: {
      enabled: true,
      headless: true,
      instances: [{ browser: 'chromium' }],
      provider: playwright(),
    },
    coverage: {
      exclude: ['src/__tests__/**', 'src/main.tsx'],
      include: ['src/**/*.{ts,tsx}'],
      provider: 'v8',
      reporter: ['text'],
      thresholds: {
        branches: 90,
        functions: 90,
        lines: 90,
        perFile: true,
        statements: 90,
      },
    },
    restoreMocks: true,
  },
})

export default config
