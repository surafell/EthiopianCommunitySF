import { Link } from 'react-router-dom'
import { Breadcrumbs, PageHero } from '../components/Page'

const VOLUNTEER_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSelAEzJhox9ThHOPxn-CpjWVAm4CE9J_rqfgYR9hLNlcFxmLA/viewform'
const VOLUNTEER_FORM_EMBED_URL = `${VOLUNTEER_FORM_URL}?embedded=true`

export default function VolunteerForm() {
  return (
    <>
      <PageHero
        kicker="Serve · Embrace · Welcome"
        title="Volunteer Interest & Service Request Form"
        intro="Share how you would like to serve ECSF. Your application is submitted securely through our Google Form."
      >
        <Breadcrumbs
          trail={[
            { label: 'Home', to: '/' },
            { label: 'About', to: '/about' },
            { label: 'Volunteers', to: '/about/volunteers' },
            { label: 'Volunteer Form' },
          ]}
        />
      </PageHero>

      <section className="section volunteer-section">
        <div className="volunteer-intro">
          <p className="volunteer-org-name">
            Ethiopian Community in San Francisco and the Bay Area (ECSF)
            <span>የኢትዮጵያውያን ማህበረሰብ በሳንፍራንሲስኮ እና በቤይ ኤሪያ</span>
          </p>
          <div className="volunteer-purpose">
            <p>
              <strong>Purpose / ዓላማ:</strong> This form is for ECSF members and supporters who would like to
              volunteer in community programs, committees, events, outreach, and operational support.
            </p>
            <p>
              ይህ ቅጽ በECSF ፕሮግራሞች፣ ኮሚቴዎች፣ ዝግጅቶች፣ ማህበረሰብ ማድረስ እና የድርጅት ድጋፍ ሥራዎች ላይ በበጎ
              ፈቃድ ለመሳተፍ የሚፈልጉ አባላትና ደጋፊዎች የሚሞሉት ነው።
            </p>
          </div>
        </div>

        <div className="volunteer-embed-card">
          <div className="volunteer-embed-head">
            <div>
              <h2>Volunteer application</h2>
              <p>Complete the form below. Responses go directly to ECSF.</p>
            </div>
            <Link className="button secondary" to="/about/volunteers">
              Back to Volunteers
            </Link>
          </div>

          <div className="volunteer-embed-wrap">
            <div className="volunteer-embed-scaler">
              <iframe
                className="volunteer-embed-frame"
                src={VOLUNTEER_FORM_EMBED_URL}
                title="ECSF Volunteer Interest and Service Request Form"
                loading="lazy"
                scrolling="no"
              >
                Loading…
              </iframe>
            </div>
          </div>

          <p className="volunteer-embed-fallback">
            Having trouble with the form?{' '}
            <a href={VOLUNTEER_FORM_URL} target="_blank" rel="noreferrer">
              Open it in a new tab
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
