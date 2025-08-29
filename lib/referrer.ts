export function normalizeReferrerHost(
  ref: string | null | undefined,
): string | null {
  if (!ref) return null
  try {
    const u = new URL(ref)
    const host = (u.host || '').toLowerCase().replace(/^www\./, '')
    return host || null
  } catch {
    const s = ref.replace(/^https?:\/\//, '').split('/')[0]
    const host = (s || '').toLowerCase().replace(/^www\./, '')
    return host || null
  }
}
