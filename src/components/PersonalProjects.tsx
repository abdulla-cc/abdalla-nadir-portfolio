import { FileText, Github, Sparkles, Zap } from 'lucide-react'
import { Reveal } from './Reveal'
import { personalProjects, domainExpansionHighlight } from '../data/personalProjects'
import { asset } from '../lib/asset'

export function PersonalProjects({ onOpenCaseStudy }: { onOpenCaseStudy: (id: string) => void }) {
  const project = personalProjects[0]
  const Placeholder = project.placeholderIcon

  return (
    <section id="personal-projects" className="bg-surface py-16 transition-colors lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12">
        <Reveal className="mb-14">
          <span className="mb-3.5 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.12em] text-gold">
            <Sparkles size={14} />
            Side Quests
          </span>
          <h2 className="mb-4 text-[32px] font-extrabold leading-[1.12] lg:text-[40px]">Just for Fun</h2>
          <p className="max-w-2xl text-base text-dim">
            Outside of dashboards and pipelines, I build things purely because they're fun — usually
            an excuse to learn a new corner of ML. Here's the first one.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="group flex flex-col overflow-hidden rounded-[18px] border border-line-soft bg-card transition-all hover:-translate-y-1 hover:border-gold hover:shadow-theme md:flex-row">
            <div className="flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-line-soft bg-surface-2 bg-[radial-gradient(circle_at_50%_45%,rgba(242,202,80,0.18)_0%,transparent_60%)] md:aspect-auto md:w-[320px] md:shrink-0 md:border-r md:border-b-0">
              {project.image ? (
                <img
                  src={asset(project.image)}
                  alt={`${project.title} demo`}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                />
              ) : (
                <Placeholder
                  size={72}
                  className="text-gold drop-shadow-[0_8px_24px_rgba(242,202,80,0.28)] transition-transform duration-400 group-hover:-translate-y-0.5 group-hover:scale-[1.08]"
                  strokeWidth={1.25}
                />
              )}
            </div>

            <div className="flex flex-1 flex-col gap-4 p-6 md:px-9 md:py-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-gold">{project.tag}</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-gold">
                  <Sparkles size={12} /> For Fun
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold">{project.title}</h3>
              <p className="text-[15px] leading-[1.6] text-dim">{project.description}</p>

              <div className="flex items-start gap-3 rounded-[14px] border border-line-soft bg-surface-2 p-4">
                <Zap size={18} className="mt-0.5 shrink-0 text-gold" />
                <p className="text-sm leading-[1.6] text-text">{domainExpansionHighlight}</p>
              </div>

              {project.tech && (
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map(t => (
                    <span
                      key={t}
                      className="rounded-full border border-line-soft bg-surface-2 px-2.5 py-1 text-[11.5px] font-semibold text-gold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-2 flex gap-4.5 border-t border-line-soft pt-4">
                {project.links.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-dim transition-colors hover:text-gold"
                  >
                    <Github size={16} /> {link.label}
                  </a>
                ))}
                <button
                  onClick={() => onOpenCaseStudy(project.caseStudyId)}
                  className="inline-flex cursor-pointer items-center gap-1.5 text-[13px] font-semibold text-dim transition-colors hover:text-gold"
                >
                  <FileText size={16} /> Case Study
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
