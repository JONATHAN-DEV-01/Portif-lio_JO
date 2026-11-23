import type { Project, ProjectStatus } from '@/lib/api'

// Local corrections to what the GitHub sync returns. They apply both to the snapshot and to
// the API response, so the page is right even before the "About" of each repository is fixed.
// Once a description is corrected on GitHub, its entry here can be removed.
interface ProjectOverride {
  status?: ProjectStatus
  description?: string
  language?: string
}

const OVERRIDES: Record<string, ProjectOverride> = {
  // Live, with an active database
  'Portif-lio_JO': { status: 'deployed' },
  Chamados_Joveretec: {
    status: 'deployed',
    description:
      'Sistema de gestão de chamados usado diariamente pela equipe para registrar, priorizar e acompanhar chamados e tarefas por projeto. Java 21, Quarkus, Angular e PostgreSQL, com 313 testes automatizados e CI/CD.',
  },
  'zupps-eats': {
    status: 'deployed',
    description:
      'Frontend do Zupps, aplicação de delivery com área do cliente (busca, carrinho, checkout e acompanhamento de pedidos) e área do restaurante (cardápio, estoque e relatórios). React, TypeScript, Vite, Tailwind CSS e shadcn-ui.',
  },

  // Deployed, but the Supabase database is suspended
  BolaoWorldCup: { status: 'paused' },
  'stockflow-for-sellers': { status: 'paused' },

  // A fork: the homepage is the original author's site
  'profile-readme-generator': {
    status: 'not_deployed',
    language: 'TypeScript',
    description: 'Fork de maurodesouza/profile-readme-generator, gerador de README para perfis do GitHub.',
  },

  // Missing descriptions and languages
  'loom-task-flow': {
    description:
      'Sistema interno de gestão de chamados para uma empresa de tecelagem, com login, painel do administrador e painel do prestador de serviço. React, TypeScript, Vite, Tailwind CSS e shadcn-ui.',
  },
  'JONATHAN-DEV-01': {
    language: 'Markdown',
    description: 'Repositório de estilização do perfil no GitHub.',
  },

  // Spelling fixes
  'projeto-fullstack-orquestracao': {
    description: 'Aplicação Java Spring Boot, React, Dockerfile, PostgreSQL',
  },
  Back_Delivery: {
    description: 'Neste repositório será desenvolvido o backend da nossa aplicação web de delivery',
  },
  Front_Delivery: {
    description: 'Neste repositório será desenvolvido o frontend da nossa aplicação web de delivery',
  },
  WordPress_Elementor: {
    description:
      'Site em WordPress, onde foi testada uma esteira de deploy com GitHub, máquina virtual da Oracle, Linux e WordOps',
  },
  IA_Recomendacao_jogos: {
    description:
      'Neste repositório, foi criada uma inteligência artificial usando Scikit-learn, Pandas e Graphviz em Python, com a finalidade de estimar a compatibilidade do usuário com um título de jogo.',
  },
  'Sistema-Feedback': {
    description:
      'Esta é uma interface desenvolvida em Python, que tem como finalidade possibilitar votações a respeito do desempenho de cada colaborador.',
  },
  rpa_final: {
    description:
      'Neste repositório vou consumir uma API de baralhos e compartilhar informações automatizadas entre dois e-mails',
  },
  Experimento_cadastro: {
    description:
      'Neste repositório foi feita a execução prática do experimento descrito no artigo do Grupo Gambiarra.',
  },
  'brasileirao-rag': {
    description:
      'RAG desenvolvido para especializar as consultas a LLMs com documentos de estatísticas do futebol',
  },
}

export function applyProjectOverride(project: Project): Project {
  const override = OVERRIDES[project.name] ?? {}
  const status = override.status ?? (project.is_deployed ? 'deployed' : 'not_deployed')
  return {
    ...project,
    description: override.description ?? project.description,
    language: override.language ?? project.language,
    status,
    is_deployed: status === 'deployed',
  }
}
