import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const NAV_LINKS = [
  { to: '/',          label: 'Home' },
  { to: '/workshops', label: 'Workshops' },
  { to: '/book',      label: 'Book a Workshop' },
  { to: '/dashboard', label: 'Dashboard' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [pinned,   setPinned]   = useState(false)
  const location = useLocation()

  useEffect(() => {
    const track = () => setPinned(window.scrollY > 10)
    window.addEventListener('scroll', track)
    return () => window.removeEventListener('scroll', track)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  return (
    <header className={`navbar${pinned ? ' scrolled' : ''}`} role="banner">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand" aria-label="FOSSEE Home">
          <span className="brand-badge">F</span>
          <span className="brand-text">
            <span className="brand-fossee">FOSSEE</span>
            <span className="brand-sub">Workshop Booking</span>
          </span>
        </Link>

        <nav className={`navbar-links${menuOpen ? ' open' : ''}`} aria-label="Main navigation">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`nav-link${location.pathname === to ? ' active' : ''}`}
            >
              {label}
            </Link>
          ))}
          <div className="nav-auth">
            <Link to="/login"    className="btn-ghost">Log In</Link>
            <Link to="/register" className="btn-primary-sm">Register</Link>
          </div>
        </nav>

        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}
