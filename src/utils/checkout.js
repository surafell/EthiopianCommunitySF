export function resolveCheckoutUrl({ defaultUrl, tier, amount }) {
  if (tier?.checkoutUrl) {
    return tier.checkoutUrl
  }

  if (!amount || amount <= 0) {
    return defaultUrl
  }

  try {
    const url = new URL(defaultUrl)
    url.searchParams.set('amount', String(amount))
    url.searchParams.set('amount_money', String(amount * 100))
    return url.toString()
  } catch {
    return defaultUrl
  }
}

export function findMembershipTier(memberships, tierName) {
  return memberships?.find((membership) => membership.name === tierName) ?? null
}

export function formatMembershipAmount(amount) {
  if (!amount || amount <= 0) {
    return null
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}
