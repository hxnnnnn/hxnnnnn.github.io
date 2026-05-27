import { motion } from 'framer-motion'

interface NavbarProps {
  name: string
}

const links = [
  { href: '#research', label: '研究' },
  { href: '#publications', label: '论文' },
  { href: '#experience', label: '经历' },
  { href: '#projects', label: '项目' },
  { href: '#contact', label: '联系' },
]

export function Navbar({ name }: NavbarProps) {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="fixed top-0 z-50 w-full border-b border-lab-border/50 bg-lab-bg/70 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#" className="text-sm font-semibold text-white">
          {name}
        </a>
        <ul className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-zinc-400 transition-colors hover:text-cyan-400"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={`${import.meta.env.BASE_URL}resume.pdf`}
          download
          className="rounded-lg border border-indigo-500/40 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-300 transition hover:bg-indigo-500/20"
        >
          下载简历
        </a>
      </div>
    </motion.nav>
  )
}
