import { Link } from 'react-router-dom'

export function PageHero({ kicker, title, intro, children }) {
  return (
    <section className="page-hero">
      <div className="page-hero-inner">
        {kicker && <p className="section-kicker">{kicker}</p>}
        <h1>{title}</h1>
        {intro && <p className="page-hero-intro">{intro}</p>}
        {children}
      </div>
    </section>
  )
}

export function Breadcrumbs({ trail }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {trail.map((crumb, index) => {
        const isLast = index === trail.length - 1
        return (
          <span key={crumb.label}>
            {crumb.to && !isLast ? (
              <Link to={crumb.to}>{crumb.label}</Link>
            ) : (
              <span aria-current="page">{crumb.label}</span>
            )}
            {!isLast && <span className="crumb-sep" aria-hidden="true">/</span>}
          </span>
        )
      })}
    </nav>
  )
}

export function ComingSoon({ title = 'Coming soon', text }) {
  return (
    <div className="coming-soon">
      <span className="coming-soon-badge">Coming soon</span>
      <h3>{title}</h3>
      <p>{text || 'This section is being prepared and will be available here soon.'}</p>
    </div>
  )
}

export function SubPageCard({ to, title, blurb }) {
  return (
    <Link className="subpage-card" to={to}>
      <h3>{title}</h3>
      <p>{blurb}</p>
      <span className="subpage-arrow" aria-hidden="true">&rarr;</span>
    </Link>
  )
}
