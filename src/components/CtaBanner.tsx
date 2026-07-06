import { ArrowRight } from 'lucide-react'
import { Reveal } from './Reveal'

/** Always dark, in both themes — hardcoded navy/gold like the original. */
export function CtaBanner() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-12 md:px-8 lg:px-12">
      <Reveal>
        <div className="relative overflow-hidden rounded-[20px] border border-[rgba(242,202,80,0.20)] bg-gradient-to-br from-[#0e0804] to-[#241708] px-6 py-11 text-center md:rounded-[28px] md:px-14 md:py-[72px]">
          <div className="pointer-events-none absolute -top-25 -right-20 h-80 w-80 rounded-full bg-[radial-gradient(circle,#f2ca50_0%,transparent_70%)] opacity-[0.14] blur-[30px]" />
          <h2 className="mx-auto mb-4.5 max-w-[720px] text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.15] text-white">
            Let's build something data-driven together.
          </h2>
          <p className="mx-auto mb-8 max-w-[560px] text-[17px] text-[#c9b99b]">
            I'm actively seeking internship opportunities in Data Analytics, BI, or AI. Let's turn
            your data into a real advantage.
          </p>
          <a
            href="mailto:abdullah130306@gmail.com"
            className="inline-flex items-center gap-2 rounded-xl bg-[#f2ca50] px-[22px] py-[13px] text-sm font-bold text-[#0e0804] transition-all hover:-translate-y-0.5 hover:bg-[#d4af37] hover:shadow-[0_12px_28px_rgba(242,202,80,0.25)]"
          >
            Start a conversation <ArrowRight size={18} />
          </a>
        </div>
      </Reveal>
    </div>
  )
}
