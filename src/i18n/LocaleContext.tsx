import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react'
import type {
  Locale,
  ProfileData,
  SiteBundle,
  SiteVariant,
  UiStrings,
} from './types'
import { getSiteData } from './site'

interface LocaleContextValue {
  locale: Locale
  variant: SiteVariant
  profile: ProfileData
  ui: UiStrings
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({
  locale,
  variant = 'default',
  children,
}: {
  locale: Locale
  variant?: SiteVariant
  children: ReactNode
}) {
  const bundle: SiteBundle = useMemo(
    () => getSiteData(locale, variant),
    [locale, variant],
  )

  useEffect(() => {
    document.documentElement.lang = bundle.ui.htmlLang
    document.title = bundle.ui.documentTitle
  }, [bundle])

  const value = useMemo(
    () => ({
      locale: bundle.locale,
      variant,
      profile: bundle.profile,
      ui: bundle.ui,
    }),
    [bundle, variant],
  )

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) {
    throw new Error('useLocale must be used within LocaleProvider')
  }
  return ctx
}
