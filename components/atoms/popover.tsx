"use client"

import * as PopoverPrimitives from '@radix-ui/react-popover'
import { motion } from 'framer-motion'
import React from 'react'

import { cx } from '@/lib/utils'

const Popover = (
  props: React.ComponentPropsWithoutRef<typeof PopoverPrimitives.Root>,
) => {
  return <PopoverPrimitives.Root {...props} />
}

Popover.displayName = 'Popover'

const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitives.Trigger>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitives.Trigger>
>((props, forwardedRef) => {
  return <PopoverPrimitives.Trigger ref={forwardedRef} {...props} />
})

PopoverTrigger.displayName = 'PopoverTrigger'

const PopoverAnchor = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitives.Anchor>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitives.Anchor>
>((props, forwardedRef) => {
  return <PopoverPrimitives.Anchor ref={forwardedRef} {...props} />
})

PopoverAnchor.displayName = 'PopoverAnchor'

const PopoverClose = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitives.Close>
>((props, forwardedRef) => {
  return <PopoverPrimitives.Close ref={forwardedRef} {...props} />
})

PopoverClose.displayName = 'PopoverClose'

type ContentProps = React.ComponentPropsWithoutRef<
  typeof PopoverPrimitives.Content
>

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitives.Content>,
  ContentProps
>(
  (
    {
      className,
      sideOffset = 10,
      side = 'bottom',
      align = 'center',
      collisionPadding,
      avoidCollisions = true,
      ...props
    }: ContentProps,
    forwardedRef,
  ) => {
    return (
      <PopoverPrimitives.Portal>
        <PopoverPrimitives.Content asChild forceMount
          sideOffset={sideOffset}
          side={side}
          align={align}
          collisionPadding={collisionPadding}
          avoidCollisions={avoidCollisions}
          {...props}
        >
          {React.createElement(motion.div as React.ElementType, {
            animate:
              (props as unknown as { 'data-state'?: 'open' | 'closed' })['data-state'] === 'closed'
                ? { opacity: 0, scale: 0.98, y: 4 }
                : { opacity: 1, scale: 1, y: 0 },
            children: props.children,
            className: cx(
              'max-h-[var(--radix-popper-available-height)] min-w-60 overflow-hidden rounded-md border p-2.5 text-sm shadow-md',
              'border-gray-200 dark:border-gray-800',
              'text-gray-900 dark:text-gray-50',
              'bg-white dark:bg-gray-950',
              'data-[state=closed]:pointer-events-none will-change-[transform,opacity]',
              className,
            ),
            initial: { opacity: 0, scale: 0.98, y: 4 },
            onWheel: (event: React.WheelEvent<HTMLDivElement>) => {
              event.stopPropagation()
              const isScrollingDown = event.deltaY > 0
              if (isScrollingDown) {
                event.currentTarget.dispatchEvent(
                  new KeyboardEvent('keydown', { key: 'ArrowDown' }),
                )
              } else {
                event.currentTarget.dispatchEvent(
                  new KeyboardEvent('keydown', { key: 'ArrowUp' }),
                )
              }
            },
            ref: forwardedRef as unknown as React.Ref<HTMLDivElement>,
            transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
          })}
        </PopoverPrimitives.Content>
      </PopoverPrimitives.Portal>
    )
  },
)
PopoverContent.displayName = 'PopoverContent'

export { Popover, PopoverAnchor, PopoverClose, PopoverContent, PopoverTrigger }
