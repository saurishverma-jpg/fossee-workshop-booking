import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'

const bookings = [
  { id: 1, type: 'Python', title: 'Python for Scientific Computing',  date: '2025-05-10', status: 'confirmed', instructor: 'Arun Sharma',    participants: 30 },
  { id: 2, type: 'Scilab', title: 'Scilab for Signal Processing',     date: '2025-06-02', status: 'pending',   instructor: 'Meena Krishnan',  participants: 25 },
  { id: 3, type: 'eSim',   title: 'Circuit Simulation with eSim',     date: '2025-03-15', status: 'completed', instructor: 'Rahul Verma',     participants: 38 },
  { id: 4, type: 'LaTeX',  title: 'Document Typesetting with LaTeX',  date: '2025-02-20', status: 'completed', instructor: 'Kiran Patel',     participants: 45 },
]

const activity = [
  { icon: '✅', text: 'Scilab request sent to Meena Krishnan',           when: '2 days ago' },
  { icon: '📧', text: 'Confirmation email received for Python workshop', when: '5 days ago' },
  { icon: '📝', text: 'LaTeX workshop feedback submitted',               when: '2 months ago' },
  { icon: '🏁', text: 'eSim workshop marked as completed',               when: '3 months ago' },
]

const statusStyle = {
  confirmed: { label: 'Confirmed', color: '#1a8754', bg: '#eafaf1' },
  pending:   { label: 'Pending',   color: '#d97b0a', bg: '#fff4e6' },
  completed: { label: 'Completed', color: '#5a6180', bg: '#f0f1f8' },
  rejected:  { label: 'Rejected',  color: '#c0392b', bg: '#fdf2f2' },
}

const TAB_OPTIONS = ['all', 'confirmed', 'pending', 'completed']

function readableDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function Dashboard() {
  const [activeTab,   setTab]      = useState('all')
  const [showBanner,  setBanner]   = useState(true)

  const visible = activeTab === 'all'
    ? bookings
    : bookings.filter(b => b.status === activeTab)

  const totalTrained = bookings
    .filter(b => b.status === 'completed')
    .reduce((sum, b) => sum + b.participants, 0)

  const statCards = [
    { icon: '📋', label: 'Total Requests', value: bookings.length,                               bg: '#e8ecf9' },
    { icon: '✅', label: 'Confirmed',       value: bookings.filter(b => b.status === 'confirmed').length, bg: '#eafaf1' },
    { icon: '⏳', label: 'Awaiting Reply',  value: bookings.filter(b => b.status === 'pending').length,   bg: '#fff4e6' },
    { icon: '👥', label: 'Students Trained', value: totalTrained,                                bg: '#f0f1f8' },
  ]

  return (
    <div className="dashboard-page">

      <div className="dashboard-topbar">
        <div className="container topbar-inner">
          <div>
            <h1 className="dash-title fade-up">Dashboard</h1>
            <p className="dash-subtitle fade-up fade-up-1">IIT Bombay · Coordinator Account</p>
          </div>
          <Link to="/book" className="btn-primary-sm dash-book-btn">+ Book Workshop</Link>
        </div>
      </div>

      <div className="container dashboard-layout">

        {showBanner && (
          <div className="notif-banner fade-up" role="alert">
            <span className="notif-icon" aria-hidden="true">📬</span>
            <p>Your <strong>Scilab workshop</strong> is waiting on instructor confirmation — usually within 2 working days.</p>
            <button className="notif-close" onClick={() => setBanner(false)} aria-label="Dismiss notification">✕</button>
          </div>
        )}

        <div className="dash-stats fade-up fade-up-1">
          {statCards.map(({ icon, label, value, bg }) => (
            <div key={label} className="dash-stat-card">
              <div className="dsc-icon" style={{ background: bg }} aria-hidden="true">{icon}</div>
              <div className="dsc-info">
                <span className="dsc-value">{value}</span>
                <span className="dsc-label">{label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="dash-main">

          <section className="dash-section workshops-section fade-up fade-up-2">
            <div className="section-header-row">
              <h2 className="dash-section-title">My Workshops</h2>
              <div className="tab-row" role="tablist" aria-label="Filter by status">
                {TAB_OPTIONS.map(t => (
                  <button
                    key={t}
                    role="tab"
                    className={`tab-btn${activeTab === t ? ' active' : ''}`}
                    onClick={() => setTab(t)}
                    aria-selected={activeTab === t}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="workshops-table" role="tabpanel" aria-label={`${activeTab} workshops`}>
              {visible.length === 0 ? (
                <div className="empty-state">
                  <span className="empty-icon" aria-hidden="true">📭</span>
                  <p className="empty-title">Nothing here yet</p>
                </div>
              ) : (
                visible.map(b => {
                  const badge = statusStyle[b.status]
                  return (
                    <div key={b.id} className="table-row">
                      <div className="tr-left">
                        <span className="tr-type">{b.type}</span>
                        <div>
                          <p className="tr-title">{b.title}</p>
                          <p className="tr-meta">
                            <span aria-label="Instructor">👤 {b.instructor}</span>
                            <span aria-label="Date">📅 {readableDate(b.date)}</span>
                            <span aria-label="Participants">🪑 {b.participants} seats</span>
                          </p>
                        </div>
                      </div>
                      <div className="tr-right">
                        <span
                          className="tr-status"
                          style={{ color: badge.color, background: badge.bg }}
                          aria-label={`Status: ${badge.label}`}
                        >
                          {badge.label}
                        </span>
                        {b.status === 'pending' && (
                          <button className="tr-action cancel-btn" aria-label={`Cancel ${b.title}`}>Cancel</button>
                        )}
                        {b.status === 'completed' && (
                          <button className="tr-action feedback-btn" aria-label={`Give feedback for ${b.title}`}>Feedback</button>
                        )}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </section>

          <aside className="dash-sidebar">

            <div className="dash-section profile-card fade-up fade-up-2">
              <div className="profile-avatar" aria-hidden="true">KP</div>
              <p className="profile-name">Kiran Patel</p>
              <p className="profile-role">Workshop Coordinator</p>
              <p className="profile-inst">IIT Bombay</p>
              <div className="profile-stats">
                <div><strong>{bookings.filter(b => b.status === 'completed').length}</strong><small>Completed</small></div>
                <div><strong>{totalTrained}</strong><small>Students</small></div>
                <div><strong>4.8★</strong><small>Rating</small></div>
              </div>
              <button className="edit-profile-btn" aria-label="Edit profile">Edit Profile</button>
            </div>

            <div className="dash-section activity-card fade-up fade-up-3">
              <h3 className="dash-section-title" style={{ marginBottom: 16 }}>Recent Activity</h3>
              <ul className="activity-list" aria-label="Recent activity">
                {activity.map((item, i) => (
                  <li key={i} className="activity-item">
                    <span className="activity-icon" aria-hidden="true">{item.icon}</span>
                    <div>
                      <p className="activity-text">{item.text}</p>
                      <time className="activity-time">{item.when}</time>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="dash-section quick-actions fade-up fade-up-4">
              <h3 className="dash-section-title" style={{ marginBottom: 14 }}>Quick Actions</h3>
              <div className="qa-list">
                <Link to="/book"      className="qa-item"><span aria-hidden="true">📅</span> Book a Workshop</Link>
                <Link to="/workshops" className="qa-item"><span aria-hidden="true">🔍</span> Browse Workshops</Link>
                <a href="mailto:pythonsupport@fossee.in" className="qa-item"><span aria-hidden="true">📧</span> Contact Support</a>
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  )
}
