import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useOutletContext } from 'react-router-dom'
import logo from '../assets/logo.png'

export function useSite() {
  return useOutletContext()
}

function NavDropdown({ label, to, items, onNavigate }) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef(null)

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  function openMenu() {
    clearTimeout(closeTimer.current)
    setOpen(true)
  }

  function scheduleClose() {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(false), 280)
  }

  function handleNavigate() {
    clearTimeout(closeTimer.current)
    setOpen(false)
    onNavigate?.()
  }

  return (
    <div
      className={`nav-group ${open ? 'open' : ''}`}
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <div className="nav-group-head">
        <NavLink to={to} onClick={handleNavigate}>
          {label}
        </NavLink>
        <button
          type="button"
          className="nav-caret"
          aria-label={`${label} menu`}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden="true">▾</span>
        </button>
      </div>
      <div className="nav-menu" role="menu" onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
        {items.map((item) => (
          <NavLink key={item.to} to={item.to} role="menuitem" onClick={handleNavigate}>
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default function Layout(context) {
  const { content, isAdmin, onLogout } = context
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  const aboutItems = [
    { to: '/about/history', label: 'Our History' },
    { to: '/about/boards', label: 'Meet Our Board' },
    { to: '/about/volunteers', label: 'Volunteers' },
    { to: '/about/annual-reports', label: 'Annual Reports' },
    { to: '/about/bylaws', label: 'Bylaws' },
    { to: '/about/financials', label: 'Financials' },
    { to: '/about/our-stories', label: 'Our Stories' },
    { to: '/governance', label: 'Governance' },
  ]

  const programItems = content.programs.map((program) => ({
    to: `/what-we-do/${program.slug}`,
    label: program.title,
  }))

  const eventItems = [
    { to: '/events/current', label: 'Current Events' },
    { to: '/events/future', label: 'Upcoming Events' },
    { to: '/events/past', label: 'Past Events' },
  ]

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <Link className="brand" to="/" aria-label={`${content.siteName} ${content.region} home`}>
          <img className="brand-logo" src={logo} alt={`${content.siteName} ${content.region} logo`} />
          <span>
            <strong>{content.siteName}</strong>
            <small>{content.region}</small>
          </span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span className="nav-toggle-bar" aria-hidden="true" />
          <span className="sr-only">Menu</span>
        </button>

        <nav id="primary-nav" className={`main-nav ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
          <NavLink to="/" end onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavDropdown label="About" to="/about" items={aboutItems} onNavigate={() => setMenuOpen(false)} />
          <NavDropdown label="What We Do" to="/what-we-do" items={programItems} onNavigate={() => setMenuOpen(false)} />
          <NavDropdown label="Events" to="/events" items={eventItems} onNavigate={() => setMenuOpen(false)} />
          <NavLink to="/membership" onClick={() => setMenuOpen(false)}>
            Membership
          </NavLink>
          <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </NavLink>
          <NavLink className="nav-cta" to="/donate" onClick={() => setMenuOpen(false)}>
            Donate
          </NavLink>
          {isAdmin && (
            <>
              <NavLink className="admin-nav-link" to="/admin" onClick={() => setMenuOpen(false)}>
                Dashboard
              </NavLink>
              <button className="nav-button" type="button" onClick={onLogout}>
                Log Out
              </button>
            </>
          )}
        </nav>
      </header>

      <main id="main-content">
        <Outlet context={context} />
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <img className="footer-logo" src={logo} alt="" aria-hidden="true" />
          <div>
            <h2>
              {content.siteName} {content.region}
            </h2>
            <p>Serving Ethiopians and Ethiopian-Americans across San Francisco and the greater Bay Area.</p>
          </div>
        </div>

        <nav className="footer-links" aria-label="Footer">
          <Link to="/about">About</Link>
          <Link to="/what-we-do">What We Do</Link>
          <Link to="/events">Events</Link>
          <Link to="/membership">Membership</Link>
          <Link to="/donate">Donate</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/admin">Admin</Link>
        </nav>

        <address>
          <strong>Contact Us</strong>
          <a href={content.siteUrl}>{content.siteUrl.replace(/^https?:\/\//, '')}</a>
          {content.contactEmail && <a href={`mailto:${content.contactEmail}`}>{content.contactEmail}</a>}
          {content.contactPhone && <a href={`tel:${content.contactPhone}`}>{content.contactPhone}</a>}
          <span>{content.contactLocation}</span>
        </address>
      </footer>
    </>
  )
}
