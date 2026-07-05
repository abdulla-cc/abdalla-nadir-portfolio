import { Reveal } from './Reveal'
import { Eyebrow } from './Eyebrow'
import { learningNow, skillCards, skillTags } from '../data/skills'

export function Skills() {
  return (
    <section id="skills" className="bg-surface py-16 transition-colors lg:py-24">
      <div className="mx-auto grid max-w-[1200px] items-start gap-14 px-6 md:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-[72px] lg:px-12">
        <Reveal>
          <Eyebrow>Skills &amp; Tools</Eyebrow>
          <h2 className="mb-5 text-3xl font-extrabold leading-[1.12] lg:text-[40px]">
            The stack I work in every day.
          </h2>
          <p className="mb-6 text-base text-dim">
            From cleaning raw data to publishing interactive dashboards — I handle each step with
            precision: BI tools, scripting, query languages, and the connective tissue between them.
          </p>
          <div className="flex flex-wrap gap-2">
            {skillTags.map(tag => (
              <span
                key={tag}
                className="rounded-full border border-line px-4 py-2 text-[13px] font-semibold text-text transition-all hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-on-gold"
              >
                {tag}
              </span>
            ))}
          </div>

          <div
            aria-label="Currently learning"
            className="mt-7 flex flex-wrap items-center gap-4 rounded-[14px] border border-line-soft bg-card px-4.5 py-4 transition-colors hover:border-line"
          >
            <span className="inline-flex items-center gap-2 whitespace-nowrap text-xs font-bold uppercase tracking-[0.10em] text-gold">
              <span className="pulse-dot h-2 w-2 shrink-0 rounded-full bg-gold" />
              Currently learning
            </span>
            <div className="flex flex-wrap gap-1.5">
              {learningNow.map(item => (
                <span
                  key={item}
                  className="rounded-full border border-line-soft bg-surface-2 px-2.5 py-1 text-[12.5px] font-semibold text-text"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="grid gap-4.5 sm:grid-cols-2">
          {skillCards.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-[18px] border border-line-soft bg-card p-7 transition-all hover:-translate-y-[5px] hover:border-gold hover:shadow-theme"
            >
              <div className="mb-4.5 flex h-13 w-13 items-center justify-center rounded-[14px] bg-surface-2 text-gold">
                <Icon size={26} />
              </div>
              <h4 className="mb-2 font-display text-lg font-bold">{title}</h4>
              <p className="text-sm leading-[1.6] text-dim">{description}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
