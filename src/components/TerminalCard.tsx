import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface TermLine {
  cmd: string
  out: string[]
}

const LINES: TermLine[] = [
  { cmd: 'whoami', out: ['Abdalla Nadir — Data Analyst & AI student'] },
  {
    cmd: 'cat status.txt',
    out: [
      '🎓 B.CS (AI) @ MMU · GPA 3.4 · Dean’s List',
      '📍 Melaka, Malaysia',
      '🟡 open to Data Analyst / BI internships',
    ],
  },
  { cmd: 'ls skills/', out: ['power-bi/  python/  sql/  excel/', 'dax/  pandas/  machine-learning/'] },
  { cmd: 'echo $CURRENTLY_LEARNING', out: ['advanced python · ui/ux · ml'] },
]

const PROMPT = 'abdalla@portfolio:~$'

/** Animated terminal window that types out the profile — replaces the duplicate About photo. */
export function TerminalCard() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [done, setDone] = useState(0) // fully completed lines
  const [typed, setTyped] = useState(0) // chars typed of the current command

  useEffect(() => {
    if (!inView) return
    if (reduced.current) {
      setDone(LINES.length)
      return
    }
    if (done >= LINES.length) return
    const cmd = LINES[done].cmd
    if (typed < cmd.length) {
      const t = setTimeout(() => setTyped(c => c + 1), 38)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setDone(d => d + 1)
      setTyped(0)
    }, 380)
    return () => clearTimeout(t)
  }, [inView, done, typed])

  const finished = done >= LINES.length

  return (
    <div
      ref={ref}
      className="flex aspect-[4/5] w-full flex-col overflow-hidden rounded-[20px] border border-line bg-[#100a05] shadow-theme"
    >
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-line-soft bg-[#181008] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-gold" />
        <span className="h-3 w-3 rounded-full bg-gold-2 opacity-70" />
        <span className="h-3 w-3 rounded-full bg-[#b3a183] opacity-50" />
        <span className="ml-2 font-mono text-xs text-[#b3a183]">abdalla@portfolio: ~</span>
      </div>

      {/* terminal body */}
      <div className="flex-1 overflow-hidden p-5 font-mono text-[12.5px] leading-[1.75] sm:text-[13px]">
        {LINES.slice(0, done).map(line => (
          <div key={line.cmd} className="mb-2.5">
            <div className="text-[#f2e8d9]">
              <span className="text-gold">{PROMPT}</span> {line.cmd}
            </div>
            {line.out.map(o => (
              <div key={o} className="text-[#b3a183]">{o}</div>
            ))}
          </div>
        ))}

        {!finished && (
          <div className="text-[#f2e8d9]">
            <span className="text-gold">{PROMPT}</span> {LINES[done].cmd.slice(0, typed)}
            <span className="animate-blink -mb-0.5 inline-block h-[15px] w-[8px] bg-gold align-middle" />
          </div>
        )}

        {finished && (
          <div className="text-[#f2e8d9]">
            <span className="text-gold">{PROMPT}</span>{' '}
            <span className="animate-blink -mb-0.5 inline-block h-[15px] w-[8px] bg-gold align-middle" />
          </div>
        )}
      </div>
    </div>
  )
}
