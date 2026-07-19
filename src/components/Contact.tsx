import { Code2, Mail, MapPin, Network } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Reveal } from './Reveal'
import { Eyebrow } from './Eyebrow'
import { ContactForm } from './ContactForm'

interface ContactItem {
  icon: LucideIcon
  label: string
  value: string
  href?: string
}

const contactItems: ContactItem[] = [
  { icon: Mail, label: 'Email', value: 'abdullah130306@gmail.com', href: 'mailto:abdullah130306@gmail.com' },
  { icon: Network, label: 'LinkedIn', value: 'abdalla-nadir-a6841532b', href: 'https://www.linkedin.com/in/abdalla-nadir-a6841532b/' },
  { icon: Code2, label: 'GitHub', value: 'github.com/abdulla-cc', href: 'https://github.com/abdulla-cc' },
  { icon: MapPin, label: 'Location', value: 'Melaka, Malaysia' },
]

const eduItems = [
  {
    date: 'MAR 2024 — MAR 2027',
    title: 'BSc Computer Science (Artificial Intelligence)',
    org: 'Multimedia University, Melaka, Malaysia',
    note: "GPA 3.4 · Dean's List · Arabic Culture Society — High Committee",
  },
  {
    date: '2025 — 2026',
    title: 'Industry Certifications',
    org: 'Microsoft · Google · Cisco · Huawei · IBM',
    note: 'Power BI, Google Analytics, CCNA, HCIA-AI, Data Analyst track.',
  },
  {
    date: 'SELF-DIRECTED',
    title: 'Applied Projects',
    org: 'End-to-end analytics & BI work',
    note: 'Excel, Power BI, SQL, and Python pipelines on real datasets.',
  },
]

export function Contact() {
  return (
    <section id="contact" className="pt-20 pb-24">
      <div className="mx-auto grid max-w-[1200px] gap-14 px-6 md:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">
        <Reveal>
          <Eyebrow>Get in touch</Eyebrow>
          <h2 className="mb-7 text-[34px] font-extrabold leading-[1.15]">Contact</h2>
          <div className="flex flex-col gap-3">
            {contactItems.map(({ icon: Icon, label, value, href }) => {
              const inner = (
                <>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-gold">
                    <Icon size={22} />
                  </div>
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="text-xs font-semibold uppercase tracking-[0.08em] text-dim">{label}</span>
                    <span className="text-[15.5px] font-semibold break-words text-text">{value}</span>
                  </div>
                </>
              )
              const cls =
                'flex items-center gap-4 rounded-[14px] border border-line-soft bg-card px-5 py-4 transition-all hover:translate-x-1 hover:border-gold'
              return href ? (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener' : undefined}
                  className={cls}
                >
                  {inner}
                </a>
              ) : (
                <div key={label} className={cls}>
                  {inner}
                </div>
              )
            })}
          </div>
          <div className="mt-8">
            <h3 className="mb-3 font-display text-lg font-bold">Or drop me a message right here</h3>
            <ContactForm />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Eyebrow>Background</Eyebrow>
          <h2 className="mb-7 text-[34px] font-extrabold leading-[1.15]">Education</h2>
          <div className="relative border-l-2 border-line pl-7">
            {eduItems.map(item => (
              <div key={item.title} className="relative pb-7 last:pb-0">
                <span className="absolute top-1.5 -left-[37px] h-3.5 w-3.5 rounded-full bg-gold shadow-[0_0_0_3px_var(--bg)]" />
                <div className="mb-1.5 font-mono text-xs font-semibold tracking-[0.05em] text-gold">{item.date}</div>
                <h3 className="mb-1 font-display text-lg font-bold">{item.title}</h3>
                <div className="mb-1.5 text-sm font-medium text-text">{item.org}</div>
                <div className="text-[13.5px] text-dim">{item.note}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
