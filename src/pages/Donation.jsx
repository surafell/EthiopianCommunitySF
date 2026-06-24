import { useState } from 'react'
import { useSite } from '../components/Layout'
import { PageHero } from '../components/Page'

export default function Donation() {
  const { content } = useSite()
  const [amount, setAmount] = useState('50')

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

        <form className="donation-form" onSubmit={(event) => event.preventDefault()}>
          <label>
            First name
            <input type="text" name="firstName" placeholder="First name" />
          </label>
          <label>
            Last name
            <input type="text" name="lastName" placeholder="Last name" />
          </label>
          <label>
            Email
            <input type="email" name="email" placeholder="you@example.com" />
          </label>
          <label>
            Amount
            <select name="amount" value={amount} onChange={(event) => setAmount(event.target.value)}>
              <option value="25">$25</option>
              <option value="50">$50</option>
              <option value="100">$100</option>
              <option value="250">$250</option>
              <option value="custom">Custom amount</option>
            </select>
          </label>
          {amount === 'custom' && (
            <label>
              Custom amount (USD)
              <input
                type="number"
                name="customAmount"
                min="1"
                step="1"
                inputMode="numeric"
                placeholder="Enter amount"
                autoFocus
              />
            </label>
          )}
          <button className="button primary" type="submit">
            Continue to Payment
          </button>
        </form>
      </section>
    </>
  )
}
