import { useEffect, useState, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { useLocale } from '../i18n/LocaleContext'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { useIsMobile, usePrefersReducedMotion } from '../hooks/useMediaQuery'
import { HeroFallback } from './hero/HeroFallback'

const GaussianHero = lazy(() =>
  import('./hero/GaussianHero').then((m) => ({ default: m.GaussianHero })),
)

export function HeroSection() {
  const { profile, ui } = useLocale()
  const progress = useScrollProgress()
  const isMobile = useIsMobile()
  const reducedMotion = usePrefersReducedMotion()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  const showWebGL = !isMobile && !reducedMotion

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-16">
      {showWebGL ? (
        <Suspense fallback={<HeroFallback progress={progress} />}>
          <GaussianHero
            progress={progress}
            reducedMotion={reducedMotion}
            onReady={() => setLoading(false)}
          />
        </Suspense>
      ) : (
        <HeroFallback progress={progress} />
      )}

      {loading && showWebGL && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-lab-bg">
          <p className="text-sm text-zinc-400">{ui.hero.loading}</p>
          <div className="mt-4 h-1 w-48 overflow-hidden rounded-full bg-lab-border">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            />
          </div>
        </div>
      )}

      <div className="relative z-10 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          {profile.heroName}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6"
        >
          {profile.identities.map((id) => (
            <span
              key={id}
              className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-200 md:text-base"
            >
              {id}
            </span>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-2 text-zinc-500"
      >
        <span className="text-xs">
          {showWebGL ? ui.hero.scrollWebGL : ui.hero.scrollMobile}
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-lg"
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  )
}
