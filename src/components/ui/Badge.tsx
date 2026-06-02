interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'status' | 'venue' | 'venueMeta'
}

const variantClass: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'badge-default',
  accent: 'badge-accent',
  status: 'badge-status',
  venue: 'badge-venue',
  venueMeta: 'badge-venue-meta',
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${variantClass[variant]}`}
    >
      {children}
    </span>
  )
}
