import { useMemo } from 'react'
import { profile } from '../../data/profile'

const MIN_YEAR = 2021
const MAX_YEAR = 2026

export function PracticeTimelineSection() {
  const years = useMemo(() => {
    const list: number[] = []
    for (let y = MIN_YEAR; y <= MAX_YEAR; y++) list.push(y)
    return list
  }, [])

  return (
    <section className="mt-10">
      <h3 className="mb-8 text-sm font-medium uppercase tracking-wider text-zinc-500">
        实践经历
      </h3>

      <div className="relative overflow-x-auto pb-2">
        <div className="flex min-w-[640px] justify-between gap-1 px-1">
          {years.map((year) => {
            const items = profile.practiceTimeline.filter(
              (item) => year >= item.startYear && year <= item.endYear,
            )

            return (
              <div
                key={year}
                className="relative flex flex-1 flex-col items-center"
              >
                <div className="mb-3 flex min-h-[120px] w-full flex-col items-center justify-end gap-1.5 px-0.5">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="w-full max-w-[108px] rounded-md border border-lab-border/80 bg-lab-bg/80 px-1.5 py-1 text-center"
                      title={`${item.role} · ${item.org}`}
                    >
                      <p className="text-[10px] font-medium leading-tight text-cyan-300/90">
                        {item.role}
                      </p>
                      <p className="mt-0.5 text-[9px] leading-tight text-zinc-500">
                        {item.org}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="relative flex w-full flex-col items-center">
                  <span className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
                  <span className="relative z-10 h-3 w-3 rounded-full border-2 border-cyan-400/80 bg-lab-bg shadow-[0_0_8px_rgba(34,211,238,0.35)]" />
                  <span className="mt-2 text-xs font-semibold text-zinc-300">
                    {year}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
