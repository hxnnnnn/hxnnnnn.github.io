import { useMemo } from 'react'
import { useLocale } from '../../i18n/LocaleContext'

const MIN_YEAR = 2021
const MAX_YEAR = 2026

export function PracticeTimelineSection() {
  const { profile, ui } = useLocale()

  const years = useMemo(() => {
    const list: number[] = []
    for (let y = MIN_YEAR; y <= MAX_YEAR; y++) list.push(y)
    return list
  }, [])

  return (
    <section className="mt-10">
      <h3 className="text-muted mb-8 text-sm font-medium uppercase tracking-wider">
        {ui.sections.practice}
      </h3>

      <div className="relative overflow-x-auto pb-2">
        <div className="flex min-w-[720px] justify-between gap-1 px-1">
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
                      className="timeline-card w-full max-w-[108px]"
                      title={`${item.role} · ${item.org}`}
                    >
                      <p className="timeline-role text-[10px] font-medium leading-tight">
                        {item.role}
                      </p>
                      <p className="text-muted mt-0.5 text-[9px] leading-tight">
                        {item.org}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="relative flex w-full flex-col items-center">
                  <span className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
                  <span className="relative z-10 h-3 w-3 rounded-full border-2 border-cyan-400/80 bg-lab-bg shadow-[0_0_8px_rgba(34,211,238,0.35)]" />
                  <span className="text-body mt-2 text-xs font-semibold">
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
