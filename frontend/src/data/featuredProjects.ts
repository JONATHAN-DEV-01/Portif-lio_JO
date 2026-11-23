// Curated cards shown before the list synced from GitHub. Texts follow the resumes
// (Curriculo_Jonathan_Nascimento_Full_Stack_Java.pdf and ..._Python.pdf).

export interface FeaturedProject {
  title: string
  // Status shown on the card. Projects with only source code have none.
  status?: { label: string; tone: 'live' | 'paused' }
  summary: string
  highlights?: string[]
  stack: string[]
  links: { label: string; href: string; primary?: boolean }[]
  // Screenshot in public/previews/, used by the main card
  preview?: string
}

const GITHUB = 'https://github.com/JONATHAN-DEV-01'

export const MAIN_PROJECT: FeaturedProject = {
  title: 'Sistema de Gestão de Chamados',
  status: { label: 'Em uso diário pela equipe', tone: 'live' },
  summary:
    'Ferramenta usada diariamente pela equipe para registrar, priorizar e acompanhar chamados e tarefas de cada projeto, servindo também como base de conhecimento e fonte de métricas.',
  highlights: [
    'API REST em Quarkus com JWT, filas de prioridade por projeto, histórico em Markdown, controle de tempo, anexos com upload retomável e dashboard por status, urgência e desenvolvedor.',
    '313 testes automatizados (164 no backend com PostgreSQL real, 149 no frontend com Vitest) rodando em pipeline CI/CD a cada push/PR.',
    'Deploy com Docker no Render, frontend na Vercel e banco/storage no Supabase.',
  ],
  stack: ['Java 21', 'Quarkus', 'Angular', 'PostgreSQL', 'JWT', 'Docker', 'GitHub Actions', 'Render', 'Vercel', 'Supabase'],
  links: [
    { label: 'Aplicação', href: 'https://chamados-joveretec-ten.vercel.app', primary: true },
    { label: 'Repositório', href: `${GITHUB}/Chamados_Joveretec` },
  ],
  preview: 'Chamados_Joveretec',
}

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    title: 'Projeto Fullstack — Orquestração com Docker Compose',
    summary:
      'Aplicação fullstack com backend em arquitetura hexagonal (ports & adapters), APIs REST documentadas com Swagger/OpenAPI, migrations com Flyway e ambiente completo (Nginx, API, front e banco) orquestrado via Docker Compose.',
    stack: ['Java 21', 'Spring Boot 3', 'Spring Data JPA', 'Flyway', 'React', 'TypeScript', 'PostgreSQL', 'Nginx'],
    links: [{ label: 'Repositório', href: `${GITHUB}/projeto-fullstack-orquestracao` }],
  },
  {
    title: 'StockFlow — Gestão de Estoque',
    status: { label: 'Demo pausada (banco suspenso)', tone: 'paused' },
    summary:
      'API em Python com arquitetura hexagonal (ports & adapters) e frontend dedicado para vendedores, containerizados com Docker Compose. Deploy realizado.',
    stack: ['Python', 'Arquitetura hexagonal', 'PostgreSQL', 'Docker', 'React', 'TypeScript', 'shadcn-ui'],
    links: [
      { label: 'Repositório da API', href: `${GITHUB}/gestao_estoque` },
      { label: 'Repositório do frontend', href: `${GITHUB}/stockflow-for-sellers` },
    ],
  },
  {
    title: 'BolaoWorldCup',
    status: { label: 'Usado em produção na Copa · demo pausada', tone: 'paused' },
    summary:
      'Plataforma de palpites esportivos com usuários reais (72+ jogos), autenticação, ranking em tempo real, painel administrativo e cálculo automático de pontuação.',
    stack: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'Supabase (Auth, PostgreSQL, Realtime)'],
    links: [{ label: 'Repositório', href: `${GITHUB}/BolaoWorldCup` }],
  },
  {
    title: 'RAG na prática — MROSC e Brasileirão',
    summary:
      'Dois sistemas de RAG em Python: um especializado no MROSC (Lei 13.019/2014 e Decreto Municipal 57.575/2016), voltado à gestão pública, e outro que responde sobre estatísticas do Brasileirão coletadas do FBref por web scraping.',
    stack: ['Python', 'LangChain', 'ChromaDB', 'Hugging Face', 'Ollama', 'Groq', 'Gemini', 'Streamlit'],
    links: [
      { label: 'Repositório MROSC', href: `${GITHUB}/RAG-especialista-em-MROSC` },
      { label: 'Repositório Brasileirão', href: `${GITHUB}/brasileirao-rag` },
    ],
  },
  {
    title: 'Pipeline de Deploy Automatizado',
    summary:
      'Esteira de CI/CD (commit → publicação) integrando GitHub Actions, VM Linux na Oracle Cloud e WordOps para um site WordPress/Elementor.',
    stack: ['GitHub Actions', 'Docker Compose', 'Linux', 'WordOps', 'Oracle Cloud VM'],
    links: [{ label: 'Repositório', href: `${GITHUB}/WordPress_Elementor` }],
  },
  {
    title: 'Back_Delivery — API de Delivery',
    summary:
      'Backend de aplicação de delivery: carrinho, autenticação via OTP e integração de pagamentos com MercadoPago. Projeto em equipe de 6 pessoas.',
    stack: ['Python', 'Flask', 'PostgreSQL', 'Docker', 'MercadoPago'],
    links: [{ label: 'Repositório', href: `${GITHUB}/Back_Delivery` }],
  },
]
