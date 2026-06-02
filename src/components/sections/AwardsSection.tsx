import { motion } from 'framer-motion'
import { profile } from '../../data/profile'
import { SectionHeader } from '../ui/SectionHeader'
import { Badge } from '../ui/Badge'
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
    <div className="marquee-interactive marquee-mask relative overflow-hidden py-2">
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
      <p className="mt-1 text-center text-[10px] text-zinc-600">
        悬停可加速滚动
      </p>
    </div>
  )
}

export function AwardsSection() {
  return (
    <section className="section-container scroll-mt-28">
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

      <h3
        id="patents"
        className="mb-4 mt-10 scroll-mt-28 text-sm font-medium uppercase tracking-wider text-zinc-500"
      >
        发明专利
      </h3>
      <div className="grid gap-4 md:grid-cols-3">
        {profile.patents.map((pat, i) => (
          <motion.div
            key={pat.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="glass-card flex h-full flex-col p-4"
          >
            <Badge variant="status">{pat.role}</Badge>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-300">
              {pat.title}
            </p>
          </motion.div>
        ))}
      </div>

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
