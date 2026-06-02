import { profile } from '../../data/profile'
import { SectionHeader } from '../ui/SectionHeader'
import { PracticeTimelineSection } from './PracticeTimelineSection'

function MarqueeRow({
  items,
  direction = 'left',
}: {
  items: readonly { title: string; date?: string }[]
  direction?: 'left' | 'right'
}) {
  const doubled = [...items, ...items]

  return (
    <div className="marquee-mask relative overflow-hidden py-2">
      <div
        className={`marquee-track flex w-max gap-3 ${direction === 'right' ? 'marquee-reverse' : ''}`}
      >
        {doubled.map((item, i) => (
          <div
            key={`${item.title}-${i}`}
            className="w-64 shrink-0 rounded-xl border border-lab-border bg-lab-surface px-4 py-3"
          >
            <p className="text-sm leading-snug text-zinc-300">{item.title}</p>
            {item.date && (
              <p className="mt-1.5 text-xs text-zinc-500">{item.date}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export function AwardsSection() {
  return (
    <section className="section-container">
      <SectionHeader id="awards" title="荣誉与实践" />

      <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-zinc-500">
        获奖情况
      </h3>
      <MarqueeRow items={profile.awards} direction="left" />

      <h3 className="mb-4 mt-10 text-sm font-medium uppercase tracking-wider text-zinc-500">
        个人荣誉
      </h3>
      <MarqueeRow items={profile.honors} direction="right" />

      <PracticeTimelineSection />

      <h3 className="mb-4 mt-10 text-sm font-medium uppercase tracking-wider text-zinc-500">
        专业技能
      </h3>
      <div className="flex flex-wrap gap-2">
        {profile.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-lg border border-indigo-500/20 bg-indigo-500/5 px-3 py-1.5 text-sm text-indigo-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  )
}
