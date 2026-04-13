import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Auth.css'

const states = [
  'Andhra Pradesh','Assam','Bihar','Chhattisgarh','Delhi','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Odisha','Punjab','Rajasthan','Tamil Nadu',
  'Telangana','Uttar Pradesh','Uttarakhand','West Bengal','Other',
]

const perks = [
  'Book a workshop in under five minutes',
  'Track all your bookings from one place',
  'Free for every educational institution',
  'Direct access to qualified FOSS instructors',
]

const empty = {
  role: 'coordinator', firstName: '', lastName: '', email: '',
  password: '', confirmPassword: '', instituteName: '', state: '', phone: '',
}

function validate(form) {
  const err = {}
  if (!form.firstName.trim())            err.firstName        = 'Required'
  if (!form.lastName.trim())             err.lastName         = 'Required'
  if (!form.email.includes('@'))         err.email            = 'Enter a valid email address'
  if (form.password.length < 8)          err.password         = 'At least 8 characters'
  if (form.password !== form.confirmPassword) err.confirmPassword = "Passwords don't match"
  if (!form.instituteName.trim())        err.instituteName    = 'Required'
  if (!form.state)                       err.state            = 'Please select a state'
  return err
}

export default function Register() {
  const [form,      setForm]      = useState(empty)
  const [errors,    setErrors]    = useState({})
  const [submitted, setSubmitted] = useState(false)

  const set = (field, val) => setForm(prev => ({ ...prev, [field]: val }))

  function handleSubmit(e) {
    e.preventDefault()
    const found = validate(form)
    if (Object.keys(found).length) { setErrors(found); return }
    setErrors({})
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="auth-page">
        <div className="container" style={{ display: 'flex', justifyContent: 'center', padding: '80px 20px' }}>
          <div className="auth-card fade-up" style={{ maxWidth: 480, textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }} aria-hidden="true">🎉</div>
            <h2 className="auth-title">You're in!</h2>
            <p className="auth-subtitle" style={{ marginBottom: 24 }}>
              Welcome, {form.firstName}! We've sent a verification link to{' '}
              <strong>{form.email}</strong>. Confirm your email and you're ready to start booking.
            </p>
            <Link
              to="/login"
              className="auth-submit"
              style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
            >
              Head to Login →
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const field = (id, label, type = 'text', placeholder = '', autocomplete = '') => (
    <div className="form-group">
      <label className="form-label" htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        className={`form-input${errors[id] ? ' input-error' : ''}`}
        placeholder={placeholder}
        value={form[id]}
        onChange={e => set(id, e.target.value)}
        required={!!errors[id]}
        autoComplete={autocomplete || undefined}
      />
      {errors[id] && <span className="field-error">{errors[id]}</span>}
    </div>
  )

  return (
    <div className="auth-page">
      <div className="auth-split">

        <div className="auth-left" aria-hidden="true">
          <div className="auth-left-inner">
            <div className="auth-brand">
              <span className="brand-badge-lg">F</span>
              <span className="auth-brand-name">FOSSEE</span>
            </div>
            <h2 className="auth-left-title">Join 380+ institutions bringing FOSS workshops to their students.</h2>
            <ul className="auth-perks">
              {perks.map(p => (
                <li key={p}><span aria-hidden="true">✓</span> {p}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-card fade-up">
            <div className="auth-header">
              <h1 className="auth-title">Create your account</h1>
              <p className="auth-subtitle">Join the FOSSEE workshop network</p>
            </div>

            <div className="role-toggle" role="group" aria-label="Account type">
              {['coordinator', 'instructor'].map(r => (
                <button
                  key={r}
                  type="button"
                  className={`role-btn${form.role === r ? ' active' : ''}`}
                  onClick={() => set('role', r)}
                  aria-pressed={form.role === r}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>

            <form className="auth-form" onSubmit={handleSubmit} noValidate aria-label="Registration form">
              <div className="form-row-2">
                {field('firstName', 'First Name', 'text', 'Rahul', 'given-name')}
                {field('lastName',  'Last Name',  'text', 'Sharma', 'family-name')}
              </div>
              {field('email', 'Email Address', 'email', 'you@institution.edu', 'email')}
              {field('instituteName', 'Institution Name', 'text', 'IIT Bombay')}
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="state">State</label>
                  <select
                    id="state"
                    className={`form-select${errors.state ? ' input-error' : ''}`}
                    value={form.state}
                    onChange={e => set('state', e.target.value)}
                    required
                  >
                    <option value="">Select state</option>
                    {states.map(s => <option key={s}>{s}</option>)}
                  </select>
                  {errors.state && <span className="field-error">{errors.state}</span>}
                </div>
                {field('phone', 'Phone (optional)', 'tel', '+91 98XXXXXXXX', 'tel')}
              </div>
              <div className="form-row-2">
                {field('password',        'Password',         'password', 'Min. 8 characters',  'new-password')}
                {field('confirmPassword', 'Confirm Password', 'password', 'Repeat password',     'new-password')}
              </div>
              <button type="submit" className="auth-submit">Create Account</button>
            </form>

            <p className="auth-switch">
              Already have an account?{' '}
              <Link to="/login" className="auth-link">Log in</Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
