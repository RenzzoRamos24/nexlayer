import { useState } from 'react'
import useFadeIn from '../hooks/useFadeIn.js'
import SLATable from './SLATable.jsx'
import PricingCompare from './PricingCompare.jsx'
import './Pricing.css'

const plans = [
  {
    name: 'Básico',
    price: 'Desde S/. 550',
    period: 'por mes',
    audience: 'Pequeñas oficinas (1–5 personas), profesionales independientes y startups.',
    summary: 'Para equipos pequeños que recién montan su operación TI.',
    features: [
      'Hasta 5 equipos administrados',
      'Soporte remoto L–V 9:00–18:00',
      'Backup semanal en nube (250 GB)',
      'Monitoreo básico con alertas',
      'Antivirus gestionado incluido',
      '1 visita presencial al mes',
      'Reporte mensual básico',
      'SLA 4 h en horario laboral'
    ],
    cta: 'Empezar'
  },
  {
    name: 'Profesional',
    price: 'Desde S/. 1,200',
    period: 'por mes',
    audience: 'PYMES en crecimiento (5–20 personas) y comercios con varios puntos.',
    summary: 'Lo más elegido por PYMEs con varias áreas operativas.',
    featured: true,
    features: [
      'Hasta 15 equipos administrados',
      'Soporte 24/7 con SLA priorizado',
      'Monitoreo avanzado y alertas',
      'Backup semanal de archivos críticos + recuperación',
      'Hardening de seguridad básico'
    ],
    cta: 'Quiero este plan'
  },
  {
    name: 'Empresarial',
    price: 'Desde S/. 2,800',
    period: 'por mes',
    audience: 'Empresas establecidas (20+ personas) e industrias críticas (salud, finanzas).',
    summary: 'Para empresas que no toleran caídas ni respuestas lentas.',
    features: [
      'Equipos ilimitados',
      'SLA priorizado con tiempos garantizados',
      'Backup diario con plan de recuperación a desastres',
      'Plan de continuidad operativa',
      'Mantenimiento mensual programado',
      'Ingeniero asignado y reportes ejecutivos'
    ],
    cta: 'Hablar con ventas'
  },
  {
    name: 'SaaS + IA',
    price: 'Cotización a medida',
    period: 'según evaluación y complejidad',
    audience: 'Empresas que buscan automatizar procesos específicos con IA.',
    summary: 'Implementación de plataformas con IA según los requerimientos de tu rubro.',
    accent: true,
    features: [
      'Diagnóstico y levantamiento de requerimientos',
      'Integración con IA aplicada al rubro',
      'Integración con SUNAT (cuando aplique)',
      'Desarrollo a medida del cliente',
      'Soporte 100% peruano post-implementación'
    ],
    cta: 'Cotizar'
  }
]

const guarantees = [
  { title: 'Garantía 30 días',           text: 'Si no estás conforme el primer mes, te devolvemos lo invertido.' },
  { title: 'Sin permanencia inicial',    text: 'Los primeros 30 días puedes cancelar sin penalidad.' },
  { title: 'SLA cumplido al 100%',       text: 'Si fallamos al SLA, tu siguiente mes lleva 20% de descuento.' }
]

export default function Pricing() {
  const ref = useFadeIn()
  const [showCompare, setShowCompare] = useState(false)

  return (
    <section id="precios" ref={ref}>
      <div className="container">
        <div className="pricing-head">
          <span className="section-eyebrow fade-up">Precios</span>
          <h2 className="section-title fade-up">Planes claros. Sin letra chica.</h2>
          <p className="section-subtitle fade-up">
            Elige el plan que se ajuste a tu operación. Cambia, escala o cancela cuando lo necesites.
          </p>
        </div>

        <div className="pricing-grid">
          {plans.map((p) => (
            <article
              key={p.name}
              className={`pricing-card fade-up ${p.featured ? 'is-featured' : ''} ${p.accent ? 'is-accent' : ''}`}
            >
              {p.featured && <span className="pricing-badge">⭐ Más elegido</span>}
              {p.accent   && <span className="pricing-badge pricing-badge-accent">A medida</span>}

              <h3 className="pricing-name">{p.name}</h3>
              {p.audience && <p className="pricing-audience">{p.audience}</p>}
              <p className="pricing-summary">{p.summary}</p>

              <div className="pricing-price">
                <span className="pricing-price-amount">{p.price}</span>
                <span className="pricing-price-period">{p.period}</span>
              </div>

              <ul className="pricing-features">
                {p.features.map((f) => (
                  <li key={f}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contacto"
                className={`btn ${p.featured ? 'btn-primary' : p.accent ? 'btn-accent' : 'btn-ghost'} pricing-cta`}
              >
                {p.cta}
              </a>
            </article>
          ))}
        </div>

        <div className="pricing-guarantees fade-up">
          <span className="pricing-guarantees-label">Garantías que aplican a todos los planes</span>
          <div className="pricing-guarantees-grid">
            {guarantees.map((g) => (
              <div key={g.title} className="pricing-guarantee">
                <span className="pricing-guarantee-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                <div>
                  <strong>{g.title}</strong>
                  <span>{g.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pricing-compare-toggle fade-up">
          <button
            type="button"
            className="btn btn-ghost"
            aria-expanded={showCompare}
            aria-controls="pricing-compare-panel"
            onClick={() => setShowCompare((v) => !v)}
          >
            {showCompare ? 'Ocultar comparativa' : 'Ver comparativa detallada'}
            <svg
              width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ transform: showCompare ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>

        {showCompare && (
          <div id="pricing-compare-panel" className="fade-up is-visible">
            <PricingCompare />
          </div>
        )}

        <div className="fade-up">
          <SLATable />
        </div>
      </div>
    </section>
  )
}
