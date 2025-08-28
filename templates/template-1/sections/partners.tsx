import Image from 'next/image'
import Link from 'next/link'
import type { Partners } from '../../types'

interface PartnersProps {
  config: Partners
}

export function PartnersSection({ config }: PartnersProps) {
  return (
    <section id={config.id} className='py-12 sm:py-16 bg-muted/30'>
      <div
        className='container mx-auto px-4 sm:px-6 lg:px-8'
        style={{ maxWidth: 'var(--container-max)' }}
      >
        {/* Caption */}
        {config.caption && (
          <p className='text-center text-sm text-muted-foreground mb-8'>
            {config.caption}
          </p>
        )}

        {/* Logo Grid */}
        <div className='flex flex-wrap items-center justify-center gap-8 sm:gap-12'>
          {config.logos.map((logo) => {
            const logoElement = (
              <Image
                src={logo.logoSrc}
                alt={logo.alt || `${logo.name} logo`}
                width={120}
                height={48}
                className='h-8 sm:h-10 w-auto opacity-60 hover:opacity-100 transition-opacity grayscale'
              />
            )

            if (logo.href) {
              return (
                <Link
                  key={`${logo.name}-${logo.logoSrc}`}
                  href={logo.href}
                  className='flex items-center'
                  aria-label={`Visit ${logo.name}`}
                >
                  {logoElement}
                </Link>
              )
            }

            return (
              <div
                key={`${logo.name}-${logo.logoSrc}`}
                className='flex items-center'
              >
                {logoElement}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
