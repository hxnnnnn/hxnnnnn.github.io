import type { Locale, Publication, SiteBundle } from './types'
import { profileZh } from '../data/profile.zh'
import { profileEn } from '../data/profile.en'

export const venueColors: Record<string, string> = {
  SIGGRAPH: 'from-orange-500 to-amber-400',
  IEEE: 'from-blue-500 to-sky-400',
  ACM: 'from-emerald-500 to-teal-400',
  Sensors: 'from-violet-500 to-purple-400',
  default: 'from-indigo-500 to-cyan-400',
}

export function getVenueColor(venue: string): string {
  if (venue.includes('SIGGRAPH')) return venueColors.SIGGRAPH
  if (venue.includes('IEEE')) return venueColors.IEEE
  if (venue.includes('ACM')) return venueColors.ACM
  if (venue.includes('Sensors')) return venueColors.Sensors
  return venueColors.default
}

export function isPublished(pub: Publication): boolean {
  return pub.status === 'published'
}

export function getPublicationStatusLabel(
  pub: Publication,
  locale: Locale,
): string {
  const bundle = getSiteData(locale)
  if (pub.status === 'submitted') return bundle.ui.pubStatus.submitted
  return bundle.ui.pubStatus.published(pub.publishedYear ?? 0)
}

export function getSiteData(locale: Locale): SiteBundle {
  return locale === 'en' ? profileEn : profileZh
}

export function getLocaleFromPath(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'zh'
}

export function getAlternateLocalePath(locale: Locale): string {
  return locale === 'zh' ? '/en' : '/'
}

export function localePath(locale: Locale, hash = ''): string {
  const base = locale === 'en' ? '/en' : '/'
  return hash ? `${base}${hash.startsWith('#') ? hash : `#${hash}`}` : base
}
