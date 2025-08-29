// Shared brand styles for React Email templates
// Keep these minimal and inline-safe for broad email client support.

export const colors = {
  background: '#ffffff',
  border: '#e5e7eb',
  brand: '#3b82f6', // Tailwind blue-500
  brandDark: '#2563eb', // blue-600 for hover
  fg: '#1a1a1a',
  muted: '#666666',
}

export const main = {
  backgroundColor: colors.background,
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
}

export const container = {
  backgroundColor: '#ffffff',
  border: `1px solid ${colors.border}`,
  borderRadius: '8px',
  margin: '0 auto',
  maxWidth: '600px',
  padding: '32px 24px',
}

export const heading = {
  color: colors.fg,
  fontSize: '18px',
  fontWeight: 600,
  lineHeight: '28px',
  margin: '0 0 12px',
}

export const text = {
  color: colors.fg,
  fontSize: '15px',
  lineHeight: '24px',
  margin: '0 0 16px',
}

export const smallText = {
  color: colors.muted,
  fontSize: '13px',
  lineHeight: '20px',
  margin: '24px 0 16px',
}

export const mono = {
  color: colors.muted,
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: '12px',
  wordBreak: 'break-all' as const,
}

export const separator = {
  color: colors.border,
  fontSize: '15px',
  lineHeight: '24px',
  margin: '24px 0 16px',
}

export const footer = {
  color: colors.muted,
  fontSize: '13px',
  lineHeight: '20px',
  margin: '0',
}

export const buttonPrimary = {
  backgroundColor: colors.brand,
  borderRadius: '6px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '22px',
  padding: '10px 16px',
  textDecoration: 'none',
}
