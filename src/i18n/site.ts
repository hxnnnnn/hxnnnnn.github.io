import type { Locale, Publication, SiteBundle } from './types'
import { profileZh } from '../data/profile.zh'
import { profileEn } from '../data/profile.en'

export type VenueBarKind = 'siggraph' | 'ieee' | 'acm' | 'sensors' | 'default'

export function getVenueBarKind(venue: string): VenueBarKind {
  if (venue.includes('SIGGRAPH')) return 'siggraph'
  if (venue.includes('IEEE')) return 'ieee'
  if (venue.includes('ACM')) return 'acm'
  if (venue.includes('Sensors')) return 'sensors'
  return 'default'
}

export function getVenueBarClass(venue: string): string {
  return `pub-venue-bar pub-venue-bar--${getVenueBarKind(venue)}`
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
