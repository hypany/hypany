export const serviceUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://www.hypany.com'
:    'http://localhost:3000'
