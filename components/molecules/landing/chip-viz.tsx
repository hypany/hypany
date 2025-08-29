'use client'

import { motion } from 'framer-motion'
import { HypanyMark } from '@/public/brand/hypany-logo'

const ChipViz = () => {
  const createVariants = ({
    scale,
    delay,
  }: {
    scale: number
    delay: number
  }) => ({
    animate: {
      scale: [1, scale, 1],
      transition: {
        delay,
        duration: 2,
        ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
        repeat: Infinity,
        repeatDelay: 2,
        times: [0, 0.2, 1],
      },
    },
    initial: { scale: 1 },
  })

  return (
    <div className='relative flex items-center'>
      <div className='relative'>
        <motion.div
          variants={createVariants({ delay: 0, scale: 1.1 })}
          initial='initial'
          animate='animate'
          className='absolute -inset-px z-0 rounded-full bg-linear-to-r from-emerald-400 via-emerald-500 to-emerald-600 opacity-30 blur-xl'
        />
        <motion.div
          variants={createVariants({ delay: 0.1, scale: 1.08 })}
          initial='initial'
          animate='animate'
          className='relative z-0 min-h-[80px] min-w-[80px] rounded-full border bg-linear-to-b from-white to-emerald-50 shadow-xl shadow-emerald-500/20'
        >
          <motion.div
            variants={createVariants({ delay: 0.2, scale: 1.06 })}
            initial='initial'
            animate='animate'
            className='absolute inset-1 rounded-full bg-linear-to-t from-emerald-400 via-emerald-500 to-emerald-600 p-0.5 shadow-xl'
          >
            <div className='relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-black/40 shadow-2xs shadow-white/40 will-change-transform'>
              <div className='size-full bg-black/30' />
              <motion.div
                variants={createVariants({ delay: 0.3, scale: 1.04 })}
                initial='initial'
                animate='animate'
                className='absolute inset-0 rounded-full bg-linear-to-t from-emerald-400 via-emerald-500 to-emerald-600 opacity-50 shadow-[inset_0_0_16px_4px_rgba(0,0,0,1)]'
              />
              <motion.div
                variants={createVariants({ delay: 0.4, scale: 1.02 })}
                initial='initial'
                animate='animate'
                className='absolute inset-[6px] rounded-full bg-white/10 p-1 backdrop-blur-[1px]'
              >
                <div className='relative flex h-full w-full items-center justify-center rounded-full bg-linear-to-br from-white to-gray-300 shadow-lg shadow-black/40'>
                  <HypanyMark className='w-6' />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default ChipViz
