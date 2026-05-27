import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../../data/profile'
import { SectionHeader } from '../ui/SectionHeader'
import { Badge } from '../ui/Badge'

export function ProjectsSection() {
  const [openPatents, setOpenPatents] = useState(false)

  return (
    <section className="section-container">
      <SectionHeader
        id="projects"
        title="项目与专利"
        subtitle="省级科研项目与发明专利。"
      />

      <div className="space-y-4">
        {profile.projects.map((proj, i) => (
          <motion.div
            key={proj.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-5"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="accent">{proj.role}</Badge>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              {proj.title}
            </p>
          </motion.div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpenPatents(!openPatents)}
        className="mt-8 flex w-full items-center justify-between rounded-xl border border-lab-border bg-lab-surface px-5 py-4 text-left transition hover:border-indigo-500/30"
      >
        <span className="font-medium text-white">
          发明专利（{profile.patents.length} 项）
        </span>
        <span className="text-zinc-400">{openPatents ? '−' : '+'}</span>
      </button>

      <AnimatePresence>
        {openPatents && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-3">
              {profile.patents.map((pat) => (
                <div key={pat.title} className="glass-card p-4">
                  <Badge variant="status">{pat.role}</Badge>
                  <p className="mt-2 text-sm text-zinc-300">{pat.title}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
