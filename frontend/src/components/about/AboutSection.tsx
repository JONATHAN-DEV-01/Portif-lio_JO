import { CssDrawer } from '@/components/ui/CssDrawer'

// Same categories as "Competências Técnicas" in the resumes
const SKILLS = [
  { category: 'Linguagens', items: ['Java', 'Python', 'TypeScript', 'JavaScript', 'SQL', 'PHP'] },
  {
    category: 'Backend',
    items: ['Spring Boot', 'Spring Data JPA', 'Quarkus', 'Flask', 'APIs REST', 'JWT', 'RBAC', 'Flyway', 'Swagger/OpenAPI', 'arquitetura hexagonal'],
  },
  { category: 'Frontend', items: ['React', 'Angular', 'Vite', 'Tailwind CSS', 'shadcn-ui'] },
  { category: 'Dados', items: ['PostgreSQL', 'MySQL', 'Supabase'] },
  {
    category: 'IA',
    items: ['RAG', 'orquestração de agentes e LLMs', 'Claude Code', 'web scraping', 'Scikit-learn', 'Pandas'],
  },
  {
    category: 'DevOps & Cloud',
    items: ['Docker', 'Docker Compose', 'GitHub Actions (CI/CD)', 'testes automatizados', 'Linux', 'AWS', 'Azure', 'Render', 'Vercel', 'Oracle Cloud'],
  },
  { category: 'Outros', items: ['WordPress/Elementor', 'WordOps'] },
]

const BULLETS = [
  { icon: '🏢', text: 'Estagiário de TI na Prefeitura de São Paulo (SEGES/COPATS)' },
  { icon: '🎓', text: 'Estudante de Sistemas de Informação na Faculdade Impacta (conclusão prevista: dez. 2027)' },
  { icon: '⚙️', text: 'APIs REST em Java 21 (Spring Boot 3 e Quarkus) e Python, com front-ends em React e Angular' },
  { icon: '🏗️', text: 'Arquitetura hexagonal (ports & adapters), autenticação com JWT e controle de acesso com RBAC' },
  { icon: '🤖', text: 'IA generativa com RAG e orquestração de agentes na gestão pública; desenvolvimento assistido por IA com Claude Code' },
  { icon: '☁️', text: 'Base em Docker, Linux e Cloud (AWS, Azure), com deploy em Render, Vercel e Supabase' },
]

export function AboutSection() {
  return (
    <section id="sobre" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div
        >
          <h2 className="section-title">Sobre mim</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 mt-8">
          {/* Bio */}
          <div
            className="md:col-span-1 lg:col-span-3"
          >
            <p className="text-text-secondary leading-relaxed mb-6">
              Desenvolvedor Full Stack em formação (Sistemas de Informação) com experiência prática em{' '}
              <span className="text-text-primary font-medium">Java 21 (Spring Boot 3 e Quarkus), Python, React e Angular</span>,
              APIs REST e PostgreSQL. Atuo também com automação em Python, IA generativa (RAG) aplicada à gestão
              pública e desenvolvimento assistido por agentes de IA (Claude Code).
            </p>
            <p className="text-text-secondary leading-relaxed mb-8">
              Destaque: desenvolvi e mantenho em produção o <span className="font-mono text-accent-blue text-sm">Chamados_Joveretec</span>,
              sistema de gestão de chamados usado diariamente pela equipe, com 313 testes automatizados e pipeline CI/CD.
              Também fiz o deploy do StockFlow — <span className="font-mono text-accent-blue text-sm">gestao_estoque</span> (API em arquitetura hexagonal)
              + <span className="font-mono text-accent-blue text-sm">stockflow-for-sellers</span> (frontend) — e do{' '}
              <span className="font-mono text-accent-blue text-sm">BolaoWorldCup</span>, usado em produção durante a Copa com usuários reais.
            </p>

            <ul className="space-y-3">
              {BULLETS.map((b, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-text-secondary text-sm"
                >
                  <span className="text-lg shrink-0 mt-0.5">{b.icon}</span>
                  <span>{b.text}</span>
                </li>
              ))}
            </ul>

            {/* Language badge */}
            <div className="mt-6 flex items-center gap-2 text-sm">
              <span className="text-text-secondary">Idiomas:</span>
              <span className="badge badge-blue">🇧🇷 Português nativo</span>
              <span className="badge badge-neutral">🇺🇸 Inglês intermediário</span>
            </div>
            
            {/* 3D Drawer Fun Easter Egg Element */}
            <div className="mt-12">
              <CssDrawer />
            </div>
          </div>

          {/* Skills */}
          <dl className="md:col-span-1 lg:col-span-2 divide-y divide-border border-y border-border self-start">
            {SKILLS.map(group => (
              <div key={group.category} className="py-4">
                <dt className="text-sm font-semibold text-text-primary mb-1">{group.category}</dt>
                <dd className="text-sm leading-relaxed text-text-secondary">{group.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
