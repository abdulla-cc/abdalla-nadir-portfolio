/** Move keyboard focus with an in-page link, without changing its scroll behavior. */
export function focusAnchorTarget(id: string) {
  const target = document.getElementById(id)
  if (!target) return

  const originalTabIndex = target.getAttribute('tabindex')
  if (originalTabIndex === null) {
    target.setAttribute('tabindex', '-1')
    target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true })
  }
  target.focus({ preventScroll: true })
}
