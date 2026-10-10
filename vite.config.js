import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // VERCEL_ENV (production | preview | development) decide si los formularios
  // guardan leads reales; ver src/lib/leadsMode.js
  envPrefix: ['VITE_', 'VERCEL_ENV'],
})
