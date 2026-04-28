import { useEffect, useState } from 'react'
import './Navbar.css'

const links = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#flotas', label: 'Flotas' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#precios', label: 'Precios' },
  { href: '#contacto', label: 'Contacto' }
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container navbar-inner">
        <a href="#top" className="brand" aria-label="Nexlayer">
          <span className="brand-mark">
            <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
              <rect width="32" height="32" rx="8" fill="#1F6FFF" />
              <path d="M8 22V10h2.5l8 8.5V10H21v12h-2.5l-8-8.5V22H8z" fill="#fff" />
              <circle cx="25" cy="9" r="2.5" fill="#00E5A0" />
            </svg>
          </span>
          <span className="brand-text">Nexlayer</span>
        </a>

        <nav className={`nav-links ${open ? 'is-open' : ''}`} aria-label="Principal">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#contacto" className="btn btn-primary nav-cta-mobile" onClick={() => setOpen(false)}>
            Consulta gratis
          </a>
        </nav>

        <a href="#contacto" className="btn btn-primary nav-cta">
          Consulta gratis
        </a>

        <button
          className={`burger ${open ? 'is-open' : ''}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}
