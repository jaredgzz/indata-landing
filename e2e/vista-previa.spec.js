import { test, expect } from '@playwright/test'
import { resolveLeadsMode, assertLiveBuildAllowed, E2E_SUPABASE_URL } from '../src/lib/leadsMode.js'
import { ROUTES } from './routes'

// Corre contra un build normal con WORKERS_CI_BRANCH=feature/prueba y credenciales
// de Supabase (ver playwright.config.js): así se comporta una Worker Preview de
// Cloudflare, que nunca debe guardar leads.

const SUPABASE = { VITE_SUPABASE_URL: 'https://proyecto.supabase.co', VITE_SUPABASE_ANON_KEY: 'clave' }

test.describe('Modo de los formularios', () => {
  test('solo un build autorizado guarda leads (fail-closed)', () => {
    expect(resolveLeadsMode({ mode: 'live' })).toBe('live')
    expect(resolveLeadsMode({ mode: 'production', vercelEnv: 'production' })).toBe('live')
    // Preview, local, dev y entornos desconocidos simulan
    expect(resolveLeadsMode({ mode: 'production' })).toBe('test')
    expect(resolveLeadsMode({ mode: 'development' })).toBe('test')
    expect(resolveLeadsMode({ mode: 'production', vercelEnv: 'preview' })).toBe('test')
    expect(resolveLeadsMode({ mode: 'production', vercelEnv: 'development' })).toBe('test')
    expect(resolveLeadsMode({ mode: 'otro', vercelEnv: 'otro' })).toBe('test')
    expect(resolveLeadsMode({})).toBe('test')
    // VITE_LEADS_MODE solo puede forzar la simulación
    expect(resolveLeadsMode({ mode: 'live', override: 'test' })).toBe('test')
    expect(resolveLeadsMode({ mode: 'production', override: 'live' })).toBe('test')
    expect(resolveLeadsMode({ mode: 'production', override: 'otro' })).toBe('test')
  })

  test('build:live solo se permite en Workers Builds sobre main o en E2E local', () => {
    const allowed = env => () => assertLiveBuildAllowed({ mode: 'live', env })
    expect(allowed({ ...SUPABASE, WORKERS_CI: '1', WORKERS_CI_BRANCH: 'main', CI: 'true' })).not.toThrow()
    expect(allowed({ VITE_SUPABASE_URL: E2E_SUPABASE_URL, VITE_SUPABASE_ANON_KEY: 'clave' })).not.toThrow()

    expect(allowed({ ...SUPABASE, WORKERS_CI: '1', WORKERS_CI_BRANCH: 'feature/x' })).toThrow(/no autorizado/)
    expect(allowed({ ...SUPABASE, WORKERS_CI: '1' })).toThrow(/no autorizado/)
    expect(allowed({ WORKERS_CI: '1', WORKERS_CI_BRANCH: 'main' })).toThrow(/no autorizado/)
    expect(allowed({ ...SUPABASE, CI: 'true' })).toThrow(/no autorizado/)
    expect(allowed({ VITE_SUPABASE_URL: E2E_SUPABASE_URL, VITE_SUPABASE_ANON_KEY: 'clave', CI: 'true' })).toThrow(/no autorizado/)
    expect(allowed(SUPABASE)).toThrow(/no autorizado/)
    expect(allowed({ VITE_SUPABASE_URL: E2E_SUPABASE_URL })).toThrow(/no autorizado/)

    // Los demás modos nunca se bloquean (y nunca guardan)
    expect(() => assertLiveBuildAllowed({ mode: 'production', env: { CI: 'true' } })).not.toThrow()
  })
})

test.describe('Worker Preview', () => {
  // Registra cualquier petición a Supabase y la responde aquí
  async function watchSupabase(page) {
    const requests = []
    await page.route('**/*.supabase.co/**', async route => {
      requests.push(`${route.request().method()} ${route.request().url()}`)
      await route.fulfill({ status: 201, body: '' })
    })
    return requests
  }

  test('el build se identifica como leads=test', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('meta[name="indaxion-build"]')).toHaveAttribute('content', /^leads=test;/)
  })

  test('recorrer todas las páginas no llama a Supabase', async ({ page }) => {
    const requests = await watchSupabase(page)
    for (const route of ROUTES) {
      await page.goto(route)
      await expect(page.locator('footer')).toBeVisible()
    }
    expect(requests).toEqual([])
  })

  test('el formulario de contacto avisa y no envía nada', async ({ page }) => {
    const requests = await watchSupabase(page)
    await page.goto('/#contacto')
    const form = page.locator('#contacto form')
    await expect(form.locator('.contact-cta__preview')).toContainText('Vista previa')

    await form.locator('#nombre').fill('Prueba en vista previa')
    await form.locator('#email').fill('preview@example.com')
    await form.locator('#mensaje').fill('No debe guardarse.')
    await page.waitForTimeout(3000)
    await form.getByRole('button', { name: /Enviar mensaje/ }).click()

    await expect(page.getByRole('status')).toContainText('Prueba completada')
    await expect(page.getByRole('status')).toContainText('no se guardó ni se envió')
    expect(requests).toEqual([])
  })
})
