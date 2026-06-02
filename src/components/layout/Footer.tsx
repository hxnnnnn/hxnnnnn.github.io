import { useLocale } from '../../i18n/LocaleContext'

export function Footer() {
  const { ui } = useLocale()

  return (
    <footer className="border-t border-lab-border py-8 text-center text-sm text-zinc-500">
      <p>{ui.footer.line1(new Date().getFullYear())}</p>
      <p className="mt-1 text-xs text-zinc-600">{ui.footer.line2}</p>
    </footer>
  )
}
