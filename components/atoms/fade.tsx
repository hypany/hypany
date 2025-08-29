'use client'

import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.05,
    },
  },
}

const item = {
  hidden: {
    filter: 'blur(4px)',
    opacity: 0,
    y: 16,
  },
  show: {
    filter: 'blur(0px)',
    opacity: 1,
    scale: 1,
    transition: {
      damping: 19,
      mass: 1.2,
      stiffness: 150,
      type: 'spring' as const,
    },
    y: 0,
  },
}

function FadeContainer({
  children,
  className,
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <motion.div
      variants={container}
      initial='hidden'
      animate='show'
      className={className}
    >
      {children}
    </motion.div>
  )
}

function FadeDiv({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  )
}
function FadeSpan({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.span variants={item} className={className}>
      {children}
    </motion.span>
  )
}

export { FadeContainer, FadeDiv, FadeSpan }
