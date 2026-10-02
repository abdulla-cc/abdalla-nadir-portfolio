import { expect, test, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { projects } from '../src/data/projects'
import { personalProjects } from '../src/data/personalProjects'
import { caseStudies } from '../src/data/caseStudies'

// Never deliver test messages to the real inbox, including if a test forgets a mock.
test.beforeEach(async ({ page }) => {
  await page.route('https://formsubmit.co/**', route => route.abort())
})

async function fillContact(page: Page) {
  await page.getByLabel('Your name', { exact: true }).fill('Portfolio test')
  await page.getByLabel('Your email', { exact: true }).fill('test@example.com')
  await page.getByLabel('Message', { exact: true }).fill('Browser regression test; intercepted locally.')
}

test('contact preserves the message when the provider rejects HTTP 200', async ({ page }) => {
  await page.route('https://formsubmit.co/**', route => route.fulfill({
    json: { success: 'false', message: 'Please activate this form' },
  }))
  await page.goto('./#contact')
  await fillContact(page)
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  await expect(page.getByRole('alert')).toBeVisible()
  await expect(page.getByLabel('Message', { exact: true })).toHaveValue('Browser regression test; intercepted locally.')
  await expect(page.getByText(/Message sent/)).toHaveCount(0)
})

test('an invalid saved theme falls back to the system preference', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.addInitScript(() => localStorage.setItem('theme', 'invalid-theme'))
  await page.goto('./')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
})

