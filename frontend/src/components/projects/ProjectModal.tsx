import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Modal } from '@/components/ui/Modal'
import { DeployBadge } from '@/components/ui/Badge'
import { useProject } from '@/hooks/useProjects'

interface ProjectModalProps {
  repoName: string | null
  onClose: () => void
}

function LanguageBar({ languages }: { languages: Record<string, number> }) {
  const total = Object.values(languages).reduce((a, b) => a + b, 0)
  if (total === 0) return null

  const COLORS: Record<string, string> = {
    Python: '#3572A5', TypeScript: '#3178c6', JavaScript: '#f1e05a',
    Kotlin: '#A97BFF', HTML: '#e34c26', CSS: '#563d7c', Java: '#b07219',
    Shell: '#89e051', Vue: '#41b883',
  }

  const entries = Object.entries(languages).sort((a, b) => b[1] - a[1])

  return (
    <div className="mt-4">
      <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Linguagens</p>
      {/* Bar */}
      <div className="flex rounded-full overflow-hidden h-2 w-full bg-surface-hover">
        {entries.map(([lang, bytes]) => (
          <div
            key={lang}
            style={{
              width: `${(bytes / total) * 100}%`,
              backgroundColor: COLORS[lang] ?? '#8B949E',
            }}
            title={`${lang}: ${((bytes / total) * 100).toFixed(1)}%`}
          />
        ))}
      </div>
      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
        {entries.map(([lang, bytes]) => (
          <span key={lang} className="flex items-center gap-1.5 text-xs text-text-secondary">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: COLORS[lang] ?? '#8B949E' }}
            />
            {lang} <span className="text-text-secondary/60">{((bytes / total) * 100).toFixed(1)}%</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export function ProjectModal({ repoName, onClose }: ProjectModalProps) {
  const { data: project, isLoading, isError } = useProject(repoName ?? '')

  return (
    <Modal open={Boolean(repoName)} onClose={onClose} title={repoName ?? ''}>
      {isLoading && (
        <div className="space-y-3 animate-pulse">
          <div className="skeleton h-5 w-32 rounded" />
          <div className="skeleton h-3 w-full rounded" />
          <div className="skeleton h-3 w-4/5 rounded" />
          <div className="skeleton h-24 w-full rounded mt-4" />
        </div>
      )}

      {isError && (
        <div className="text-center py-10 text-text-secondary">
          <p className="text-4xl mb-3">⚠️</p>
          <p>Não foi possível carregar os detalhes deste repositório.</p>
        </div>
      )}

      {project && (
        <div>
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <DeployBadge isDeployed={project.is_deployed} />
            {project.language && (
              <span className="text-xs text-text-secondary font-mono">{project.language}</span>
            )}
            {project.stargazers_count > 0 && (
              <span className="text-xs text-text-secondary flex items-center gap-1">
                ⭐ {project.stargazers_count}
              </span>
            )}
          </div>

          {project.description && (
            <p className="text-text-secondary text-sm mb-4">{project.description}</p>
          )}

          {/* Topics */}
          {project.topics.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.topics.map(t => (
                <span key={t} className="px-2 py-0.5 rounded-full text-xs bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Language breakdown */}
          {project.languages && Object.keys(project.languages).length > 0 && (
            <LanguageBar languages={project.languages} />
          )}

          {/* Action buttons */}
          <div className="flex gap-3 my-6">
            <a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm"
              id={`modal-github-${project.name}`}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33s1.7.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.02 10.02 0 0 0 22 12c0-5.52-4.48-10-10-10z"/>
              </svg>
              Ver no GitHub
            </a>

            {project.is_deployed && project.homepage && (
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
                id={`modal-deploy-${project.name}`}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Acessar deploy
              </a>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-border my-4" />

          {/* README */}
          {project.readme_html ? (
            <div className="markdown-body">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {atob(project.readme_html)}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="text-text-secondary text-sm text-center py-6">README não disponível para este repositório.</p>
          )}
        </div>
      )}
    </Modal>
  )
}
