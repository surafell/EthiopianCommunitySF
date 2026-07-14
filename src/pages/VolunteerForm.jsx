import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FormFeedback } from '../components/FormFeedback'
import { useSite } from '../components/Layout'
import { Breadcrumbs, PageHero } from '../components/Page'
import { formDataToObject, submitFormToEmail } from '../utils/formSubmit'

const volunteerAreas = [
  { id: 'events', en: 'Events & Community Gatherings', am: 'ዝግጅቶች እና የማህበረሰብ መሰብሰቢያዎች' },
  { id: 'youth', en: 'Youth & Education', am: 'ወጣቶች እና ትምህርት' },
  { id: 'culture', en: 'Culture, Arts & Heritage', am: 'ባህል፣ ጥበብ እና ቅርስ' },
  { id: 'elder', en: 'Elder Support', am: 'የአረጋውያን ድጋፍ' },
  { id: 'newcomer', en: 'Newcomer / Immigrant Support', am: 'የአዲስ መጪዎች / ስደተኞች ድጋፍ' },
  { id: 'outreach', en: 'Outreach, Flyers & Posters', am: 'ማስታወቂያ፣ ፍላየር እና ፖስተር ስርጭት' },
  { id: 'media', en: 'Website, Social Media & Communication', am: 'ድረ-ገጽ፣ ማህበራዊ ሚዲያ እና ግንኙነት' },
  { id: 'translation', en: 'Translation / Interpretation', am: 'ትርጉም / አስተርጓሚነት' },
  { id: 'fundraising', en: 'Fundraising & Grant Support', am: 'የገንዘብ ማሰባሰብ እና የግራንት ድጋፍ' },
  { id: 'health', en: 'Health & Wellness Resources', am: 'የጤና እና ደህንነት መረጃ ድጋፍ' },
  { id: 'legal', en: 'Legal / Social Service Referrals', am: 'የህግ / ማህበራዊ አገልግሎት መምሪያ ድጋፍ' },
  { id: 'admin', en: 'Administration & Documentation', am: 'አስተዳደር እና ሰነድ አያያዝ' },
  { id: 'logistics', en: 'Venue, Logistics & Setup', am: 'ቦታ፣ ሎጂስቲክስ እና ዝግጅት' },
  { id: 'other', en: 'Other', am: 'ሌላ' },
]

const availabilityOptions = [
  { id: 'weekdays', en: 'Weekdays', am: 'የሳምንት ቀናት' },
  { id: 'weekends', en: 'Weekends', am: 'ቅዳሜና እሁድ' },
  { id: 'morning', en: 'Morning', am: 'ጠዋት' },
  { id: 'afternoon', en: 'Afternoon', am: 'ከሰዓት በኋላ' },
  { id: 'evening', en: 'Evening', am: 'ማታ' },
  { id: 'on-call', en: 'As needed / On call', am: 'እንደ አስፈላጊነቱ' },
]

function BilingualLabel({ en, am }) {
  return (
    <span className="bilingual-label">
      <span className="bilingual-en">{en}</span>
      <span className="bilingual-am">{am}</span>
    </span>
  )
}

function CheckboxOption({ id, name, value, checked, onChange, en, am }) {
  return (
    <label className="checkbox-option" htmlFor={id}>
      <input id={id} type="checkbox" name={name} value={value} checked={checked} onChange={onChange} />
      <span className="checkbox-option-text">
        <span>{en}</span>
        <span className="checkbox-option-am">{am}</span>
      </span>
    </label>
  )
}

