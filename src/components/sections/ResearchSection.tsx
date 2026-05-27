import { motion } from 'framer-motion'
import { profile } from '../../data/profile'
import { SectionHeader } from '../ui/SectionHeader'

export function ResearchSection() {
  return (
    <section className="section-container">
      <SectionHeader
        id="research"
        title="研究方向"
        subtitle={profile.research.intro}
      />
      <div className="grid gap-6 md:grid-cols-3">
        {profile.research.focus.map((item, i) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="glass-card p-6"
          >
            <span className="text-2xl text-cyan-400">{item.icon}</span>
            <h3 className="mt-4 text-lg font-semibold text-white">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {item.description}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
