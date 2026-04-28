import './SLATable.css'

const sla = [
  { priority: 'Crítico', tone: 'critical', desc: 'Servidor caído, red sin servicio',  response: '15 min', resolution: '60 min' },
  { priority: 'Alto',    tone: 'high',     desc: 'PC no enciende, no hay correo',    response: '30 min', resolution: '2 h' },
  { priority: 'Medio',   tone: 'medium',   desc: 'Excel lento, impresora intermitente', response: '1 h', resolution: '4 h' },
  { priority: 'Bajo',    tone: 'low',      desc: 'Consulta general, mejora menor',   response: '4 h',  resolution: '24 h' }
]

export default function SLATable() {
  return (
    <div className="sla-card">
      <div className="sla-card-head">
        <span className="section-eyebrow" style={{ marginBottom: 0 }}>SLA por prioridad</span>
        <span className="sla-card-note">Aplica a todos los planes</span>
      </div>

      <div className="sla-table" role="table">
        <div className="sla-row sla-head" role="row">
          <div role="columnheader">Prioridad</div>
          <div role="columnheader">Ejemplo</div>
          <div role="columnheader">Respuesta</div>
          <div role="columnheader">Resolución</div>
        </div>
        {sla.map((s) => (
          <div key={s.priority} className="sla-row" role="row">
            <div role="cell">
              <span className={`sla-pill sla-${s.tone}`}>{s.priority}</span>
            </div>
            <div role="cell" className="sla-desc">{s.desc}</div>
            <div role="cell" className="sla-time">{s.response}</div>
            <div role="cell" className="sla-time">{s.resolution}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
