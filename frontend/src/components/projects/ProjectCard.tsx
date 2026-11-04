import { useState } from 'react'
import type { Project } from '@/lib/api'
import { DeployBadge } from '@/components/ui/Badge'

function DeployPreview({ url, name }: { url: string; name: string }) {
  const [imgError, setImgError] = useState(false)
  const cleanUrl = url.replace(/^https?:\/\//, '')

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block my-2 rounded-lg overflow-hidden border border-border hover:border-accent-blue transition-colors group/link"
      onClick={(e) => e.stopPropagation()}
      title={`Visitar: ${url}`}
    >
      <div className="relative w-full" style={{ aspectRatio: '16/9', minHeight: 120, background: '#0d1117' }}>
        {!imgError ? (
          <img
            src={`/previews/${name}.webp`}
            alt={`Prévia do site de ${name}`}
            width={640}
            height={360}
            className="block w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
          />
        ) : (
          /* Fallback elegante quando screenshot falha */
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-surface-hover">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-secondary opacity-50">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M3 9h18"/>
              <circle cx="7" cy="6" r="1" fill="currentColor"/>
              <circle cx="10" cy="6" r="1" fill="currentColor"/>
            </svg>
            <span className="text-[10px] font-mono text-text-secondary opacity-60 truncate max-w-[85%]">{cleanUrl}</span>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center opacity-0 group-hover/link:opacity-100 transition-opacity">
          <span className="bg-canvas/90 text-text-primary px-3 py-1.5 rounded-md text-xs font-mono border border-border flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Abrir site
          </span>
          <span className="text-[9px] text-white/60 mt-1.5 font-mono truncate max-w-[85%]">{cleanUrl}</span>
        </div>
      </div>
    </a>
  )
}

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

const MONTHS = ['jan.', 'fev.', 'mar.', 'abr.', 'mai.', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.']

// An absolute date stays correct in prerendered HTML, unlike "3 days ago".
function formatUpdatedAt(dateStr: string | null): string {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return `${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`
}

interface ProjectCardProps {
  project: Project
  onClick: () => void
  onIntent: () => void
}

export function ProjectCard({ project, onClick, onIntent }: ProjectCardProps) {
  return (
    <article
      className="card reveal p-5 flex flex-col gap-3 cursor-pointer group h-full"
      onClick={onClick}
      onPointerEnter={onIntent}
      onFocus={onIntent}
      tabIndex={0}
      onKeyDown={e => {
        if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          onClick()
        }
      }}
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
        {project.featured && (
          <span title="Projeto em destaque" className="text-accent-orange shrink-0">⭐</span>
        )}
      </div>

      {/* Deploy badge */}
      <DeployBadge isDeployed={project.is_deployed} />

      {/* Deploy Image & Link */}
      {project.is_deployed && project.deploy_url && (
        <DeployPreview url={project.deploy_url} name={project.name} />
      )}

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
          <span>{formatUpdatedAt(project.pushed_at)}</span>
        </div>
      </div>
    </article>
  )
}
