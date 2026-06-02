import { motion } from 'framer-motion'
import { useLocale } from '../../i18n/LocaleContext'
import { SectionHeader } from '../ui/SectionHeader'
import { Badge } from '../ui/Badge'
import { CollapsibleBlock } from '../ui/CollapsibleBlock'

export function ProjectsSection() {
  const { profile, ui } = useLocale()

  return (
    <section className="section-container scroll-mt-28">
      <SectionHeader id="projects" title={ui.sections.projects} />

      <div className="space-y-4">
        {profile.projects.map((proj, i) => (
          <motion.div
            key={proj.fullTitle}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="glass-card overflow-hidden p-5"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="accent">{proj.role}</Badge>
              <Badge>{proj.period}</Badge>
              <Badge variant="status">{proj.level}</Badge>
            </div>
            <p className="mt-3 text-xs text-zinc-500">{proj.program}</p>
            <h3 className="mt-2 text-base font-medium leading-snug text-white">
              {proj.fullTitle}
            </h3>
            <CollapsibleBlock
              closedLabel={ui.collapsible.expandProject}
              openLabel={ui.collapsible.collapseProject}
            >
              <p>{proj.description}</p>
            </CollapsibleBlock>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
