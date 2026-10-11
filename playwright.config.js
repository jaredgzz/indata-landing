/* global process */
import { defineConfig, devices } from '@playwright/test'
import { E2E_SUPABASE_URL } from './src/lib/leadsMode.js'

// 4173: build autorizado (--mode live) contra un Supabase falso; los tests simulan la red.
// 4174: build "vista previa": simula una Worker Preview de Cloudflare, que no guarda leads
// aunque tenga credenciales. Ver src/lib/leadsMode.js
const FAKE_SUPABASE = { VITE_SUPABASE_URL: E2E_SUPABASE_URL, VITE_SUPABASE_ANON_KEY: 'clave-falsa-e2e' }
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
      command: 'npx vite build --mode live && node scripts/check-dist.mjs && npx vite preview --port 4173 --strictPort',
      env: FAKE_SUPABASE,
      url: 'http://localhost:4173',
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
    {
      command: 'npx vite build --outDir dist-preview --emptyOutDir && node scripts/check-dist.mjs dist-preview && npx vite preview --outDir dist-preview --port 4174 --strictPort',
      url: 'http://localhost:4174',
      env: { ...FAKE_SUPABASE, WORKERS_CI: '1', WORKERS_CI_BRANCH: 'feature/prueba' },
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
  ],
})
