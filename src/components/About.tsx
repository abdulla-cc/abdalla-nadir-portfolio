import { Github, Linkedin, Mail } from 'lucide-react'
import { Reveal } from './Reveal'
import { Eyebrow } from './Eyebrow'
import { achievements } from '../data/skills'
import { asset } from '../lib/asset'

const socials = [
  { href: 'mailto:abdullah130306@gmail.com', label: 'Email Abdalla', icon: Mail },
  { href: 'https://www.linkedin.com/in/abdalla-nadir-a6841532b/', label: 'LinkedIn profile', icon: Linkedin },
  { href: 'https://github.com/abdulla-cc', label: 'GitHub profile', icon: Github },
]

export function About() {
  return (
    <section id="about" className="py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-6 md:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-[72px] lg:px-12">
        <Reveal className="relative mx-auto w-full max-w-[320px] lg:max-w-[380px]">
          <img
            src={asset('profile.jpeg')}
            alt="Abdalla Nadir"
            className="aspect-[4/5] w-full rounded-[20px] border border-line-soft bg-surface-2 object-cover"
          />
          <div className="absolute -bottom-5.5 left-1/2 flex -translate-x-1/2 gap-2.5 whitespace-nowrap rounded-full border border-line bg-card px-4 py-2.5 shadow-theme">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener' : undefined}
                aria-label={label}
                className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-surface-2 text-text transition-all hover:-translate-y-[3px] hover:bg-gold hover:text-on-gold"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Eyebrow>About Me</Eyebrow>
          <h2 className="mb-5 text-3xl font-extrabold leading-[1.12] lg:text-[40px]">
            Analytical mind, builder's hands.
          </h2>
          <p className="mb-4 text-base text-dim">
            Final-year Computer Science (AI) student at Multimedia University, Melaka. My focus sits
            at the intersection of data analytics and business intelligence — I build dashboards and
            data pipelines that give organisations a clear picture of what's inside their numbers.
          </p>
          <p className="mb-4 text-base text-dim">
            With a 3.4 GPA, Dean's List recognition, and certifications from Microsoft, Google,
            Cisco, and Huawei, I'm ready to bring real value to a data team from day one. Currently
            seeking a Data Analyst or BI internship.
          </p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {achievements.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-[14px] border border-line-soft bg-card p-5 transition-all hover:-translate-y-1 hover:border-gold hover:shadow-theme"
              >
                <Icon size={26} className="mb-3 text-gold" />
                <h4 className="mb-1 font-display text-[17px] font-bold">{title}</h4>
                <p className="text-[13.5px] leading-[1.55] text-dim">{description}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
