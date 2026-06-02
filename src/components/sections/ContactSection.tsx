import { useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../../data/profile'
import { SectionHeader } from '../ui/SectionHeader'

export function ContactSection() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.contact.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="section-container scroll-mt-28">
      <SectionHeader
        id="contact"
        title="联系我"
        subtitle="欢迎就 3D 视觉、图形学或合作研究进行交流。"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card p-8 text-center"
      >
        <p className="text-2xl font-bold text-white">{profile.heroName}</p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {profile.identities.map((id) => (
            <span
              key={id}
              className="text-sm text-cyan-400/90"
            >
              {id}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={copyEmail}
            className="rounded-xl border border-lab-border bg-lab-bg px-6 py-3 text-sm text-zinc-300 transition hover:border-cyan-500/40 hover:text-white"
          >
            {copied ? '已复制 ✓' : profile.contact.email}
          </button>
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-lab-border bg-lab-bg px-6 py-3 text-sm text-zinc-300 transition hover:border-cyan-500/40 hover:text-white"
          >
            GitHub · @hxnnnnn
          </a>
        </div>
      </motion.div>
    </section>
  )
}
