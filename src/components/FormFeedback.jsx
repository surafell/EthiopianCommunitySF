export function FormFeedback({ status, error, successMessage }) {
  if (status === 'submitting') {
    return <p className="form-status">Sending…</p>
  }

  if (status === 'error' && error) {
    return <p className="form-error">{error}</p>
  }

  if (status === 'success' && successMessage) {
    return <p className="form-success">{successMessage}</p>
  }

  return null
}
