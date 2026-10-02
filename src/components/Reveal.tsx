import { motion } from 'framer-motion'
import { useReducedMotion } from '../lib/useReducedMotion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

/** Scroll-reveal wrapper — replaces the old IntersectionObserver + .reveal CSS. */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 28 }}
      animate={reducedMotion ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -50px 0px' }}
      transition={{ duration: reducedMotion ? 0 : 0.7, ease: 'easeOut', delay: reducedMotion ? 0 : delay }}
    >
      {children}
    </motion.div>
  )
}
