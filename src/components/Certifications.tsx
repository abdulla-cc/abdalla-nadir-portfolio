import { Reveal } from './Reveal'
import { Eyebrow } from './Eyebrow'
import { certifications, type Certification } from '../data/certifications'

const badgeStyles: Record<Certification['badge'], string> = {
  Verified: 'bg-surface-2 text-gold',
  Mastery: 'bg-gold text-on-gold',
  'In Progress': 'bg-surface-2 text-dim',
}

export function Certifications() {
  return (
    <section id="certs" className="bg-surface py-16 transition-colors lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12">
        <Reveal className="mb-14 text-center">
          <Eyebrow>Credentials</Eyebrow>
          <h2 className="text-[32px] font-extrabold leading-[1.12] lg:text-[40px]">Certifications</h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <Reveal key={cert.title} delay={(i % 3) * 0.1} className="flex">
              <div
                className={`flex w-full items-center gap-4.5 rounded-[18px] border bg-card px-7 py-6 transition-all hover:-translate-y-1 hover:border-gold hover:shadow-theme ${
                  cert.featured ? 'border-gold' : 'border-line-soft'
                }`}
              >
                <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full bg-surface-2 text-gold">
                  <cert.icon size={28} />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="mb-1 font-display text-[15.5px] font-bold leading-[1.3]">{cert.title}</h4>
                  <div className="mb-2.5 text-[13px] text-dim">{cert.issuer}</div>
                  <span
                    className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] ${badgeStyles[cert.badge]}`}
                  >
                    {cert.badge}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
