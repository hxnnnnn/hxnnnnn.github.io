import { useLocale } from '../../i18n/LocaleContext'

export function Footer() {
  const { ui } = useLocale()

  return (
    <footer className="border-t border-lab-border py-8 text-center text-sm">
      <p className="text-muted">{ui.footer.line1(new Date().getFullYear())}</p>
      <p className="text-faint mt-1 text-xs">{ui.footer.line2}</p>
    </footer>
  )
}
