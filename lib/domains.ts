import 'server-only'

export function normalizeHostname(hostname: string): string {
  return hostname.trim().toLowerCase()
}

export function extractSubdomainFromHost(
  hostname: string,
  tenantRoot?: string,
): string | null {
  const cleanHost = hostname.split(':')[0]
  const root = (tenantRoot || 'hypany.app').split(':')[0]

  if (cleanHost.endsWith('.localhost')) {
    const candidate = cleanHost.replace('.localhost', '')
    return candidate || null
  }
  if (cleanHost.includes('---') && cleanHost.endsWith('.vercel.app')) {
    const [candidate] = cleanHost.split('---')
    return candidate || null
  }
  if (cleanHost.endsWith(`.${root}`)) {
    const candidate = cleanHost.slice(0, -(root.length + 1))
    if (candidate && candidate !== 'www') return candidate
  }
  return null
}
