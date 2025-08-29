import clsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cx(...args: ClassValue[]) {
  return twMerge(clsx(...args))
}

export const focusInput = [
  // base
  'focus:ring-2',
  // ring color
  'focus:ring-emerald-200 dark:focus:ring-emerald-700/30',
  // border color
  'focus:border-emerald-500 dark:focus:border-emerald-700',
]

export const focusRing = [
  // base
  'outline-solid outline-offset-2 outline-0 focus-visible:outline-2',
  // outline color
  'outline-emerald-500 dark:outline-emerald-500',
]

export const hasErrorInput = [
  // base
  'ring-2',
  // border color
  'border-red-500 dark:border-red-700',
  // ring color
  'ring-red-200 dark:ring-red-700/30',
]

interface CurrencyParams {
  number: number
  maxFractionDigits?: number
  currency?: string
}

interface PercentageParams {
  number: number
  decimals?: number
}

interface MillionParams {
  number: number
  decimals?: number
}

type FormatterFunctions = {
  currency: (params: CurrencyParams) => string
  unit: (number: number) => string
  percentage: (params: PercentageParams) => string
  million: (params: MillionParams) => string
}

export const formatters: FormatterFunctions = {
  currency: ({
    number,
    maxFractionDigits = 2,
    currency = 'USD',
  }: CurrencyParams): string => {
    return new Intl.NumberFormat('en-US', {
      currency,
      maximumFractionDigits: maxFractionDigits,
      style: 'currency',
    }).format(number)
  },

  million: ({ number, decimals = 1 }: MillionParams): string => {
    return `${new Intl.NumberFormat('en-US', {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals,
      style: 'decimal',
    }).format(number)}M`
  },

  percentage: ({ number, decimals = 1 }: PercentageParams): string => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals,
      style: 'percent',
    }).format(number)
  },

  unit: (number: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
    }).format(number)
  },
}
