export type RangeInput = {
  from?: string
  to?: string
  range?: '7d' | '30d' | '90d' | string
}

export function resolveRange(query: RangeInput): { from: Date; to: Date } {
  const now = new Date()
  const end = query.to ? new Date(query.to) : now
  let start: Date
  if (query.from) {
    start = new Date(query.from)
  } else {
    const r = String(query.range || '30d')
    const days = r === '7d' ? 7 : r === '90d' ? 90 : 30
    start = new Date(end.getTime() - days * 24 * 60 * 60 * 1000)
  }
  return { from: start, to: end }
}
