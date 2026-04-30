import useFadeIn from '../hooks/useFadeIn.js'
import SLATable from './SLATable.jsx'
import './Pricing.css'

const plans = [
  {
    name: 'Básico',
    price: 'S/. 550',
    period: 'por mes',
    summary: 'Para equipos pequeños que recién montan su operación TI.',
    features: [
      'Hasta 5 equipos administrados',
      'Soporte remoto en horario laboral',
      'Monitoreo básico de red',
      'Backup semanal en la nube'
    ],
    cta: 'Empezar'
  },
  {
    name: 'Profesional',
    price: 'S/. 1,200',
    period: 'por mes',
    summary: 'Lo más elegido por PYMEs con varias áreas operativas.',
    featured: true,
    features: [
      'Hasta 15 equipos administrados',
      'Soporte 24/7 con SLA priorizado',
      'Monitoreo avanzado y alertas',
      'Backup diario + recuperación',
      'Hardening de seguridad básico'
    ],
    cta: 'Quiero este plan'
  },
  {
    name: 'Empresarial',
    price: 'S/. 3,800',
    period: 'por mes',
    summary: 'Para empresas que no toleran caídas ni respuestas lentas.',
    features: [
      'Equipos ilimitados',
      'SLA priorizado con tiempos garantizados',
      'Plan de continuidad operativa',
      'Mantenimiento mensual programado',
      'Ingeniero asignado y reportes ejecutivos'
    ],
    cta: 'Hablar con ventas'
  },
  {
    name: 'SaaS + IA',
    price: 'Desde S/. 5,000',
    period: 'según evaluación y complejidad',
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

export default function Pricing() {
  const ref = useFadeIn()

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
              {p.featured && <span className="pricing-badge">Más elegido</span>}
              {p.accent   && <span className="pricing-badge pricing-badge-accent">A medida</span>}

              <h3 className="pricing-name">{p.name}</h3>
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

        <div className="fade-up">
          <SLATable />
        </div>
      </div>
    </section>
  )
}
