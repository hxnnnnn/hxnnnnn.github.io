interface SectionHeaderProps {
  id: string
  title: string
  subtitle?: string
}

export function SectionHeader({ id, title, subtitle }: SectionHeaderProps) {
  return (
    <header id={id} className="mb-12 scroll-mt-24">
      <h2 className="text-section-title text-3xl md:text-4xl">{title}</h2>
      {subtitle && (
        <p className="text-section-subtitle mt-3 max-w-2xl text-base">
          {subtitle}
        </p>
      )}
      <div className="section-rule mt-4" />
    </header>
  )
}
