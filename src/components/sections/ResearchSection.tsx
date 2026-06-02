import { profile } from '../../data/profile'
import { SectionHeader } from '../ui/SectionHeader'

export function ResearchSection() {
  return (
    <section className="section-container scroll-mt-28">
      <SectionHeader
        id="research"
        title={profile.research.title}
        subtitle={profile.research.intro}
      />
    </section>
  )
}
