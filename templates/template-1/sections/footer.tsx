import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'
import Link from 'next/link'
import type { Footer as FooterType } from '../../types'

interface FooterProps {
  config: FooterType
}

// Icon mapping for social platforms
const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  tiktok: () => (
    <svg
      className='h-5 w-5'
      fill='currentColor'
      viewBox='0 0 24 24'
      aria-hidden='true'
    >
      <path d='M19.321 5.562a5.122 5.122 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.967 6.303 6.303 0 0 1-1.316-2.265 6.277 6.277 0 0 1-.337-1.473H13.01v12.932c0 .235-.02.468-.06.697a3.486 3.486 0 0 1-3.427 2.876 3.46 3.46 0 0 1-2.463-1.024 3.486 3.486 0 0 1 2.463-5.947c.351 0 .69.053 1.008.15V7.066a6.616 6.616 0 0 0-1.008-.078 6.629 6.629 0 0 0-4.695 1.942A6.593 6.593 0 0 0 2.886 13.6a6.611 6.611 0 0 0 1.378 4.097 6.628 6.628 0 0 0 5.259 2.565 6.63 6.63 0 0 0 4.695-1.942 6.593 6.593 0 0 0 1.942-4.671V6.978a9.368 9.368 0 0 0 5.44 1.74V5.641a6.234 6.234 0 0 1-2.279-.079z' />
    </svg>
  ),
  x: Twitter, // X is the new Twitter
  youtube: Youtube,
}

export function Footer({ config }: FooterProps) {
  return (
    <footer className='border-t bg-background'>
      <div
        className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'
        style={{ maxWidth: 'var(--container-max)' }}
      >
        <div className='grid gap-8 lg:grid-cols-4'>
          {/* Footer Columns */}
          {config.columns?.map((column) => (
            <div key={`${column.heading}-${column.links.length}`}>
              {column.heading && (
                <h3 className='mb-4 text-sm font-semibold uppercase tracking-wider'>
                  {column.heading}
                </h3>
              )}
              <ul className='space-y-3'>
                {column.links.map((link) => (
                  <li key={`${link.label}-${link.href}`}>
                    <Link
                      href={link.href}
                      className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className='mt-12 border-t pt-8'>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            {/* Legal Links and Copyright */}
            {config.legal && (
              <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6'>
                {config.legal.copyright && (
                  <p className='text-sm text-muted-foreground'>
                    {config.legal.copyright}
                  </p>
                )}
                {config.legal.links && config.legal.links.length > 0 && (
                  <nav className='flex gap-4'>
                    {config.legal.links.map((link) => (
                      <Link
                        key={`${link.label}-${link.href}`}
                        href={link.href}
                        className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                )}
              </div>
            )}

            {/* Social Links */}
            {config.social && config.social.length > 0 && (
              <div className='flex gap-4'>
                {config.social.map((social) => {
                  const IconComponent = socialIcons[social.platform]

                  return (
                    <Link
                      key={`${social.platform}-${social.href}`}
                      href={social.href}
                      className='text-muted-foreground hover:text-foreground transition-colors'
                      aria-label={
                        social.ariaLabel || `Follow us on ${social.platform}`
                      }
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <IconComponent className='h-5 w-5' />
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
