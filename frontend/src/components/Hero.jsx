import './Hero.css'

const stats = [
  { value: '99.9%', label: 'Uptime objetivo' },
  { value: '5+',    label: 'Años de experiencia' },
  { value: '15min', label: 'Respuesta crítica' },
  { value: '24/7',  label: 'Soporte peruano' }
]

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />

      <div className="container hero-inner">
        <span className="tag hero-tag fade-up is-visible">
          <span className="dot-pulse" />
          Nuevo · Plataformas con IA integrada
        </span>

        <h1 className="hero-title fade-up is-visible">
          Plataformas a medida con <span className="text-accent">automatización e IA</span> para tu operación.
        </h1>

        <p className="hero-subtitle fade-up is-visible">
          Construimos PaaS para cualquier rubro: integramos IA, automatizamos procesos
          y conectamos tus sistemas. Diagnóstico previo, despliegue rápido y soporte 100% peruano.
        </p>

        <div className="hero-actions fade-up is-visible">
          <a href="#contacto" className="btn btn-primary">
            Consulta gratis
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#servicios" className="btn btn-ghost">Explorar servicios</a>
        </div>

        <div className="hero-stats fade-up is-visible">
          {stats.map((s) => (
            <div key={s.label} className="hero-stat">
              <div className="hero-stat-value">{s.value}</div>
              <div className="hero-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
