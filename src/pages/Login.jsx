import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Auth.css'

const ROLES = ['coordinator', 'instructor']

export default function Login() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [role,     setRole]     = useState('coordinator')
  const [loading,  setLoading]  = useState(false)
  const [notice,   setNotice]   = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setNotice('')
    if (!email || !password) {
      setNotice('Please fill in both fields before continuing.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setNotice('Demo mode — no backend connected. Authentication would happen here.')
    }, 1200)
  }

  return (
    <div className="auth-page">
      <div className="auth-split">

        <div className="auth-left" aria-hidden="true">
          <div className="auth-left-inner">
            <div className="auth-brand">
              <span className="brand-badge-lg">F</span>
              <span className="auth-brand-name">FOSSEE</span>
            </div>
            <h2 className="auth-left-title">Open-source education, on every campus across India.</h2>
            <div className="auth-testimonial">
              <p className="testimonial-text">
                "Arranging a Python workshop for our department used to mean weeks of back-and-forth.
                 Through this portal, it was sorted in a single afternoon."
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">KP</div>
                <div>
                  <p className="testimonial-name">Kiran Patel</p>
                  <p className="testimonial-role">Workshop Coordinator, NIT Surat</p>
                </div>
              </div>
            </div>
            <div className="auth-stats-row">
              <div className="auth-stat"><span>2,400+</span><small>Workshops</small></div>
              <div className="auth-stat"><span>380+</span><small>Institutes</small></div>
              <div className="auth-stat"><span>18k+</span><small>Students</small></div>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-card fade-up">
            <div className="auth-header">
              <h1 className="auth-title">Good to see you again</h1>
              <p className="auth-subtitle">Sign in to your FOSSEE account</p>
            </div>

            <div className="role-toggle" role="group" aria-label="Select account type">
              {ROLES.map(r => (
                <button
                  key={r}
                  type="button"
                  className={`role-btn${role === r ? ' active' : ''}`}
                  onClick={() => setRole(r)}
                  aria-pressed={role === r}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>

            {notice && (
              <div className="auth-error" role="alert">
                <span aria-hidden="true">⚠️</span> {notice}
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit} noValidate aria-label="Login form">
              <div className="form-group">
                <label className="form-label" htmlFor="login-email">Email Address</label>
                <input
                  id="login-email"
                  type="email"
                  className="form-input"
                  placeholder="you@institution.edu"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  aria-required="true"
                  autoComplete="email"
                />
              </div>

              <div className="form-group">
                <div className="label-row">
                  <label className="form-label" htmlFor="login-password">Password</label>
                  <a href="#" className="forgot-link">Forgot password?</a>
                </div>
                <input
                  id="login-password"
                  type="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  aria-required="true"
                  autoComplete="current-password"
                />
              </div>

              <button type="submit" className="auth-submit" disabled={loading} aria-busy={loading}>
                {loading && <span className="spinner" aria-hidden="true" />}
                {loading ? 'Signing in…' : 'Log In'}
              </button>
            </form>

            <p className="auth-switch">
              No account yet?{' '}
              <Link to="/register" className="auth-link">Register here</Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
