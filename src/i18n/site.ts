import type { Locale, Publication, SiteBundle, SiteVariant } from './types'
import { getVariantSiteData } from '../data/variants'

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
  variant: SiteVariant = 'default',
): string {
  const bundle = getSiteData(locale, variant)
  if (pub.status === 'submitted') return bundle.ui.pubStatus.submitted
  return bundle.ui.pubStatus.published(pub.publishedYear ?? 0)
}

export function getSiteData(
  locale: Locale,
  variant: SiteVariant = 'default',
): SiteBundle {
  return getVariantSiteData(locale, variant)
}

export function getLocaleFromPath(pathname: string): Locale {
  return pathname === '/en' ||
    pathname.startsWith('/en/') ||
    pathname.endsWith('/en') ||
    pathname.includes('/en/')
    ? 'en'
    : 'zh'
}

export function getAlternateLocalePath(
  locale: Locale,
  variant: SiteVariant = 'default',
): string {
  if (variant === 'default') {
    return locale === 'zh' ? '/en' : '/'
  }
  return locale === 'zh' ? `/${variant}/en` : `/${variant}`
}

export function localePath(
  locale: Locale,
  hash = '',
  variant: SiteVariant = 'default',
): string {
  const base =
    variant === 'default'
      ? locale === 'en'
        ? '/en'
        : '/'
      : locale === 'en'
        ? `/${variant}/en`
        : `/${variant}`
  return hash ? `${base}${hash.startsWith('#') ? hash : `#${hash}`}` : base
}