export default function VolunteerForm() {
  const { content } = useSite()
  const [submitted, setSubmitted] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('idle')
  const [submitError, setSubmitError] = useState('')
  const [areas, setAreas] = useState([])
  const [availability, setAvailability] = useState([])
  const [showOtherArea, setShowOtherArea] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  function labelList(ids, options) {
    return ids.map((id) => options.find((option) => option.id === id)?.en || id).join(', ')
  }

  function toggleValue(list, setList, value) {
    setList((current) => (current.includes(value) ? current.filter((item) => item !== value) : [...current, value]))
  }

  function handleAreaChange(event) {
    const { value, checked } = event.target
    toggleValue(areas, setAreas, value)
    if (value === 'other') {
      setShowOtherArea(checked)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const data = formDataToObject(new FormData(form))

    setSubmitStatus('submitting')
    setSubmitError('')

    try {
      await submitFormToEmail({
        to: content.contactEmail,
        subject: 'ECSF Volunteer Application',
        replyTo: data.email,
        fields: {
          'Form Type': 'Volunteer Application',
          Date: data.date,
          'Full Name': data.fullName,
          Email: data.email,
          Phone: data.phone,
          'City / Area': data.city,
          'ECSF Member': data.member,
          'Volunteer Areas': labelList(areas, volunteerAreas) || 'None selected',
          'Other Area': data.otherArea || '',
          Availability: labelList(availability, availabilityOptions) || 'None selected',
          Skills: data.skills || '',
          Motivation: data.motivation || '',
          Comments: data.comments || '',
          Signature: data.signature,
          'Signature Date': data.signatureDate,
        },
      })
      setSubmitted(true)
      setSubmitStatus('success')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      setSubmitStatus('error')
      setSubmitError(error.message)
    }
  }

  return (
    <>
      <PageHero
        kicker="Serve • Embrace • Welcome"
        title="Volunteer Interest & Service Request Form"
        intro="አገልግል • አቅፍ • ተቀበል"
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
          <p className="volunteer-form-title">
            Volunteer Interest & Service Request Form
            <span>የበጎ ፈቃደኝነት ፍላጎት እና አገልግሎት መመዝገቢያ ቅጽ</span>
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

        {submitted ? (
          <div className="volunteer-success">
            <h2>Thank you for your interest!</h2>
            <p>
              Your volunteer application has been sent to{' '}
              <a href={`mailto:${content.contactEmail}`}>{content.contactEmail}</a>. ECSF leadership or the
              volunteer coordinator will follow up with you soon.
            </p>
            <p>የበጎ ፈቃድ ማመልከቻዎ ተልኳል። ECSF አመራር በቅርቡ ይገናኝዎታል።</p>
            <Link className="button secondary" to="/about/volunteers">
              Back to Volunteers
            </Link>
          </div>
        ) : (
          <form className="volunteer-form" onSubmit={handleSubmit}>
            <fieldset className="form-section">
              <legend>
                <span>1. Volunteer Information</span>
                <span className="legend-am">የበጎ ፈቃደኛ መረጃ</span>
              </legend>

              <div className="form-grid two-col">
                <label>
                  <BilingualLabel en="Date" am="ቀን" />
                  <input type="date" name="date" required />
                </label>
                <label>
                  <BilingualLabel en="Full Name" am="ሙሉ ስም" />
                  <input type="text" name="fullName" required />
                </label>
                <label>
                  <BilingualLabel en="Email Address" am="ኢሜይል" />
                  <input type="email" name="email" required />
                </label>
                <label>
                  <BilingualLabel en="Cell Phone" am="ስልክ ቁጥር" />
                  <input type="tel" name="phone" required />
                </label>
                <label>
                  <BilingualLabel en="City / Area" am="ከተማ / አካባቢ" />
                  <input type="text" name="city" required />
                </label>
                <label>
                  <BilingualLabel en="Are you an ECSF member?" am="የECSF አባል ነዎት?" />
                  <select name="member" defaultValue="" required>
                    <option value="" disabled>
                      Select / ይምረጡ
                    </option>
                    <option value="yes">Yes / አዎ</option>
                    <option value="no">No / አይ</option>
                    <option value="pending">Applying / በመመዝገብ ላይ</option>
                  </select>
                </label>
              </div>
            </fieldset>

            <fieldset className="form-section">
              <legend>
                <span>2. Areas Where You Would Like to Volunteer</span>
                <span className="legend-am">በምን ዘርፍ መሳተፍ ይፈልጋሉ?</span>
              </legend>

              <div className="checkbox-grid">
                {volunteerAreas.map((area) => (
                  <CheckboxOption
                    key={area.id}
                    id={`area-${area.id}`}
                    name="areas"
                    value={area.id}
                    checked={areas.includes(area.id)}
                    onChange={handleAreaChange}
                    en={area.en}
                    am={area.am}
                  />
                ))}
              </div>

              {showOtherArea && (
                <label className="other-field">
                  <BilingualLabel en="Please specify other area" am="ሌላውን ዘርፍ ይግለጹ" />
                  <input type="text" name="otherArea" />
                </label>
              )}
            </fieldset>

            <fieldset className="form-section">
              <legend>
                <span>3. Availability</span>
                <span className="legend-am">የሚመችዎት ጊዜ</span>
              </legend>

              <p className="field-help">Select all that apply / የሚመለከትዎትን ይምረጡ</p>

              <div className="checkbox-grid compact">
                {availabilityOptions.map((option) => (
                  <CheckboxOption
                    key={option.id}
                    id={`avail-${option.id}`}
                    name="availability"
                    value={option.id}
                    checked={availability.includes(option.id)}
                    onChange={(event) => toggleValue(availability, setAvailability, event.target.value)}
                    en={option.en}
                    am={option.am}
                  />
                ))}
              </div>

              <label>
                <BilingualLabel
                  en="Skills, experience, or resources you can offer"
                  am="ሊያበረክቱ የሚችሉት ችሎታ፣ ልምድ ወይም ሀብት"
                />
                <textarea name="skills" rows={4} />
              </label>

              <label>
                <BilingualLabel en="Why would you like to volunteer with ECSF?" am="ከECSF ጋር በበጎ ፈቃድ ለምን መስራት ይፈልጋሉ?" />
                <textarea name="motivation" rows={4} />
              </label>

              <label>
                <BilingualLabel en="Additional comments or preferred role" am="ተጨማሪ አስተያየት ወይም የሚመርጡት ሚና" />
                <textarea name="comments" rows={4} />
              </label>
            </fieldset>

            <fieldset className="form-section">
              <legend>
                <span>Volunteer Understanding</span>
                <span className="legend-am">የበጎ ፈቃደኛ ማረጋገጫ</span>
              </legend>

              <div className="volunteer-agreement">
                <p>
                  By submitting this form, I confirm that the information provided is accurate and that I am
                  willing to support ECSF in a respectful, non-political, non-religious, inclusive, and
                  community-focused manner. Volunteer assignments may be reviewed and approved by ECSF
                  leadership based on community needs.
                </p>
                <p>
                  ይህን ቅጽ በመሙላት የሰጠሁት መረጃ ትክክል መሆኑን እና ECSFን በክብር፣ ከፖለቲካና ከሃይማኖት ነፃ፣ ሁሉን አቀፍ እና
                  ማህበረሰብ ተኮር በሆነ መንገድ ለመደገፍ ፈቃደኛ መሆኔን አረጋግጣለሁ። የበጎ ፈቃድ ምደባዎች በማህበረሰብ ፍላጎት መሠረት
                  በECSF አመራር ሊገመገሙና ሊፀድቁ ይችላሉ።
                </p>
              </div>

              <label className="checkbox-option agreement-check">
                <input
                  type="checkbox"
                  name="agreement"
                  checked={confirmed}
                  onChange={(event) => setConfirmed(event.target.checked)}
                  required
                />
                <span className="checkbox-option-text">
                  <span>I agree to the volunteer understanding above</span>
                  <span className="checkbox-option-am">ከላይ በተገለጸው የበጎ ፈቃደኛ ማረጋገጫ ጋር እስማማለሁ</span>
                </span>
              </label>

              <div className="form-grid two-col signature-row">
                <label>
                  <BilingualLabel en="Volunteer Signature" am="የበጎ ፈቃደኛ ፊርማ" />
                  <input type="text" name="signature" placeholder="Type your full name" required />
                </label>
                <label>
                  <BilingualLabel en="Date" am="ቀን" />
                  <input type="date" name="signatureDate" required />
                </label>
              </div>
            </fieldset>

            <div className="volunteer-form-actions">
              <button
                className="button primary"
                type="submit"
                disabled={!confirmed || submitStatus === 'submitting'}
              >
                {submitStatus === 'submitting' ? 'Sending…' : 'Submit Volunteer Application'}
              </button>
              <FormFeedback status={submitStatus} error={submitError} />
              <p className="volunteer-submit-note">
                Please submit this form to ECSF leadership or the designated volunteer coordinator.
                <span>እባክዎ ይህን ቅጽ ለECSF አመራር ወይም ለተመደበው የበጎ ፈቃደኞች አስተባባሪ ያስረክቡ።</span>
              </p>
            </div>
          </form>
        )}

        <div className="volunteer-submission-info">
          <h3>Volunteer Application Submission / የበጎ ፈቃድ ማመልከቻ ማስገቢያ</h3>
          <div className="submission-columns">
            <div>
              <p>
                <strong>English:</strong> Submit completed forms to:{' '}
                <a href="mailto:info@ethiopiancommunitysf.org">info@ethiopiancommunitysf.org</a>
              </p>
              <p>
                OR complete the form online at:{' '}
                <a href="https://www.ethiopiancommunitysf.org/" target="_blank" rel="noreferrer">
                  https://www.ethiopiancommunitysf.org/
                </a>
              </p>
            </div>
            <div>
              <p>
                <strong>አማርኛ:</strong> የተሞላውን ቅጽ ወደ{' '}
                <a href="mailto:info@ethiopiancommunitysf.org">info@ethiopiancommunitysf.org</a> በኢሜይል ይላኩ፤
                ወይም በድረ-ገጻችን{' '}
                <a href="https://www.ethiopiancommunitysf.org/" target="_blank" rel="noreferrer">
                  https://www.ethiopiancommunitysf.org/
                </a>{' '}
                ላይ በመግባት በመስመር ላይ ያስገቡ።
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
