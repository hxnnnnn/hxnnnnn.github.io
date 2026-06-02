import { motion } from 'framer-motion'
import { profile } from '../../data/profile'
import { SectionHeader } from '../ui/SectionHeader'
import { Badge } from '../ui/Badge'

export function PatentsSection() {
  return (
    <section className="section-container pt-0">
      <SectionHeader
        id="patents"
        title="发明专利"
        subtitle={`${profile.patents.length} 项国家发明专利。`}
      />

      <div className="grid gap-4 sm:grid-cols-1">
        {profile.patents.map((pat, i) => (
          <motion.div
            key={pat.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="glass-card p-5"
          >
            <Badge variant="status">{pat.role}</Badge>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              {pat.title}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
