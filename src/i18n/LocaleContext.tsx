import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react'
import type { Locale, ProfileData, SiteBundle, UiStrings } from './types'
import { getSiteData } from './site'

interface LocaleContextValue {
  locale: Locale
  profile: ProfileData
  ui: UiStrings
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale
  children: ReactNode
}) {
  const bundle: SiteBundle = useMemo(() => getSiteData(locale), [locale])

  useEffect(() => {
    document.documentElement.lang = bundle.ui.htmlLang
    document.title = bundle.ui.documentTitle
  }, [bundle])

  const value = useMemo(
    () => ({
      locale: bundle.locale,
      profile: bundle.profile,
      ui: bundle.ui,
    }),
    [bundle],
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
