import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSite } from '../components/Layout'
import { PageHero } from '../components/Page'
import { formDataToObject, submitFormToEmail } from '../utils/formSubmit'

export default function Membership() {
  const { content } = useSite()
  const navigate = useNavigate()
  const location = useLocation()
  const formRef = useRef(null)
  const activeMemberships = content.memberships.filter((membership) => !membership.inactive)
  const [selectedTier, setSelectedTier] = useState(activeMemberships[0]?.name || '')
  const [agreed, setAgreed] = useState(false)

  useEffect(() => {
    if (location.hash === '#membership-form') {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [location.hash])

  function scrollToForm(tierName) {
    setSelectedTier(tierName)
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const data = formDataToObject(new FormData(form))

    const tier = content.memberships.find((membership) => membership.name === data.membershipTier)

    const paymentState = {
      fromMembership: true,
      memberName: data.fullName,
      membershipTier: data.membershipTier,
      membershipAmount: tier?.amount ?? null,
    }

    // Send registration email in the background so payment is not delayed.
    submitFormToEmail({
      to: content.contactEmail,
      subject: 'ECSF Membership Registration',
      replyTo: data.email,
      fields: {
        'Form Type': 'Membership Registration',
        'Full Name': data.fullName,
        Email: data.email,
        Phone: data.phone,
        'City / Area': data.city,
        'Membership Tier': data.membershipTier,
        Notes: data.notes || '',
      },
    }).catch(() => {
      paymentState.emailPending = true
    })

    navigate('/donate', { state: paymentState })
  }

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
                <button className="button secondary" type="button" onClick={() => scrollToForm(membership.name)}>
                  Join Now
                </button>
              )}
            </article>
          ))}
        </div>
        {content.membershipNote && <p className="fine-print">{content.membershipNote}</p>}

        <div className="membership-form-section" id="membership-form" ref={formRef}>
          <div className="section-heading">
            <p className="section-kicker">Join ECSF</p>
            <h2>Membership Registration</h2>
            <p>Complete the form below, then continue to payment to activate your membership.</p>
          </div>

          <form className="contact-form membership-form" onSubmit={handleSubmit}>
            <label>
              Full name
              <input type="text" name="fullName" placeholder="Your name" required />
            </label>
            <label>
              Email
              <input type="email" name="email" placeholder="you@example.com" required />
            </label>
            <label>
              Phone
              <input type="tel" name="phone" placeholder="Your phone number" required />
            </label>
            <label>
              City / Area
              <input type="text" name="city" placeholder="San Francisco, East Bay, etc." required />
            </label>
            <label>
              Membership tier
              <select
                name="membershipTier"
                value={selectedTier}
                onChange={(event) => setSelectedTier(event.target.value)}
                required
              >
                {activeMemberships.map((membership) => (
                  <option key={membership.name} value={membership.name}>
                    {membership.name} — {membership.price}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Additional notes (optional)
              <textarea name="notes" placeholder="Any details we should know about your membership..." />
            </label>
            <label className="checkbox-field">
              <input
                type="checkbox"
                name="agreement"
                checked={agreed}
                onChange={(event) => setAgreed(event.target.checked)}
                required
              />
              <span>I agree to abide by the ECSF bylaws and membership responsibilities.</span>
            </label>
            <button className="button primary" type="submit" disabled={!agreed}>
              Continue to Payment
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
