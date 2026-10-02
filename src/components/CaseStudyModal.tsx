import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
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
      <h3 className="mb-2.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-gold">
        <Icon size={14} aria-hidden="true" /> {label}
      </h3>
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

  return createPortal(
    <AnimatePresence>
      {cs && <CaseStudyDialog key="case-study" cs={cs} onClose={onClose} />}
    </AnimatePresence>,
    document.body,
  )
}

function CaseStudyDialog({ cs, onClose }: {
  cs: (typeof caseStudies)[string]
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    // The dialog is portalled beside the app root, so the page can be made inert
    // without hiding the dialog itself from keyboard or assistive technology.
    const appRoot = document.getElementById('root')
    const wasInert = appRoot?.inert ?? false
    headingRef.current?.focus({ preventScroll: true })
    if (appRoot) appRoot.inert = true
    document.body.style.overflow = 'hidden'

    const focusableElements = () => [...dialog.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )].filter(element => element.tabIndex >= 0 && element.getClientRects().length > 0)
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
      if (event.key !== 'Tab') return
      const elements = focusableElements()
      const first = elements[0]
      const last = elements[elements.length - 1]
      const active = document.activeElement
      if (!first) {
        event.preventDefault()
        headingRef.current?.focus({ preventScroll: true })
      } else if (event.shiftKey && (active === first || !elements.includes(active as HTMLElement))) {
        event.preventDefault()
        last.focus({ preventScroll: true })
      } else if (!event.shiftKey && (active === last || !dialog.contains(active))) {
        event.preventDefault()
        first.focus({ preventScroll: true })
      }
    }
    const onFocus = (event: FocusEvent) => {
      if (event.target instanceof Node && !dialog.contains(event.target)) {
        headingRef.current?.focus({ preventScroll: true })
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('focusin', onFocus)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('focusin', onFocus)
      document.body.style.overflow = previousOverflow
      if (appRoot) appRoot.inert = wasInert
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true })
    }
  }, [onClose])

  const p = 'm-0 text-sm leading-[1.7] text-text'

  return (
        <motion.div
          ref={dialogRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={e => e.target === e.currentTarget && onClose()}
          className="fixed inset-0 z-9000 flex items-start justify-center overflow-y-auto bg-black/70 p-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
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
                <h2 ref={headingRef} id={titleId} tabIndex={-1} className="font-display text-[22px] font-extrabold leading-[1.2] text-text">{cs.title}</h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close case study"
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
  )
}
