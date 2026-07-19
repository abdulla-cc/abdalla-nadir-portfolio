import { useState } from 'react'
import { CheckCircle2, Loader2, Send, TriangleAlert } from 'lucide-react'

// FormSubmit delivers submissions to this inbox — no backend, no account.
// The first submission triggers a one-time activation email from formsubmit.co.
const ENDPOINT = 'https://formsubmit.co/ajax/abdullah130306@gmail.com'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const inputClass =
  'w-full rounded-xl border border-line-soft bg-card px-4 py-3 text-[15px] text-text placeholder:text-dim/60 transition-colors outline-none focus:border-gold'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...data,
          _subject: 'New message from your portfolio',
          _captcha: 'false',
          _template: 'table',
        }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="flex items-center gap-3 rounded-[14px] border border-line bg-card px-5 py-6">
        <CheckCircle2 size={24} className="shrink-0 text-gold" />
        <p className="text-[15px] text-text">
          Message sent — thanks for reaching out! I'll get back to you soon.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="name" type="text" required placeholder="Your name" aria-label="Your name" className={inputClass} />
        <input name="email" type="email" required placeholder="Your email" aria-label="Your email" className={inputClass} />
      </div>
      <textarea
        name="message"
        required
        rows={4}
        placeholder="What would you like to build together?"
        aria-label="Message"
        className={`${inputClass} resize-y`}
      />
      {/* honeypot for bots */}
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gold px-[22px] py-[13px] text-sm font-bold text-on-gold transition-all hover:-translate-y-0.5 hover:bg-gold-2 hover:shadow-[0_12px_28px_rgba(242,202,80,0.25)] disabled:cursor-wait disabled:opacity-70"
        >
          {status === 'sending' ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Sending…
            </>
          ) : (
            <>
              <Send size={18} /> Send message
            </>
          )}
        </button>
        {status === 'error' && (
          <p className="inline-flex items-center gap-1.5 text-sm text-dim">
            <TriangleAlert size={16} className="text-gold" />
            Something went wrong — try again or email me directly.
          </p>
        )}
      </div>
    </form>
  )
}
