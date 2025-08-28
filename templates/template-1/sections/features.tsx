import { cx } from '@/lib/utils'
import { CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import type { FeatureCard, Features as FeaturesType, Media } from '../../types'

interface FeaturesProps {
  config: FeaturesType
}

function renderMedia(media?: Media) {
  if (!media || media.enabled === false) return null

  if (media.kind === 'image') {
    return (
      <Image
        src={media.src}
        alt={media.alt}
        width={media.width || 640}
        height={media.height || 480}
        className='w-full h-auto rounded-lg'
        loading='lazy'
        sizes={media.sizes}
      />
    )
  }

  if (media.kind === 'video') {
    return (
      <video
        src={media.src}
        poster={media.poster}
        aria-label={media.alt}
        loop={media.loop}
        autoPlay={media.autoPlay}
        muted={media.muted}
        className='w-full h-auto rounded-lg'
      />
    )
  }

  return null
}

function FeatureCardComponent({
  feature,
  isPrimary = false,
}: {
  feature: FeatureCard
  isPrimary?: boolean
}) {
  const content = (
    <>
      <div>
        <h3 className={cx(isPrimary ? 'text-2xl' : 'text-xl')}>
          {feature.title}
        </h3>
        {feature.summary && <p className='text-base'>{feature.summary}</p>}
      </div>
      {feature.bullets && feature.bullets.length > 0 && (
        <div>
          <ul className='space-y-2'>
            {feature.bullets.map((bullet) => (
              <li key={bullet} className='flex gap-2'>
                <CheckCircle2 className='h-5 w-5 text-primary shrink-0 mt-0.5' />
                <span className='text-sm'>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )

  if (isPrimary && feature.orientation === 'left') {
    return (
      <div className='overflow-hidden'>
        <div className='grid md:grid-cols-2 gap-6'>
          <div className='p-6'>{content}</div>
          {feature.media && (
            <div className='relative bg-muted p-6 flex items-center justify-center'>
              {renderMedia(feature.media)}
            </div>
          )}
        </div>
      </div>
    )
  }

  if (isPrimary && feature.orientation === 'right') {
    return (
      <div className='overflow-hidden'>
        <div className='grid md:grid-cols-2 gap-6'>
          {feature.media && (
            <div className='relative bg-muted p-6 flex items-center justify-center order-2 md:order-1'>
              {renderMedia(feature.media)}
            </div>
          )}
          <div className='p-6 order-1 md:order-2'>{content}</div>
        </div>
      </div>
    )
  }

  // For secondary cards or top orientation
  return (
    <div className='overflow-hidden h-full'>
      {feature.media && feature.orientation === 'top' && (
        <div className='relative bg-muted p-6'>
          {renderMedia(feature.media)}
        </div>
      )}
      {content}
    </div>
  )
}

export function Features({ config }: FeaturesProps) {
  return (
    <section id={config.id} className='py-16 sm:py-24 bg-background'>
      <div
        className='container mx-auto px-4 sm:px-6 lg:px-8'
        style={{ maxWidth: 'var(--container-max)' }}
      >
        {/* Heading */}
        {config.heading && (
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
              {config.heading}
            </h2>
          </div>
        )}

        <div className='space-y-12'>
          {/* Primary Feature */}
          <FeatureCardComponent feature={config.primary} isPrimary />

          {/* Secondary Features */}
          {config.secondary && config.secondary.length > 0 && (
            <div className='grid gap-6 md:grid-cols-2'>
              {config.secondary.map((feature) => (
                <FeatureCardComponent key={feature.title} feature={feature} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
