import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import './Workshops.css'

const workshopData = [
  { id: 1, type: 'Python', title: 'Python for Scientific Computing', institute: 'IIT Kharagpur', date: '2025-05-10', status: 'upcoming', instructor: 'Arun Sharma', seats: 30 },
  { id: 2, type: 'Scilab', title: 'Scilab for Signal Processing', institute: 'NIT Calicut', date: '2025-05-14', status: 'upcoming', instructor: 'Meena Krishnan', seats: 25 },
  { id: 3, type: 'eSim', title: 'Circuit Simulation with eSim', institute: 'BITS Pilani', date: '2025-04-28', status: 'completed', instructor: 'Rahul Verma', seats: 40 },
  { id: 4, type: 'DWSIM', title: 'Chemical Process Simulation', institute: 'ICT Mumbai', date: '2025-05-20', status: 'upcoming', instructor: 'Priya Nair', seats: 20 },
  { id: 5, type: 'Python', title: 'Data Analysis with Python', institute: 'Jadavpur University', date: '2025-04-22', status: 'completed', instructor: 'Suresh Babu', seats: 35 },
  { id: 6, type: 'OpenFOAM', title: 'CFD with OpenFOAM', institute: 'IIT Madras', date: '2025-06-02', status: 'upcoming', instructor: 'Divya Rajan', seats: 18 },
  { id: 7, type: 'LaTeX', title: 'Document Typesetting with LaTeX', institute: 'Anna University', date: '2025-05-08', status: 'upcoming', instructor: 'Kiran Patel', seats: 50 },
  { id: 8, type: 'QGIS', title: 'GIS Mapping with QGIS', institute: 'Pune University', date: '2025-05-18', status: 'upcoming', instructor: 'Anjali Desai', seats: 22 },
]

const typeOptions = ['All', 'Python', 'Scilab', 'eSim', 'DWSIM', 'OpenFOAM', 'LaTeX', 'QGIS']
const statusOptions = ['All', 'upcoming', 'completed']

const statusDisplay = {
  upcoming:  { label: 'Upcoming',  color: '#1a8754', bg: '#eafaf1' },
  completed: { label: 'Completed', color: '#5a6180', bg: '#f0f1f8' },
  pending:   { label: 'Pending',   color: '#d97b0a', bg: '#fff4e6' },
}

function readableDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function Workshops() {
  const [query, setQuery]          = useState('')
  const [activeType, setType]      = useState('All')
  const [activeStatus, setStatus]  = useState('All')

  const results = useMemo(() => {
    const q = query.toLowerCase()
    return workshopData.filter(w => {
      const matchesText   = w.title.toLowerCase().includes(q) || w.institute.toLowerCase().includes(q)
      const matchesType   = activeType === 'All'   || w.type   === activeType
      const matchesStatus = activeStatus === 'All' || w.status === activeStatus
      return matchesText && matchesType && matchesStatus
    })
  }, [query, activeType, activeStatus])

  return (
    <div className="workshops-page">

      <div className="page-hero">
        <div className="container">
          <p className="section-eyebrow">Browse</p>
          <h1 className="page-title fade-up">Workshops</h1>
          <p className="page-desc fade-up fade-up-1">
            Upcoming and past workshops from institutions across India.
          </p>
        </div>
      </div>

      <div className="container workshops-layout">

        <aside className="filters-panel fade-up" aria-label="Filter options">
          <div className="filter-group">
            <label htmlFor="ws-search" className="filter-label">Search</label>
            <input
              id="ws-search"
              type="search"
              className="filter-input"
              placeholder="Name or institution…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              aria-label="Search workshops"
            />
          </div>

          <div className="filter-group">
            <p className="filter-label">Workshop Type</p>
            <div className="filter-chips" role="group" aria-label="Filter by type">
              {typeOptions.map(t => (
                <button
                  key={t}
                  className={`chip${activeType === t ? ' active' : ''}`}
                  onClick={() => setType(t)}
                  aria-pressed={activeType === t}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <p className="filter-label">Status</p>
            <div className="filter-chips" role="group" aria-label="Filter by status">
              {statusOptions.map(s => (
                <button
                  key={s}
                  className={`chip${activeStatus === s ? ' active' : ''}`}
                  onClick={() => setStatus(s)}
                  aria-pressed={activeStatus === s}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section className="workshops-results" aria-label="Workshop results">
          <div className="results-header">
            <p className="results-count">
              {results.length} workshop{results.length !== 1 ? 's' : ''} found
            </p>
            <Link to="/book" className="btn-primary-sm">+ Book New</Link>
          </div>

          {results.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon" aria-hidden="true">🔍</span>
              <p className="empty-title">Nothing matched those filters</p>
              <p className="empty-desc">Try broadening your search or clearing a filter.</p>
            </div>
          ) : (
            <div className="workshop-cards">
              {results.map((w, i) => {
                const badge = statusDisplay[w.status]
                return (
                  <article key={w.id} className={`workshop-card fade-up fade-up-${(i % 4) + 1}`} aria-label={w.title}>
                    <div className="wcard-top">
                      <span className="wcard-type">{w.type}</span>
                      <span className="wcard-status" style={{ color: badge.color, background: badge.bg }}>
                        {badge.label}
                      </span>
                    </div>
                    <h2 className="wcard-title">{w.title}</h2>
                    <div className="wcard-meta">
                      <span className="wcard-meta-item"><span aria-hidden="true">🏛️</span> {w.institute}</span>
                      <span className="wcard-meta-item"><span aria-hidden="true">📅</span> {readableDate(w.date)}</span>
                      <span className="wcard-meta-item"><span aria-hidden="true">👤</span> {w.instructor}</span>
                      <span className="wcard-meta-item"><span aria-hidden="true">🪑</span> {w.seats} seats</span>
                    </div>
                    {w.status === 'upcoming' && (
                      <Link to="/book" className="wcard-btn">Request to Join →</Link>
                    )}
                  </article>
                )
              })}
            </div>
          )}
        </section>

      </div>
    </div>
  )
}
