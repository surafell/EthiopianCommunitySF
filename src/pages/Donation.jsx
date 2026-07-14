import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useSite } from '../components/Layout'
import { PageHero } from '../components/Page'
import { findMembershipTier, formatMembershipAmount, resolveCheckoutUrl } from '../utils/checkout'

export default function Donation() {
  const { content } = useSite()
  const location = useLocation()
  const membershipState = location.state?.fromMembership ? location.state : null
  const selectedTier = membershipState
    ? findMembershipTier(content.memberships, membershipState.membershipTier)
    : null
  const membershipAmount = membershipState?.membershipAmount ?? selectedTier?.amount ?? null
  const formattedAmount = formatMembershipAmount(membershipAmount)
  const isLowIncomeTier = membershipState?.membershipTier === 'Unemployment / Low-Income'

  const checkoutUrl = useMemo(() => {
    if (!membershipState) {
      return content.donationCheckoutUrl
    }

    return resolveCheckoutUrl({
      defaultUrl: content.donationCheckoutUrl,
      tier: selectedTier,
      amount: membershipAmount,
    })
  }, [content.donationCheckoutUrl, membershipAmount, membershipState, selectedTier])

  return (
    <>
      <PageHero
        kicker={membershipState ? 'Complete Membership' : 'Donate to ECSF'}
        title={membershipState ? 'Pay your membership dues' : 'Support our community'}
        intro={
          membershipState
            ? formattedAmount
              ? `Finish your ${membershipState.membershipTier} registration. Your checkout is set to ${formattedAmount}.`
              : `Finish your ${membershipState.membershipTier} registration with secure payment below.`
            : content.donationText
        }
      />

      <section className="section donation-page">
        <div className="donation-layout">
          {membershipState ? (
            <div className="donation-summary-card">
              <p className="donation-summary-label">Registration received</p>
              <h2>Thank you, {membershipState.memberName}</h2>
              <p>
                Your <strong>{membershipState.membershipTier}</strong> membership details have been submitted.
                Complete checkout below to activate your membership.
              </p>
              {formattedAmount && (
                <p className="donation-amount-due">
                  Membership amount: <strong>{formattedAmount}</strong>
                </p>
              )}
              {formattedAmount && !selectedTier?.checkoutUrl && (
                <p className="donation-note">
                  If the amount field below is empty, enter <strong>{formattedAmount}</strong> to complete your
                  membership payment.
                </p>
              )}
              {isLowIncomeTier && (
                <p className="donation-note">
                  If you are applying for reduced or no-fee membership, ECSF will review your eligibility. You
                  may still continue below if payment is required.
                </p>
              )}
              {membershipState.emailPending && (
                <p className="donation-note">
                  We could not confirm your registration email right now. You can still complete payment below,
                  and ECSF will follow up if needed.
                </p>
              )}
            </div>
          ) : (
            <div className="donation-summary-card">
              <p className="donation-summary-label">Why give</p>
              <h2>{content.donationTitle}</h2>
              {content.donationDisclaimer && <p className="donation-note">{content.donationDisclaimer}</p>}
            </div>
          )}

          <div className="donation-checkout-card">
            <div className="donation-checkout-head">
              <div>
                <h3>{membershipState ? 'Membership payment' : 'Make a donation'}</h3>
                <p>
                  {formattedAmount
                    ? `Secure checkout powered by Square · ${formattedAmount} selected`
                    : 'Secure checkout powered by Square'}
                </p>
              </div>
              <span className="donation-secure-badge" aria-hidden="true">
                Secure
              </span>
            </div>

            <div className="donation-embed-wrap">
              <iframe
                key={checkoutUrl}
                className="donation-embed"
                src={checkoutUrl}
                title={membershipState ? 'ECSF membership payment checkout' : 'ECSF donation checkout'}
                loading="lazy"
              />
            </div>

            <p className="donation-embed-fallback">
              Having trouble with the checkout?{' '}
              <a href={checkoutUrl} target="_blank" rel="noreferrer">
                Open payment page in a new tab
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
