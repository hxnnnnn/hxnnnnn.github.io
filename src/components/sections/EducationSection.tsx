import { motion } from 'framer-motion'
import { profile } from '../../data/profile'
import { SectionHeader } from '../ui/SectionHeader'
import { Badge } from '../ui/Badge'

export function EducationSection() {
  return (
    <section className="section-container pt-0">
      <SectionHeader id="education" title="教育背景" />
      <div className="space-y-6">
        {profile.education.map((edu, i) => (
          <motion.div
            key={edu.school}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {edu.school}
                </h3>
                <p className="text-sm text-zinc-400">
                  {edu.department} · {edu.degree}
                </p>
              </div>
              <Badge variant="accent">{edu.period}</Badge>
            </div>
            <ul className="mt-4 space-y-1">
              {edu.details.map((d) => (
                <li key={d} className="text-sm text-zinc-400">
                  {d}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
