import { useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { focusAnchorTarget } from '../lib/focus'

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certs', label: 'Certs' },
  { id: 'personal-projects', label: 'Fun' },
]

export function Navbar() {
  const { theme, toggle } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const navRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>('main section[id]')]
    let frame = 0
    const updateActiveSection = () => {
      frame = 0
      const boundary = (navRef.current?.getBoundingClientRect().bottom ?? 0) + 32
      let current = sections[0]?.id ?? 'home'
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= boundary) current = section.id
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        current = sections[sections.length - 1]?.id ?? current
      }
      setActiveSection(current)
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection)
    }
    updateActiveSection()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    menuRef.current?.querySelector<HTMLAnchorElement>('a')?.focus({ preventScroll: true })
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setMenuOpen(false)
        menuButtonRef.current?.focus({ preventScroll: true })
      }
    }
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !navRef.current?.contains(event.target)) {
        setMenuOpen(false)
      }
    }
    const desktop = window.matchMedia('(min-width: 1024px)')
    const onDesktop = () => {
      if (desktop.matches) {
        const focusedLink = menuRef.current?.contains(document.activeElement)
        setMenuOpen(false)
        if (focusedLink) navRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    desktop.addEventListener('change', onDesktop)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
      desktop.removeEventListener('change', onDesktop)
    }
  }, [menuOpen])

  const onNavigate = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    setMenuOpen(false)
    focusAnchorTarget(id)
  }

  const linkClass = (id: string) =>
    `text-sm font-medium transition-colors hover:text-gold ${
      activeSection === id ? 'text-gold' : 'text-dim'
    }`

  return (
    <nav
      ref={navRef}
      aria-label="Main navigation"
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setMenuOpen(false)
      }}
      className="sticky top-0 z-50 border-b border-line-soft bg-nav backdrop-blur-lg transition-colors"
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-6 py-3.5 sm:gap-6 md:px-8 lg:px-12 lg:py-[18px]">
        <a href="#home" onClick={event => onNavigate(event, 'home')} className="flex min-w-0 items-center gap-3">
          <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-gold font-display text-base font-extrabold text-on-gold transition-colors">
            AN
          </span>
          <span className="truncate font-display text-[17px] font-bold text-text">Abdalla Nadir</span>
        </a>

        <ul className="hidden flex-1 justify-center gap-6 lg:flex xl:gap-8">
          {NAV_ITEMS.map(item => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={event => onNavigate(event, item.id)}
                aria-current={activeSection === item.id ? 'location' : undefined}
                className={linkClass(item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3.5">
          <button
            onClick={toggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-line text-text transition-all hover:rotate-[15deg] hover:border-gold hover:text-gold"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <a
            href="#contact"
            onClick={event => onNavigate(event, 'contact')}
            aria-current={activeSection === 'contact' ? 'location' : undefined}
            className="hidden items-center gap-2 rounded-xl bg-gold px-[22px] py-[13px] text-sm font-bold whitespace-nowrap text-on-gold transition-all hover:-translate-y-0.5 hover:bg-gold-2 hover:shadow-[0_12px_28px_rgba(242,202,80,0.25)] sm:inline-flex"
          >
            Contact
          </a>
          <button
            ref={menuButtonRef}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-line text-text lg:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
          id="mobile-navigation"
          ref={menuRef}
          className={`${menuOpen ? 'flex' : 'hidden'} max-h-[calc(100dvh-80px)] flex-col overflow-y-auto border-b border-line-soft bg-bg px-6 pt-3 pb-5 lg:hidden`}
        >
          {[...NAV_ITEMS, { id: 'contact', label: 'Contact' }].map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={event => onNavigate(event, item.id)}
              aria-current={activeSection === item.id ? 'location' : undefined}
              className="border-b border-line-soft px-1 py-3 text-[15px] font-medium text-dim transition-colors last:border-b-0 hover:text-gold"
            >
              {item.label}
            </a>
          ))}
      </div>
    </nav>
  )
}
