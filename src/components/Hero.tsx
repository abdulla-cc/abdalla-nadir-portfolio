import { ArrowRight, Download } from 'lucide-react'
import { Reveal } from './Reveal'
import { ShaderBackground } from './ui/animated-shader-hero'
import { useTheme } from '../context/ThemeContext'
import { asset } from '../lib/asset'

const stats = [
  { n: '3.4', label: 'GPA / 4.0' },
  { n: '7', label: 'Projects' },
  { n: '6', label: 'Certifications' },
]

export function Hero() {
  const { theme } = useTheme()

  return (
    <section id="home" className="relative overflow-hidden py-16 lg:pt-24 lg:pb-[110px]">
      {/* Animated WebGL starfield in dark mode; ambient gold blobs in light mode.
          mix-blend-screen makes the shader's black background transparent over the navy bg. */}
      {theme === 'dark' ? (
        <ShaderBackground className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-60 mix-blend-screen" />
      ) : (
        <>
          <div className="animate-blob-a pointer-events-none absolute -top-20 -right-15 z-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,var(--gold)_0%,transparent_70%)] opacity-[0.14] blur-[30px]" />
          <div className="animate-blob-b pointer-events-none absolute -bottom-30 -left-25 z-0 h-95 w-95 rounded-full bg-[radial-gradient(circle,var(--gold)_0%,transparent_70%)] opacity-[0.12] blur-[30px]" />
        </>
      )}

      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 md:px-8 lg:grid-cols-[1.25fr_0.9fr] lg:gap-16 lg:px-12">
        <Reveal className="relative z-1 flex flex-col items-center text-center lg:items-start lg:text-left">
          <h1 className="mb-6 text-4xl font-extrabold leading-[1.05] text-balance md:text-5xl lg:text-[clamp(40px,6vw,60px)]">
            Turning data into <span className="text-gold">insights</span> &amp; smarter{' '}
            <span className="text-gold">decisions</span>.
          </h1>
          <p className="mb-9 max-w-[520px] text-lg leading-[1.7] text-dim">
            I'm a Data Analyst &amp; AI student at Multimedia University, Melaka, building dashboards
            and pipelines that turn raw data into clear, actionable stories — with Power BI, Python,
            and SQL.
          </p>
          <div className="mb-11 flex flex-wrap justify-center gap-3.5 lg:justify-start">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl bg-gold px-[22px] py-[13px] text-sm font-bold text-on-gold transition-all hover:-translate-y-0.5 hover:bg-gold-2 hover:shadow-[0_12px_28px_rgba(242,202,80,0.25)]"
            >
              View Projects <ArrowRight size={18} />
            </a>
            <a
              href={asset('Abdalla_CV.pdf')}
              download
              className="inline-flex items-center gap-2 rounded-xl border border-line px-[22px] py-[13px] text-sm font-bold text-text transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold"
            >
              <Download size={18} /> Download CV
            </a>
          </div>
          <div className="flex w-full flex-wrap justify-center gap-4 lg:justify-start">
            {stats.map(s => (
              <div
                key={s.label}
                className="min-w-[130px] flex-1 rounded-2xl border border-line-soft bg-card px-5.5 py-4.5 transition-all hover:-translate-y-1 hover:border-gold hover:shadow-theme"
              >
                <div className="mb-1.5 font-display text-3xl font-extrabold leading-none text-gold">{s.n}</div>
                <div className="text-xs font-semibold uppercase tracking-[0.08em] text-dim">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative z-1 flex items-center justify-center">
          <div className="h-60 w-60 rounded-full border-4 border-gold bg-bg p-2.5 shadow-theme md:h-[340px] md:w-[340px]">
            <img
              src={asset('profile.webp')}
              alt="Abdalla Nadir"
              className="h-full w-full rounded-full bg-surface-2 object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
