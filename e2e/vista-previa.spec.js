import { test, expect } from '@playwright/test'
import { resolveLeadsMode } from '../src/lib/leadsMode.js'

// Corre contra un build con VERCEL_ENV=preview (ver playwright.config.js):
// así se comporta una Preview de Vercel, que nunca debe guardar leads.

test.describe('Modo de los formularios', () => {
  test('solo Production (o un build local de producción) guarda leads', () => {
    expect(resolveLeadsMode({ prod: true, vercelEnv: 'production' })).toBe('live')
    expect(resolveLeadsMode({ prod: true, vercelEnv: 'preview' })).toBe('test')
    expect(resolveLeadsMode({ prod: true, vercelEnv: 'development' })).toBe('test')
    expect(resolveLeadsMode({ prod: true, vercelEnv: undefined })).toBe('live')
    expect(resolveLeadsMode({ prod: false, vercelEnv: undefined })).toBe('test')
    expect(resolveLeadsMode({ prod: true, vercelEnv: 'production', override: 'test' })).toBe('test')
    expect(resolveLeadsMode({ prod: false, vercelEnv: undefined, override: 'live' })).toBe('live')
    expect(resolveLeadsMode({ prod: true, vercelEnv: 'preview', override: 'otro' })).toBe('test')
  })
})

test.describe('Vista previa de Vercel', () => {
  // Cualquier intento de llegar a Supabase se registra y se responde aquí
  async function watchSupabase(page) {
    const requests = []
    await page.route('**/*.supabase.co/**', async route => {
      requests.push(route.request().url())
      await route.fulfill({ status: 201, body: '' })
    })
    return requests
  }

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
