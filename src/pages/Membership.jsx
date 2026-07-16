import { useSite } from '../components/Layout'
import { PageHero } from '../components/Page'
import { formatMembershipAmount, resolveCheckoutUrl } from '../utils/checkout'

export default function Membership() {
  const { content, openDonate } = useSite()

  function openMembershipCheckout(tier) {
    const formattedAmount = formatMembershipAmount(tier?.amount)
    const checkoutUrl = resolveCheckoutUrl({
      defaultUrl: content.donationCheckoutUrl,
      tier,
      amount: tier?.amount ?? null,
    })

    if (!checkoutUrl || typeof openDonate !== 'function') {
      if (tier?.checkoutUrl) {
        window.open(tier.checkoutUrl, '_blank', 'noopener,noreferrer')
      }
      return
    }

    openDonate({
      url: checkoutUrl,
      title: formattedAmount ? `Pay ${formattedAmount} membership` : `Join — ${tier.name}`,
      description: formattedAmount
        ? `Secure Square checkout for ${tier.name} (${formattedAmount}).`
        : `Secure Square checkout for ${tier.name}.`,
    })
  }

  function handleJoinNow(membership) {
    if (membership.checkoutUrl) {
      openMembershipCheckout(membership)
      return
    }

    openDonate()
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
                <button className="button secondary" type="button" onClick={() => handleJoinNow(membership)}>
                  Join Now
                </button>
              )}
            </article>
          ))}
        </div>
        {content.membershipNote && <p className="fine-print">{content.membershipNote}</p>}
      </section>
    </>
  )
}
