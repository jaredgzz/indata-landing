import { test, expect } from '@playwright/test'
import { ROUTES } from './routes'

// Nunca enviar leads reales a Supabase durante las pruebas
test.beforeEach(async ({ page }) => {
  await page.route('**/rest/v1/**', route =>
    route.fulfill({ status: 201, contentType: 'application/json', body: '[]' }),
  )
})

for (const route of ROUTES) {
  test(`${route} carga sin errores de JS`, async ({ page }) => {
    const errors = []
    page.on('pageerror', err => errors.push(err.message))
    page.on('console', msg => {
      // Ignora fallos de red de terceros (p. ej. Google Fonts sin conexión)
      if (msg.type() === 'error' && !/Failed to load resource|net::/.test(msg.text())) {
        errors.push(msg.text())
      }
    })
    await page.goto(route)
    await expect(page.locator('nav.nav')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
    expect(errors).toEqual([])
  })
}

test('links del Nav llevan a su sección', async ({ page, isMobile }) => {
  await page.goto('/')
  if (isMobile) {
    await page.getByRole('button', { name: 'Abrir menú' }).click()
    await expect(page.locator('#nav-mobile-menu')).toBeVisible()
    await page.locator('#nav-mobile-menu').getByRole('link', { name: 'Productos' }).click()
    await expect(page.locator('#nav-mobile-menu')).toBeHidden()
  } else {
    await page.locator('.nav__links').getByRole('link', { name: 'Productos' }).click()
  }
  await expect(page).toHaveURL(/#productos$/)
  await expect(page.locator('#productos')).toBeInViewport()
})

test('tarjeta de curso navega al detalle', async ({ page }) => {
  await page.goto('/open')
  await page.locator('#cursos .course-card__link[href="/cursos/langflow"]').click()
  await expect(page).toHaveURL(/\/cursos\/langflow$/)
  await expect(page.locator('.nav__brand-name')).toHaveText('InDaxion')
})

test('modal de lead abre, cierra y descarga el PDF con nombre nuevo', async ({ page }) => {
  await page.goto('/cursos/langflow')
  const openModal = () => page.getByRole('button', { name: /Descargar Programa Completo/ }).first().click()

  await openModal()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await dialog.getByRole('button', { name: 'Cerrar' }).click()
  await expect(dialog).toBeHidden()

  await openModal()
  await page.locator('#llf-nombre').fill('Prueba E2E')
  await page.locator('#llf-email').fill('e2e@example.com')
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    dialog.locator('button[type="submit"]').click(),
  ])
  expect(download.suggestedFilename()).toBe('Programa-Agentes-LangFlow-InDaxion.pdf')
  await expect(dialog.locator('.llf-success')).toBeVisible()
})
