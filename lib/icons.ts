import {
  ArrowRight,
  Check,
  Star,
  Heart,
  Mail,
  Phone,
  Github,
  Twitter,
  Linkedin,
  Globe,
} from 'lucide-react'

export const ICONS = {
  ArrowRight,
  Check,
  Star,
  Heart,
  Mail,
  Phone,
  Github,
  Twitter,
  Linkedin,
  Globe,
}

export type IconName = keyof typeof ICONS

export const ICON_NAMES = Object.keys(ICONS) as IconName[]

export function isIconName(name: string): name is IconName {
  return name in ICONS
}
