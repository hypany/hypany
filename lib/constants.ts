// Centralized constants for limits, TTLs, thresholds, etc.

// Plan/usage thresholds (kept for UI metrics)
export const WAITLIST_THRESHOLD = 100

// Email verification TTL (1 hour)
export const EMAIL_VERIFICATION_TOKEN_TTL_MS = 60 * 60 * 1000

// Analytics/windows (days)
export const WINDOW_7D = 7
export const WINDOW_14D = 14
export const WINDOW_30D = 30

// HTTP status codes
export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  CREATED: 201,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
  NOT_FOUND: 404,
  OK: 200,
  PAYMENT_REQUIRED: 402,
  UNAUTHORIZED: 401,
} as const

// ULID validation pattern (Crockford base32 without I,L,O,U)
export const ULID_PATTERN = '^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$'

// Bot detection
export const BOT_UA_PATTERN =
  'bot|crawl|spider|bingpreview|googlebot|yandex|baiduspider|duckduckbot|slurp|semrush|ahrefs|facebookexternalhit|whatsapp|telegrambot|pingdom|headlesschrome|phantomjs'
export const BOT_UA_REGEX = new RegExp(BOT_UA_PATTERN, 'i')
