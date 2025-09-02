export const serviceUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://www.hypany.com'
    : 'http://localhost:3000'

// Root domain used for published sites (subdomain routing)
export const publishedRootDomain =
  process.env.NEXT_PUBLIC_PUBLISHED_ROOT_DOMAIN || 'hypany.app'
