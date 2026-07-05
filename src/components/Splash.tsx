import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/** Loading splash — gold "AN" logo, fades out shortly after mount. */
export function Splash() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 900)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-bg"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          aria-hidden="true"
        >
          <div className="animate-splash flex h-21 w-21 items-center justify-center rounded-full bg-gold font-display text-[28px] font-extrabold text-on-gold">
            AN
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
