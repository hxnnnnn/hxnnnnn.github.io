import { motion } from 'framer-motion'
import { useActiveSection } from '../../hooks/useActiveSection'

const navItems = [
  { id: 'research', label: '研究' },
  { id: 'education', label: '教育' },
  { id: 'publications', label: '论文' },
  { id: 'experience', label: '实习' },
  { id: 'projects', label: '项目' },
  { id: 'awards', label: '荣誉' },
  { id: 'contact', label: '联系' },
] as const

const sectionIds = navItems.map((item) => item.id)

export function HorizontalNav() {
  const activeId = useActiveSection([...sectionIds])

  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.45 }}
      className="fixed top-0 z-50 w-full border-b border-lab-border/50 bg-lab-bg/85 backdrop-blur-md"
    >
      <div className="mx-auto max-w-5xl px-4 py-3">
        <div className="flex items-end justify-between gap-2 overflow-x-auto scrollbar-none">
          {navItems.map((item) => {
            const isActive = activeId === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`shrink-0 px-2 pb-1 transition-all duration-300 ${
                  isActive
                    ? 'scale-110 text-base font-semibold text-white'
                    : 'text-sm font-medium text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <span
                  className={`mb-1.5 block h-0.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-full bg-gradient-to-r from-indigo-400 to-cyan-400'
                      : 'w-0 bg-transparent'
                  }`}
                />
                {item.label}
              </a>
            )
          })}
        </div>
      </div>
    </motion.nav>
  )
}
