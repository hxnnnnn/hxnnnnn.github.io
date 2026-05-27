import { useEffect, useState } from 'react'

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const heroHeight = window.innerHeight
      const scrollY = window.scrollY
      const p = Math.min(Math.max(scrollY / (heroHeight * 0.8), 0), 1)
      setProgress(p)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return progress
}
