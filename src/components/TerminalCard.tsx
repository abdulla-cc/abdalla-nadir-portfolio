import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useReducedMotion } from '../lib/useReducedMotion'
import { profileStats } from '../data/profile'

interface TermLine {
  cmd: string
  out: string[]
}

const LINES: TermLine[] = [
  { cmd: 'whoami', out: ['Abdalla Nadir — AI, software & data builder'] },
  {
    cmd: 'cat status.txt',
    out: [
      `🎓 B.CS (AI) @ MMU · GPA ${profileStats.cgpa} · Dean’s List`,
      '📍 Melaka, Malaysia',
      '🟡 open to graduate software & AI roles',
    ],
  },
  { cmd: 'ls skills/', out: ['python/  react/  fastapi/  sql/', 'machine-learning/  power-bi/  docker/'] },
  { cmd: 'echo $CURRENTLY_LEARNING', out: ['full-stack systems · applied ml · ai engineering'] },
]

const PROMPT = 'abdalla@portfolio:~$'

/** Animated terminal window that types out the profile — replaces the duplicate About photo. */
export function TerminalCard() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-80px' })
  const reducedMotion = useReducedMotion()
  const [done, setDone] = useState(0) // fully completed lines
  const [typed, setTyped] = useState(0) // chars typed of the current command

  useEffect(() => {
    if (!inView || reducedMotion) return
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
  }, [inView, done, typed, reducedMotion])

  const visibleLines = reducedMotion ? LINES.length : done
  const finished = visibleLines >= LINES.length

  return (
    <div
      ref={ref}
      className="flex min-h-[400px] w-full flex-col overflow-hidden rounded-[20px] border border-line bg-[#100a05] shadow-theme"
    >
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-line-soft bg-[#181008] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#f2ca50]" />
        <span className="h-3 w-3 rounded-full bg-[#d4af37] opacity-70" />
        <span className="h-3 w-3 rounded-full bg-[#b3a183] opacity-50" />
        <span className="ml-2 font-mono text-xs text-[#b3a183]">abdalla@portfolio: ~</span>
      </div>

      {/* Expose complete content once, instead of partial typewriter updates. */}
      <div className="sr-only">
        {LINES.map(line => <p key={line.cmd}>{line.out.join(' ')}</p>)}
      </div>

      {/* Keep completed text in normal flow so narrow screens never clip it. */}
      <div aria-hidden="true" className="flex-1 break-words p-5 pb-10 font-mono text-[12.5px] leading-[1.75] sm:text-[13px]">
        {LINES.map((line, index) => (
          <div key={line.cmd} className="mb-2.5">
            <div className="relative text-[#f2e8d9]">
              <div style={{ visibility: index < visibleLines ? 'visible' : 'hidden' }}>
              <span className="text-[#f2ca50]">{PROMPT}</span> {line.cmd}
              </div>
              {index === visibleLines && (
                <div className="absolute inset-0">
                  <span className="text-[#f2ca50]">{PROMPT}</span> {line.cmd.slice(0, typed)}
                  <span className="animate-blink -mb-0.5 inline-block h-[15px] w-[8px] bg-[#f2ca50] align-middle" />
                </div>
              )}
            </div>
            {line.out.map(o => (
              <div key={o} className="text-[#b3a183]" style={{ visibility: index < visibleLines ? 'visible' : 'hidden' }}>{o}</div>
            ))}
          </div>
        ))}

          <div className="text-[#f2e8d9]" style={{ visibility: finished ? 'visible' : 'hidden' }}>
            <span className="text-[#f2ca50]">{PROMPT}</span>{' '}
            <span className="animate-blink -mb-0.5 inline-block h-[15px] w-[8px] bg-[#f2ca50] align-middle" />
          </div>
      </div>
    </div>
  )
}
