import type { ReactNode } from 'react'
import type { ProjectStatus } from '@/lib/api'

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
export function DeployBadge({ status }: { status: ProjectStatus }) {
  if (status === 'deployed') {
    return (
      <Badge variant="green">
        <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse inline-block" />
        Deployado
      </Badge>
    )
  }

  if (status === 'paused') {
    return (
      <Badge variant="neutral">
        <span className="w-1.5 h-1.5 rounded-full border border-text-secondary inline-block" />
        Demo pausada
      </Badge>
    )
  }

  return (
    <Badge variant="orange">
      <span className="w-1.5 h-1.5 rounded-full bg-accent-orange inline-block" />
      Em desenvolvimento
    </Badge>
  )
}
