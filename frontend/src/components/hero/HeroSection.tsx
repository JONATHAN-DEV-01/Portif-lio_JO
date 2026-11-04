import { useProfile } from '@/hooks/useProfile'
import { TerminalTyping } from './TerminalTyping'

const TECH_BADGES = [
  'Python', 'React', 'TypeScript', 'Flask', 'FastAPI',
  'PostgreSQL', 'Docker', 'Git', 'RPA', 'IA/ML',
]

export function HeroSection() {
  const { data: profile } = useProfile()

  return (
    <section id="hero" className="grid-bg flex items-center pt-16 lg:min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-20 w-full">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center">

          <div>
            <div className="flex items-center gap-5 mb-6">
              <img
                src="/avatar.webp"
                alt="Foto de Jonathan Nascimento"
                width={240}
                height={240}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border border-border bg-surface shrink-0"
                loading="eager"
                decoding="sync"
                {...{ fetchpriority: "high" }}
              />
              <span className="inline-flex items-center gap-2 text-accent-green text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                Disponível para oportunidades
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-none text-text-primary mb-5">
              Jonathan Nascimento
            </h1>

            <p className="text-text-secondary text-lg leading-relaxed mb-6 max-w-xl">
              Desenvolvedor fullstack em <span className="text-text-primary font-medium">Python e React</span>.
              Estagiário na Prefeitura de São Paulo (SEGES) e estudante de Sistemas de Informação na Impacta.
            </p>

            <ul className="flex flex-wrap gap-2 mb-8">
              {TECH_BADGES.map(tech => (
                <li
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-surface border border-border text-text-secondary"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <a href="#projetos" className="btn-primary" id="hero-cta-projects">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
                Ver projetos
              </a>

              <a
                href="https://linkedin.com/in/jonathan-nascimento-8bb679227"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                id="hero-cta-linkedin"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>

              <a href="mailto:jonathanads2006@gmail.com" className="btn-ghost" id="hero-cta-email">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                E-mail
              </a>

              <a
                href="/curriculo-jonathan-nascimento.docx"
                download="curriculo-jonathan-nascimento.docx"
                className="btn-ghost"
                id="hero-cta-resume"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
                Baixar currículo (.docx)
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-8 text-sm text-text-secondary">
              <span>{profile.followers} seguidores</span>
              <span>{profile.public_repos} repositórios</span>
              <span>Conquistas no GitHub: Pull Shark e YOLO</span>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <TerminalTyping />
          </div>
        </div>
      </div>
    </section>
  )
}
