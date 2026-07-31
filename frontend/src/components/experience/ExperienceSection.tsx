import { motion } from 'framer-motion'

interface TimelineItem {
  period: string
  title: string
  company: string
  description: string
  type: 'work' | 'education' | 'course'
  current?: boolean
}

const TIMELINE: TimelineItem[] = [
  {
    period: '2025 – presente',
    title: 'Estagiário Desenvolvedor',
    company: 'Prefeitura de São Paulo (SEGES)',
    description: 'Desenvolvimento de sistemas internos para a Secretaria de Gestão (SEGES). Aplicando Python, React e boas práticas de engenharia de software no setor público.',
    type: 'work',
    current: true,
  },
  {
    period: '2025',
    title: 'Analista Financeiro / TI',
    company: 'Telma Multimarcas',
    description: 'Elaboração de balanços e dashboards interativos de fluxo de caixa. Responsável simultâneo por toda a infraestrutura de TI local — montagem e manutenção de hardware, upgrades de memória, configuração de rede interna de compartilhamento de dados.',
    type: 'work',
  },
  {
    period: '2023 – 2024',
    title: 'Jovem Aprendiz',
    company: 'Spiral do Brasil',
    description: 'Setor de admissão do RH — integração e cadastro de novos funcionários, confecção de relatórios administrativos com Excel avançado.',
    type: 'work',
  },
]

const EDUCATION = [
  {
    period: 'cursando – até 12/2027',
    title: 'Bacharelado em Sistemas de Informação',
    institution: 'Faculdade Impacta',
    type: 'education',
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
    hours: '41–360h',
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <p className="text-accent-blue font-mono text-sm mb-2">// experiência & formação</p>
            <h2 className="section-title">Experiência & Formação</h2>
            <div className="section-divider" />
          </div>
          {/* TODO: Jonathan — coloque o PDF do currículo na pasta public/ e atualize o link abaixo */}
          <a
            href="/curriculo-jonathan-nascimento.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm shrink-0 self-start sm:self-auto"
            id="download-resume"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Baixar currículo (PDF)
          </a>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Timeline — Experiência profissional */}
          <div className="lg:col-span-2">
            <h3 className="text-text-secondary text-xs font-semibold uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-4 h-px bg-accent-blue" />
              Experiência profissional
            </h3>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-3 top-0 bottom-0 w-px bg-border" />

              <div className="space-y-8">
                {TIMELINE.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative pl-10"
                  >
                    {/* Dot */}
                    <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full flex items-center justify-center
                      ${item.current ? TYPE_COLORS.work : 'bg-surface border-2 border-border'}`}>
                      {item.current && (
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      )}
                    </div>

                    <div className="glass-card p-4 hover:border-accent-blue/30 transition-colors">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-text-secondary">{item.period}</span>
                        {item.current && (
                          <span className="badge badge-green text-xs">Atual</span>
                        )}
                      </div>
                      <h4 className="font-semibold text-text-primary">{item.title}</h4>
                      <p className="text-accent-blue text-sm font-medium mb-2">{item.company}</p>
                      <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column — Formação + Cursos */}
          <div className="space-y-8">

            {/* Formação */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <h3 className="text-text-secondary text-xs font-semibold uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-4 h-px bg-accent-purple" />
                Formação acadêmica
              </h3>

              {EDUCATION.map((edu, i) => (
                <div key={i} className="glass-card p-4 border-l-2 border-accent-purple">
                  <p className="font-mono text-xs text-text-secondary mb-1">{edu.period}</p>
                  <h4 className="font-semibold text-text-primary text-sm">{edu.title}</h4>
                  <p className="text-accent-purple text-sm font-medium">{edu.institution}</p>
                </div>
              ))}
            </motion.div>

            {/* Cursos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
            >
              <h3 className="text-text-secondary text-xs font-semibold uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-4 h-px bg-accent-green" />
                Cursos & Certificações
              </h3>

              <div className="space-y-3">
                {COURSES.map((course, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="glass-card p-3 hover:border-accent-green/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-text-primary text-xs font-semibold leading-snug">{course.title}</p>
                        <p className="text-text-secondary text-xs mt-0.5">{course.institution}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <span className="badge badge-green text-xs">{course.year}</span>
                        <p className="text-text-secondary text-xs mt-1">{course.hours}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
