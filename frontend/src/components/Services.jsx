import useFadeIn from '../hooks/useFadeIn.js'
import './Services.css'

const services = [
  {
    code: '01',
    title: 'Mantenimiento y soporte técnico',
    description: 'Mesa de ayuda con respuesta priorizada por SLA. Resolvemos incidencias críticas en minutos, no en días.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a4 4 0 0 1-4 4h-2l-4 3v-3H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8z" />
      </svg>
    )
  },
  {
    code: '02',
    title: 'Administración de servidores',
    description: 'Despliegue, monitoreo y administración de servidores físicos y en la nube. Alta disponibilidad y seguridad reforzada.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="6" rx="2" /><rect x="3" y="14" width="18" height="6" rx="2" />
        <path d="M7 7h.01M7 17h.01" />
      </svg>
    )
  },
  {
    code: '03',
    title: 'Backup y recuperación de datos',
    description: 'Copias frías y calientes, replicación remota y planes de recuperación probados. Tus datos siempre vuelven.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v6c0 1.7 4 3 9 3s9-1.3 9-3V5" /><path d="M3 11v6c0 1.7 4 3 9 3s9-1.3 9-3v-6" />
      </svg>
    )
  },
  {
    code: '04',
    title: 'Automatización de procesos',
    description: 'Scripts, integraciones, RPA e IA aplicada. Eliminamos tareas repetitivas y conectamos tus sistemas internos.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    )
  },
  {
    code: '05',
    title: 'Ciberseguridad',
    description: 'Hardening, firewalls, políticas de acceso y monitoreo. Protegemos lo que mueve a tu empresa.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" /><path d="M9 12l2 2 4-4" />
      </svg>
    )
  },
  {
    code: '06',
    title: 'Plataformas a medida',
    description: 'PaaS y paneles operativos para tu rubro: integramos sistemas, datos y flujos en una sola capa.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="8" rx="1.5" />
        <rect x="3" y="13" width="8" height="8" rx="1.5" /><rect x="13" y="13" width="8" height="8" rx="1.5" />
      </svg>
    )
  }
]

export default function Services() {
  const ref = useFadeIn()

  return (
    <section id="servicios" ref={ref}>
      <div className="container">
        <div className="services-head">
          <span className="section-eyebrow fade-up">Servicios · Infraestructura modular</span>
          <h2 className="section-title fade-up">Cada capa de tecnología que tu empresa necesita.</h2>
          <p className="section-subtitle fade-up">
            Operamos cada capa — soporte, servidores, datos, automatización y seguridad —
            con estándares modernos y un equipo humano experto en Lima.
          </p>
        </div>

        <div className="services-grid">
          {services.map((s) => (
            <article key={s.code} className="service-card fade-up">
              <div className="service-card-line" />
              <div className="service-card-head">
                <span className="service-icon">{s.icon}</span>
                <span className="service-code">{s.code}</span>
              </div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.description}</p>
              <span className="service-arrow" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
