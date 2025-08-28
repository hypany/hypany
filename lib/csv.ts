export function escapeCsvCell(value: unknown): string {
  const s = value == null ? '' : String(value)
  // Always quote and escape quotes
  return `"${s.replace(/"/g, '""')}"`
}

export function toCsv(headers: string[], rows: Array<Array<unknown>>): string {
  const headerLine = headers.join(',')
  const body = rows.map((r) => r.map(escapeCsvCell).join(',')).join('\n')
  return body ? `${headerLine}\n${body}` : `${headerLine}\n`
}
