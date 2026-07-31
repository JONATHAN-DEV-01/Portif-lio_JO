interface FilterState {
  status: 'all' | 'deployed' | 'not-deployed'
  language: string
  search: string
  sort: 'updated' | 'stars' | 'name'
}

interface ProjectFiltersProps {
  filters: FilterState
  languages: string[]
  onChange: (f: FilterState) => void
  total: number
  visible: number
}

export function ProjectFilters({ filters, languages, onChange, total, visible }: ProjectFiltersProps) {
  const set = (partial: Partial<FilterState>) => onChange({ ...filters, ...partial })

  return (
    <div className="flex flex-col sm:flex-row gap-3 flex-wrap items-start sm:items-center mb-6">
      {/* Search */}
      <div className="relative flex-1 min-w-48">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Buscar projetos..."
          value={filters.search}
          onChange={e => set({ search: e.target.value })}
          className="w-full pl-9 pr-4 py-2 bg-surface border border-border rounded-lg text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-accent-blue transition-colors"
          id="project-search"
          aria-label="Buscar projetos"
        />
      </div>

      {/* Status filter */}
      <div className="flex items-center gap-1 bg-surface border border-border rounded-lg p-1">
        {(['all', 'deployed', 'not-deployed'] as const).map(s => (
          <button
            key={s}
            onClick={() => set({ status: s })}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              filters.status === s
                ? 'bg-accent-blue text-white'
                : 'text-text-secondary hover:text-text-primary'
            }`}
            id={`filter-status-${s}`}
          >
            {s === 'all' ? 'Todos' : s === 'deployed' ? '🟢 Deployado' : '🟡 Em dev'}
          </button>
        ))}
      </div>

      {/* Language select */}
      <select
        value={filters.language}
        onChange={e => set({ language: e.target.value })}
        className="px-3 py-2 bg-surface border border-border rounded-lg text-sm text-text-secondary focus:outline-none focus:border-accent-blue cursor-pointer transition-colors"
        id="filter-language"
        aria-label="Filtrar por linguagem"
      >
        <option value="">Todas as linguagens</option>
        {languages.map(lang => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>

      {/* Sort */}
      <select
        value={filters.sort}
        onChange={e => set({ sort: e.target.value as FilterState['sort'] })}
        className="px-3 py-2 bg-surface border border-border rounded-lg text-sm text-text-secondary focus:outline-none focus:border-accent-blue cursor-pointer transition-colors"
        id="filter-sort"
        aria-label="Ordenar projetos"
      >
        <option value="updated">Mais recentes</option>
        <option value="stars">Mais estrelas</option>
        <option value="name">Nome A-Z</option>
      </select>

      {/* Count */}
      <span className="text-text-secondary text-xs whitespace-nowrap ml-auto">
        {visible} / {total} projetos
      </span>
    </div>
  )
}

export type { FilterState }
