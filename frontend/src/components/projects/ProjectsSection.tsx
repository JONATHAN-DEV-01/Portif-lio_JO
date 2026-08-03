import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useProjects } from '@/hooks/useProjects'
import { ProjectCard } from './ProjectCard'
import { ProjectFilters, type FilterState } from './ProjectFilters'
import { ProjectModal } from './ProjectModal'
import { SkeletonCard } from '@/components/ui/SkeletonCard'

const DEFAULT_FILTERS: FilterState = {
  status: 'all',
  language: '',
  search: '',
  sort: 'updated',
}

export function ProjectsSection() {
  const { data: projects, isLoading, isError, refetch } = useProjects()
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null)

  // Available languages for filter dropdown
  const languages = useMemo(() => {
    if (!projects) return []
    const set = new Set(projects.map(p => p.language).filter(Boolean) as string[])
    return Array.from(set).sort()
  }, [projects])

  // Filtered + sorted projects
  const visible = useMemo(() => {
    if (!projects) return []
    let result = projects.filter(p => !p.hide)

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
      result = result.sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
    } else if (filters.sort === 'stars') {
      result = result.sort((a, b) => b.stargazers_count - a.stargazers_count)
    } else {
      result = result.sort((a, b) => a.name.localeCompare(b.name))
    }

    // Featured first
    result = [...result.filter(p => p.is_featured), ...result.filter(p => !p.is_featured)]

    return result
  }, [projects, filters])

  return (
    <section id="projetos" className="py-24 bg-surface/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="text-accent-blue font-mono text-sm mb-2">// projetos</p>
          <h2 className="section-title">Projetos</h2>
          <div className="section-divider" />
          <p className="section-subtitle">
            Repositórios reais do GitHub — atualizados automaticamente em tempo real
          </p>

          <div className="mt-6 p-4 rounded-lg bg-surface border border-accent-blue/20 text-sm text-text-secondary flex gap-3 items-start max-w-2xl">
            <span className="text-accent-blue text-lg">ℹ️</span>
            <p>
              <strong className="text-text">Observação:</strong> O banco de dados está ativo apenas nos projetos <strong>Portifólio</strong> e <strong>zupps-eats</strong>. Nos demais repositórios, o banco de dados encontra-se suspenso no Supabase.
            </p>
          </div>
        </motion.div>

        {/* Filters */}
        {!isLoading && !isError && (
          <ProjectFilters
            filters={filters}
            languages={languages}
            onChange={setFilters}
            total={projects?.filter(p => !p.hide).length ?? 0}
            visible={visible.length}
          />
        )}

        {/* Error state */}
        {isError && (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">⚠️</p>
            <p className="text-text-secondary mb-4">Falha ao conectar com o backend. Verifique se o servidor está rodando.</p>
            <button onClick={() => refetch()} className="btn-secondary text-sm">
              Tentar novamente
            </button>
          </div>
        )}

        {/* Loading skeletons */}
        {isLoading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && visible.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-text-secondary">Nenhum projeto encontrado com esses filtros.</p>
            <button onClick={() => setFilters(DEFAULT_FILTERS)} className="btn-ghost mt-4 text-sm">
              Limpar filtros
            </button>
          </div>
        )}

        {/* Project grid */}
        {!isLoading && !isError && visible.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visible.map((project, i) => (
              <ProjectCard
                key={project.name}
                project={project}
                index={i}
                onClick={() => setSelectedRepo(project.name)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail modal */}
      <ProjectModal
        repoName={selectedRepo}
        onClose={() => setSelectedRepo(null)}
      />
    </section>
  )
}
