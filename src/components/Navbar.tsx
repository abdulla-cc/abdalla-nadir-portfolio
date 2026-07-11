import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

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

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.4 },
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const linkClass = (id: string) =>
    `text-sm font-medium transition-colors hover:text-gold ${
      activeSection === id ? 'text-gold' : 'text-dim'
    }`

  return (
    <nav className="sticky top-0 z-50 border-b border-line-soft bg-nav backdrop-blur-lg transition-colors">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-6 py-3.5 md:px-8 lg:px-12 lg:py-[18px]">
        <a href="#home" className="flex shrink-0 items-center gap-3">
          <span className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-gold font-display text-base font-extrabold text-on-gold transition-colors">
            AN
          </span>
          <span className="font-display text-[17px] font-bold text-text">Abdalla Nadir</span>
        </a>

        <ul className="hidden flex-1 justify-center gap-8 md:flex">
          {NAV_ITEMS.map(item => (
            <li key={item.id}>
              <a href={`#${item.id}`} className={linkClass(item.id)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-3.5">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            title="Toggle dark / light"
            className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-line text-text transition-all hover:rotate-[15deg] hover:border-gold hover:text-gold"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-gold px-[22px] py-[13px] text-sm font-bold whitespace-nowrap text-on-gold transition-all hover:-translate-y-0.5 hover:bg-gold-2 hover:shadow-[0_12px_28px_rgba(242,202,80,0.25)]"
          >
            Contact
          </a>
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
            className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-line text-text md:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="flex flex-col border-b border-line-soft bg-bg px-6 pt-3 pb-5 md:hidden">
          {[...NAV_ITEMS, { id: 'contact', label: 'Contact' }].map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMenuOpen(false)}
              className="border-b border-line-soft px-1 py-3 text-[15px] font-medium text-dim transition-colors last:border-b-0 hover:text-gold"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
