/* global process */
// Pruebas negativas del modo de los leads con builds reales de Vite: solo un
// build autorizado (`--mode live` en Workers Builds sobre main, o E2E local
// contra el Supabase falso) puede guardar leads. Uso: npm run test:build-modes
import { spawnSync } from 'node:child_process'
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { checkDist } from './check-dist.mjs'
import { E2E_SUPABASE_URL } from '../src/lib/leadsMode.js'

const FAKE_SUPABASE = { VITE_SUPABASE_URL: E2E_SUPABASE_URL, VITE_SUPABASE_ANON_KEY: 'clave-falsa' }
const REAL_LOOKING_SUPABASE = { VITE_SUPABASE_URL: 'https://proyecto-real.supabase.co', VITE_SUPABASE_ANON_KEY: 'clave-falsa' }
// Variables del entorno que no deben filtrarse a estas pruebas
const CLEARED = ['CI', 'WORKERS_CI', 'WORKERS_CI_BRANCH', 'WORKERS_CI_COMMIT_SHA', 'VERCEL', 'VERCEL_ENV',
  'VERCEL_GIT_COMMIT_SHA', 'VITE_LEADS_MODE', 'VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY']

const tmp = mkdtempSync(join(tmpdir(), 'indaxion-build-modes-'))
const createdEnvFiles = []
let failures = 0

function build({ mode, env }) {
  const outDir = mkdtempSync(join(tmp, 'dist-'))
  const baseEnv = Object.fromEntries(Object.entries(process.env).filter(([key]) => !CLEARED.includes(key)))
  const args = ['node_modules/vite/bin/vite.js', 'build', '--outDir', outDir, '--emptyOutDir', '--logLevel', 'error',
    ...(mode ? ['--mode', mode] : [])]
  const result = spawnSync(process.execPath, args, { env: { ...baseEnv, ...env }, encoding: 'utf8' })
  const htmlPath = join(outDir, 'index.html')
  const meta = existsSync(htmlPath)
    ? readFileSync(htmlPath, 'utf8').match(/name="indaxion-build" content="leads=(\w+)/)?.[1]
    : undefined
  return { ok: result.status === 0, leads: meta, outDir, output: result.stdout + result.stderr }
}

function check(name, condition, detail = '') {
  console.log(`${condition ? 'ok  ' : 'FALLA'} ${name}`)
  if (!condition) {
    failures++
    if (detail) console.log(detail.trim().split('\n').slice(-5).join('\n'))
  }
}

// Archivo .env temporal en la raíz; nunca pisa uno existente
function withEnvFile(name, content) {
  if (existsSync(name)) throw new Error(`${name} ya existe; no se sobrescribe`)
  writeFileSync(name, content)
  createdEnvFiles.push(name)
}

try {
  let r = build({ env: { ...FAKE_SUPABASE, VITE_LEADS_MODE: 'live' } })
  check('1. build normal con VITE_LEADS_MODE=live y credenciales -> leads=test', r.ok && r.leads === 'test', r.output)
  const normalDist = r.outDir

  withEnvFile('.env.production.local', 'VITE_LEADS_MODE=live\n')
  withEnvFile('.env.live', 'VITE_LEADS_MODE=live\n')
  r = build({ env: { ...FAKE_SUPABASE, WORKERS_CI: '1', WORKERS_CI_BRANCH: 'main' } })
  check('2. .env.live / .env.production.local sin --mode live (incluso en main) -> leads=test', r.ok && r.leads === 'test', r.output)
  for (const file of createdEnvFiles.splice(0)) rmSync(file)

  r = build({ mode: 'live', env: { ...REAL_LOOKING_SUPABASE, CI: 'true' } })
  check('3. --mode live en CI sin WORKERS_CI -> falla', !r.ok && /no autorizado/.test(r.output), r.output)

  r = build({ mode: 'live', env: { ...REAL_LOOKING_SUPABASE, WORKERS_CI: '1', WORKERS_CI_BRANCH: 'feature/x' } })
  check('4. --mode live en Workers Builds fuera de main -> falla', !r.ok && /no autorizado/.test(r.output), r.output)

  r = build({ mode: 'live', env: REAL_LOOKING_SUPABASE })
  check('5. --mode live local con un Supabase que no es el falso -> falla', !r.ok && /no autorizado/.test(r.output), r.output)

  r = build({ mode: 'live', env: { WORKERS_CI: '1', WORKERS_CI_BRANCH: 'main', VITE_SUPABASE_URL: '', VITE_SUPABASE_ANON_KEY: '' } })
  check('5b. --mode live en main sin credenciales -> falla', !r.ok && /no autorizado/.test(r.output), r.output)

  r = build({ mode: 'live', env: { ...REAL_LOOKING_SUPABASE, WORKERS_CI: '1', WORKERS_CI_BRANCH: 'main' } })
  check('6. --mode live en Workers Builds sobre main -> leads=live', r.ok && r.leads === 'live', r.output)

  check('7a. check-dist acepta el build normal', checkDist(normalDist).length === 0)
  for (const file of ['.env', 'assets/index.js.map', 'docs/programa.pdf']) {
    const copy = mkdtempSync(join(tmp, 'inject-'))
    cpSync(normalDist, copy, { recursive: true })
    cpSync(join(normalDist, 'robots.txt'), join(copy, file.replace(/^docs\//, '')))
    check(`7b. check-dist rechaza ${file}`, checkDist(copy).length > 0)
  }
} finally {
  for (const file of createdEnvFiles) rmSync(file, { force: true })
  rmSync(tmp, { recursive: true, force: true })
}

if (failures) {
  console.error(`\n${failures} prueba(s) fallaron`)
  process.exit(1)
}
console.log('\nTodas las pruebas de modos de build pasaron')
