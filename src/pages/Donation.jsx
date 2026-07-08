import { useSite } from '../components/Layout'
import { PageHero } from '../components/Page'

export default function Donation() {
  const { content } = useSite()

  return (
    <>
      <PageHero kicker="Donate to ECSF" title="Support our community" />

      <section className="donation-section">
        <div>
          <p className="section-kicker">Why give</p>
          <h2>{content.donationTitle}</h2>
          <p>{content.donationText}</p>
          {content.donationDisclaimer && <p className="donation-disclaimer">{content.donationDisclaimer}</p>}
        </div>

        <div className="donation-form">
          <p>Donations are processed securely through Square.</p>
          <a
            className="button primary"
            href={content.donationCheckoutUrl}
            target="_blank"
            rel="noreferrer"
          >
            Donate Now
          </a>
        </div>
      </section>
    </>
  )
}
