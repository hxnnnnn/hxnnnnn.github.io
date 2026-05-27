interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'status'
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const styles = {
    default: 'border-lab-border bg-lab-surface text-zinc-300',
    accent: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300',
    status: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[variant]}`}
    >
      {children}
    </span>
  )
}
