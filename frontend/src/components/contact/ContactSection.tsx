import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { useMutation } from '@tanstack/react-query'
import api, { type ContactPayload } from '@/lib/api'

export function ContactSection() {
  const [form, setForm] = useState<ContactPayload>({ name: '', email: '', message: '' })
  const [success, setSuccess] = useState(false)

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: api.sendContact,
    onSuccess: () => {
      setSuccess(true)
      setForm({ name: '', email: '', message: '' })
    },
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSuccess(false)
    mutate(form)
  }

  const inputClass = `w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-sm text-text-primary
    placeholder:text-text-secondary focus:outline-none focus:border-accent-blue transition-colors`

  return (
    <section id="contato" className="py-24 bg-surface/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-accent-blue font-mono text-sm mb-2">// contato</p>
          <h2 className="section-title">Vamos conversar?</h2>
          <div className="section-divider" />
          <p className="text-text-secondary max-w-xl">
            Estou aberto a oportunidades, colaborações e projetos interessantes.
            Me envie uma mensagem — responderei em breve!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Contact form */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-4"
            noValidate
          >
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-text-secondary mb-1.5">
                Seu nome
              </label>
              <input
                id="contact-name"
                type="text"
                required
                placeholder="João Silva"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-text-secondary mb-1.5">
                E-mail
              </label>
              <input
                id="contact-email"
                type="email"
                required
                placeholder="joao@empresa.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-text-secondary mb-1.5">
                Mensagem
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                placeholder="Olá Jonathan, gostaria de conversar sobre..."
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Success message */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-accent-green text-sm bg-accent-green/10 border border-accent-green/20 rounded-lg px-4 py-3"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Mensagem enviada com sucesso! Retornarei em breve.
              </motion.div>
            )}

            {/* Error message */}
            {isError && (
              <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
                {error instanceof Error ? error.message : 'Erro ao enviar mensagem. Tente novamente.'}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              id="contact-submit"
            >
              {isPending ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Enviando...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  Enviar mensagem
                </>
              )}
            </button>
          </motion.form>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-text-primary font-semibold mb-6">Ou entre em contato diretamente</h3>

            <a
              href="mailto:jonathanads2006@gmail.com"
              className="flex items-center gap-4 p-4 glass-card hover:border-accent-blue/30 transition-colors group"
              id="contact-email-link"
            >
              <div className="w-10 h-10 rounded-lg bg-accent-blue/15 flex items-center justify-center text-accent-blue group-hover:bg-accent-blue/25 transition-colors shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-text-secondary">E-mail</p>
                <p className="text-text-primary text-sm font-medium truncate">jonathanads2006@gmail.com</p>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/jonathan-nascimento-8bb679227"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 glass-card hover:border-accent-blue/30 transition-colors group"
              id="contact-linkedin-link"
            >
              <div className="w-10 h-10 rounded-lg bg-accent-blue/15 flex items-center justify-center text-accent-blue group-hover:bg-accent-blue/25 transition-colors shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-text-secondary">LinkedIn</p>
                <p className="text-text-primary text-sm font-medium">jonathan-nascimento-8bb679227</p>
              </div>
            </a>

            <a
              href="https://github.com/JONATHAN-DEV-01"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 glass-card hover:border-accent-blue/30 transition-colors group"
              id="contact-github-link"
            >
              <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-text-secondary group-hover:text-accent-blue group-hover:bg-accent-blue/10 transition-colors shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33s1.7.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.02 10.02 0 0 0 22 12c0-5.52-4.48-10-10-10z"/>
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-text-secondary">GitHub</p>
                <p className="text-text-primary text-sm font-medium">JONATHAN-DEV-01</p>
              </div>
            </a>

            {/* Location */}
            <div className="flex items-center gap-3 pt-2 text-text-secondary text-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              São Paulo, SP — Brasil
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
