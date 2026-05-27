interface SectionHeaderProps {
  id: string
  title: string
  subtitle?: string
}

export function SectionHeader({ id, title, subtitle }: SectionHeaderProps) {
  return (
    <header id={id} className="mb-12 scroll-mt-24">
      <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-400">
          {subtitle}
        </p>
      )}
      <div className="mt-4 h-px w-16 bg-gradient-to-r from-indigo-500 to-cyan-400" />
    </header>
  )
}
