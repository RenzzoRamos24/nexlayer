import './Footer.css'

const cols = [
  {
    title: 'Producto',
    links: [
      { href: '#servicios', label: 'Servicios' },
      { href: '#flotas',    label: 'Flotas' },
      { href: '#precios',   label: 'Precios' }
    ]
  },
  {
    title: 'Empresa',
    links: [
      { href: '#nosotros',  label: 'Nosotros' },
      { href: '#contacto',  label: 'Contacto' }
    ]
  },
  {
    title: 'Soporte',
    links: [
      { href: 'tel:+51966111242',                                label: '+51 966 111 242' },
      { href: 'https://linkedin.com/in/renzo-gutiérrez',         label: 'LinkedIn',           external: true }
    ]
  }
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a href="#top" className="brand">
            <span className="brand-mark">
              <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
                <rect width="32" height="32" rx="8" fill="#1F6FFF" />
                <path d="M8 22V10h2.5l8 8.5V10H21v12h-2.5l-8-8.5V22H8z" fill="#fff" />
                <circle cx="25" cy="9" r="2.5" fill="#00E5A0" />
              </svg>
            </span>
            <span className="brand-text">Nexlayer</span>
          </a>
          <p className="footer-tagline">
            Infraestructura moderna y soluciones automatizadas para empresas que no toleran caídas.
          </p>
          <span className="footer-city">Lima, Perú · 2026</span>
        </div>

        <div className="footer-cols">
          {cols.map((c) => (
            <div key={c.title} className="footer-col">
              <h4>{c.title}</h4>
              <ul>
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={l.external ? '_blank' : undefined}
                      rel={l.external ? 'noopener noreferrer' : undefined}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© 2026 Nexlayer. Todos los derechos reservados.</span>
        <span className="footer-credit">Hecho en Lima · operado 24/7</span>
      </div>
    </footer>
  )
}
