export const swaggerInfo = {
  description: 'API for hypothesis validation platform',
  title: 'Hypany API',
  version: '1.0.0',
}

export const swaggerTags = [
  { description: 'API service status', name: 'Health' },
  { description: 'Authentication endpoints', name: 'Auth' },
  {
    description: 'Core hypothesis management and lifecycle',
    name: 'Hypotheses',
  },
  {
    description: 'Landing page configuration and settings',
    name: 'Landing Pages',
  },
  {
    description: 'Block management for landing pages',
    name: 'Landing Page Blocks',
  },
  { description: 'Waitlist configuration and settings', name: 'Waitlists' },
  { description: 'Waitlist entry management', name: 'Waitlist Entries' },
  {
    description: 'Analytics and export for waitlists',
    name: 'Waitlist Analytics',
  },
  { description: 'Public-facing endpoints (no auth required)', name: 'Public' },
  { description: 'File & image uploads', name: 'Uploads' },
]
