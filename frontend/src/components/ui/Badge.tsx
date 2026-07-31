import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'green' | 'orange' | 'blue' | 'purple' | 'neutral'
  className?: string
}

export function Badge({ children, variant = 'neutral', className = '' }: BadgeProps) {
  const variantClass = {
    green: 'badge-green',
    orange: 'badge-orange',
    blue: 'badge-blue',
    purple: 'badge-purple',
    neutral: 'badge-neutral',
  }[variant]

  return (
    <span className={`badge ${variantClass} ${className}`}>
      {children}
    </span>
  )
}

// Deploy status badge
export function DeployBadge({ isDeployed }: { isDeployed: boolean }) {
  return isDeployed ? (
    <Badge variant="green">
      <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse inline-block" />
      Deployado
    </Badge>
  ) : (
    <Badge variant="orange">
      <span className="w-1.5 h-1.5 rounded-full bg-accent-orange inline-block" />
      Em desenvolvimento
    </Badge>
  )
}
