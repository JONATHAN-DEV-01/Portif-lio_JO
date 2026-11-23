import { FEATURED_PROJECTS, MAIN_PROJECT, type FeaturedProject } from '@/data/featuredProjects'
import { Badge } from '@/components/ui/Badge'

function StatusBadge({ status }: { status: NonNullable<FeaturedProject['status']> }) {
  return status.tone === 'live' ? (
    <Badge variant="green">
      <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse inline-block" />
      {status.label}
    </Badge>
  ) : (
    <Badge variant="neutral">
      <span className="w-1.5 h-1.5 rounded-full border border-text-secondary inline-block" />
      {status.label}
    </Badge>
  )
}

function StackList({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Tecnologias">
      {stack.map(tech => (
        <li
          key={tech}
          className="px-2 py-0.5 rounded-md text-xs font-mono bg-canvas border border-border text-text-secondary"
        >
          {tech}
        </li>
      ))}
    </ul>
  )
}

function ProjectLinks({ links }: { links: FeaturedProject['links'] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {links.map(link => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${link.primary ? 'btn-primary' : 'btn-secondary'} text-xs px-3 py-1.5`}
        >
          {link.label}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      ))}
    </div>
  )
}

function MainProjectCard({ project }: { project: FeaturedProject }) {
  const appLink = project.links.find(link => link.primary)

  return (
    <article className="glass-card reveal p-5 sm:p-6 grid lg:grid-cols-[1.1fr_1fr] gap-6 border-accent-blue/40">
      <div className="flex flex-col gap-4 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="badge badge-blue">Destaque principal</span>
          {project.status && <StatusBadge status={project.status} />}
        </div>
        <h4 className="text-xl sm:text-2xl font-bold text-text-primary leading-tight">{project.title}</h4>
        <p className="text-text-secondary text-sm leading-relaxed">{project.summary}</p>
        {project.highlights && (
          <ul className="space-y-1.5">
            {project.highlights.map(item => (
              <li key={item} className="flex gap-2 text-text-secondary text-sm leading-relaxed">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-blue/60 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        )}
        <StackList stack={project.stack} />
        <ProjectLinks links={project.links} />
      </div>

      {project.preview && (
        <a
          href={appLink?.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block self-center rounded-lg overflow-hidden border border-border hover:border-accent-blue transition-colors"
        >
          <img
            src={`/previews/${project.preview}.webp`}
            alt={`Tela do ${project.title}`}
            width={640}
            height={360}
            className="block w-full h-auto"
            loading="lazy"
            decoding="async"
          />
        </a>
      )}
    </article>
  )
}

function FeaturedProjectCard({ project }: { project: FeaturedProject }) {
  return (
    <article className="glass-card reveal p-5 flex flex-col gap-3 h-full">
      <h4 className="font-semibold text-text-primary leading-snug">{project.title}</h4>
      {project.status && (
        <div>
          <StatusBadge status={project.status} />
        </div>
      )}
      <p className="text-text-secondary text-sm leading-relaxed flex-1">{project.summary}</p>
      <StackList stack={project.stack} />
      <div className="pt-3 border-t border-border">
        <ProjectLinks links={project.links} />
      </div>
    </article>
  )
}

export function FeaturedProjects() {
  return (
    <div className="mb-16">
      <h3 className="text-text-primary text-xl font-semibold mb-6">Projetos em Destaque</h3>
      <div className="space-y-4">
        <MainProjectCard project={MAIN_PROJECT} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURED_PROJECTS.map(project => (
            <FeaturedProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}
