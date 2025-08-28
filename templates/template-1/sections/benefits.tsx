import { Shield, Sparkles, Zap } from 'lucide-react'
import type { Benefits as BenefitsType } from '../../types'

interface BenefitsProps {
  config: BenefitsType
}

// Icon mapping - in production, you might want to use a more comprehensive icon library
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'shield-check': Shield,
  sparkles: Sparkles,
  zap: Zap,
}

export function Benefits({ config }: BenefitsProps) {
  return (
    <section id={config.id} className='py-16 sm:py-24 bg-muted/30'>
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

        {/* Benefits Grid - flex column on mobile, grid on desktop */}
        <div
          className={`flex flex-col gap-8 ${config.items.length === 2 ? 'md:grid md:grid-cols-2' : config.items.length >= 3 ? 'md:grid md:grid-cols-3' : ''}`}
        >
          {config.items.map((benefit) => {
            const IconComponent = benefit.icon ? iconMap[benefit.icon] : null

            return (
              <div key={benefit.title} className='text-center gap-2'>
                <div>
                  {IconComponent && (
                    <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10'>
                      <IconComponent className='h-6 w-6 text-primary' />
                    </div>
                  )}
                  <h3 className='text-lg'>{benefit.title}</h3>
                </div>
                {benefit.description && <p>{benefit.description}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
