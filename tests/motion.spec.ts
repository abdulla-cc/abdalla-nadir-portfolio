import { expect, test, type Page } from '@playwright/test'

async function instrumentShader(page: Page) {
  await page.addInitScript(() => {
    const state = window as typeof window & { shaderDraws: number }
    state.shaderDraws = 0
    const draw = WebGL2RenderingContext.prototype.drawArrays
    WebGL2RenderingContext.prototype.drawArrays = function (mode, first, count) {
      state.shaderDraws++
      return draw.call(this, mode, first, count)
    }
  })
}

async function frames(page: Page) {
  return page.evaluate(() => (window as typeof window & { shaderDraws: number }).shaderDraws)
}

test('reduced motion renders a still shader and responds to preference changes', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' })
  await instrumentShader(page)
  await page.goto('./')
  await expect.poll(() => frames(page)).toBeGreaterThan(0)
  // Let initial font loading / ResizeObserver settle before comparing draws.
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(300)
  const still = await frames(page)
  await page.waitForTimeout(300)
  expect(await frames(page)).toBe(still)
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await expect.poll(() => frames(page)).toBeGreaterThan(still + 2)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.waitForTimeout(150)
  const stopped = await frames(page)
  await page.waitForTimeout(300)
  expect(await frames(page)).toBe(stopped)
})

test('animated shader pauses offscreen, resumes and recovers from context loss', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'no-preference' })
  await instrumentShader(page)
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('./')
  await expect.poll(() => frames(page)).toBeGreaterThan(2)
  await page.locator('#contact').evaluate(el => el.scrollIntoView({ behavior: 'instant' }))
  await page.waitForTimeout(300)
  const paused = await frames(page)
  await page.waitForTimeout(300)
  expect(await frames(page)).toBe(paused)
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await expect.poll(() => frames(page)).toBeGreaterThan(paused + 2)
  const canLoseContext = await page.locator('canvas').evaluate((canvas: HTMLCanvasElement) => {
    const extension = canvas.getContext('webgl2')?.getExtension('WEBGL_lose_context')
    if (!extension) return false
    extension.loseContext()
    window.setTimeout(() => extension.restoreContext(), 150)
    return true
  })
  expect(canLoseContext).toBe(true)
  const beforeRestore = await frames(page)
  await expect.poll(() => frames(page)).toBeGreaterThan(beforeRestore + 2)
  await page.getByRole('button', { name: 'Switch to light theme' }).click()
  await expect(page.locator('canvas')).toHaveCount(0)
  await page.getByRole('button', { name: 'Switch to dark theme' }).click()
  await expect(page.locator('canvas')).toHaveCount(1)
  expect(errors).toEqual([])
})

test('high-DPI shader uses hero bounds and does not double the viewport scale', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ deviceScaleFactor: 4, viewport: { width: 375, height: 800 }, colorScheme: 'dark', reducedMotion: 'reduce' })
  const page = await context.newPage()
  await page.goto(baseURL!)
  await expect(page.locator('canvas')).toBeVisible()
  const dimensions = await page.locator('canvas').evaluate((canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect()
    const gl = canvas.getContext('webgl2')!
    return { width: canvas.width, height: canvas.height, cssWidth: rect.width, cssHeight: rect.height, viewport: Array.from(gl.getParameter(gl.VIEWPORT) as Int32Array) }
  })
  expect(dimensions.width).toBe(Math.round(dimensions.cssWidth * 2))
  expect(dimensions.height).toBe(Math.round(dimensions.cssHeight * 2))
  expect(dimensions.viewport).toEqual([0, 0, dimensions.width, dimensions.height])
  await context.close()
})

test('terminal typing reserves its final height on a narrow screen', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 })
  await page.emulateMedia({ reducedMotion: 'no-preference', colorScheme: 'light' })
  await page.goto('./#about')
  await page.evaluate(() => document.fonts.ready)
  const terminal = page.locator('#about [aria-hidden="true"]').first()
  const initialHeight = (await terminal.boundingBox())!.height
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.getByText('full-stack systems · applied ml · ai engineering', { exact: true }).last()).toBeVisible()
  expect((await terminal.boundingBox())!.height).toBe(initialHeight)
})
