import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Database, FileText, Flag, GraduationCap, Lightbulb, Package, Settings, Wrench, X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { caseStudies } from '../data/caseStudies'

interface SectionProps {
  icon: LucideIcon
  label: string
  fullWidth?: boolean
  learned?: boolean
  children: React.ReactNode
}

function Section({ icon: Icon, label, fullWidth, learned, children }: SectionProps) {
  return (
    <div
      className={`rounded-[14px] border p-4.5 transition-colors hover:border-line ${
        fullWidth ? 'md:col-span-2' : ''
      } ${
        learned
          ? 'border-line bg-gradient-to-br from-surface to-card'
          : 'border-line-soft bg-surface-2'
      }`}
    >
      <div className="mb-2.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-gold">
        <Icon size={14} /> {label}
      </div>
      {children}
    </div>
  )
}

interface CaseStudyModalProps {
  caseStudyId: string | null
  onClose: () => void
}

export function CaseStudyModal({ caseStudyId, onClose }: CaseStudyModalProps) {
  const cs = caseStudyId ? caseStudies[caseStudyId] : null

  useEffect(() => {
    if (!cs) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [cs, onClose])

  const p = 'm-0 text-sm leading-[1.7] text-text'

  return (
    <AnimatePresence>
      {cs && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={e => e.target === e.currentTarget && onClose()}
          className="fixed inset-0 z-9000 flex items-start justify-center overflow-y-auto bg-black/70 p-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Case Study"
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="m-auto w-full max-w-[780px] overflow-hidden rounded-[22px] border border-line-soft bg-card shadow-theme"
          >
            <div className="flex items-start justify-between gap-4 border-b border-line-soft bg-gradient-to-br from-surface to-card px-7 pt-7 pb-5">
              <div>
                <span className="mb-2 inline-block rounded-full border border-line px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-gold">
                  {cs.tag}
                </span>
                <h2 className="font-display text-[22px] font-extrabold leading-[1.2] text-text">{cs.title}</h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line-soft bg-surface-2 text-text transition-all hover:rotate-90 hover:bg-gold hover:text-on-gold"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid gap-3.5 p-7 md:grid-cols-2">
              <Section icon={FileText} label="Overview" fullWidth><p className={p}>{cs.overview}</p></Section>
              <Section icon={Flag} label="Problem"><p className={p}>{cs.problem}</p></Section>
              <Section icon={Database} label="Dataset"><p className={p}>{cs.dataset}</p></Section>
              <Section icon={Wrench} label="Tools Used" fullWidth>
                <div className="flex flex-wrap gap-1.5">
                  {cs.tools.map(t => (
                    <span
                      key={t}
                      className="rounded-full border border-line bg-card px-2.5 py-1 text-xs font-semibold text-gold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Section>
              <Section icon={Settings} label="Process" fullWidth><p className={p}>{cs.process}</p></Section>
              <Section icon={Lightbulb} label="Key Insights" fullWidth><p className={p}>{cs.insights}</p></Section>
              <Section icon={Package} label="Final Output" fullWidth><p className={p}>{cs.output}</p></Section>
              <Section icon={GraduationCap} label="What I Learned" fullWidth learned><p className={p}>{cs.learned}</p></Section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
