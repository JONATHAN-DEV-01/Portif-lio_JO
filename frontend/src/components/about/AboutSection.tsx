import { motion } from 'framer-motion'

const SKILLS = [
  { category: 'Frontend', items: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind'] },
  { category: 'Backend', items: ['Python', 'Flask', 'FastAPI', 'REST APIs'] },
  { category: 'Banco de Dados', items: ['PostgreSQL', 'MySQL', 'SQLAlchemy', 'Supabase'] },
  { category: 'DevOps & Cloud', items: ['Docker', 'Git', 'GitHub Actions', 'Render', 'Vercel', 'AWS'] },
  { category: 'IA & Automação', items: ['Scikit-learn', 'Pandas', 'PyAutoGUI (RPA)', 'Azure AI'] },
  { category: 'Outros', items: ['WordPress', 'Figma', 'MVC', 'Arq. Hexagonal', 'Linux'] },
]

const BULLETS = [
  { icon: '🏢', text: 'Estagiário como Desenvolvedor na Prefeitura de São Paulo (SEGES)' },
  { icon: '🎓', text: 'Estudante de Sistemas de Informação na Faculdade Impacta (formatura 12/2027)' },
  { icon: '⚙️', text: 'Constrói soluções web completas com React no frontend e Python (Flask) no backend' },
  { icon: '🏗️', text: 'Foco em boas práticas — padrões MVC e Arquitetura Hexagonal para sistemas escaláveis' },
  { icon: '🤖', text: 'Entusiasta de RPA (PyAutoGUI) e de IA aplicada (Scikit-learn, Pandas)' },
  { icon: '☁️', text: 'Deploy em Render, Vercel, Supabase e Docker; interesse em infraestrutura e DevOps' },
]

export function AboutSection() {
  return (
    <section id="sobre" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-accent-blue font-mono text-sm mb-2">// sobre mim</p>
          <h2 className="section-title">Sobre mim</h2>
          <div className="section-divider" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 mt-8">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <p className="text-text-secondary leading-relaxed mb-6">
              Desenvolvedor Full Stack com expertise em <span className="text-text-primary font-medium">Python, Flask, React e DevOps</span>,
              aliando lógica de programação a conhecimentos sólidos de Hardware e Redes.
              Foco em performance e automação de ponta a ponta.
            </p>
            <p className="text-text-secondary leading-relaxed mb-8">
              Destaque: desenvolveu e mantém em produção uma aplicação completa de gestão de estoque — <span className="font-mono text-accent-blue text-sm">gestao_estoque</span> (API em Arquitetura Hexagonal) + <span className="font-mono text-accent-blue text-sm">stockflow-for-sellers</span> (frontend TypeScript) — além do <span className="font-mono text-accent-blue text-sm">BolaoWorldCup</span>, que operou em produção com usuários reais.
            </p>

            <ul className="space-y-3">
              {BULLETS.map((b, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3 text-text-secondary text-sm"
                >
                  <span className="text-lg shrink-0 mt-0.5">{b.icon}</span>
                  <span>{b.text}</span>
                </motion.li>
              ))}
            </ul>

            {/* Language badge */}
            <div className="mt-6 flex items-center gap-2 text-sm">
              <span className="text-text-secondary">Idiomas:</span>
              <span className="badge badge-blue">🇧🇷 Português nativo</span>
              <span className="badge badge-neutral">🇺🇸 Inglês intermediário</span>
            </div>
          </motion.div>

          {/* Skills grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            {SKILLS.map((group, gi) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: gi * 0.08 }}
                className="glass-card p-4"
              >
                <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2.5">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map(skill => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded text-xs font-mono bg-canvas border border-border text-text-secondary hover:text-accent-blue hover:border-accent-blue/40 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
