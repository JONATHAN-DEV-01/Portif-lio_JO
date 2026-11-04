import { lazy, Suspense, useState, useMemo } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { projectDetailQuery, useProjects } from '@/hooks/useProjects'
import { ProjectCard } from './ProjectCard'
import { ProjectFilters, type FilterState } from './ProjectFilters'

// The modal carries the Markdown renderer, the heaviest dependency of the site.
const loadProjectModal = () => import('./ProjectModal')
const ProjectModal = lazy(() =>
  loadProjectModal().then(module => ({ default: module.ProjectModal })),
)

const DEFAULT_FILTERS: FilterState = {
  status: 'all',
  language: '',
  search: '',
  sort: 'updated',
}

export function ProjectsSection() {
  const { data: projects } = useProjects()
  const queryClient = useQueryClient()
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null)

  // Available languages for filter dropdown
  const languages = useMemo(() => {
    const set = new Set(projects.map(p => p.language).filter(Boolean) as string[])
    return Array.from(set).sort()
  }, [projects])

  // Filtered + sorted projects
  const visible = useMemo(() => {
    let result = [...projects]

    if (filters.status === 'deployed') result = result.filter(p => p.is_deployed)
    if (filters.status === 'not-deployed') result = result.filter(p => !p.is_deployed)
    if (filters.language) result = result.filter(p => p.language === filters.language)
    if (filters.search) {
      const q = filters.search.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.description?.toLowerCase().includes(q)) ||
        p.topics.some(t => t.toLowerCase().includes(q))
      )
    }

    // Sort
    if (filters.sort === 'updated') {
      result = result.sort((a, b) => (b.pushed_at ?? '').localeCompare(a.pushed_at ?? ''))
    } else if (filters.sort === 'stars') {
      result = result.sort((a, b) => b.stargazers_count - a.stargazers_count)
    } else {
      result = result.sort((a, b) => a.name.localeCompare(b.name))
    }

    // In the default order, projects that can be seen live come right after the featured ones
    const rank = (p: (typeof result)[number]) => {
      if (p.featured) return 0
      return filters.sort === 'updated' && p.is_deployed ? 1 : 2
    }
    return result.sort((a, b) => rank(a) - rank(b))
  }, [projects, filters])

  // Starts loading the modal as soon as the visitor shows interest in a card.
  const handleCardIntent = (name: string) => {
    void loadProjectModal()
    void queryClient.prefetchQuery(projectDetailQuery(name))
  }

  return (
    <section id="projetos" className="py-24 bg-surface/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <div className="mb-8">
          <h2 className="section-title">Projetos</h2>
          <p className="section-subtitle">
            Meus repositórios públicos, sincronizados com o GitHub.
          </p>

          <p className="p-4 rounded-lg bg-surface border border-border text-sm text-text-secondary max-w-2xl">
            <strong className="text-text-primary">Observação:</strong> o banco de dados está ativo apenas nos projetos <strong className="text-text-primary">Portifólio</strong> e <strong className="text-text-primary">zupps-eats</strong>. Nos demais repositórios, ele está suspenso no Supabase.
          </p>
        </div>

        <ProjectFilters
          filters={filters}
          languages={languages}
          onChange={setFilters}
          total={projects.length}
          visible={visible.length}
        />

        {visible.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-text-secondary">Nenhum projeto com esses filtros.</p>
            <button onClick={() => setFilters(DEFAULT_FILTERS)} className="btn-ghost mt-4 text-sm">
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visible.map(project => (
              <ProjectCard
                key={project.name}
                project={project}
                onClick={() => setSelectedRepo(project.name)}
                onIntent={() => handleCardIntent(project.name)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedRepo && (
        <Suspense fallback={null}>
          <ProjectModal repoName={selectedRepo} onClose={() => setSelectedRepo(null)} />
        </Suspense>
      )}
    </section>
  )
}
