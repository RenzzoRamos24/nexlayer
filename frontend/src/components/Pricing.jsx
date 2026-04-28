import useFadeIn from '../hooks/useFadeIn.js'
import SLATable from './SLATable.jsx'
import './Pricing.css'

const plans = [
  {
    name: 'Básico',
    price: 'S/. 550',
    period: '/mes',
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
    period: '/mes',
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
    price: 'S/. 2,500',
    period: '/mes',
    summary: 'Para empresas que no toleran caídas ni respuestas lentas.',
    features: [
      'Equipos ilimitados',
      'Soporte dedicado 24/7',
      'Ingeniero asignado',
      'Plan de continuidad operativa',
      'Auditoría de seguridad trimestral'
    ],
    cta: 'Hablar con ventas'
  },
  {
    name: 'Flotas',
    price: 'S/. 5,000',
    period: '/mes',
    summary: 'Gestión completa de flotas con GPS y panel en vivo.',
    accent: true,
    features: [
      'Hasta 30 trailers con GPS',
      'Panel de control en tiempo real',
      'Alertas de combustible y batería',
      'Reportes mensuales automáticos',
      'Integración con tu ERP'
    ],
    cta: 'Pedir demo'
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
              {p.accent   && <span className="pricing-badge pricing-badge-accent">Flotas</span>}

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
