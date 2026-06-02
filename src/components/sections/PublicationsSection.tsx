import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  getVenueBarClass,
  getPublicationStatusLabel,
  isPublished,
} from '../../i18n/site'
import type { PublicationStatus } from '../../i18n/types'
import { useLocale } from '../../i18n/LocaleContext'
import { SectionHeader } from '../ui/SectionHeader'
import { Badge } from '../ui/Badge'
import { CollapsibleBlock } from '../ui/CollapsibleBlock'

type FilterKey = 'all' | PublicationStatus | 'publishedFilter'

export function PublicationsSection() {
  const { profile, ui, locale } = useLocale()
  const [filter, setFilter] = useState<FilterKey>('all')

  const filters: { key: FilterKey; label: string }[] = [
    { key: 'all', label: ui.filters.all },
    { key: 'submitted', label: ui.filters.submitted },
    { key: 'publishedFilter', label: ui.filters.published },
  ]

  const filtered = useMemo(() => {
    return profile.publications.filter((pub) => {
      if (filter === 'all') return true
      if (filter === 'publishedFilter') return isPublished(pub)
      return pub.status === filter
    })
  }, [filter, profile.publications])

  return (
    <section className="section-container scroll-mt-28">
      <SectionHeader
        id="publications"
        title={ui.sections.publications}
        subtitle={profile.publicationsSummary}
      />

      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-4 py-1.5 text-sm transition ${
              filter === f.key ? 'filter-pill-active' : 'filter-pill-inactive'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((pub, i) => (
          <motion.article
            key={pub.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i * 0.05, 0.3) }}
            className="glass-card group overflow-hidden transition hover:border-indigo-500/30 dark:hover:border-indigo-500/30"
          >
            <div className={getVenueBarClass(pub.venue)} />
            <div className="p-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant={pub.status === 'submitted' ? 'status' : 'default'}
                >
                  {getPublicationStatusLabel(pub, locale)}
                </Badge>
                <Badge variant="accent">{pub.role}</Badge>
                <Badge variant="venue">{pub.venue}</Badge>
                <Badge variant="venueMeta">{pub.venueMeta}</Badge>
              </div>
              <h3 className="text-card-title mt-3">
                {pub.url ? (
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-title-link"
                  >
                    <span>{pub.title}</span>
                    <span className="external-link-icon" aria-hidden>
                      ↗
                    </span>
                  </a>
                ) : (
                  pub.title
                )}
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {pub.tags.map((tag) => (
                  <span key={tag} className="pub-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <CollapsibleBlock
                closedLabel={ui.collapsible.expandAbstract}
                openLabel={ui.collapsible.collapseAbstract}
              >
                <p>{pub.abstract}</p>
              </CollapsibleBlock>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
