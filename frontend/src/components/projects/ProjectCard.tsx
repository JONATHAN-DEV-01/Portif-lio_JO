import { motion } from 'framer-motion'
import type { Project } from '@/lib/api'
import { DeployBadge } from '@/components/ui/Badge'

// GitHub's language color mapping (most common languages)
const LANG_COLORS: Record<string, string> = {
  Python: '#3572A5',
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Kotlin: '#A97BFF',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  'C#': '#178600',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Shell: '#89e051',
  Vue: '#41b883',
}

function getLangColor(lang: string | null): string {
  return lang ? (LANG_COLORS[lang] ?? '#8B949E') : '#8B949E'
}

function timeAgo(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'hoje'
  if (diffDays === 1) return 'ontem'
  if (diffDays < 7) return `${diffDays} dias atrás`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} semana(s) atrás`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} mês(es) atrás`
  return `${Math.floor(diffDays / 365)} ano(s) atrás`
}

interface ProjectCardProps {
  project: Project
  index: number
  onClick: () => void
}

export function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className="card p-5 flex flex-col gap-3 cursor-pointer group h-full"
      onClick={onClick}
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      role="button"
      aria-label={`Ver detalhes de ${project.name}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <svg className="text-text-secondary shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="font-mono font-semibold text-accent-blue text-sm truncate group-hover:underline">
            {project.name}
          </span>
        </div>
        {project.is_featured && (
          <span title="Projeto em destaque" className="text-accent-orange shrink-0">⭐</span>
        )}
      </div>

      {/* Deploy badge */}
      <DeployBadge isDeployed={project.is_deployed} />

      {/* Description */}
      <p className="text-text-secondary text-xs leading-relaxed line-clamp-2 flex-1">
        {project.description ?? 'Sem descrição disponível.'}
      </p>

      {/* Topics */}
      {project.topics.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {project.topics.slice(0, 4).map(topic => (
            <span
              key={topic}
              className="px-2 py-0.5 rounded-full text-xs bg-accent-blue/10 text-accent-blue border border-accent-blue/20"
            >
              {topic}
            </span>
          ))}
          {project.topics.length > 4 && (
            <span className="px-2 py-0.5 rounded-full text-xs bg-surface text-text-secondary border border-border">
              +{project.topics.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-border text-xs text-text-secondary mt-auto">
        <span className="flex items-center gap-1.5">
          {project.language && (
            <>
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: getLangColor(project.language) }}
              />
              {project.language}
            </>
          )}
        </span>
        <div className="flex items-center gap-3">
          {project.stargazers_count > 0 && (
            <span className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              {project.stargazers_count}
            </span>
          )}
          <span>{timeAgo(project.pushed_at)}</span>
        </div>
      </div>
    </motion.article>
  )
}
