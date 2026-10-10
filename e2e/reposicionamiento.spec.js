import { test, expect } from '@playwright/test'

// El formulario descarta envíos más rápidos que esto (antispam)
const MIN_FILL_MS = 3000

// Captura los inserts a Supabase y responde como se indique; nunca llega a producción
async function mockLeads(page, respond = route => route.fulfill({ status: 201, body: '' })) {
  const payloads = []
  await page.route('**/rest/v1/**', async route => {
    payloads.push(route.request().postDataJSON())
    await respond(route)
  })
  return payloads
}

async function fillContactForm(page, { interes = 'gova' } = {}) {
  const form = page.locator('#contacto form')
  await form.locator('#nombre').fill('Prueba E2E')
  await form.locator('#email').fill('e2e@example.com')
  await form.locator('#empresa').fill('Negocio de prueba')
  if (interes) await form.locator('#interes').selectOption(interes)
  await form.locator('#mensaje').fill('Tardamos mucho en preparar cotizaciones.')
  return form
}

test.describe('Home', () => {
  test('el Hero comunica el nuevo enfoque', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle('InDaxion | Software e Inteligencia Artificial para Pymes')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Tecnología inteligente para negocios que quieren crecer.')

    await page.getByRole('button', { name: /Conoce nuestras soluciones/ }).click()
    await expect(page.locator('#productos')).toBeInViewport()

    await page.goto('/')
    await page.getByRole('button', { name: 'Cuéntanos tu idea' }).click()
    await expect(page.locator('#contacto')).toBeInViewport()
  })

  test('sin métricas ni casos no comprobables', async ({ page }) => {
    await page.goto('/')
    const text = await page.locator('body').innerText()
    expect(text).not.toMatch(/\+\s?30|\+\s?10 Empresas|\+\s?5 Años|Casos reales|Deployed Successfully/i)
  })

  test('Gova y Miga con su estado real y enlace a su página', async ({ page }) => {
    await page.goto('/')
    const cards = page.locator('#productos .product-card')
    await expect(cards).toHaveCount(2)

    const gova = cards.filter({ hasText: 'Gova' })
    await expect(gova.locator('.status-badge')).toHaveText('MVP en validación')
    await expect(gova.getByText('Ilustración conceptual')).toBeVisible()

    const miga = cards.filter({ hasText: 'Miga' })
    await expect(miga.locator('.status-badge')).toHaveText('En desarrollo')

    await miga.getByRole('link', { name: /Descubrir Miga/ }).click()
    await expect(page).toHaveURL(/\/productos\/miga$/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Miga')
  })

  test('las secciones comerciales evitan jerga técnica', async ({ page }) => {
    for (const route of ['/', '/productos/gova', '/productos/miga']) {
      await page.goto(route)
      const text = await page.locator('main').innerText()
      expect(text, route).not.toMatch(/\b(RAG|MCP|LLMs?|embeddings?|pipelines?|multiagente)\b/i)
    }
  })

  test('el link InDaxion Open lleva a la iniciativa', async ({ page, isMobile }) => {
    await page.goto('/')
    if (isMobile) await page.getByRole('button', { name: 'Abrir menú' }).click()
    const menu = page.locator(isMobile ? '#nav-mobile-menu' : '.nav__links')
    await menu.getByRole('link', { name: 'InDaxion Open' }).click()
    await expect(page).toHaveURL(/\/open$/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('El conocimiento crece cuando se comparte.')
    if (!isMobile) {
      await expect(page.locator('.nav__links').getByRole('link', { name: 'InDaxion Open' })).toHaveAttribute('aria-current', 'page')
    }
  })
})

test.describe('Páginas de producto', () => {
  test('Gova separa lo que funciona hoy de lo que viene', async ({ page }) => {
    await page.goto('/productos/gova')
    await expect(page).toHaveTitle(/Gova/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Gova')

    const today = page.locator('.product-detail__panel').filter({ hasText: 'Lo que hace hoy el MVP' })
    await expect(today.locator('.status-badge')).toHaveText('MVP en validación')

    const next = page.locator('.product-detail__panel').filter({ hasText: 'Próxima evolución' })
    await expect(next.locator('.status-badge')).toHaveText('Próximamente')
    await expect(next).toContainText('Todavía no está disponible')
  })

  test('el CTA del producto preselecciona el interés en el formulario', async ({ page }) => {
    await page.goto('/productos/gova')
    await page.locator('.product-detail__cta').getByRole('link', { name: /Quiero saber más de Gova/ }).click()
    await expect(page).toHaveURL(/\/\?interes=gova#contacto$/)
    await expect(page.locator('#interes')).toHaveValue('gova')
    await expect(page.locator('#contacto')).toBeInViewport()
  })

  test('un producto inexistente vuelve a la lista de productos', async ({ page }) => {
    await page.goto('/productos/no-existe')
    await expect(page).toHaveURL(/\/#productos$/)
  })
})

test.describe('Rutas anteriores', () => {
  const legacy = [
    ['/#cursos', /\/open#cursos$/, '#cursos'],
    ['/#servicios', /\/#soluciones$/, '#soluciones'],
    ['/#proyectos', /\/#productos$/, '#productos'],
    ['/#sobre', /\/#nosotros$/, '#nosotros'],
  ]
  for (const [from, to, target] of legacy) {
    test(`${from} redirige a su nueva ubicación`, async ({ page }) => {
      await page.goto(from)
      await expect(page).toHaveURL(to)
      await expect(page.locator(target)).toBeInViewport()
    })
  }

  test('una ruta desconocida vuelve al inicio', async ({ page }) => {
    await page.goto('/pagina-que-no-existe')
    await expect(page).toHaveURL(/\/$/)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('/open conserva los cursos y sus PDFs', async ({ page, request }) => {
    await page.goto('/open')
    const links = page.locator('#cursos .course-card__link')
    await expect(links).toHaveCount(3)
    await expect(links.nth(0)).toHaveAttribute('href', '/cursos/ai-engineer')
    for (const pdf of ['ai-engineer-bootcamp.pdf', 'claude-design-code.pdf', 'curso-agentes-langflow.pdf']) {
      const res = await request.get(`/docs/${pdf}`)
      expect(res.ok(), pdf).toBeTruthy()
    }
  })

  test('robots.txt publicado', async ({ request }) => {
    const res = await request.get('/robots.txt')
    expect(res.ok()).toBeTruthy()
    expect(await res.text()).toContain('User-agent: *')
  })
})

test.describe('Formulario de contacto', () => {
  test('envía el lead y confirma solo tras guardarse', async ({ page }) => {
    const payloads = await mockLeads(page)
    await page.goto('/#contacto')
    const form = await fillContactForm(page, { interes: 'miga' })
    await page.waitForTimeout(MIN_FILL_MS)
    await form.getByRole('button', { name: /Enviar mensaje/ }).click()

    await expect(page.getByRole('status')).toContainText('¡Mensaje enviado!')
    expect(payloads).toHaveLength(1)
    expect(payloads[0]).toEqual([{
      full_name: 'Prueba E2E',
      email: 'e2e@example.com',
      company: 'Negocio de prueba',
      phone: null,
      service: 'Miga',
      message: 'Tardamos mucho en preparar cotizaciones.',
      state: 'nuevo',
    }])
  })

  test('si Supabase rechaza el lead, muestra error y no confirma', async ({ page }) => {
    await mockLeads(page, route => route.fulfill({
      status: 400,
      contentType: 'application/json',
      body: JSON.stringify({ code: '23514', message: 'violates check constraint' }),
    }))
    await page.goto('/#contacto')
    const form = await fillContactForm(page)
    await page.waitForTimeout(MIN_FILL_MS)
    await form.getByRole('button', { name: /Enviar mensaje/ }).click()

    await expect(page.getByRole('alert')).toContainText('No pudimos enviar tu mensaje')
    await expect(page.getByRole('alert')).not.toContainText('check constraint')
    await expect(page.getByText('¡Mensaje enviado!')).toHaveCount(0)
    // Los datos siguen en el formulario para reintentar
    await expect(form.locator('#nombre')).toHaveValue('Prueba E2E')
  })

  test('sin conexión, muestra error y no confirma', async ({ page }) => {
    await mockLeads(page, route => route.abort('failed'))
    await page.goto('/#contacto')
    const form = await fillContactForm(page)
    await page.waitForTimeout(MIN_FILL_MS)
    await form.getByRole('button', { name: /Enviar mensaje/ }).click()

    await expect(page.getByRole('alert')).toContainText('No pudimos enviar tu mensaje')
    await expect(page.getByText('¡Mensaje enviado!')).toHaveCount(0)
  })

  test('valida campos obligatorios y correo sin enviar nada', async ({ page }) => {
    const payloads = await mockLeads(page)
    await page.goto('/#contacto')
    const form = page.locator('#contacto form')
    await form.getByRole('button', { name: /Enviar mensaje/ }).click()
    await expect(page.getByRole('alert')).toContainText('Completa tu nombre')

    await fillContactForm(page)
    await form.locator('#email').fill('correo-invalido')
    await form.getByRole('button', { name: /Enviar mensaje/ }).click()
    await expect(page.getByRole('alert')).toContainText('correo electrónico esté bien escrito')
    expect(payloads).toHaveLength(0)
  })

  test('antispam: el campo trampa o un envío instantáneo no se envían', async ({ page }) => {
    const payloads = await mockLeads(page)
    await page.goto('/#contacto')
    const form = await fillContactForm(page)

    // Envío inmediato (antes del tiempo mínimo)
    await form.getByRole('button', { name: /Enviar mensaje/ }).click()
    await expect(page.getByRole('alert')).toContainText('No pudimos enviar tu mensaje')

    // Campo trampa lleno, ya pasado el tiempo mínimo
    await page.waitForTimeout(MIN_FILL_MS)
    await form.locator('#hp_field').fill('https://spam.example', { force: true })
    await form.getByRole('button', { name: /Enviar mensaje/ }).click()
    await expect(page.getByRole('alert')).toContainText('No pudimos enviar tu mensaje')

    expect(payloads).toHaveLength(0)
    await expect(page.getByText('¡Mensaje enviado!')).toHaveCount(0)
  })

  test('?interes= con un valor desconocido no preselecciona nada', async ({ page }) => {
    await page.goto('/?interes=otra-cosa#contacto')
    await expect(page.locator('#interes')).toHaveValue('')
  })
})
