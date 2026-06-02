interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'status' | 'venue' | 'venueMeta'
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const styles = {
    default: 'border-lab-border bg-lab-surface text-zinc-300',
    accent: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300',
    status: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300',
    venue: 'border-cyan-400/50 bg-cyan-400/20 text-cyan-100',
    venueMeta: 'border-zinc-700/80 bg-zinc-900/90 text-zinc-500',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[variant]}`}
    >
      {children}
    </span>
  )
}
