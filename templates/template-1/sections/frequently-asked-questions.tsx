'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/atoms/accordion'
import type { FrequentlyAskedQuestions as FAQType } from '../../types'

interface FrequentlyAskedQuestionsProps {
  config: FAQType
}

export function FrequentlyAskedQuestions({
  config,
}: FrequentlyAskedQuestionsProps) {
  const defaultValues = config.items
    .filter((item) => item.expanded)
    .map((item) => item.question)

  return (
    <section id={config.id} className='py-16 sm:py-24 bg-muted/30'>
      <div
        className='container mx-auto px-4 sm:px-6 lg:px-8'
        style={{ maxWidth: 'var(--container-max)' }}
      >
        <div className='mx-auto max-w-3xl'>
          {/* Heading */}
          {config.heading && (
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold tracking-tight sm:text-4xl'>
                {config.heading}
              </h2>
            </div>
          )}

          {/* FAQ Accordion */}
          <Accordion
            type='multiple'
            defaultValue={defaultValues}
            className='w-full'
          >
            {config.items.map((item) => (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger className='text-left'>
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className='text-muted-foreground'>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
