import { Link } from 'react-router-dom'
import { useSite } from '../components/Layout'
import { PageHero } from '../components/Page'

export default function Membership() {
  const { content } = useSite()

  return (
    <>
      <PageHero kicker="Membership" title="Join and help sustain the community." intro={content.membershipIntro} />

      <section className="section">
        <div className="membership-detail-grid">
          <article className="detail-card">
            <h3>Eligibility Requirements</h3>
            <ul className="check-list">
              {content.membershipEligibility?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="detail-card">
            <h3>Member Benefits</h3>
            <ul className="check-list">
              {content.memberRights?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="detail-card">
            <h3>Member Responsibilities</h3>
            <ul className="check-list">
              {content.memberResponsibilities?.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>

        <h3 className="subsection-title">Membership Fees</h3>
        <div className="membership-grid">
          {content.memberships.map((membership) => (
            <article className={`membership-card ${membership.inactive ? 'inactive' : ''}`} key={membership.name}>
              {membership.inactive && <span className="membership-flag">Not active yet</span>}
              <h3>{membership.name}</h3>
              <p className="price">{membership.price}</p>
              <p>{membership.note}</p>
              {membership.inactive ? (
                <button className="button secondary" type="button" disabled>
                  Coming Soon
                </button>
              ) : (
                <Link className="button secondary" to="/contact">
                  Membership Inquiry
                </Link>
              )}
            </article>
          ))}
        </div>
        {content.membershipNote && <p className="fine-print">{content.membershipNote}</p>}
      </section>
    </>
  )
}
