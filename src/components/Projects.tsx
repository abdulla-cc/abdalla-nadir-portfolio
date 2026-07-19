import { ArrowUpRight, Brain, ExternalLink, FileText, FlaskConical, Github } from 'lucide-react'
import { Reveal } from './Reveal'
import { Eyebrow } from './Eyebrow'
import { projects, type Project, type ProjectLink } from '../data/projects'
import { asset } from '../lib/asset'

const linkIcons = {
  github: Github,
  launch: ExternalLink,
  notebook: FlaskConical,
  brain: Brain,
} as const

function ProjectLinkItem({ link }: { link: ProjectLink }) {
  const Icon = linkIcons[link.icon]
  const base = 'inline-flex items-center gap-1.5 text-[13px] font-semibold transition-all'
  const style = link.primary
    ? `${base} rounded-lg bg-gold px-3.5 py-[7px] font-bold text-on-gold hover:-translate-y-px hover:bg-gold-2 hover:shadow-[0_8px_20px_rgba(242,202,80,0.25)]`
    : `${base} text-dim hover:text-gold`
  return (
    <a href={link.href} target="_blank" rel="noopener" className={style}>
      <Icon size={16} /> {link.label}
    </a>
  )
}

function CaseStudyButton({ id, onOpen }: { id: string; onOpen: (id: string) => void }) {
  return (
    <button
      onClick={() => onOpen(id)}
      className="inline-flex cursor-pointer items-center gap-1.5 text-[13px] font-semibold text-dim transition-colors hover:text-gold"
    >
      <FileText size={16} /> Case Study
    </button>
  )
}

function ProjectImage({ project, featured }: { project: Project; featured?: boolean }) {
  const Placeholder = project.placeholderIcon
  return (
    <div
      className={`flex items-center justify-center overflow-hidden border-line-soft bg-surface-2 bg-[radial-gradient(circle_at_50%_45%,rgba(242,202,80,0.18)_0%,transparent_60%)] ${
        featured
          ? 'aspect-[16/10] w-full border-b md:aspect-auto md:w-[280px] md:shrink-0 md:border-r md:border-b-0'
          : 'aspect-[16/10] border-b'
      }`}
    >
      {project.image ? (
        <img
          src={asset(project.image)}
          alt={`${project.title} screenshot`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
        />
      ) : (
        <Placeholder
          size={featured ? 96 : 72}
          className="text-gold drop-shadow-[0_8px_24px_rgba(242,202,80,0.28)] transition-transform duration-400 group-hover:-translate-y-0.5 group-hover:scale-[1.08]"
          strokeWidth={1.25}
        />
      )}
    </div>
  )
}

function ProjectCard({ project, onOpenCaseStudy }: { project: Project; onOpenCaseStudy: (id: string) => void }) {
  if (project.featured) {
    return (
      <div className="group col-span-full flex flex-col overflow-hidden rounded-[18px] border border-gold bg-gradient-to-br from-card to-surface-2 transition-all hover:-translate-y-1 hover:shadow-[0_32px_80px_rgba(242,202,80,0.12)] md:flex-row">
        <ProjectImage project={project} featured />
        <div className="flex flex-1 flex-col gap-3 p-6 md:px-9 md:py-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-gold">{project.tag}</span>
            {project.status && (
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-dim">
                <span className="pulse-dot h-2 w-2 shrink-0 rounded-full bg-gold" />
                {project.status}
              </span>
            )}
          </div>
          <h3 className="font-display text-[22px] font-bold leading-[1.25]">{project.title}</h3>
          <p className="flex-1 text-[15px] leading-[1.6] text-dim">{project.description}</p>
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
              <ProjectLinkItem key={link.href} link={link} />
            ))}
            <CaseStudyButton id={project.caseStudyId} onOpen={onOpenCaseStudy} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="group flex w-full flex-col overflow-hidden rounded-[18px] border border-line-soft bg-card transition-all hover:-translate-y-1.5 hover:border-gold hover:shadow-theme">
      <ProjectImage project={project} />
      <div className="flex flex-1 flex-col gap-2.5 p-6">
        <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-gold">{project.tag}</span>
        <h3 className="font-display text-[19px] font-bold">{project.title}</h3>
        <p className="flex-1 text-sm leading-[1.6] text-dim">{project.description}</p>
        <div className="mt-2 flex flex-wrap gap-4.5 border-t border-line-soft pt-4">
          {project.links.map(link => (
            <ProjectLinkItem key={link.href} link={link} />
          ))}
          <CaseStudyButton id={project.caseStudyId} onOpen={onOpenCaseStudy} />
        </div>
      </div>
    </div>
  )
}

export function Projects({ onOpenCaseStudy }: { onOpenCaseStudy: (id: string) => void }) {
  return (
    <section id="projects" className="py-16 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8 lg:px-12">
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Selected Work</Eyebrow>
            <h2 className="text-[32px] font-extrabold leading-[1.12] lg:text-[40px]">Projects</h2>
          </div>
          <a
            href="https://github.com/abdulla-cc"
            target="_blank"
            rel="noopener"
            className="group/link inline-flex items-center gap-1.5 text-sm font-bold text-gold transition-all hover:gap-2.5"
          >
            See more on GitHub <ArrowUpRight size={18} />
          </a>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal
              key={project.id}
              delay={(i % 3) * 0.1}
              className={project.featured ? 'col-span-full' : 'flex'}
            >
              <ProjectCard project={project} onOpenCaseStudy={onOpenCaseStudy} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
