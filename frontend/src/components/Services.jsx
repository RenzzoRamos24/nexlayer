import useFadeIn from '../hooks/useFadeIn.js'
import './Services.css'

const services = [
  {
    code: '01',
    title: 'Servidores y Cloud',
    description: 'Despliegue, monitoreo y respaldo de servidores físicos y nube. Alta disponibilidad y seguridad reforzada.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="6" rx="2" /><rect x="3" y="14" width="18" height="6" rx="2" />
        <path d="M7 7h.01M7 17h.01" />
      </svg>
    )
  },
  {
    code: '02',
    title: 'Redes empresariales',
    description: 'Diseño y mantenimiento de redes LAN/WAN, WiFi corporativo y enlaces dedicados con segmentación segura.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M3 12h3M18 12h3M12 3v3M12 18v3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
      </svg>
    )
  },
  {
    code: '03',
    title: 'Soporte técnico 24/7',
    description: 'Mesa de ayuda con respuesta priorizada por SLA. Resolvemos incidencias críticas en minutos, no en días.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a4 4 0 0 1-4 4h-2l-4 3v-3H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8z" />
      </svg>
    )
  },
  {
    code: '04',
    title: 'Plataformas para transportes',
    description: 'Diseñamos PaaS a medida para empresas de transporte y logística: paneles operativos, integraciones y automatización.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 16V6h11v10M14 8h4l3 4v4h-7" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" />
      </svg>
    )
  },
  {
    code: '05',
    title: 'Ciberseguridad',
    description: 'Hardening, firewalls, copias frías y políticas de acceso. Protegemos lo que mueve a tu empresa.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" /><path d="M9 12l2 2 4-4" />
      </svg>
    )
  },
  {
    code: '06',
    title: 'Automatización IT',
    description: 'Scripts, integraciones y RPA. Eliminamos tareas repetitivas y conectamos tus sistemas internos.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
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
          <span className="section-eyebrow fade-up">Servicios</span>
          <h2 className="section-title fade-up">Capas de tecnología que tu empresa necesita.</h2>
          <p className="section-subtitle fade-up">
            Desde la red interna hasta la flota en ruta — operamos cada capa con
            estándares modernos, automatización y soporte humano experto.
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
