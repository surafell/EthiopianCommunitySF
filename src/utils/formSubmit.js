const SUBMIT_TIMEOUT_MS = 10000

export async function submitFormToEmail({ to, subject, fields, replyTo }) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS)

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        _subject: subject,
        _template: 'table',
        _captcha: 'false',
        ...(replyTo ? { _replyto: replyTo } : {}),
        ...fields,
      }),
    })

    let data = {}
    try {
      data = await response.json()
    } catch {
      data = {}
    }

    if (!response.ok || data.success === 'false' || data.success === false) {
      throw new Error(
        data.message || 'Unable to send your submission right now. Please try again or email us directly.',
      )
    }

    return data
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Submission timed out. Please check your connection and try again.')
    }
    throw error
  } finally {
    clearTimeout(timeoutId)
  }
}

export function formDataToObject(formData) {
  return Object.fromEntries(formData.entries())
}
