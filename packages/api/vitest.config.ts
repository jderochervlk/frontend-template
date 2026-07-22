import { defineConfig } from 'vitest/config'

const config = defineConfig({
  test: {
    coverage: {
      exclude: ['src/__tests__/**', 'src/server.ts'],
      include: ['src/**/*.ts'],
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
