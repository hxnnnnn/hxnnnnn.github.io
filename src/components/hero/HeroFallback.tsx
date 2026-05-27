import { motion } from 'framer-motion'

interface HeroFallbackProps {
  progress: number
}

export function HeroFallback({ progress }: HeroFallbackProps) {
  const opacity = 0.3 + progress * 0.5

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br from-indigo-950/80 via-lab-bg to-cyan-950/40"
        style={{ opacity }}
      />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="glow" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0a0a0f" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse
          cx="200"
          cy="180"
          rx={80 + progress * 20}
          ry={100 + progress * 25}
          fill="url(#glow)"
          className="transition-all duration-700"
        />
        {Array.from({ length: 40 }).map((_, i) => {
          const angle = (i / 40) * Math.PI * 2
          const r = 120 + (i % 5) * 15
          const cx = 200 + Math.cos(angle) * r * (1 - progress * 0.4)
          const cy = 180 + Math.sin(angle) * r * (1 - progress * 0.4)
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={2 + (i % 3)}
              fill="#22d3ee"
              opacity={0.2 + progress * 0.4}
            />
          )
        })}
      </svg>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        className="absolute left-1/2 top-1/2 h-32 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-500/20 bg-indigo-500/5 blur-sm"
      />
    </div>
  )
}
