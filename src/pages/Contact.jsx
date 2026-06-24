import { useSite } from '../components/Layout'
import { PageHero } from '../components/Page'

export default function Contact() {
  const { content } = useSite()

  return (
    <>
      <PageHero kicker="Get Involved" title={content.contactTitle} intro={content.contactIntro} />

      <section className="section">
        <div className="contact-grid">
          <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
            <h3>Volunteer Interest Form</h3>
            <label>
              Full name
              <input type="text" name="volName" placeholder="Your name" />
            </label>
            <label>
              Email
              <input type="email" name="volEmail" placeholder="you@example.com" />
            </label>
            <label>
              How would you like to help?
              <textarea name="volInterest" placeholder="Programs, events, skills you can offer..." />
            </label>
            <button className="button primary" type="submit">
              Submit Interest
            </button>
          </form>

          <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
            <h3>Membership Inquiry Form</h3>
            <label>
              Full name
              <input type="text" name="memName" placeholder="Your name" />
            </label>
            <label>
              Email
              <input type="email" name="memEmail" placeholder="you@example.com" />
            </label>
            <label>
              Your question
              <textarea name="memQuestion" placeholder="Ask about eligibility, dues, or how to join..." />
            </label>
            <button className="button primary" type="submit">
              Send Inquiry
            </button>
          </form>

          <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
            <h3>Leadership Contact Portal</h3>
            <label>
              Full name
              <input type="text" name="leadName" placeholder="Your name" />
            </label>
            <label>
              Email
              <input type="email" name="leadEmail" placeholder="you@example.com" />
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
              <textarea name="leadMessage" placeholder="Your message to ECSF leadership..." />
            </label>
            <button className="button primary" type="submit">
              Contact Leadership
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
