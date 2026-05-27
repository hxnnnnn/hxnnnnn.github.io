import { motion } from 'framer-motion'
import { profile } from '../../data/profile'
import { SectionHeader } from '../ui/SectionHeader'
import { Badge } from '../ui/Badge'

export function ExperienceSection() {
  return (
    <section className="section-container">
      <SectionHeader id="experience" title="实习经历" />
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
                  <h3 className="text-lg font-semibold text-white">
                    {exp.org}
                  </h3>
                  <p className="text-sm text-cyan-400">{exp.role}</p>
                </div>
                <Badge variant="accent">{exp.period}</Badge>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                {exp.description}
              </p>
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
