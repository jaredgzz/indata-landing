import { test, expect } from '@playwright/test'
import { ROUTES } from './routes'

// Relación de contraste WCAG entre el texto y el fondo de un elemento (colores calculados)
function contrastOf(el) {
  const luminance = color => {
    const [r, g, b] = color.match(/[\d.]+/g).slice(0, 3).map(v => {
      const c = Number(v) / 255
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
    })
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }
  const style = getComputedStyle(el)
  let bg = style.backgroundColor
  // Sin fondo propio: se usa el del body
  if (/rgba\(.*,\s*0\)$/.test(bg) || bg === 'transparent') bg = getComputedStyle(document.body).backgroundColor
  const [hi, lo] = [luminance(style.color), luminance(bg)].sort((a, b) => b - a)
  return (hi + 0.05) / (lo + 0.05)
}

// Lleva el centro de un elemento al centro de la pantalla
function centerInViewport(el) {
  const rect = el.getBoundingClientRect()
  window.scrollTo(0, window.scrollY + rect.top + rect.height / 2 - window.innerHeight / 2)
}

const GOVA_TOUR = ['catalogo', 'cotizacion', 'documento', 'inicio']

test.describe('Diseño sin efectos de plantilla', () => {
  for (const route of ROUTES) {
    test(`sin texto en degradado ni enlaces vacíos en ${route}`, async ({ page }) => {
      await page.goto(route)
      const gradientText = await page.locator('h1, h1 *, h2, h2 *, h3, h3 *, .btn, .btn *').evaluateAll(els =>
        els
          .filter(el => {
            const style = getComputedStyle(el)
            return style.backgroundClip === 'text' || style.webkitBackgroundClip === 'text'
          })
          .map(el => el.textContent),
      )
      expect(gradientText).toEqual([])
      await expect(page.locator('a[href="#"], a:not([href])')).toHaveCount(0)
    })
  }

  test('la escena 3D no provoca scroll horizontal', async ({ page }) => {
    for (const route of ROUTES) {
      await page.goto(route)
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      expect(overflow, route).toBeLessThanOrEqual(0)
    }
  })

  test('el hero muestra capturas reales de Gova, sin canvas animado', async ({ page }) => {
    await page.goto('/')
    const hero = page.locator('#inicio')
    await expect(hero.locator('canvas')).toHaveCount(0)
    await expect(hero.getByText('Capturas del MVP de Gova · datos de ejemplo')).toBeVisible()
    await expect(hero.getByRole('img', { name: /Pantalla de Inicio de Gova/ })).toBeVisible()
  })

  test('el botón principal y el texto secundario tienen contraste AA', async ({ page }) => {
    await page.goto('/')
    expect(await page.locator('#inicio .btn--primary').evaluate(contrastOf)).toBeGreaterThanOrEqual(4.5)
    expect(await page.locator('#inicio .hero__lead').evaluate(contrastOf)).toBeGreaterThanOrEqual(4.5)
  })

  test('la escena del hero se endereza al hacer scroll', async ({ page }) => {
    await page.goto('/')
    const plane = page.locator('.product-stage--hero .product-stage__plane')
    const before = await plane.evaluate(el => getComputedStyle(el).transform)
    await page.evaluate(() => window.scrollTo(0, 500))
    await expect.poll(() => plane.evaluate(el => getComputedStyle(el).transform)).not.toBe(before)
  })

  test('con movimiento reducido, la escena del hero no se mueve', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    const plane = page.locator('.product-stage--hero .product-stage__plane')
    const before = await plane.evaluate(el => getComputedStyle(el).transform)
    await page.evaluate(() => window.scrollTo(0, 500))
    await page.waitForTimeout(300)
    expect(await plane.evaluate(el => getComputedStyle(el).transform)).toBe(before)
  })

  test('el recorrido de Gova lleva al frente la captura de cada paso', async ({ page, isMobile }) => {
    test.skip(isMobile, 'En pantallas angostas cada paso muestra su captura debajo del texto')
    await page.goto('/')
    const steps = page.locator('.gova-tour__step')
    await expect(steps).toHaveCount(GOVA_TOUR.length)
    for (const [i, id] of GOVA_TOUR.entries()) {
      await steps.nth(i).evaluate(centerInViewport)
      await expect(page.locator(`.product-stage--tour [data-screen="${id}"]`)).toHaveAttribute('data-active', 'true')
    }
  })

  test('en móvil, cada paso del recorrido muestra su captura', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'En escritorio las capturas están en la escena fija')
    await page.goto('/')
    await expect(page.locator('.product-stage--tour')).toBeHidden()
    const shots = page.locator('.gova-tour__shot')
    await expect(shots).toHaveCount(GOVA_TOUR.length)
    for (let i = 0; i < GOVA_TOUR.length; i++) {
      await shots.nth(i).scrollIntoViewIfNeeded()
      await expect(shots.nth(i)).toBeVisible()
    }
  })
})
