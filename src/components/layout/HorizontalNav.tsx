import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useLocale } from '../../i18n/LocaleContext'
import { getAlternateLocalePath } from '../../i18n/site'

export function HorizontalNav() {
  const { ui, locale } = useLocale()
  const location = useLocation()
  const alternatePath = getAlternateLocalePath(locale)

  const navItems = [
    { id: 'education', label: ui.nav.education },
    { id: 'publications', label: ui.nav.publications },
    { id: 'experience', label: ui.nav.experience },
    { id: 'projects', label: ui.nav.projects },
    { id: 'awards', label: ui.nav.awards },
    { id: 'contact', label: ui.nav.contact },
  ] as const

  const sectionIds = navItems.map((item) => item.id)
  const activeId = useActiveSection([...sectionIds])

  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.45 }}
      className="fixed top-0 z-50 w-full border-b border-lab-border/50 bg-lab-bg/85 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-5xl items-end justify-between gap-3 px-4 py-3">
        <div className="flex min-w-0 flex-1 items-end gap-2 overflow-x-auto scrollbar-none">
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
        <Link
          to={`${alternatePath}${location.hash}`}
          className="shrink-0 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300 transition hover:text-white"
        >
          {ui.nav.langSwitch}
        </Link>
      </div>
    </motion.nav>
  )
}
