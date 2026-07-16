export default function CheckoutEmbed({ url, title, className = '' }) {
  return (
    <div className={`checkout-embed-panel ${className}`.trim()}>
      <iframe className="checkout-embed-frame" src={url} title={title} loading="lazy" />
      <p className="checkout-embed-fallback">
        Having trouble with checkout?{' '}
        <a href={url} target="_blank" rel="noreferrer">
          Open in a new tab
        </a>
      </p>
    </div>
  )
}
