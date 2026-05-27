export function Footer() {
  return (
    <footer className="border-t border-lab-border py-8 text-center text-sm text-zinc-500">
      <p>© {new Date().getFullYear()} 黄晓宁 · Built with React & Three.js</p>
      <p className="mt-1 text-xs text-zinc-600">
        InfiHead: reconstruction complete ✓
      </p>
    </footer>
  )
}
