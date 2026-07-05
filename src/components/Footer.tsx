import { asset } from '../lib/asset'

const footerLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certs', href: '#certs' },
]

export function Footer() {
  return (
    <footer className="border-t border-line-soft bg-surface-2 py-10 transition-colors">
      <div className="mx-auto flex max-w-[1200px] flex-col flex-wrap items-center justify-between gap-6 px-6 text-center md:flex-row md:px-8 md:text-left lg:px-12">
        <div className="flex items-center gap-3">
          <span className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-gold font-display text-base font-extrabold text-on-gold">
            AN
          </span>
          <p className="text-[13px] text-dim">
            © {new Date().getFullYear()} Abdalla Nadir. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {footerLinks.map(link => (
            <a key={link.label} href={link.href} className="text-sm text-dim transition-colors hover:text-gold">
              {link.label}
            </a>
          ))}
          <a href={asset('Abdalla_CV.pdf')} download className="text-sm text-dim transition-colors hover:text-gold">
            Download CV
          </a>
        </div>
      </div>
    </footer>
  )
}
