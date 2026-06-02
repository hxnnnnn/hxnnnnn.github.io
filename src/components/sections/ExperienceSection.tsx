import { motion } from 'framer-motion'
import { useLocale } from '../../i18n/LocaleContext'
import { SectionHeader } from '../ui/SectionHeader'
import { Badge } from '../ui/Badge'

export function ExperienceSection() {
  const { profile, ui } = useLocale()

  return (
    <section className="section-container scroll-mt-28">
      <SectionHeader
        id="experience"
        title={ui.sections.experience}
        subtitle={ui.sections.experienceSubtitle}
      />
      <div className="relative space-y-8 pl-6 before:absolute before:bottom-0 before:left-[7px] before:top-2 before:w-px before:bg-gradient-to-b before:from-indigo-500 before:to-cyan-400/30">
        {profile.experience.map((exp, i) => (
          <motion.div
            key={exp.org + exp.role}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative"
          >
            <span className="absolute -left-6 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-indigo-400 bg-lab-bg" />
            <div className="glass-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-card-title text-lg font-semibold">
                    {exp.org}
                  </h3>
                  <p className="text-role">{exp.role}</p>
                </div>
                <Badge variant="accent">{exp.period}</Badge>
              </div>
              <p className="text-body mt-4 text-sm leading-relaxed">
                {exp.description}
              </p>
              {exp.highlights && exp.highlights.length > 0 && (
                <ul className="mt-4 space-y-2 border-t border-lab-border/60 pt-4">
                  {exp.highlights.map((point) => (
                    <li
                      key={point}
                      className="text-muted flex items-start gap-2 text-xs leading-relaxed"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-400/80" />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
