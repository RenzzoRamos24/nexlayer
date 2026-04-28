import { useEffect, useState } from 'react'
import useFadeIn from '../hooks/useFadeIn.js'
import { apiUrl } from '../lib/api.js'
import './FleetDemo.css'

const STATUS_LABEL = {
  moving: 'En ruta',
  idle: 'Detenido',
  loading: 'Cargando',
  alert: 'Alerta'
}

const FALLBACK = [
  { id: 'TR-104', driver: 'A. Quispe',  route: 'Lima → Trujillo',   speed: 88, status: 'moving',  battery: 92 },
  { id: 'TR-211', driver: 'M. Salas',   route: 'Callao → Arequipa', speed: 0,  status: 'loading', battery: 78 },
  { id: 'TR-318', driver: 'J. Ramos',   route: 'Cusco → Puno',      speed: 64, status: 'moving',  battery: 84 },
  { id: 'TR-402', driver: 'L. Cárdenas',route: 'Lima → Chiclayo',   speed: 0,  status: 'idle',    battery: 45 },
  { id: 'TR-507', driver: 'D. Flores',  route: 'Piura → Sullana',   speed: 12, status: 'alert',   battery: 22 }
]

export default function FleetDemo() {
  const ref = useFadeIn()
  const [trailers, setTrailers] = useState(FALLBACK)
  const [updatedAt, setUpdatedAt] = useState(new Date())
  const [pulse, setPulse] = useState(0)

  useEffect(() => {
    let mounted = true

    const fetchData = async () => {
      try {
        const res = await fetch(apiUrl('/api/fleet/demo'))
        if (!res.ok) throw new Error('bad response')
        const data = await res.json()
        if (mounted && Array.isArray(data?.trailers)) {
          setTrailers(data.trailers)
          setUpdatedAt(new Date())
          setPulse((p) => p + 1)
        }
      } catch {
        if (mounted) {
          setTrailers((prev) => prev.map((t) => simulate(t)))
          setUpdatedAt(new Date())
          setPulse((p) => p + 1)
        }
      }
    }

    fetchData()
    const id = setInterval(fetchData, 3000)
    return () => { mounted = false; clearInterval(id) }
  }, [])

  return (
    <section id="flotas" ref={ref}>
      <div className="container">
        <div className="fleet-grid">
          <div className="fleet-copy">
            <span className="section-eyebrow fade-up">Gestión de flotas</span>
            <h2 className="section-title fade-up">Tu flota visible en tiempo real, no en hojas de cálculo.</h2>
            <p className="section-subtitle fade-up">
              Hasta 30 trailers monitoreados con GPS, telemetría de combustible y alertas
              automáticas. Sabes dónde está cada unidad — y por qué se detuvo.
            </p>

            <ul className="fleet-bullets fade-up">
              <li><span className="bullet-check" /> Ubicación y velocidad en vivo</li>
              <li><span className="bullet-check" /> Alertas de batería y combustible</li>
              <li><span className="bullet-check" /> Reportes mensuales automáticos</li>
              <li><span className="bullet-check" /> Integración con tu ERP</li>
            </ul>

            <div className="fleet-cta fade-up">
              <a href="#precios" className="btn btn-primary">Ver plan Flotas</a>
              <a href="#contacto" className="btn btn-ghost">Pedir demo</a>
            </div>
          </div>

          <div className="fleet-panel fade-up">
            <div className="fleet-panel-head">
              <div>
                <span className="fleet-panel-label">Live · Panel de control</span>
                <h3 className="fleet-panel-title">Flota Nexlayer</h3>
              </div>
              <div className="fleet-panel-meta">
                <span className="dot-pulse" key={pulse} />
                <span className="fleet-panel-time">
                  {updatedAt.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
            </div>

            <div className="fleet-panel-summary">
              <div>
                <div className="summary-label">Activos</div>
                <div className="summary-value">{trailers.filter((t) => t.status === 'moving').length}</div>
              </div>
              <div>
                <div className="summary-label">Detenidos</div>
                <div className="summary-value">{trailers.filter((t) => t.status === 'idle' || t.status === 'loading').length}</div>
              </div>
              <div>
                <div className="summary-label">Alertas</div>
                <div className="summary-value summary-alert">{trailers.filter((t) => t.status === 'alert').length}</div>
              </div>
            </div>

            <div className="fleet-list">
              {trailers.map((t) => (
                <div key={t.id} className={`fleet-row status-${t.status}`}>
                  <div className="fleet-row-id">
                    <span className="fleet-row-dot" />
                    <div>
                      <div className="fleet-row-code">{t.id}</div>
                      <div className="fleet-row-driver">{t.driver}</div>
                    </div>
                  </div>
                  <div className="fleet-row-route">{t.route}</div>
                  <div className="fleet-row-stats">
                    <span className="fleet-stat">
                      <span className="fleet-stat-num">{t.speed}</span>
                      <span className="fleet-stat-unit">km/h</span>
                    </span>
                    <span className={`fleet-bat ${t.battery < 30 ? 'low' : ''}`}>
                      <span className="bat-fill" style={{ width: `${t.battery}%` }} />
                      <span className="bat-text">{t.battery}%</span>
                    </span>
                    <span className={`fleet-status status-pill-${t.status}`}>{STATUS_LABEL[t.status]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function simulate(t) {
  const variants = {
    moving: () => {
      const next = { ...t, speed: clamp(t.speed + rand(-12, 12), 30, 110), battery: clamp(t.battery - 1, 0, 100) }
      if (next.battery < 25) next.status = 'alert'
      return next
    },
    idle:   () => Math.random() > 0.7 ? { ...t, status: 'moving', speed: rand(35, 70) } : t,
    loading:() => Math.random() > 0.6 ? { ...t, status: 'moving', speed: rand(30, 50) } : t,
    alert:  () => ({ ...t, speed: clamp(t.speed + rand(-5, 3), 0, 60) })
  }
  return (variants[t.status] || ((x) => x))(t)
}

function rand(min, max) { return Math.round(min + Math.random() * (max - min)) }
function clamp(n, min, max) { return Math.max(min, Math.min(max, n)) }
