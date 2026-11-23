import { ResumeButtons } from '@/components/ui/ResumeButtons'

interface TimelineItem {
  period: string
  title: string
  company: string
  bullets: string[]
  type: 'work' | 'education' | 'course'
  current?: boolean
}

const TIMELINE: TimelineItem[] = [
  {
    period: 'mar. 2026 — atual',
    title: 'Estagiário de TI',
    company: 'Prefeitura de São Paulo · SEGES (COPATS)',
    bullets: [
      'Atuo na Coordenadoria de Parcerias com o Terceiro Setor, responsável pelo ciclo de vida de soluções web em WordPress/PHP, do levantamento de requisitos à implementação.',
      'Desenvolvo automações em Python (web scraping, tratamento e análise de dados) e apoio soluções de IA generativa com RAG e orquestração de agentes, com foco em transparência e governança das parcerias.',
    ],
    type: 'work',
    current: true,
  },
  {
    period: 'jan. 2026 — abr. 2026',
    title: 'Estagiário de Desenvolvimento',
    company: 'Solaris Tech Tecnologia',
    bullets: [
      'Desenvolvi interfaces e funcionalidades com React, JavaScript e SQL em ambiente remoto e ágil, integrando front-end e back-end.',
      'Implementei controle de acesso baseado em papéis (RBAC) e participei de decisões de arquitetura, do modelo de dados ao processo de deploy.',
    ],
    type: 'work',
  },
]

const EDUCATION = [
  {
    period: 'cursando — conclusão prevista: dez. 2027',
    title: 'Bacharelado em Sistemas de Informação',
    institution: 'Faculdade Impacta',
    type: 'education',
  },
]

const AWARDS = [
  {
    kind: 'Prêmio',
    title: 'Prêmio Melhores Práticas de Estágio',
    institution: 'Prefeitura de São Paulo (SEGES)',
    detail: '2026',
    link: { label: 'Ver publicação', href: 'https://lnkd.in/p/dVNFJwdG' },
  },
  {
    kind: 'Certificação',
    title: 'Inteligência Artificial e Transformação Digital no Governo',
    institution: 'Saïd Business School, University of Oxford, com EMASP/Prefeitura de SP e UNESCO',
    detail: '2026 · 24h',
    link: {
      label: 'Ver certificado',
      href: 'https://www.linkedin.com/in/jonathan-nascimento-8bb679227/details/certifications/',
    },
  },
]

const COURSES = [
  {
    year: '2025',
    title: 'AI-900 — Fundamentos de IA no Azure',
    institution: 'Fundação Bradesco',
    hours: '15h',
  },
  {
    year: '2025',
    title: 'Projetos de Sistemas de TI',
    institution: 'Fundação Bradesco',
    hours: '15h',
  },
  {
    year: '2024',
    title: 'AWS Cloud Foundations',
    institution: 'Amazon',
    hours: '',
  },
  {
    year: '2024',
    title: 'Linguagem de Programação Python (Básico)',
    institution: 'Fundação Bradesco',
    hours: '18h',
  },
]

const TYPE_COLORS = {
  work: 'bg-accent-blue',
  education: 'bg-accent-purple',
  course: 'bg-accent-green',
}

export function ExperienceSection() {
  return (
    <section id="experiencia" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <h2 className="section-title">Experiência & Formação</h2>
          </div>
          {/* Download dos currículos */}
          <div className="flex flex-wrap gap-2 shrink-0">
            <ResumeButtons className="btn-secondary text-sm" idPrefix="download-resume" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">

          {/* Timeline — Experiência profissional */}
          <div className="md:col-span-2">
            <h3 className="text-text-primary text-base font-semibold mb-6">
              Experiência profissional
            </h3>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-3 top-0 bottom-0 w-px bg-border" />

              <div className="space-y-8">
                {TIMELINE.map((item, i) => (
                  <div
                    key={i}
                    className="reveal relative pl-10"
                  >
                    {/* Dot */}
                    <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full flex items-center justify-center
                      ${item.current ? TYPE_COLORS.work : 'bg-surface border-2 border-border'}`}>
                      {item.current && (
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      )}
                    </div>

                    <div className="glass-card p-4 hover:border-accent-blue/30 transition-colors">
                      <p className="font-mono text-xs text-text-secondary mb-1">{item.period}</p>
                      <h4 className="font-semibold text-text-primary">{item.title}</h4>
                      <p className="text-accent-blue text-sm font-medium mb-2">{item.company}</p>
                      <ul className="mt-2 space-y-1.5 list-none">
                        {item.bullets.map((b, bi) => (
                          <li key={bi} className="flex gap-2 text-text-secondary text-sm leading-relaxed">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-blue/60 shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column — Formação + Cursos */}
          <div className="space-y-8">

            {/* Formação */}
            <div
            >
              <h3 className="text-text-primary text-base font-semibold mb-4">
                Formação acadêmica
              </h3>

              {EDUCATION.map((edu, i) => (
                <div key={i} className="glass-card p-4 border-l-2 border-accent-purple">
                  <p className="font-mono text-xs text-text-secondary mb-1">{edu.period}</p>
                  <h4 className="font-semibold text-text-primary text-sm">{edu.title}</h4>
                  <p className="text-accent-purple text-sm font-medium">{edu.institution}</p>
                </div>
              ))}
            </div>

            {/* Prêmios e certificações */}
            <div
            >
              <h3 className="text-text-primary text-base font-semibold mb-4">
                Prêmios e Certificações
              </h3>

              <div className="space-y-3 mb-6">
                {AWARDS.map(award => (
                  <div key={award.title} className="glass-card p-4 border-l-2 border-accent-green">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="badge badge-green text-xs">{award.kind}</span>
                      <span className="font-mono text-xs text-text-secondary">{award.detail}</span>
                    </div>
                    <h4 className="font-semibold text-text-primary text-sm leading-snug">{award.title}</h4>
                    <p className="text-text-secondary text-xs mt-0.5">{award.institution}</p>
                    <a
                      href={award.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-accent-blue text-xs font-medium mt-2 hover:underline"
                    >
                      {award.link.label}
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  </div>
                ))}
              </div>

              <h4 className="text-text-secondary text-sm font-medium mb-3">Outros cursos</h4>
              <div className="space-y-3">
                {COURSES.map((course, i) => (
                  <div
                    key={i}
                    className="glass-card p-3 hover:border-accent-green/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-text-primary text-xs font-semibold leading-snug">{course.title}</p>
                        <p className="text-text-secondary text-xs mt-0.5">{course.institution}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <span className="badge badge-green text-xs">{course.year}</span>
                        {course.hours && (
                          <p className="text-text-secondary text-xs mt-1">{course.hours}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
