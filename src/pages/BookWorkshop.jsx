import { useState } from 'react'
import './BookWorkshop.css'

const workshopTypes = ['Python', 'Scilab', 'DWSIM', 'eSim', 'OpenFOAM', 'QGIS', 'LaTeX', 'R', 'Arduino']
const audienceTypes = ['UG Students', 'PG Students', 'Faculty', 'Research Scholars', 'Mixed']
const instituteTypes = ['IIT', 'NIT', 'BITS', 'State University', 'Private Engineering College', 'Government College', 'Research Institute', 'Other']

const TODAY = new Date().toISOString().split('T')[0]

const BLANK = {
  workshopType: '', instituteType: '', instituteName: '', city: '', state: '',
  audience: '', expectedParticipants: '', preferredDate: '', alternateDate: '',
  coordinatorName: '', coordinatorEmail: '', coordinatorPhone: '', notes: '',
}

const STEP_LABELS = ['Workshop Details', 'Your Institution', 'Contact & Notes']

export default function BookWorkshop() {
  const [step,      setStep]      = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [form,      setForm]      = useState(BLANK)

  const set = (field, val) => setForm(f => ({ ...f, [field]: val }))

  function resetForm() { setSubmitted(false); setStep(1); setForm(BLANK) }

  if (submitted) {
    return (
      <div className="book-page">
        <div className="container success-wrap">
          <div className="success-card fade-up">
            <div className="success-icon" aria-hidden="true">✅</div>
            <h2 className="success-title">Request Sent!</h2>
            <p className="success-desc">
              Your <strong>{form.workshopType}</strong> workshop request for{' '}
              <strong>{form.instituteName}</strong> is with the team.
              An instructor will confirm soon — keep an eye on <strong>{form.coordinatorEmail}</strong>.
            </p>
            <div className="success-info">
              <div className="info-row"><span>Workshop Type</span><strong>{form.workshopType}</strong></div>
              <div className="info-row"><span>Preferred Date</span><strong>{form.preferredDate}</strong></div>
              <div className="info-row"><span>Participants</span><strong>{form.expectedParticipants}</strong></div>
            </div>
            <button className="btn-primary" onClick={resetForm}>Book Another Workshop</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="book-page">

      <div className="page-hero">
        <div className="container">
          <p className="section-eyebrow">Coordinator</p>
          <h1 className="page-title fade-up">Book a Workshop</h1>
          <p className="page-desc fade-up fade-up-1">Fill in the details and an instructor will confirm your booking.</p>
        </div>
      </div>

      <div className="container book-layout">

        <div className="stepper fade-up" aria-label="Form progress">
          {STEP_LABELS.map((label, i) => (
            <div key={label} className={`stepper-step${step === i + 1 ? ' active' : step > i + 1 ? ' done' : ''}`}>
              <div className="stepper-dot">{step > i + 1 ? '✓' : i + 1}</div>
              <span className="stepper-label">{label}</span>
              {i < 2 && <div className="stepper-line" />}
            </div>
          ))}
        </div>

        <form
          className="book-form fade-up fade-up-1"
          onSubmit={e => { e.preventDefault(); setSubmitted(true) }}
          noValidate
          aria-label="Workshop booking form"
        >

          {step === 1 && (
            <div className="form-step">
              <div className="form-group">
                <label className="form-label" htmlFor="workshopType">
                  Workshop Type <span aria-hidden="true">*</span>
                </label>
                <select
                  id="workshopType"
                  className="form-select"
                  value={form.workshopType}
                  onChange={e => set('workshopType', e.target.value)}
                  required
                  aria-required="true"
                >
                  <option value="">Choose a topic</option>
                  {workshopTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="preferredDate">
                    Preferred Date <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="preferredDate"
                    type="date"
                    className="form-input"
                    value={form.preferredDate}
                    onChange={e => set('preferredDate', e.target.value)}
                    min={TODAY}
                    required
                    aria-required="true"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="alternateDate">Alternate Date</label>
                  <input
                    id="alternateDate"
                    type="date"
                    className="form-input"
                    value={form.alternateDate}
                    onChange={e => set('alternateDate', e.target.value)}
                    min={TODAY}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="audience">
                    Target Audience <span aria-hidden="true">*</span>
                  </label>
                  <select id="audience" className="form-select" value={form.audience} onChange={e => set('audience', e.target.value)} required>
                    <option value="">Select audience</option>
                    {audienceTypes.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="expectedParticipants">
                    Expected Participants <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="expectedParticipants"
                    type="number"
                    className="form-input"
                    placeholder="e.g. 30"
                    value={form.expectedParticipants}
                    onChange={e => set('expectedParticipants', e.target.value)}
                    min="5" max="500"
                    required
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="btn-primary" onClick={() => setStep(2)}>Continue →</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="instituteType">
                    Institution Type <span aria-hidden="true">*</span>
                  </label>
                  <select id="instituteType" className="form-select" value={form.instituteType} onChange={e => set('instituteType', e.target.value)} required>
                    <option value="">Select type</option>
                    {instituteTypes.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="instituteName">
                    Institution Name <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="instituteName"
                    type="text"
                    className="form-input"
                    placeholder="e.g. IIT Bombay"
                    value={form.instituteName}
                    onChange={e => set('instituteName', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="city">City <span aria-hidden="true">*</span></label>
                  <input id="city" type="text" className="form-input" placeholder="e.g. Mumbai" value={form.city} onChange={e => set('city', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="bk-state">State <span aria-hidden="true">*</span></label>
                  <input id="bk-state" type="text" className="form-input" placeholder="e.g. Maharashtra" value={form.state} onChange={e => set('state', e.target.value)} required />
                </div>
              </div>
              <div className="form-actions two">
                <button type="button" className="btn-back" onClick={() => setStep(1)}>← Back</button>
                <button type="button" className="btn-primary" onClick={() => setStep(3)}>Continue →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-step">
              <div className="form-group">
                <label className="form-label" htmlFor="coordinatorName">
                  Your Full Name <span aria-hidden="true">*</span>
                </label>
                <input id="coordinatorName" type="text" className="form-input" placeholder="e.g. Rahul Sharma" value={form.coordinatorName} onChange={e => set('coordinatorName', e.target.value)} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="coordinatorEmail">
                    Email Address <span aria-hidden="true">*</span>
                  </label>
                  <input id="coordinatorEmail" type="email" className="form-input" placeholder="you@college.edu" value={form.coordinatorEmail} onChange={e => set('coordinatorEmail', e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="coordinatorPhone">Phone Number</label>
                  <input id="coordinatorPhone" type="tel" className="form-input" placeholder="+91 98XXXXXXXX" value={form.coordinatorPhone} onChange={e => set('coordinatorPhone', e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="notes">Anything Else?</label>
                <textarea
                  id="notes"
                  className="form-textarea"
                  placeholder="Special requirements, lab availability, or anything you'd like the instructor to know…"
                  value={form.notes}
                  onChange={e => set('notes', e.target.value)}
                  rows={4}
                />
              </div>
              <div className="form-actions two">
                <button type="button" className="btn-back" onClick={() => setStep(2)}>← Back</button>
                <button type="submit" className="btn-primary">Submit Request ✓</button>
              </div>
            </div>
          )}

        </form>
      </div>
    </div>
  )
}
