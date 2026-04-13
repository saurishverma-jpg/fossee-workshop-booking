import { Link } from 'react-router-dom'
import './Home.css'

const highlights = [
  { figure: '2,400+', caption: 'Workshops Conducted' },
  { figure: '18,000+', caption: 'Students Trained' },
  { figure: '380+', caption: 'Institutes Covered' },
  { figure: '12', caption: 'Workshop Types' },
]

const whyItWorks = [
  {
    icon: '📅',
    heading: 'No More Email Ping-Pong',
    body: "Propose a date, the instructor confirms when they're free. The whole thing happens here — no chains of forwarded emails.",
  },
  {
    icon: '📍',
    heading: 'Watch the Movement Grow',
    body: 'Every workshop adds a pin to the map. See where open-source education is taking root across the country.',
  },
  {
    icon: '👤',
    heading: 'Your Role Shapes Your View',
    body: 'Coordinators and instructors land on separate dashboards — no clutter, no irrelevant tabs, just the things you need.',
  },
  {
    icon: '📊',
    heading: 'Stats Without the Digging',
    body: 'Upcoming sessions, monthly counts, your own record — one screen, no clicking three menus deep to find a number.',
  },
]

const howItWorks = [
  { step: '01', heading: 'Create Your Account', body: "Register as a coordinator in a couple of minutes. Short form, nothing unnecessary." },
  { step: '02', heading: 'Pick a Date or Suggest One', body: "Browse available instructor slots or propose a time that suits your campus calendar." },
  { step: '03', heading: 'Instructor Accepts', body: "They review your request and confirm. You hear back — no chasing required." },
  { step: '04', heading: 'Host and Wrap Up', body: "Run the workshop, submit your feedback, and your profile updates automatically." },
]

const tools = ['Python', 'Scilab', 'DWSIM', 'eSim', 'OpenFOAM', 'QGIS', 'Oscad', 'Drupal', 'LaTeX', 'R', 'Arduino', 'Moodle']

export default function Home() {
  return (
    <div className="home">

      <section className="hero" aria-label="Hero section">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-blob blob1" />
          <div className="hero-blob blob2" />
          <div className="hero-grid" />
        </div>
        <div className="container hero-content">
          <div className="hero-badge fade-up">
            <span className="badge-dot" />
            IIT Bombay · FOSSEE Initiative
          </div>
          <h1 className="hero-title fade-up fade-up-1">
            Bring Open-Source<br />
            <span className="hero-accent">Workshops</span> to<br />
            Your Institution
          </h1>
          <p className="hero-desc fade-up fade-up-2">
            A straightforward portal for coordinators to arrange Python, Scilab,
            and other FOSS workshops — at no cost to any educational institution in India.
          </p>
          <div className="hero-actions fade-up fade-up-3">
            <Link to="/book" className="btn-primary">Book a Workshop</Link>
            <Link to="/workshops" className="btn-outline">Browse Workshops →</Link>
          </div>
        </div>
      </section>

      <section className="stats-strip" aria-label="Key statistics">
        <div className="container stats-grid">
          {highlights.map(({ figure, caption }, i) => (
            <div key={caption} className={`stat-card fade-up fade-up-${i + 1}`}>
              <span className="stat-value">{figure}</span>
              <span className="stat-label">{caption}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section workshop-types-section" aria-label="Available workshop types">
        <div className="container">
          <div className="section-header fade-up">
            <p className="section-eyebrow">What We Offer</p>
            <h2 className="section-title">Twelve Tools, One Place to Book Them</h2>
            <p className="section-desc">
              From scientific computing to circuit simulation — every tool here is free, open-source, and ready to teach.
            </p>
          </div>
          <div className="tags-grid fade-up fade-up-1">
            {tools.map(tool => (
              <Link to="/workshops" key={tool} className="workshop-tag">{tool}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section how-section" aria-label="How the booking process works">
        <div className="container">
          <div className="section-header fade-up">
            <p className="section-eyebrow">The Process</p>
            <h2 className="section-title">Request to Workshop in Four Steps</h2>
          </div>
          <div className="steps-grid">
            {howItWorks.map(({ step, heading, body }, i) => (
              <div key={step} className={`step-card fade-up fade-up-${i + 1}`}>
                <span className="step-num">{step}</span>
                <h3 className="step-title">{heading}</h3>
                <p className="step-desc">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section features-section" aria-label="Platform features">
        <div className="container">
          <div className="section-header fade-up">
            <p className="section-eyebrow">Why Use This Portal</p>
            <h2 className="section-title">Designed Around the Way You Actually Work</h2>
          </div>
          <div className="features-grid">
            {whyItWorks.map(({ icon, heading, body }, i) => (
              <div key={heading} className={`feature-card fade-up fade-up-${i + 1}`}>
                <span className="feature-icon" aria-hidden="true">{icon}</span>
                <h3 className="feature-title">{heading}</h3>
                <p className="feature-desc">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section" aria-label="Get started">
        <div className="container cta-inner">
          <h2 className="cta-title fade-up">Put Your Campus on the Map</h2>
          <p className="cta-desc fade-up fade-up-1">
            Hundreds of institutions have already run FOSS workshops through this portal. Getting started takes under two minutes.
          </p>
          <div className="cta-actions fade-up fade-up-2">
            <Link to="/register" className="btn-primary">Create an Account</Link>
            <Link to="/login" className="btn-outline-light">Already have an account? Log In</Link>
          </div>
        </div>
      </section>

    </div>
  )
}
