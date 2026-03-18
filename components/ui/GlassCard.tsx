import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: 'blue' | 'red' | 'emerald' | 'none'
  padding?: 'sm' | 'md' | 'lg' | 'none'
}

export function GlassCard({
  children,
  className,
  hover = false,
  glow = 'none',
  padding = 'md',
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border bg-zinc-900/60 backdrop-blur-xl',
        'border-white/[0.06]',
        hover && 'transition-all duration-300 hover:border-white/10 hover:bg-zinc-900/80 hover:-translate-y-0.5 cursor-pointer',
        glow === 'blue' && 'shadow-glow-blue',
        glow === 'red' && 'shadow-glow-red',
        glow === 'emerald' && 'shadow-glow-emerald',
        padding === 'sm' && 'p-4',
        padding === 'md' && 'p-6',
        padding === 'lg' && 'p-8',
        padding === 'none' && '',
        className
      )}
    >
      {children}
    </div>
  )
}
