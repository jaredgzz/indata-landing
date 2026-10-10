/* global process */
import { defineConfig, devices } from '@playwright/test'

// Build "vista previa": simula una Preview de Vercel, donde los formularios no guardan leads
const PREVIEW_SPEC = /vista-previa\.spec\.js/

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] }, testIgnore: PREVIEW_SPEC },
    { name: 'mobile',  use: { ...devices['Pixel 7'] }, testIgnore: PREVIEW_SPEC },
    {
      name: 'vista-previa',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:4174' },
      testMatch: PREVIEW_SPEC,
    },
  ],
  webServer: [
    {
      command: 'npm run build && npm run preview -- --port 4173 --strictPort',
      url: 'http://localhost:4173',
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
    {
      command: 'npx vite build --outDir dist-preview --emptyOutDir && npx vite preview --outDir dist-preview --port 4174 --strictPort',
      url: 'http://localhost:4174',
      env: { VERCEL_ENV: 'preview' },
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
  ],
})
