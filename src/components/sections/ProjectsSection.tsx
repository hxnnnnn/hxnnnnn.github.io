import { motion } from 'framer-motion'
import { profile } from '../../data/profile'
import { SectionHeader } from '../ui/SectionHeader'
import { Badge } from '../ui/Badge'

export function ProjectsSection() {
  return (
    <section className="section-container scroll-mt-28">
      <SectionHeader
        id="projects"
        title="项目经历"
        subtitle="省级科研项目与创新创业训练。"
      />

      <div className="space-y-4">
        {profile.projects.map((proj, i) => (
          <motion.div
            key={proj.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-5"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="accent">{proj.role}</Badge>
              <Badge>{proj.period}</Badge>
              <span className="text-sm text-zinc-300">{proj.name}</span>
              <Badge variant="status">{proj.level}</Badge>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              {proj.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
