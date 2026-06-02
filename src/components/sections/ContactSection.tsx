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
        <p className="mt-2 text-sm text-zinc-500">{profile.contact.location}</p>

        <button
          type="button"
          onClick={copyEmail}
          className="mt-8 rounded-xl border border-lab-border bg-lab-bg px-6 py-3 text-sm text-zinc-300 transition hover:border-cyan-500/40 hover:text-white"
        >
          {copied ? '已复制 ✓' : profile.contact.email}
        </button>
      </motion.div>
    </section>
  )
}
