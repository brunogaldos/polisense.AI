import { Droplets, FileSearch, FileText, Layers, Leaf, Satellite, Sun, type LucideIcon } from 'lucide-react'
import type { EngineIcon as EngineIconName } from '@/lib/toolkits'

const ICONS: Record<EngineIconName, LucideIcon> = {
  droplets: Droplets,
  sun: Sun,
  leaf: Leaf,
  satellite: Satellite,
  layers: Layers,
  'file-search': FileSearch,
  'file-text': FileText,
}

// The engine's mark: its icon in a small tinted tile, the same everywhere an
// engine appears so each one reads as a distinct in-house product.
export default function EngineIcon({ name, size = 'md' }: { name: EngineIconName; size?: 'sm' | 'md' }) {
  const Icon = ICONS[name]
  const box = size === 'sm' ? 'h-9 w-9 rounded-lg' : 'h-11 w-11 rounded-xl'
  return (
    <span className={`${box} shrink-0 flex items-center justify-center bg-accent/12 border border-accent/30 text-accent`} aria-hidden>
      <Icon size={size === 'sm' ? 17 : 20} strokeWidth={1.75} />
    </span>
  )
}
