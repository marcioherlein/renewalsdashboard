import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'outline'
}

export function Badge({ children, className, variant = 'outline' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium border',
        variant === 'outline' ? 'border-white/10 bg-white/5 text-zinc-300' : 'border-transparent bg-zinc-800 text-zinc-300',
        className
      )}
    >
      {children}
    </span>
  )
}
