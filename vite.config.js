/* global process */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolveLeadsMode, assertLiveBuildAllowed } from './src/lib/leadsMode.js'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // process.env (variables de Workers Builds / Vercel) + archivos .env del modo
  const env = loadEnv(mode, process.cwd(), '')
  assertLiveBuildAllowed({ mode, env })

  // Solo `--mode live` (o Vercel Production, temporal) guarda leads; ver src/lib/leadsMode.js
  const leadsMode = resolveLeadsMode({
    mode,
    vercelEnv: env.VERCEL === '1' ? env.VERCEL_ENV : undefined,
    override: env.VITE_LEADS_MODE,
  })
  const sha = (env.WORKERS_CI_COMMIT_SHA || env.VERCEL_GIT_COMMIT_SHA || '').slice(0, 12)

  return {
    plugins: [
      react(),
      {
        // Permite saber el modo de una URL desplegada sin enviar formularios
        name: 'indaxion-build-meta',
        transformIndexHtml: () => [{
          tag: 'meta',
          attrs: { name: 'indaxion-build', content: `leads=${leadsMode}; sha=${sha || 'local'}` },
          injectTo: 'head',
        }],
      },
    ],
    define: {
      'import.meta.env.LEADS_LIVE': JSON.stringify(leadsMode === 'live'),
    },
  }
})
