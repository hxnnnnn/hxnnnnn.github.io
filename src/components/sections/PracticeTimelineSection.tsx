import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../../data/profile'

const MIN_YEAR = 2021
const MAX_YEAR = 2025

export function PracticeTimelineSection() {
  const [selectedYear, setSelectedYear] = useState(MAX_YEAR)

  const years = useMemo(() => {
    const list: number[] = []
    for (let y = MIN_YEAR; y <= MAX_YEAR; y++) list.push(y)
    return list
  }, [])

  const activeItems = useMemo(
    () =>
      profile.practiceTimeline.filter(
        (item) => selectedYear >= item.startYear && selectedYear <= item.endYear,
      ),
    [selectedYear],
  )

  return (
    <section className="mt-10">
      <h3 className="mb-6 text-sm font-medium uppercase tracking-wider text-zinc-500">
        实践经历
      </h3>

      <div className="relative px-2 pb-4">
        <div className="absolute left-4 right-4 top-5 h-px bg-gradient-to-r from-indigo-500/40 via-cyan-400/60 to-indigo-500/40" />
        <div className="relative flex justify-between">
          {years.map((year) => {
            const isActive = year === selectedYear
            const hasRole = profile.practiceTimeline.some(
              (item) => year >= item.startYear && year <= item.endYear,
            )
            return (
              <button
                key={year}
                type="button"
                onClick={() => setSelectedYear(year)}
                className="group flex flex-col items-center"
              >
                <span
                  className={`relative z-10 h-3.5 w-3.5 rounded-full border-2 transition ${
                    isActive
                      ? 'scale-125 border-cyan-400 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)]'
                      : hasRole
                        ? 'border-indigo-400 bg-lab-bg group-hover:border-cyan-400'
                        : 'border-zinc-600 bg-lab-bg'
                  }`}
                />
                <span
                  className={`mt-3 text-xs font-medium transition ${
                    isActive ? 'text-cyan-400' : 'text-zinc-500 group-hover:text-zinc-300'
                  }`}
                >
                  {year}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedYear}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="mt-6 min-h-[120px] space-y-3"
        >
          {activeItems.length === 0 ? (
            <p className="text-sm text-zinc-500">
              {selectedYear} 年暂无记录的校内职务，可点击其他年份查看。
            </p>
          ) : (
            activeItems.map((item) => (
              <div key={item.id} className="glass-card p-4">
                <p className="font-medium text-white">{item.role}</p>
                <p className="mt-1 text-sm text-cyan-400/90">{item.org}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {item.summary}
                </p>
                <p className="mt-2 text-xs text-zinc-600">
                  {item.startYear} — {item.endYear}
                </p>
              </div>
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
