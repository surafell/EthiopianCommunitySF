import { useLocation } from 'react-router-dom'
import { useSite } from '../components/Layout'
import { PageHero } from '../components/Page'

export default function Donation() {
  const { content } = useSite()
  const location = useLocation()
  const membershipState = location.state?.fromMembership ? location.state : null
  const isLowIncomeTier = membershipState?.membershipTier === 'Unemployment / Low-Income'

  return (
    <>
      <PageHero
        kicker={membershipState ? 'Complete Membership' : 'Donate to ECSF'}
        title={membershipState ? 'Pay your membership dues' : 'Support our community'}
      />

      <section className="donation-section">
        <div>
          {membershipState ? (
            <>
              <p className="section-kicker">Almost done</p>
              <h2>Thank you, {membershipState.memberName}.</h2>
              <p>
                Your {membershipState.membershipTier} registration has been submitted. Complete your payment
                below to finalize your ECSF membership.
              </p>
              {isLowIncomeTier && (
                <p className="donation-membership-note">
                  If you are applying for reduced or no-fee membership, ECSF will review your eligibility. You
                  may still continue below if payment is required.
                </p>
              )}
              {membershipState.emailPending && (
                <p className="donation-membership-note">
                  We could not confirm your registration email right now. You can still complete payment below,
                  and ECSF will follow up if needed.
                </p>
              )}
            </>
          ) : (
            <>
              <p className="section-kicker">Why give</p>
              <h2>{content.donationTitle}</h2>
              <p>{content.donationText}</p>
            </>
          )}
          {content.donationDisclaimer && <p className="donation-disclaimer">{content.donationDisclaimer}</p>}
        </div>

        <div className="donation-form">
          <p>Payments are processed securely through Square.</p>
          <a
            className="button primary"
            href={content.donationCheckoutUrl}
            target="_blank"
            rel="noreferrer"
          >
            {membershipState ? 'Pay Membership Dues' : 'Donate Now'}
          </a>
        </div>
      </section>
    </>
  )
}
