import { motion } from 'framer-motion'
import { useLocale } from '../../i18n/LocaleContext'
import { SectionHeader } from '../ui/SectionHeader'
import { Badge } from '../ui/Badge'
import type { BadgeProps } from '../ui/Badge'
import { PracticeTimelineSection } from './PracticeTimelineSection'

const PATENT_BADGE_VARIANTS: BadgeProps['variant'][] = [
  'status',
  'accent',
  'venue',
]

function MarqueeRow({
  items,
  direction = 'left',
  hoverHint,
}: {
  items: readonly { title: string; date?: string }[]
  direction?: 'left' | 'right'
  hoverHint: string
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
            className="marquee-card w-64 shrink-0 rounded-xl border border-lab-border bg-lab-surface px-4 py-3"
          >
            <p className="marquee-title text-sm leading-snug">{item.title}</p>
            {item.date && (
              <p className="text-muted mt-1.5 text-xs">{item.date}</p>
            )}
          </div>
        ))}
      </div>
      <p className="text-faint mt-1 text-center text-[10px]">{hoverHint}</p>
    </div>
  )
}

export function AwardsSection() {
  const { profile, ui } = useLocale()

  return (
    <section className="section-container scroll-mt-28">
      <SectionHeader id="awards" title={ui.sections.awards} />

      <h3 className="text-muted mb-4 text-sm font-medium uppercase tracking-wider">
        {ui.sections.awardsList}
      </h3>
      <MarqueeRow
        items={profile.awards}
        direction="left"
        hoverHint={ui.marquee.hoverHint}
      />

      <h3 className="mb-4 mt-10 text-muted text-sm font-medium uppercase tracking-wider">
        {ui.sections.honorsList}
      </h3>
      <MarqueeRow
        items={profile.honors}
        direction="right"
        hoverHint={ui.marquee.hoverHint}
      />

      <PracticeTimelineSection />

      <h3
        id="patents"
        className="mb-4 mt-10 scroll-mt-28 text-muted text-sm font-medium uppercase tracking-wider"
      >
        {ui.sections.patents}
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
            <Badge variant={PATENT_BADGE_VARIANTS[i] ?? 'status'}>
              {pat.role}
            </Badge>
            <p className="text-body mt-3 flex-1 text-sm leading-relaxed">
              {pat.title}
            </p>
          </motion.div>
        ))}
      </div>

      <h3 className="mb-4 mt-10 text-muted text-sm font-medium uppercase tracking-wider">
        {ui.sections.skills}
      </h3>
      <div className="flex flex-wrap gap-2">
        {profile.skills.map((skill) => (
          <span
            key={skill}
            className="skill-pill rounded-lg border px-3 py-1.5 text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  )
}
