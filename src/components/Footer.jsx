import { Link } from 'react-router-dom'
import './Footer.css'

const NAV_GROUPS = [
  {
    title: 'Portal',
    links: [
      { to: '/workshops', label: 'Browse Workshops' },
      { to: '/book',      label: 'Book a Workshop'  },
      { to: '/dashboard', label: 'Dashboard'        },
    ],
  },
  {
    title: 'Account',
    links: [
      { to: '/login',    label: 'Log In'   },
      { to: '/register', label: 'Register' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="brand-badge">F</span>
          <div>
            <p className="footer-name">FOSSEE, IIT Bombay</p>
            <p className="footer-tagline">Free/Open Source Software for Education</p>
          </div>
        </div>

        <nav className="footer-links" aria-label="Footer navigation">
          {NAV_GROUPS.map(({ title, links }) => (
            <div key={title} className="footer-col">
              <p className="footer-col-title">{title}</p>
              {links.map(({ to, label }) => (
                <Link key={to} to={to}>{label}</Link>
              ))}
            </div>
          ))}
          <div className="footer-col">
            <p className="footer-col-title">Contact</p>
            <a href="mailto:pythonsupport@fossee.in">pythonsupport@fossee.in</a>
            <a href="https://fossee.in" target="_blank" rel="noopener noreferrer">fossee.in</a>
          </div>
        </nav>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} FOSSEE, IIT Bombay. Licensed under GPL-3.0.</p>
      </div>
    </footer>
  )
}
