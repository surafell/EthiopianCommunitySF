import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FormFeedback } from '../components/FormFeedback'
import { useSite } from '../components/Layout'
import { PageHero } from '../components/Page'
import { formDataToObject, submitFormToEmail } from '../utils/formSubmit'

export default function Contact() {
  const { content } = useSite()
  const [leadershipStatus, setLeadershipStatus] = useState('idle')
  const [leadershipError, setLeadershipError] = useState('')

  async function handleLeadershipSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const data = formDataToObject(new FormData(form))

    setLeadershipStatus('submitting')
    setLeadershipError('')

    try {
      await submitFormToEmail({
        to: content.contactEmail,
        subject: 'ECSF Leadership Contact',
        replyTo: data.leadEmail,
        fields: {
          'Form Type': 'Leadership Contact',
          'Full Name': data.leadName,
          Email: data.leadEmail,
          Topic: data.leadTopic,
          Message: data.leadMessage,
        },
      })
      form.reset()
      setLeadershipStatus('success')
    } catch (error) {
      setLeadershipStatus('error')
      setLeadershipError(error.message)
    }
  }

  return (
    <>
      <PageHero kicker="Get Involved" title={content.contactTitle} intro={content.contactIntro} />

      <section className="section">
        <div className="contact-grid">
          <div className="contact-form contact-form-promo">
            <h3>Volunteer Interest Form</h3>
            <p>
              Complete our bilingual volunteer interest & service request form to share your skills,
              availability, and areas where you would like to serve.
            </p>
            <Link className="button primary" to="/volunteer">
              Open Volunteer Form
            </Link>
          </div>

          <div className="contact-form contact-form-promo">
            <h3>Become a Member</h3>
            <p>
              Register for ECSF membership and continue to payment to activate your membership.
            </p>
            <Link className="button primary" to="/membership#membership-form">
              Join ECSF
            </Link>
          </div>

          <form className="contact-form" onSubmit={handleLeadershipSubmit}>
            <h3>Leadership Contact Portal</h3>
            <label>
              Full name
              <input type="text" name="leadName" placeholder="Your name" required />
            </label>
            <label>
              Email
              <input type="email" name="leadEmail" placeholder="you@example.com" required />
            </label>
            <label>
              Topic for leadership
              <select name="leadTopic" defaultValue="general">
                <option value="general">General</option>
                <option value="governance">Governance</option>
                <option value="programs">Programs</option>
                <option value="partnership">Partnership</option>
              </select>
            </label>
            <label>
              Message
              <textarea name="leadMessage" placeholder="Your message to ECSF leadership..." required />
            </label>
            <button className="button primary" type="submit" disabled={leadershipStatus === 'submitting'}>
              {leadershipStatus === 'submitting' ? 'Sending…' : 'Contact Leadership'}
            </button>
            <FormFeedback
              status={leadershipStatus}
              error={leadershipError}
              successMessage="Thank you. Your message has been sent to ECSF leadership."
            />
          </form>
        </div>
      </section>
    </>
  )
}
