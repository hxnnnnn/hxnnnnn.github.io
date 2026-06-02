import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLocale } from '../../i18n/LocaleContext'
import { SectionHeader } from '../ui/SectionHeader'

export function ContactSection() {
  const { profile, ui } = useLocale()
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
        title={ui.sections.contact}
        subtitle={ui.sections.contactSubtitle}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card flex items-center justify-between gap-6 p-6 sm:p-8"
      >
        <div className="min-w-0 text-left">
          <p className="text-xl font-bold leading-tight text-white sm:text-2xl">
            {profile.heroName}
          </p>
          <p className="mt-1 text-sm text-zinc-500">{profile.name}</p>
        </div>

        <div className="shrink-0 text-right text-sm">
          <p className="text-zinc-500">{profile.contact.location}</p>
          <button
            type="button"
            onClick={copyEmail}
            className="mt-1 text-zinc-300 transition hover:text-cyan-300"
          >
            {copied ? ui.contact.copied : profile.contact.email}
          </button>
        </div>
      </motion.div>
    </section>
  )
}
