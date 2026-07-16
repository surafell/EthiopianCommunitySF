import { useEffect } from 'react'
import CheckoutEmbed from './CheckoutEmbed'

export default function DonateModal({ open, url, title = 'Donate to ECSF', description, onClose }) {
  useEffect(() => {
    if (!open) {
      return undefined
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!open) {
    return null
  }

  return (
    <div className="donate-modal" role="presentation" onClick={onClose}>
      <div
        className="donate-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="donate-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="donate-modal-head">
          <div>
            <p className="donation-summary-label">Secure checkout</p>
            <h2 id="donate-modal-title">{title}</h2>
            <p>
              {description || 'Powered by Square. Complete your donation without leaving the site.'}
            </p>
          </div>
          <button className="donate-modal-close" type="button" aria-label="Close donation checkout" onClick={onClose}>
            ×
          </button>
        </div>

        <CheckoutEmbed key={url} url={url} title={title} />
      </div>
    </div>
  )
}
