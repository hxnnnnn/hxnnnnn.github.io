import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type Theme = 'dark' | 'light'

function isAiDataPath(): boolean {
  if (typeof window === 'undefined') return false
  const p = window.location.pathname.toLowerCase()
  return (
    p === '/ai-data' ||
    p.startsWith('/ai-data/') ||
    p === '/1112' ||
    p.startsWith('/1112/')
  )
}

function getStorageKey(): string {
  return isAiDataPath() ? 'site-theme-ai-data' : 'site-theme'
}

function readStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  const fallback: Theme = isAiDataPath() ? 'light' : 'dark'
  const stored = localStorage.getItem(getStorageKey())
  if (stored === 'light' || stored === 'dark') return stored
  return fallback
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
}

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readStoredTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const setTheme = useCallback((next: Theme) => {
    localStorage.setItem(getStorageKey(), next)
    setThemeState(next)
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem(getStorageKey(), next)
      return next
    })
  }, [])

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  )

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return ctx
}
