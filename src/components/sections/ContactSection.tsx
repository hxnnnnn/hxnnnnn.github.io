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
    <section className="section-container">
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
        <p className="text-2xl font-bold text-white">{profile.name}</p>
        <p className="mt-2 gradient-text">{profile.tagline}</p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
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
          <a
            href={`${import.meta.env.BASE_URL}resume.pdf`}
            download
            className="rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            下载 PDF 简历
          </a>
        </div>

        <p className="mt-6 text-xs text-zinc-600">
          电话可在 PDF 简历中查看
        </p>
      </motion.div>
    </section>
  )
}
