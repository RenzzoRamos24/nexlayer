import { Fragment } from 'react'
import './PricingCompare.css'

const planNames = ['Básico', 'Profesional', 'Empresarial', 'SaaS + IA']

const groups = [
  {
    title: 'Cobertura y soporte',
    rows: [
      ['Público objetivo',          'Oficinas 1–5 personas', 'PYMES 5–20 personas',   'Empresas 20+ personas', 'Empresas con automatización IA'],
      ['Equipos administrados',     'Hasta 5',           'Hasta 15',                  'Ilimitados',            'A medida'],
      ['Soporte técnico',           'L–V 9:00–18:00',    '24/7 con SLA priorizado',   '24/7 dedicado',         'Post-implementación'],
      ['Soporte 100% peruano',      true,                true,                        true,                    true],
      ['Ingeniero asignado',        false,               false,                       true,                    true],
      ['Tiempos de respuesta SLA',  '4 h',               '1 h',                       '15 min',                'Definidos en contrato'],
      ['Visita presencial',         '1 al mes',          'Bajo demanda',              'Incluida programada',   'Según proyecto']
    ]
  },
  {
    title: 'Monitoreo y operación',
    rows: [
      ['Monitoreo de red',          'Básico con alertas','Avanzado con alertas',      'Premium',               'Plataforma propia'],
      ['Antivirus gestionado',      true,                true,                        true,                    'A medida'],
      ['Backup',                    'Semanal en nube · 250 GB', 'Semanal de archivos críticos + recuperación', 'Diario + plan de recuperación a desastres', 'A medida'],
      ['Hardening de seguridad',    false,               'Básico',                    'Auditoría trimestral',  'Definido en proyecto'],
      ['Plan de continuidad',       false,               false,                       true,                    'A medida'],
      ['Mantenimiento mensual',     false,               false,                       true,                    'Post-implementación'],
      ['Reportes',                  'Mensual básico',    'Mensual con métricas',      'Ejecutivos',            'A medida']
    ]
  },
  {
    title: 'PaaS y desarrollo',
    rows: [
      ['Diagnóstico previo',        false,               false,                       false,                   true],
      ['Levantamiento de requerimientos', false,         false,                       false,                   true],
      ['Integración con IA',        false,               false,                       false,                   true],
      ['Integración con SUNAT',     false,               false,                       false,                   'Cuando aplique'],
      ['Desarrollo a medida',       false,               false,                       false,                   true]
    ]
  }
]

const Cell = ({ value }) => {
  if (value === true)  return <span className="cmp-mark cmp-yes" aria-label="Incluido">✓</span>
  if (value === false) return <span className="cmp-mark cmp-no"  aria-label="No incluido">✕</span>
  return <span className="cmp-text">{value}</span>
}

export default function PricingCompare() {
  return (
    <div className="cmp-wrap">
      <div className="cmp-scroll">
        <table className="cmp-table">
          <thead>
            <tr>
              <th className="cmp-head-feature">Característica</th>
              {planNames.map((n) => <th key={n}>{n}</th>)}
            </tr>
          </thead>
          <tbody>
            {groups.map((g) => (
              <Fragment key={g.title}>
                <tr className="cmp-group">
                  <th colSpan={planNames.length + 1}>{g.title}</th>
                </tr>
                {g.rows.map(([feature, ...vals]) => (
                  <tr key={feature}>
                    <th scope="row" className="cmp-feature">{feature}</th>
                    {vals.map((v, i) => (
                      <td key={i}><Cell value={v} /></td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <p className="cmp-note">
        Todos los planes incluyen onboarding, contrato claro y precios sin letra chica. Los proyectos
        SaaS + IA se cotizan según evaluación y complejidad.
      </p>
    </div>
  )
}
