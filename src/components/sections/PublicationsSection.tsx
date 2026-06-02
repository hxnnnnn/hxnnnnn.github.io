import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  profile,
  getVenueColor,
  getPublicationStatusLabel,
  isPublished,
  type PublicationStatus,
} from '../../data/profile'
import { SectionHeader } from '../ui/SectionHeader'
import { Badge } from '../ui/Badge'
import { CollapsibleBlock } from '../ui/CollapsibleBlock'

type Filter = '全部' | PublicationStatus | '已发表'

const filters: Filter[] = ['全部', '在投', '已发表']

export function PublicationsSection() {
  const [filter, setFilter] = useState<Filter>('全部')

  const filtered = useMemo(() => {
    return profile.publications.filter((pub) => {
      if (filter === '全部') return true
      if (filter === '已发表') return isPublished(pub)
      return pub.status === filter
    })
  }, [filter])

  return (
    <section className="section-container scroll-mt-28">
      <SectionHeader
        id="publications"
        title="科研论文"
        subtitle={profile.publicationsSummary}
      />

      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-sm transition ${
              filter === f
                ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/40'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {f}
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
            className="glass-card group overflow-hidden transition hover:border-indigo-500/30"
          >
            <div
              className={`h-1 bg-gradient-to-r ${getVenueColor(pub.venue)}`}
            />
            <div className="p-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={pub.status === '在投' ? 'status' : 'default'}>
                  {getPublicationStatusLabel(pub)}
                </Badge>
                <Badge variant="accent">{pub.role}</Badge>
                <Badge>{pub.venue}</Badge>
                <Badge>{pub.venueMeta}</Badge>
              </div>
              <h3 className="mt-3 font-medium leading-snug text-white group-hover:text-cyan-100">
                {pub.url ? (
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-2 hover:text-cyan-300"
                  >
                    <span>{pub.title}</span>
                    <span className="shrink-0 text-cyan-400/80" aria-hidden>
                      ↗
                    </span>
                  </a>
                ) : (
                  pub.title
                )}
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {pub.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-lab-bg px-2 py-0.5 text-xs text-zinc-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <CollapsibleBlock closedLabel="展开摘要" openLabel="收起摘要">
                <p>{pub.abstract}</p>
              </CollapsibleBlock>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
