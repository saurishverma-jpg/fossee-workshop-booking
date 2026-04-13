# FOSSEE Workshop Booking — React UI Redesign

A React-based redesign of the FOSSEE Workshop Booking portal, submitted for the FOSSEE Python Screening Task.  
Original Django project: [github.com/FOSSEE/workshop_booking](https://github.com/FOSSEE/workshop_booking)

---

## Live Demo

> Deploy to Vercel or Netlify and paste your URL here after `npm run build`.

---

## What Changed

### Before (Original Django Site)
- Plain HTML templates with minimal Bootstrap
- No real mobile layout — horizontal scroll on small screens
- Dense tables, no visual hierarchy
- No loading states or user feedback on form actions
- Navigation collapse with no animation

### After (This Redesign)
- Mobile-first layouts tested at 360px, 768px, and 1280px
- Sticky navbar with a smooth hamburger animation and full-screen mobile menu
- Card-based workshop list with live search and type/status filters
- Three-step booking form with per-field validation and a success screen
- Coordinator dashboard with stat cards, tabbed history, activity feed, and quick links
- Accessible throughout — ARIA labels, roles, `aria-pressed`, `aria-selected`, `aria-required`
- Consistent design system using CSS custom properties (10 colours, 2 fonts, shared radii/shadows)

---

## Setup

### Requirements
- Node.js 18+ and npm

### Steps

```bash
git clone https://github.com/YOUR_USERNAME/fossee-workshop-booking.git
cd fossee-workshop-booking
npm install
npm run dev        # → http://localhost:5173
npm run build      # production build
npm run preview    # preview the build
```

### Project Structure

```
src/
├── components/
│   ├── Navbar.jsx / Navbar.css
│   └── Footer.jsx / Footer.css
├── pages/
│   ├── Home.jsx / Home.css
│   ├── Workshops.jsx / Workshops.css
│   ├── BookWorkshop.jsx / BookWorkshop.css
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Auth.css
│   └── Dashboard.jsx / Dashboard.css
├── App.jsx
├── App.css
└── index.css       ← design tokens, resets, animations
```

---

## Design Decisions

### 1. Principles that shaped every screen

**Clarity over decoration.** The original had working HTML but no visual hierarchy — everything felt equally weighted. I introduced a clear type scale (`clamp(2.2rem, 6vw, 3.6rem)` down to 0.78rem labels), a constrained palette of deep indigo and saffron, and consistent spacing units so the eye can follow a natural reading path.

**Progressive disclosure.** The booking form was a single long scroll in the original. Breaking it into three steps — Workshop Details, Institution, Contact — means coordinators only deal with one decision at a time, and errors get caught early.

**Trust through feedback.** Forms that go silent leave users second-guessing. Every action here gets a response: loading spinners, field-level error messages, a dismissible banner on the dashboard, and a detailed success screen after booking.

### 2. Responsiveness

The layout is mobile-first — small screens are the base, larger screens are handled through `@media (min-width)` overrides.

Key techniques:
- `clamp()` for fluid type that scales smoothly between breakpoints
- CSS Grid with explicit column counts that collapse at 960px, 768px, 640px, and 480px
- The navbar drops to a full-screen overlay at 768px, animated with CSS only — no JS scroll-lock
- Auth panels hide the decorative left side on mobile so the form fills the screen
- All interactive targets are at least 44px tall per WCAG guidelines

### 3. Trade-offs

**Fonts.** Google Fonts (`Sora` + `DM Mono`) over system fonts — the quality difference is worth the extra request. Both use `display=swap` and a `preconnect` hint, so text renders immediately with a fallback while the custom font loads.

**Animations.** CSS-only (`fadeUp`, `shimmer`, `pulse-ring`) — compositor-thread, no JS animation library needed. The `animation-delay` stagger pattern adds a polished reveal feel at essentially zero cost.

**No UI library.** The only runtime dependencies are React, React DOM, and React Router. No component library, no icon font, no charting package. Keeps the bundle lean and avoids fighting opinionated styles.

**Static data.** Workshop data lives in local JS arrays. In production, swapping each for a `fetch` call to the existing Django REST endpoints is a one-liner per page.

### 4. Hardest part

Designing the dashboard to hold up across three very different screen widths without breaking the information hierarchy.

Desktop needs the sidebar alongside the main table. On a phone, that same sidebar crushes the content. On a tablet, neither full-desktop nor full-mobile feels right.

My approach was to treat each breakpoint as its own layout decision, not a mechanical collapse:
- **Desktop (960px+):** `grid-template-columns: 1fr 300px` — sidebar beside the table
- **Tablet (720–960px):** sidebar drops below the table, becomes a 2-column card row
- **Mobile (<720px):** everything stacks; tab bar wraps; table rows flex-wrap so status badges don't overlap titles

The tab filter also needed careful thought: it had to work as a proper `role="tablist"` with `aria-selected` for screen readers while visually looking like a segmented control. Getting both right without extra JavaScript took a few iterations.

---

## Accessibility Checklist

- [x] Semantic HTML5 landmarks (`<header>`, `<main>`, `<nav>`, `<aside>`, `<section>`, `<footer>`)
- [x] All interactive elements keyboard-navigable (Tab / Enter / Space)
- [x] ARIA roles: `tablist`, `tab`, `tabpanel`, `alert`, `group`, `banner`, `navigation`
- [x] `aria-label` on icon-only buttons and navigation regions
- [x] `aria-required="true"` on required fields
- [x] `aria-pressed` on toggle buttons and the hamburger
- [x] `aria-expanded` on the hamburger button
- [x] `aria-busy` on the submit button while loading
- [x] `aria-hidden="true"` on decorative emoji and icons
- [x] Focus outlines preserved — no `outline: none` without a replacement
- [x] Colour contrast ≥ 4.5:1 for all body text
- [x] Labels linked to inputs via `htmlFor` / `id` pairs

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | React 18 | Required by the task spec |
| Routing | React Router v6 | Lightweight, standard |
| Styling | Plain CSS + custom properties | Full control, no build-time complexity |
| Build | Vite | Fast HMR, minimal config |
| Fonts | Google Fonts (Sora, DM Mono) | Distinctive, readable, free |

---

## Contact

Submitted to: [pythonsupport@fossee.in](mailto:pythonsupport@fossee.in)
