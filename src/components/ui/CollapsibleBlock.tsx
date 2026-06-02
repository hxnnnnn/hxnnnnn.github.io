import { useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface CollapsibleBlockProps {
  closedLabel: string
  openLabel: string
  children: ReactNode
}

export function CollapsibleBlock({
  closedLabel,
  openLabel,
  children,
}: CollapsibleBlockProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-3 border-t border-lab-border/60 pt-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="text-sm text-indigo-400 transition hover:text-cyan-400"
      >
        {open ? openLabel : closedLabel}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-2 text-sm leading-relaxed text-zinc-500">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
