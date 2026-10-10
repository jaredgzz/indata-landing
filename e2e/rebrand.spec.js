import { test, expect } from '@playwright/test'
import { ROUTES } from './routes'

test.describe('Rebrand InDaxion', () => {
  test('título, meta description y favicon', async ({ page, request }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/InDaxion/)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /We turn data into action/)
    const favicon = await request.get('/favicon.svg')
    expect(favicon.ok()).toBeTruthy()
    expect(await favicon.text()).toContain('#00E5FF')
  })

  test('brand board publicado', async ({ request }) => {
    const res = await request.get('/brand/indaxion-brand-board.png')
    expect(res.ok()).toBeTruthy()
    expect(res.headers()['content-type']).toContain('image/png')
  })

  test('wordmark y logo en Nav y Footer', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.nav__brand-name')).toHaveText('InDaxion')
    await expect(page.locator('.nav__brand-name .brand-name__accent')).toHaveText('D')
    await expect(page.locator('.nav__brand-tagline')).toHaveText('Inteligencia · Datos · Acción')
    await expect(page.locator('.footer__brand-name')).toHaveText('InDaxion')
    await expect(page.locator('.footer__copyright')).toContainText('InDaxion')

    const logos = page.getByRole('img', { name: 'InDaxion logo' })
    await expect(logos).toHaveCount(2)
    await expect(logos.first()).toBeVisible()

    // Los gradientes de ambos logos no deben compartir id
    const gradIds = await page.locator('svg[aria-label="InDaxion logo"] linearGradient').evaluateAll(
      els => els.map(el => el.id),
    )
    expect(gradIds.length).toBeGreaterThan(0)
    expect(new Set(gradIds).size).toBe(gradIds.length)
  })

  for (const route of ROUTES) {
    test(`sin rastros de "InDatA" en ${route}`, async ({ page }) => {
      await page.goto(route)
      await expect(page.locator('.nav__brand-name')).toHaveText('InDaxion')
      const text = await page.locator('body').innerText()
      expect(text).not.toMatch(/indata/i)
    })
  }

  test('tokens de la paleta nueva', async ({ page }) => {
    await page.goto('/')
    const tokens = await page.evaluate(() => {
      const s = getComputedStyle(document.documentElement)
      const v = name => s.getPropertyValue(name).trim().toUpperCase()
      return {
        blue: v('--color-blue'),
        purple: v('--color-purple'),
        cyan: v('--color-cyan'),
        bg: v('--bg-primary'),
        bodyBg: getComputedStyle(document.body).backgroundColor,
      }
    })
    expect(tokens).toEqual({
      blue: '#3B82F6',
      purple: '#8B5CF6',
      cyan: '#00E5FF',
      bg: '#0B1220',
      bodyBg: 'rgb(11, 18, 32)',
    })
  })
})
