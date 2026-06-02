import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocale } from '../../i18n/LocaleContext'
import { SectionHeader } from '../ui/SectionHeader'
import { Badge } from '../ui/Badge'

export function EducationSection() {
  const { profile, ui } = useLocale()
  const [openCourses, setOpenCourses] = useState<number | null>(null)

  return (
    <section className="section-container scroll-mt-28 pt-0">
      <SectionHeader id="education" title={ui.sections.education} />
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
              <h3 className="text-card-title text-lg font-semibold">
                {edu.school}
              </h3>
              <Badge variant="accent">{edu.period}</Badge>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {edu.meta.map((label) => (
                <span
                  key={label}
                  className="meta-pill"
                >
                  {label}
                </span>
              ))}
            </div>
            <p className="text-body mt-4 text-sm leading-relaxed">
              {edu.research}
            </p>
            {edu.courses && edu.courses.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setOpenCourses(openCourses === i ? null : i)
                  }
                  className="link-muted mt-4 text-sm"
                >
                  {openCourses === i
                    ? ui.education.hideCourses
                    : ui.education.showCourses}
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
                            className="course-pill"
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
