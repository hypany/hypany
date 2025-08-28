import reservedSubdomains from 'reserved-subdomains'
import reservedUsernames from 'reserved-usernames'

// Additional reserved subdomains specific to our application
const CUSTOM_RESERVED = new Set([
  'app',
  'www',
  'api',
  'admin',
  'cname',
  'vercel-dns',
  'vercel',
  'dns',
  'dashboard',
  'support',
  'help',
  'about',
  'blog',
  'news',
  'legal',
  'privacy',
  'terms',
  'security',
  'status',
  'docs',
  'documentation',
  'developer',
  'developers',
  'hypany',
  'mail',
  'email',
  'ftp',
  'ssh',
  'sftp',
  'cdn',
  'assets',
  'static',
  'images',
  'img',
  'media',
  'files',
  'download',
  'downloads',
])

const MIN_SLUG_LENGTH = 3
const MAX_SLUG_LENGTH = 63

// DNS label validation per RFC 1123
const SLUG_PATTERN = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/

export function validateSlug(slug: string): {
  valid: boolean
  error?: string
} {
  if (!slug) {
    return { error: 'Subdomain is required', valid: false }
  }

  // Normalize to lowercase for validation
  const normalizedSlug = slug.toLowerCase().trim()

  if (normalizedSlug.length < MIN_SLUG_LENGTH) {
    return {
      error: `Subdomain must be at least ${MIN_SLUG_LENGTH} characters`,
      valid: false,
    }
  }

  if (normalizedSlug.length > MAX_SLUG_LENGTH) {
    return {
      error: `Subdomain must be no more than ${MAX_SLUG_LENGTH} characters`,
      valid: false,
    }
  }

  if (!SLUG_PATTERN.test(normalizedSlug)) {
    return {
      error:
        'Subdomain must start and end with a letter or number, and can only contain lowercase letters, numbers, and hyphens',
      valid: false,
    }
  }

  if (normalizedSlug.includes('--')) {
    return {
      error: 'Subdomain cannot contain consecutive hyphens',
      valid: false,
    }
  }

  // Check our custom reserved list
  if (CUSTOM_RESERVED.has(normalizedSlug)) {
    return { error: 'This subdomain is reserved', valid: false }
  }

  // Check reserved-subdomains package
  if (reservedSubdomains.isNotValid(normalizedSlug)) {
    return { error: 'This subdomain is reserved', valid: false }
  }

  // Check reserved-usernames package
  if (reservedUsernames.includes(normalizedSlug)) {
    return { error: 'This subdomain is reserved', valid: false }
  }

  return { valid: true }
}

export function normalizeSlug(slug: string): string {
  // Simple normalization: trim and lowercase only
  // No character substitution that could corrupt the input
  return slug.trim().toLowerCase()
}
