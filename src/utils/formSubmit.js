export async function submitFormToEmail({ to, subject, fields, replyTo }) {
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
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

  if (!response.ok) {
    throw new Error(data.message || 'Unable to send your submission. Please try again.')
  }

  return data
}

export function formDataToObject(formData) {
  return Object.fromEntries(formData.entries())
}