test('main page exposes no serious or critical accessibility violations', async ({ page }) => {
  await page.goto('./')
  const results = await new AxeBuilder({ page }).analyze()
  expect(results.violations.filter(item => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([])
})

for (const failure of ['HTTP error', 'invalid JSON', 'network error'] as const) {
  test(`contact preserves input after ${failure}`, async ({ page }) => {
    await page.route('https://formsubmit.co/**', route => failure === 'network error'
      ? route.abort()
      : route.fulfill({ status: failure === 'HTTP error' ? 500 : 200, body: 'not JSON' }))
    await page.goto('./#contact')
    await fillContact(page)
    await page.getByRole('button', { name: 'Send message', exact: true }).click()
    await expect(page.getByRole('alert')).toBeVisible()
    await expect(page.getByLabel('Your name', { exact: true })).toHaveValue('Portfolio test')
    await expect(page.getByRole('alert').getByRole('link')).toHaveAttribute('href', 'mailto:abdullah130306@gmail.com')
    await expect(page.getByRole('button', { name: 'Send message', exact: true })).toBeEnabled()
  })
}

for (const success of [true, 'true']) {
  test(`contact resets only on explicit acknowledgement (${typeof success})`, async ({ page }) => {
    let submissions = 0
    await page.route('https://formsubmit.co/**', async route => {
      submissions++
      expect(route.request().postDataJSON()).toMatchObject({ name: 'Portfolio test', email: 'test@example.com' })
      await route.fulfill({ json: { success } })
    })
    await page.goto('./#contact')
    await fillContact(page)
    await page.getByLabel('Your name', { exact: true }).fill('  Portfolio test  ')
    await page.getByRole('button', { name: 'Send message', exact: true }).click()
    await expect(page.getByRole('status')).toContainText('Message accepted')
    await expect(page.getByLabel('Message', { exact: true })).toHaveValue('')
    expect(submissions).toBe(1)
  })
}

test('pending submission is bounded and cannot be sent twice', async ({ page }) => {
  let submissions = 0
  // Intentionally leave this intercepted request unanswered to exercise the timeout.
  await page.route('https://formsubmit.co/**', () => { submissions++ })
  await page.goto('./#contact')
  await page.clock.install()
  await fillContact(page)
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Sending…' })).toBeDisabled()
  await expect.poll(() => submissions).toBe(1)
  await page.clock.fastForward(16_000)
  await expect(page.getByRole('alert')).toBeVisible()
  await expect(page.getByLabel('Message', { exact: true })).not.toBeEmpty()
  expect(submissions).toBe(1)
})

test('whitespace-only messages are rejected locally', async ({ page }) => {
  let submissions = 0
  await page.route('https://formsubmit.co/**', route => { submissions++; return route.abort() })
  await page.goto('./#contact')
  await fillContact(page)
  await page.getByLabel('Message', { exact: true }).fill('   ')
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  expect(await page.getByLabel('Message', { exact: true }).evaluate((el: HTMLTextAreaElement) => el.validity.valid)).toBe(false)
  expect(submissions).toBe(0)
  await page.getByLabel('Message', { exact: true }).fill('A valid message')
  expect(await page.getByLabel('Message', { exact: true }).evaluate((el: HTMLTextAreaElement) => el.validity.valid)).toBe(true)
})

test('theme choice persists and synchronizes browser colors', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('./')
  await page.getByRole('button', { name: 'Switch to light theme' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#f8f9fa')
  await page.reload()
  await expect(page.getByRole('button', { name: 'Switch to dark theme' })).toBeVisible()
})

test('unavailable local storage does not break the page or theme switch', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new Error('Storage unavailable') }
    Storage.prototype.setItem = () => { throw new Error('Storage unavailable') }
  })
  await page.goto('./')
  await page.getByRole('button', { name: 'Switch to light theme' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
})

test('case studies trap focus, isolate the background and restore the opener', async ({ page }) => {
  await page.goto('./#projects')
  const opener = page.getByRole('button', { name: 'Case Study', exact: true }).first()
  await opener.click()
  const dialog = page.getByRole('dialog', { name: 'Research Agent — Agentic RAG System over arXiv Papers', exact: true })
  await expect(dialog.getByRole('heading', { level: 2 })).toBeFocused()
  await expect(page.locator('#root')).toHaveAttribute('inert', '')
  await page.keyboard.press('Shift+Tab')
  await expect(dialog.getByRole('button', { name: 'Close case study' })).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(dialog.getByRole('button', { name: 'Close case study' })).toBeFocused()
  const results = await new AxeBuilder({ page }).analyze()
  expect(results.violations.filter(item => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([])
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(opener).toBeFocused()
  await expect(page.locator('#root')).not.toHaveAttribute('inert', '')
  expect(await page.locator('body').evaluate(el => el.style.overflow)).not.toBe('hidden')
})

test('every displayed project opens the matching case study', async ({ page }) => {
  await page.goto('./#projects')
  const items = [...projects, ...personalProjects]
  const openers = page.getByRole('button', { name: 'Case Study', exact: true })
  await expect(openers).toHaveCount(items.length)
  for (let i = 0; i < items.length; i++) {
    await openers.nth(i).click()
    await expect(page.getByRole('dialog')).toHaveAccessibleName(caseStudies[items[i].caseStudyId].title)
    await page.getByRole('button', { name: 'Close case study' }).click()
    await expect(page.getByRole('dialog')).toHaveCount(0)
  }
})

for (const width of [320, 375, 768]) {
  test(`navigation and layout work at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('./')
    const toggle = page.getByRole('button', { name: 'Open navigation menu' })
    await toggle.click()
    await expect(page.locator('#mobile-navigation').getByRole('link', { name: 'Home', exact: true })).toBeFocused()
    await expect(page.getByRole('button', { name: 'Close navigation menu' })).toHaveAttribute('aria-expanded', 'true')
    await page.keyboard.press('Escape')
    await expect(toggle).toBeFocused()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await toggle.click()
    await page.locator('#mobile-navigation').getByRole('link', { name: 'Projects', exact: true }).click()
    await expect(page.locator('#projects')).toBeFocused()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(page.locator('#mobile-navigation')).toBeHidden()
    // Check visible content bounds as overflow-x:hidden can conceal layout bugs.
    const overflow = await page.locator('h1, h2, h3, p, a, button, input, textarea').evaluateAll(elements =>
      elements.filter(el => {
        const r = el.getBoundingClientRect()
        return r.width > 0 && r.height > 0 && getComputedStyle(el).position !== 'fixed'
          && (r.left < -1 || r.right > window.innerWidth + 1)
      }).map(el => el.textContent?.slice(0, 80)))
    expect(overflow).toEqual([])
    await page.getByRole('button', { name: 'Back to top' }).click()
    await expect(page.locator('#main-content')).toBeFocused()
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
    await page.screenshot({ path: testInfo.outputPath(`mobile-${width}.png`) })
  })
}

for (const colorScheme of ['dark', 'light'] as const) {
  test(`accessibility and terminal rendering in ${colorScheme} theme`, async ({ page }, testInfo) => {
    await page.emulateMedia({ colorScheme })
    await page.goto('./')
    const results = await new AxeBuilder({ page }).analyze()
    expect(results.violations.filter(item => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([])
    await page.screenshot({ path: testInfo.outputPath(`desktop-${colorScheme}.png`) })
    await page.locator('#about').scrollIntoViewIfNeeded()
    await expect(page.getByText('full-stack systems · applied ml · ai engineering', { exact: true }).last()).toBeVisible()
    await page.screenshot({ path: testInfo.outputPath(`about-${colorScheme}.png`) })
  })
}

test('internal anchors and shipped downloads resolve under the Pages base path', async ({ page, request }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('./')
  const anchors = await page.locator('a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute('href')!.slice(1)))
  for (const id of new Set(anchors)) await expect(page.locator(`[id="${id}"]`)).toHaveCount(1)
  for (const file of ['Abdalla_CV.pdf', 'favicon.svg', 'favicon-32.png', 'apple-touch-icon.png', 'og-image-v2.png', 'db-project/JobApplicationSystem.sql', 'db-project/JobApplicationSystem_Report.pdf']) {
    const response = await request.get(file)
    expect(response.ok(), file).toBe(true)
    expect(response.headers()['content-type'], file).not.toContain('text/html')
  }
  const images = await page.locator('img').evaluateAll(imgs => imgs.map(img => img.src))
  for (const url of images) {
    const response = await request.get(url)
    expect(response.ok(), url).toBe(true)
    expect(response.headers()['content-type']).toContain('image/')
  }
  expect(errors).toEqual([])
})

test('database project describes the exported schema and exposes readable downloads', async ({ page, request }) => {
  await page.goto('./db-project/')
  const sql = await (await request.get('db-project/JobApplicationSystem.sql')).text()
  expect([...sql.matchAll(/CREATE TABLE `/g)]).toHaveLength(5)
  expect(sql).toContain('ON `job_offer`')
  expect(sql).toContain('INSERT INTO `documents`')
  expect(sql).not.toContain('DEFINER=')
  await expect(page.getByText('Exported Tables', { exact: true })).toBeVisible()
  const results = await new AxeBuilder({ page }).analyze()
  expect(results.violations.filter(item => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([])
})

test('no-JavaScript fallback keeps the CV and email accessible', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto(baseURL!)
  await expect(page.getByRole('link', { name: 'download my CV' })).toHaveAttribute('href', '/abdalla-nadir-portfolio/Abdalla_CV.pdf')
  await expect(page.getByRole('link', { name: 'email Abdalla Nadir' })).toBeVisible()
  await context.close()
})
