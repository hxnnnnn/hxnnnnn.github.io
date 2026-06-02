import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../../data/profile'
import { SectionHeader } from '../ui/SectionHeader'
import { Badge } from '../ui/Badge'

export function EducationSection() {
  const [openCourses, setOpenCourses] = useState<number | null>(null)

  return (
    <section className="section-container scroll-mt-28 pt-0">
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
              <h3 className="text-lg font-semibold text-white">{edu.school}</h3>
              <Badge variant="accent">{edu.period}</Badge>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {edu.meta.map((label) => (
                <span
                  key={label}
                  className="rounded-lg border border-lab-border bg-lab-bg px-2.5 py-1 text-xs text-zinc-400"
                >
                  {label}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              {edu.research}
            </p>
            {edu.courses && edu.courses.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setOpenCourses(openCourses === i ? null : i)
                  }
                  className="mt-4 text-sm text-indigo-400 transition hover:text-cyan-400"
                >
                  {openCourses === i ? '收起核心课程' : '查看核心课程'}
                </button>
                <AnimatePresence>
                  {openCourses === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 flex flex-wrap gap-2">
                        {edu.courses.map((c) => (
                          <span
                            key={c}
                            className="rounded-lg bg-lab-bg px-2.5 py-1 text-xs text-zinc-500"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
