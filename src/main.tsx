import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { LocaleProvider } from './i18n/LocaleContext.tsx'
import type { SiteVariant } from './i18n/types.ts'
import { ThemeProvider } from './theme/ThemeContext.tsx'

const VARIANTS: Exclude<SiteVariant, 'default'>[] = [
  'ai-gen',
  'aigc-data',
  'embodied',
  'data-dev',
]

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Original site (unmodified) */}
          <Route
            path="/"
            element={
              <LocaleProvider locale="zh" variant="default">
                <App />
              </LocaleProvider>
            }
          />
          <Route
            path="/en"
            element={
              <LocaleProvider locale="en" variant="default">
                <App />
              </LocaleProvider>
            }
          />

          {/* 4 independent resume variants */}
          {VARIANTS.flatMap((variant) => [
            <Route
              key={`${variant}-zh`}
              path={`/${variant}`}
              element={
                <LocaleProvider locale="zh" variant={variant}>
                  <App />
                </LocaleProvider>
              }
            />,
            <Route
              key={`${variant}-en`}
              path={`/${variant}/en`}
              element={
                <LocaleProvider locale="en" variant={variant}>
                  <App />
                </LocaleProvider>
              }
            />,
            <Route
              key={`${variant}-fallback`}
              path={`/${variant}/*`}
              element={<Navigate to={`/${variant}`} replace />}
            />,
          ])}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
