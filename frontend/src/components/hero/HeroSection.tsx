import { motion } from 'framer-motion'
import { useProfile } from '@/hooks/useProfile'
import { TerminalTyping } from './TerminalTyping'
import { SkeletonProfile } from '@/components/ui/SkeletonCard'

const TECH_BADGES = [
  'Python', 'React', 'TypeScript', 'Flask', 'FastAPI',
  'PostgreSQL', 'Docker', 'Git', 'RPA', 'IA/ML',
]

export function HeroSection() {
  const { data: profile, isLoading } = useProfile()

  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden grid-bg"
    >
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left — text content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Status badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-green/10 border border-accent-green/20 text-accent-green text-xs font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                Disponível para oportunidades
              </div>

              {/* Name */}
              {isLoading ? (
                <SkeletonProfile />
              ) : (
                <div className="flex items-center gap-4 mb-4">
                  {profile?.avatar_url && (
                    <img
                      src={profile.avatar_url}
                      alt={`Avatar de ${profile.name}`}
                      className="w-16 h-16 rounded-full border-2 border-accent-blue/40 shadow-glow-blue"
                      loading="lazy"
                    />
                  )}
                  <div>
                    <p className="text-text-secondary text-sm font-mono mb-0.5">Olá, eu sou</p>
                    <h1 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-text-primary leading-tight">
                      Jonathan{' '}
                      <span className="gradient-text">Nascimento</span>
                    </h1>
                  </div>
                </div>
              )}

              {/* Headline */}
              <p className="text-text-secondary text-lg leading-relaxed mb-6 max-w-lg">
                Dev Fullstack · <span className="text-accent-blue">Python & React</span> ·
                Estagiário na <span className="text-text-primary font-medium">Prefeitura de São Paulo</span> (SEGES) ·
                Estudante de Sistemas de Informação na <span className="text-text-primary font-medium">Impacta</span>
              </p>

              {/* Tech badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                {TECH_BADGES.map(tech => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-surface border border-border text-text-secondary hover:border-accent-blue/40 hover:text-accent-blue transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleScrollTo('projetos')}
                  className="btn-primary"
                  id="hero-cta-projects"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                  </svg>
                  Ver projetos
                </button>

                <a
                  href="https://linkedin.com/in/jonathan-nascimento-8bb679227"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  id="hero-cta-linkedin"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>

                <a
                  href="mailto:jonathanads2006@gmail.com"
                  className="btn-ghost"
                  id="hero-cta-email"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  E-mail
                </a>

                {/* Currículo DOCX */}
                <a
                  href="/curriculo-jonathan-nascimento.docx"
                  download="curriculo-jonathan-nascimento.docx"
                  className="btn-ghost"
                  id="hero-cta-resume"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="12" y1="18" x2="12" y2="12" />
                    <line x1="9" y1="15" x2="15" y2="15" />
                  </svg>
                  Currículo (.docx)
                </a>
              </div>

              {/* GitHub stats */}
              {profile && (
                <div className="flex items-center gap-4 mt-8 text-xs text-text-secondary">
                  <span className="flex items-center gap-1">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    {profile.followers} seguidores
                  </span>
                  <span className="flex items-center gap-1">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    </svg>
                    {profile.public_repos} repositórios
                  </span>
                  <span className="flex items-center gap-1">
                    🏆 Pull Shark · YOLO
                  </span>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right — terminal */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <TerminalTyping />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-secondary"
        >
          <span className="text-xs">scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
