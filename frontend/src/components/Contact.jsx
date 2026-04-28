import { useState } from 'react'
import useFadeIn from '../hooks/useFadeIn.js'
import { apiUrl } from '../lib/api.js'
import './Contact.css'

const initialForm = { company: '', email: '', phone: '', message: '' }

export default function Contact() {
  const ref = useFadeIn()
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus({ state: 'loading', message: 'Enviando...' })
    try {
      const res = await fetch(apiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.detail || 'Error al enviar el formulario')
      setStatus({ state: 'success', message: '¡Gracias! Te contactaremos en menos de 24h.' })
      setForm(initialForm)
    } catch (err) {
      setStatus({ state: 'error', message: err.message || 'Algo salió mal. Intenta de nuevo.' })
    }
  }

  return (
    <section id="contacto" ref={ref}>
      <div className="container">
        <div className="contact-card fade-up">
          <div className="contact-info">
            <span className="section-eyebrow" style={{ color: 'var(--color-accent)' }}>Contacto</span>
            <h2 className="section-title">Hablemos de tu operación.</h2>
            <p className="section-subtitle" style={{ marginBottom: 32 }}>
              Diagnóstico inicial gratuito. Te respondemos en menos de 24 horas
              con una propuesta concreta.
            </p>

            <ul className="contact-list">
              <li>
                <span className="contact-list-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92V21a1 1 0 0 1-1.11 1A19.86 19.86 0 0 1 2 4.11 1 1 0 0 1 3 3h4.09a1 1 0 0 1 1 .75c.13.94.37 1.86.72 2.74a1 1 0 0 1-.23 1L8 9a16 16 0 0 0 7 7l1.5-1.58a1 1 0 0 1 1-.23c.88.35 1.8.59 2.74.72a1 1 0 0 1 .76 1z" />
                  </svg>
                </span>
                <div>
                  <div className="contact-list-label">Teléfono</div>
                  <a href="tel:+51966111242" className="contact-list-value">+51 966 111 242</a>
                </div>
              </li>
              <li>
                <span className="contact-list-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="4" />
                    <path d="M7 10v8M7 7v.01M11 18v-5a3 3 0 0 1 6 0v5M11 13v5" />
                  </svg>
                </span>
                <div>
                  <div className="contact-list-label">LinkedIn</div>
                  <a
                    href="https://linkedin.com/in/renzo-gutiérrez"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-list-value"
                  >
                    linkedin.com/in/renzo-gutiérrez
                  </a>
                </div>
              </li>
              <li>
                <span className="contact-list-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <div>
                  <div className="contact-list-label">Ciudad</div>
                  <span className="contact-list-value">Lima, Perú</span>
                </div>
              </li>
            </ul>
          </div>

          <form className="contact-form" onSubmit={onSubmit} noValidate>
            <div className="form-row">
              <label>
                <span>Empresa</span>
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={onChange}
                  placeholder="Logística Andina S.A.C."
                  required
                />
              </label>
            </div>

            <div className="form-row form-row-split">
              <label>
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="tu@empresa.com"
                  required
                />
              </label>
              <label>
                <span>Teléfono</span>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  placeholder="+51 999 999 999"
                  required
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                <span>Cuéntanos brevemente</span>
                <textarea
                  name="message"
                  rows="3"
                  value={form.message}
                  onChange={onChange}
                  placeholder="¿Qué te gustaría resolver?"
                />
              </label>
            </div>

            <button type="submit" className="btn btn-accent contact-submit" disabled={status.state === 'loading'}>
              {status.state === 'loading' ? 'Enviando...' : 'Quiero mi consulta gratis'}
              {status.state !== 'loading' && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              )}
            </button>

            {status.state === 'success' && <div className="form-feedback ok">{status.message}</div>}
            {status.state === 'error'   && <div className="form-feedback err">{status.message}</div>}
          </form>
        </div>
      </div>
    </section>
  )
}
