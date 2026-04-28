import useFadeIn from '../hooks/useFadeIn.js'
import './About.css'

const metrics = [
  { value: '6+',     label: 'Años de operación' },
  { value: '120+',   label: 'Clientes activos' },
  { value: '850+',   label: 'Tickets resueltos / mes' },
  { value: '99.9%',  label: 'Uptime promedio' }
]

const pillars = [
  {
    title: 'Respuesta humana, no bots',
    text: 'Cada ticket lo recibe un técnico real. SLA medible, escalado claro y sin tener que repetir el problema tres veces.'
  },
  {
    title: 'Infraestructura como producto',
    text: 'Tratamos tu red, servidores y flotas como un producto vivo: monitoreado, versionado y mejorado iteración a iteración.'
  },
  {
    title: 'Transparencia en cada paso',
    text: 'Reportes mensuales, dashboards en vivo y precios claros. Sabes qué pagas, qué obtienes y dónde está cada equipo.'
  }
]

export default function About() {
  const ref = useFadeIn()

  return (
    <section id="nosotros" ref={ref}>
      <div className="container">
        <div className="about-grid">
          <div>
            <span className="section-eyebrow fade-up">Nosotros</span>
            <h2 className="section-title fade-up">Una capa de tecnología confiable, diseñada para crecer contigo.</h2>
            <p className="section-subtitle fade-up">
              Nacimos resolviendo problemas de TI en empresas medianas del Perú.
              Hoy operamos infraestructura, redes y flotas para clientes que no pueden permitirse caídas.
            </p>

            <div className="about-metrics fade-up">
              {metrics.map((m) => (
                <div key={m.label} className="about-metric">
                  <div className="about-metric-value">{m.value}</div>
                  <div className="about-metric-label">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-pillars">
            {pillars.map((p, i) => (
              <article key={p.title} className="about-pillar fade-up">
                <span className="about-pillar-num">0{i + 1}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
