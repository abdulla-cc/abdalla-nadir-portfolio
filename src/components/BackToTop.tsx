import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useReducedMotion } from '../lib/useReducedMotion'
import { ArrowUp } from 'lucide-react'
import { focusAnchorTarget } from '../lib/focus'

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          onClick={() => {
            focusAnchorTarget('main-content')
            window.scrollTo({ top: 0, behavior: reduceMotion ? 'instant' : 'smooth' })
          }}
          aria-label="Back to top"
          className="fixed right-4.5 bottom-4.5 z-60 flex h-[46px] w-[46px] cursor-pointer items-center justify-center rounded-full bg-gold text-on-gold shadow-[0_8px_24px_rgba(242,202,80,0.3)] transition-colors hover:bg-gold-2 md:right-7 md:bottom-7"
        >
          <ArrowUp size={22} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
