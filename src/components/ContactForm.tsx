import { useEffect, useRef, useState } from 'react'
import { CheckCircle2, Loader2, Send, TriangleAlert } from 'lucide-react'

// FormSubmit delivers submissions to this inbox — no backend, no account.
// The first submission triggers a one-time activation email from formsubmit.co.
const ENDPOINT = 'https://formsubmit.co/ajax/abdullah130306@gmail.com'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const inputClass =
  'w-full rounded-xl border border-line-soft bg-card px-4 py-3 text-[15px] text-text placeholder:text-dim/60 transition-colors outline-none focus:border-gold'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const request = useRef<AbortController | null>(null)
  useEffect(() => () => request.current?.abort(), [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (request.current) return
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    for (const name of ['name', 'email', 'message']) {
      data[name] = String(data[name] ?? '').trim()
      if (!data[name]) {
        const input = form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement
        input.setCustomValidity('Please enter more than spaces.')
        input.reportValidity()
        return
      }
    }
    const controller = new AbortController()
    request.current = controller
    const timeout = window.setTimeout(() => controller.abort(), 15_000)
    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        signal: controller.signal,
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...data,
          _subject: 'New message from your portfolio',
          _captcha: 'false',
          _template: 'table',
        }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const result: unknown = await res.json()
      if (!result || typeof result !== 'object' || !('success' in result)
        || (result.success !== true && result.success !== 'true')) {
        throw new Error('The provider did not confirm acceptance')
      }
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    } finally {
      window.clearTimeout(timeout)
      request.current = null
    }
  }

  return (
    <form onSubmit={handleSubmit} aria-busy={status === 'sending'} className="flex flex-col gap-3"
      onInput={event => {
        if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
          event.target.setCustomValidity('')
        }
        if (status !== 'sending') setStatus('idle')
      }}>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm text-text">Your name
          <input name="name" type="text" required autoComplete="name" maxLength={100}
            readOnly={status === 'sending'} className={inputClass} />
        </label>
        <label className="grid gap-1.5 text-sm text-text">Your email
          <input name="email" type="email" required autoComplete="email" maxLength={254}
            readOnly={status === 'sending'} className={inputClass} />
        </label>
      </div>
      <label className="grid gap-1.5 text-sm text-text">Message
      <textarea
        name="message"
        required
        rows={4}
        placeholder="What would you like to build together?"
        maxLength={5000}
        readOnly={status === 'sending'}
        className={`${inputClass} resize-y`}
      />
      </label>
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
          <p role="alert" className="text-sm text-text">
            <TriangleAlert size={16} className="mr-1.5 inline text-gold" aria-hidden="true" />
            Submission could not be confirmed. Your message is still here. Try again or{' '}
            <a href="mailto:abdullah130306@gmail.com" className="text-gold underline">email me directly</a>.
          </p>
        )}
      </div>
      {status === 'sent' && (
        <p role="status" className="flex items-center gap-2 rounded-xl border border-line bg-card p-4 text-sm text-text">
          <CheckCircle2 size={20} className="shrink-0 text-gold" aria-hidden="true" />
          Message accepted by the email service — thanks for reaching out!
        </p>
      )}
    </form>
  )
}
