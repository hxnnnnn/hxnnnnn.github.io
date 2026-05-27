import { useEffect, useState, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/profile'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { useIsMobile, usePrefersReducedMotion } from '../hooks/useMediaQuery'
import { HeroFallback } from './hero/HeroFallback'

const GaussianHero = lazy(() =>
  import('./hero/GaussianHero').then((m) => ({ default: m.GaussianHero })),
)

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

export function HeroSection() {
  const progress = useScrollProgress()
  const isMobile = useIsMobile()
  const reducedMotion = usePrefersReducedMotion()
  const [loading, setLoading] = useState(true)
  const [konamiBurst, setKonamiBurst] = useState(false)
  const [konamiIndex, setKonamiIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    console.log('InfiHead: reconstruction complete ✓')
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === KONAMI[konamiIndex]) {
        const next = konamiIndex + 1
        if (next === KONAMI.length) {
          setKonamiBurst(true)
          setKonamiIndex(0)
          setTimeout(() => setKonamiBurst(false), 3000)
        } else {
          setKonamiIndex(next)
        }
      } else {
        setKonamiIndex(0)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [konamiIndex])

  const showWebGL = !isMobile && !reducedMotion

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
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
          <p className="text-sm text-zinc-400">正在重建 3D 模型...</p>
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

      {konamiBurst && (
        <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
          <motion.p
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-2xl font-bold gradient-text"
          >
            重建完成 ✓
          </motion.p>
        </div>
      )}

      <div className="relative z-10 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-400/80"
        >
          Multi-View Reconstruction
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-5xl font-bold tracking-tight text-white md:text-7xl"
        >
          {profile.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-4 text-lg text-zinc-300 md:text-xl"
        >
          {profile.tagline}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mx-auto mt-3 max-w-xl text-sm text-zinc-500"
        >
          {profile.heroSubtitle}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-2 text-zinc-500"
      >
        <span className="text-xs">
          {showWebGL ? '拖拽旋转 · 向下滚动聚合' : '向下滚动探索'}
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
