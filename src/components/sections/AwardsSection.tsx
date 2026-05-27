import { motion } from 'framer-motion'
import { profile } from '../../data/profile'
import { SectionHeader } from '../ui/SectionHeader'

export function AwardsSection() {
  return (
    <section className="section-container">
      <SectionHeader id="awards" title="荣誉与实践" />

      <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-zinc-500">
        获奖情况
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-thin">
        {profile.awards.map((award, i) => (
          <motion.span
            key={award}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03 }}
            className="shrink-0 rounded-xl border border-lab-border bg-lab-surface px-4 py-3 text-sm text-zinc-300"
          >
            {award}
          </motion.span>
        ))}
      </div>

      <h3 className="mb-4 mt-10 text-sm font-medium uppercase tracking-wider text-zinc-500">
        实践经历
      </h3>
      <ul className="space-y-3">
        {profile.practice.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-sm text-zinc-400"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
            {item}
          </li>
        ))}
      </ul>

      <h3 className="mb-4 mt-10 text-sm font-medium uppercase tracking-wider text-zinc-500">
        专业技能
      </h3>
      <div className="flex flex-wrap gap-2">
        {profile.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-lg border border-indigo-500/20 bg-indigo-500/5 px-3 py-1.5 text-sm text-indigo-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  )
}
