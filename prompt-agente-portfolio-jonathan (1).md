# Prompt para Agente de Desenvolvimento — Portfólio Interativo de Jonathan Nascimento

> Copie e cole este documento inteiro como instrução inicial para o agente (Claude Code, Cursor, etc.). Ele contém todo o contexto de produto, dados reais do GitHub/README, stack, arquitetura e critérios de aceite.

---

## 1. Objetivo

Desenvolver um **site de portfólio pessoal, interativo e inovador** para **Jonathan Nascimento**, desenvolvedor fullstack (React & Python), estagiário na Prefeitura de São Paulo (SEGES) e estudante de Sistemas de Informação. O site deve:

1. Listar e apresentar **todos os repositórios públicos** de `https://github.com/JONATHAN-DEV-01` de forma visual e navegável.
2. Distinguir claramente **projetos deployados** (com link ao vivo) de **projetos não deployados** (apenas código-fonte).
3. Trazer uma seção "Sobre mim" baseada no conteúdo do repositório `JONATHAN-DEV-01/README.md`.
4. Trazer uma seção de currículo/experiência (ver nota na seção 9 — conteúdo do currículo ainda precisa ser fornecido pelo usuário).
5. Ter visual **moderno, porém sóbrio**, usando a paleta descrita na seção 4 (baseada no tema escuro do GitHub).
6. Servir como cartão de visitas técnico: recrutadores e colegas devem conseguir, em poucos segundos, entender quem é Jonathan, o que ele sabe fazer e ver os projetos em ação.

---

## 2. Contexto real do usuário (extraído do GitHub em 29/07/2026)

Use estas informações como fonte de verdade para o conteúdo textual do site (não invente dados adicionais; onde faltar informação, deixe um placeholder claro do tipo `// TODO: Jonathan preencher`).

**Perfil GitHub:** [github.com/JONATHAN-DEV-01](https://github.com/JONATHAN-DEV-01) — 22 repositórios, 4 followers, 11 following, achievements *Pull Shark* e *YOLO*.

**Headline:** IA 🤖 | Dev FullStack 👨‍💻 | Python 🐍 | React | WordPress | 💻 SQL | 📂 Conhecimento em GIT e DevOps

**Sobre mim (README):**
- Estagiário como Desenvolvedor na **Prefeitura de São Paulo (SEGES)**.
- Estudante de **Sistemas de Informação** na **Faculdade Impacta** (formatura prevista para 12/2027).
- Constrói soluções web completas com **React** no frontend e **Python (Flask)** no backend.
- Foco em boas práticas de engenharia — padrões **MVC** e **Arquitetura Hexagonal** — para sistemas escaláveis e de fácil manutenção.
- Entusiasta de **RPA** (PyAutoGUI) e de IA aplicada (**Scikit-learn, Pandas**).
- Experiência com bancos de dados **MySQL** e **PostgreSQL**, deploy em **Render, Vercel, Supabase e Docker**.
- Interesse declarado em infraestrutura, redes e DevOps.

**Contato:**
- E-mail: jonathanads2006@gmail.com
- LinkedIn: linkedin.com/in/jonathan-nascimento-8bb679227

**Linguagens/ferramentas (badges do README):** Python, Flask, MySQL, PostgreSQL, React, JavaScript, TypeScript, HTML, CSS, Figma, WordPress, Docker, Git.

**Projetos em destaque citados no README** (usar como seed/fallback caso a API do GitHub falhe ou tenha rate limit):

| Repositório | Descrição | Linguagem principal |
|---|---|---|
| `gestao_estoque` | API em **Arquitetura Hexagonal**, em Python, para gestão de estoque de um mercado | Python |
| `stockflow-for-sellers` | Frontend que consome a API do `gestao_estoque` | TypeScript |
| `Back_Delivery` | Backend de uma aplicação web de delivery | Python |
| `Zupps_Mobile` | Protótipo em Kotlin do app de delivery "Zupps" | Kotlin |
| `BolaoWorldCup` | Plataforma web para gestão de palpites da Copa do Mundo — **operou em produção com usuários reais**, processando prognósticos em duas fases de negócio distintas | TypeScript |
| `WordPress_Elementor` | Site WordPress usado para testar uma esteira de deploy (GitHub + VM Oracle + Linux + WordOps) | JavaScript |
| `rpa_final` | Projeto de RPA (citado como destaque no README) | — |
| `IA_Recomendacao_jogos` | Sistema de IA de recomendação de jogos (citado como destaque no README) | — |
| `Sistema-Feedback` | Sistema de feedback (citado como destaque no README) | — |

> ⚠️ **Não hardcode esta tabela como fonte definitiva.** Ela é apenas contexto/seed. O site deve consumir a **API pública do GitHub em tempo real** (ver seção 6) para listar os 22 repositórios atuais e manter-se sempre atualizado.

---

## 3. Currículo — conteúdo confirmado (usar como fonte de verdade da seção "Experiência & Formação")

**Resumo profissional:** Desenvolvedor Full Stack com expertise em Python, Flask, React e DevOps, aliando lógica de programação a conhecimentos sólidos de Hardware e Redes. Foco em performance e automação de ponta a ponta. Destaque: desenvolveu e mantém em produção uma aplicação completa de gestão de estoque (StockFlow) — `gestao_estoque` (API) + `stockflow-for-sellers` (frontend).

**Formação acadêmica**
- Faculdade Impacta — Graduação (Bacharelado) em Sistemas de Informação — cursando até 12/2027.

**Cursos e especializações**
- AI-900 — Fundamentos de IA no Azure — Fundação Bradesco — 15h — concluído em 2025
- Projetos de Sistemas de TI — Fundação Bradesco — 15h — concluído em 2025
- AWS Cloud Foundations — Amazon — 41 a 360h — concluído em 2024
- Linguagem de Programação Python (Básico) — Fundação Bradesco — 18h — concluído em 2024

**Experiência profissional**
- **2025 (estágio atual)** — Estagiário Desenvolvedor, Prefeitura de São Paulo (SEGES) *(informação já conhecida via README, não constava no PDF)*
- **2025** — Analista Financeiro, Telma Multimarcas — elaboração de balanços e dashboards interativos de fluxo de caixa; responsável simultâneo por toda a infraestrutura de TI local (montagem/manutenção de hardware, upgrades de memória, configuração de rede interna de compartilhamento de dados)
- **2023–2024** — Aprendiz, Spiral do Brasil (setor de admissão do RH) — integração e cadastro de novos funcionários, confecção de relatórios administrativos com Excel avançado

**Idiomas:** Inglês intermediário.

**Sobre exibir dados pessoais no site público:** o currículo traz telefone e endereço residencial completos. **Recomendação: não publicar telefone nem endereço no site.** Use apenas e-mail profissional, LinkedIn e o formulário de contato (seção 7.6) como canais públicos — é a prática padrão de segurança/privacidade para portfólios pessoais expostos na internet. Se Jonathan quiser, esses dados podem existir apenas no PDF do currículo baixável, não no HTML renderizado da página.

---

## 4. Direção visual e paleta de cores

A referência visual é o **tema escuro do próprio GitHub**, capturado no print do perfil enviado pelo usuário: fundo quase preto, cards com leve elevação, texto branco/cinza, azul como cor de ação/links, e ícones coloridos das tecnologias como pontos de destaque. O resultado deve ser **moderno, tecnológico e sóbrio** — nada de gradientes chamativos ou excesso de cor.

**Paleta sugerida (dark-first, com toggle light opcional):**

| Token | Cor | Uso |
|---|---|---|
| `--bg-canvas` | `#0D1117` | Fundo geral da página |
| `--bg-surface` | `#161B22` | Cards, painéis, navbar |
| `--bg-surface-hover` | `#1C2128` | Hover de cards/itens |
| `--border` | `#30363D` | Bordas, divisores |
| `--text-primary` | `#E6EDF3` | Texto principal |
| `--text-secondary` | `#8B949E` | Texto secundário/legendas |
| `--accent-blue` | `#58A6FF` | Links, CTAs, foco |
| `--accent-blue-strong` | `#1F6FEB` | Botões primários |
| `--accent-green` | `#3FB950` | Badge "Deployado" / status online |
| `--accent-orange` | `#D29922` | Badge "Em desenvolvimento" / destaques (referência ao 👋 laranja do README) |
| `--accent-purple` | `#A371F7` | Badges de IA/RPA |

**Tipografia:** uma fonte sans moderna para UI (ex. Inter ou Geist) + uma fonte monoespaçada (ex. JetBrains Mono ou Fira Code) para trechos de código, nomes de repositório e o componente "terminal" descrito abaixo — reforça a identidade dev sem poluir visualmente.

**Motion:** transições sutis (150–250ms, easing padrão), sem animações exageradas. Micro-interações em hover de cards (leve elevação + borda com `--accent-blue`), skeleton loaders enquanto os dados do GitHub carregam.

Consultar a skill de `frontend-design` disponível no ambiente do agente para tokens, espaçamento e boas práticas de composição antes de gerar os componentes.

---

## 5. Stack técnica (obrigatória)

### 5.1 Decisão de arquitetura do backend: Arquitetura Hexagonal (Ports & Adapters)

> **Instrução para o agente:** implemente o backend seguindo **Arquitetura Hexagonal (Ports & Adapters)**, e não MVC. Esta é uma decisão de projeto — não uma sugestão a ser reavaliada pelo agente — mas o raciocínio abaixo existe para que, se o agente identificar um trade-off não previsto durante a implementação, ele entenda o porquê da escolha e possa sinalizar o conflito em vez de trocar de padrão silenciosamente.

**Comparação e por que Hexagonal vence MVC aqui, nesta avaliação:**

| Critério | MVC | Hexagonal |
|---|---|---|
| Complexidade inicial | Menor — ideal para CRUD simples | Maior — exige mais boilerplate (ports, use cases) desde o dia 1 |
| Nº de integrações externas trocáveis | Baixo | **Alto neste projeto**: API do GitHub, Postgres, e-mail transacional, auth do admin — 4 integrações substituíveis |
| Testabilidade sem rede/banco real | Difícil sem disciplina extra | Nativa — use cases testam contra adapters fake |
| Risco de regra de negócio vazar para o framework | Alto (controllers/services tendem a acoplar ao FastAPI/SQLAlchemy) | Baixo — regra fica isolada em `domain/` e `application/` |
| Coerência com o portfólio de Jonathan | — | Jonathan já usa e destaca Hexagonal no `gestao_estoque` e cita o padrão no próprio README — usar o mesmo padrão aqui é consistente com o posicionamento técnico dele e vira até um argumento de venda no "Sobre mim" |

**Minha avaliação:** para um CRUD isolado, MVC seria a escolha mais rápida e eu recomendaria evitar o overhead do Hexagonal. Mas este backend não é um CRUD isolado — ele soma sync agendado com GitHub, cache, formulário de contato com envio de e-mail e autenticação de painel admin na mesma base de código. É exatamente o perfil de sistema em que a inversão de dependência do Hexagonal paga o investimento inicial, porque cada integração pode ser trocada (ex. trocar Resend por SMTP, ou GitHub API por um mock nos testes) sem tocar na regra de negócio. Por isso a instrução acima é para usar Hexagonal, e não MVC.

**Estrutura de pastas do backend refletindo essa decisão:**

```
backend/app/
├── domain/                # entidades e regras de negócio puras (Project, Profile, DeployStatus)
├── application/
│   ├── use_cases/         # ListProjects, GetProjectDetail, SyncWithGitHub, SendContactMessage
│   └── ports/              # interfaces: ProjectRepositoryPort, GitHubClientPort, EmailSenderPort
├── infrastructure/
│   ├── adapters/
│   │   ├── db/             # SQLAlchemy models + repositório concreto (implementa ProjectRepositoryPort)
│   │   ├── github/         # cliente httpx concreto (implementa GitHubClientPort)
│   │   └── email/          # adapter de envio de e-mail (implementa EmailSenderPort)
│   └── db/session.py       # engine/session assíncronos, Alembic
└── interfaces/
    └── api/                # routers FastAPI — são "adapters de entrada" que chamam os use_cases
        ├── projects.py
        ├── profile.py
        ├── sync.py
        └── contact.py
```

Cada use case recebe as portas por injeção de dependência (via `Depends` do FastAPI), nunca instancia um adapter concreto diretamente — isso é o que garante a inversão de dependência característica do padrão hexagonal.

**Backend**
- **FastAPI** (Python 3.12+)
- **SQLAlchemy 2.x** (ORM, estilo declarativo assíncrono com `AsyncSession`)
- **PostgreSQL** como banco de dados (usar Supabase ou Render Postgres em produção, coerente com o que Jonathan já usa)
- **Alembic** para migrações
- **httpx** para chamadas assíncronas à API do GitHub
- **Pydantic v2** para schemas/DTOs
- Cache leve (tabela `github_cache` ou Redis opcional) para não estourar o rate limit da API pública do GitHub (60 req/h sem token, 5.000/h com token)

**Frontend**
- **React 18 + TypeScript**, bundler **Vite**
- Roteamento: `react-router-dom`
- Data fetching: `@tanstack/react-query` (cache, loading/error states, refetch)
- Estilo: **Tailwind CSS** configurado com os tokens da seção 4 como `theme.extend.colors`
- Animações: `framer-motion` para transições de página e cards
- Ícones de linguagem/tecnologia: `simple-icons` ou `devicon`
- Markdown: `react-markdown` (+ `remark-gfm`) para renderizar o `README.md` de cada repositório dentro do site

**Infra/Deploy**
- Frontend → **Vercel**
- Backend → **Render** (Web Service) com Postgres gerenciado (Render Postgres ou **Supabase**)
- Containerização com **Docker** (Dockerfile para o backend, docker-compose para ambiente local com Postgres)
- CI simples via **GitHub Actions**: lint + testes + build a cada push

---

## 6. Integração com a API do GitHub (núcleo do produto)

Este é o diferencial do site: em vez de dados estáticos, o backend deve buscar e manter os projetos sincronizados.

**Endpoints do backend (FastAPI):**

```
GET /api/projects              -> lista todos os repositórios públicos (com cache)
GET /api/projects/{repo_name}  -> detalhe de um repositório (README renderizável, linguagens, topics, stats)
GET /api/profile               -> dados agregados do perfil (bio, avatar, followers, achievements)
POST /api/sync                 -> (protegido/admin) força resync com a API do GitHub
```

**Lógica de sincronização:**
1. Chamar `GET https://api.github.com/users/JONATHAN-DEV-01/repos?per_page=100&sort=updated` (autenticado com um Personal Access Token do próprio Jonathan, armazenado em variável de ambiente, para ganhar rate limit maior e acesso a `topics`).
2. Para cada repositório: gravar/atualizar no Postgres (`name`, `description`, `html_url`, `homepage`, `topics`, `language`, `languages_url`, `stargazers_count`, `pushed_at`, `fork`, `archived`).
3. Buscar `GET /repos/{owner}/{repo}/languages` para o breakdown de linguagens (usado em gráficos de barra por projeto).
4. Buscar o `README.md` de cada repo (`GET /repos/{owner}/{repo}/readme`, decodificar base64) para permitir o modal de detalhe.
5. Rodar essa sincronização via job agendado (cron do Render ou GitHub Action agendada) a cada X horas, não a cada request do usuário.

**Regra de negócio "deployado vs. não deployado":**
- A API do GitHub expõe o campo `homepage`. Se `homepage` estiver preenchido e for uma URL válida → repositório é **"Deployado"** (badge verde, com botão "Ver ao vivo").
- Se `homepage` estiver vazio → **"Não deployado"** (badge laranja/neutra, apenas botão "Ver código").
- Adicionar uma tabela de **overrides manuais** no Postgres (`project_overrides`: `repo_name`, `custom_status`, `custom_url`, `featured: bool`, `display_order: int`, `hide: bool`) para os casos em que o campo `homepage` do GitHub não reflete a realidade (ex. projeto WordPress hospedado numa VM sem estar no campo homepage) ou repositórios que Jonathan queira ocultar/destacar manualmente. Isso evita depender 100% de metadados do GitHub para uma decisão de produto.

---

## 7. Estrutura e funcionalidades do site

### 7.1 Hero / Home
- Nome, headline, foto (usar o avatar do GitHub via API), botões de CTA (LinkedIn, e-mail, "Ver projetos", baixar currículo em PDF).
- Pequeno componente "terminal" interativo (fonte monoespaçada) digitando frases como `whoami`, `cat sobre.txt`, `ls projetos/` — recurso lúdico e coerente com o público técnico, sem exagerar.

### 7.2 Sobre mim
- Texto baseado 1:1 no conteúdo do README (seção 2 deste prompt), com pequenos ícones para cada bullet.
- Grid de "Linguagens e Ferramentas" com os ícones reais das tecnologias.

### 7.3 Projetos (o coração do site)
- Grid de cards responsivo (masonry ou grid fixo), um card por repositório retornado pela API.
- Cada card mostra: nome, descrição, badge de status (Deployado/Não deployado), linguagem principal (com cor padrão do GitHub para a linguagem), estrelas, data de última atualização, topics/tags.
- **Filtros interativos**: por status (deployado/não deployado), por linguagem/tecnologia, por busca textual (nome/descrição), ordenação (mais recente, mais estrelas, nome A-Z).
- **Modal/drawer de detalhe** ao clicar num card: renderiza o `README.md` do repositório (via `react-markdown`), mostra o gráfico de breakdown de linguagens, e traz dois botões — "Ver no GitHub" e, se houver, "Acessar deploy".
- Estado vazio, estado de erro (API do GitHub fora do ar) e skeleton loading bem tratados.

### 7.4 Experiência & Formação
- Timeline vertical (mais recente no topo) com os itens reais da seção 3: estágio atual na Prefeitura de SP (SEGES) → Analista Financeiro na Telma Multimarcas (2025) → Aprendiz na Spiral do Brasil (2023–2024).
- Bloco separado de Formação (Faculdade Impacta — Sistemas de Informação, até 12/2027) e outro de Cursos/Certificações (AI-900, AWS Cloud Foundations, Projetos de Sistemas de TI, Python Básico), cada um podendo exibir o badge/selo do curso quando existir.
- Botão "Baixar currículo (PDF)" no topo da seção, apontando para o arquivo original hospedado como asset estático.

### 7.5 Painel administrativo simples (opcional, mas recomendado)
- Uma rota protegida (`/admin`, autenticação simples via variável de ambiente/JWT) para Jonathan editar `project_overrides` sem precisar mexer no banco diretamente — marcar projeto como destaque, ocultar, ou corrigir status de deploy.

### 7.6 Contato
- Formulário simples (nome, e-mail, mensagem) que envia via endpoint do backend (e-mail transacional, ex. Resend ou SMTP) ou, no mínimo, `mailto:` + links diretos para LinkedIn/e-mail.

---

## 8. Requisitos não funcionais

- **Responsivo** mobile-first; testar em 360px, 768px, 1280px+.
- **Acessibilidade**: contraste AA mínimo (a paleta escura da seção 4 já foi escolhida com isso em mente), navegação por teclado, `alt` em imagens, `aria-label` em botões de ícone.
- **Performance**: lazy loading de imagens, code-splitting por rota, cache do React Query, Lighthouse ≥ 90 em Performance/Best Practices/SEO.
- **SEO básico**: meta tags, Open Graph (usando o avatar do GitHub), `sitemap.xml`.
- **Segurança**: nunca expor o GitHub Personal Access Token no frontend; CORS restrito ao domínio do frontend; rate limiting nos endpoints públicos do backend.

---

## 9. Estrutura de repositório sugerida

```
portfolio/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── core/ (config, security)
│   │   ├── models/ (SQLAlchemy models)
│   │   ├── schemas/ (Pydantic)
│   │   ├── services/ (github_sync.py, cache.py)
│   │   ├── api/routes/ (projects.py, profile.py, sync.py)
│   │   └── db/ (session, alembic)
│   ├── alembic/
│   ├── Dockerfile
│   ├── requirements.txt / pyproject.toml
│   └── tests/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/ (useProjects, useProfile)
│   │   ├── styles/ (tailwind config, tokens)
│   │   └── lib/ (api client)
│   ├── index.html
│   ├── vite.config.ts
│   └── tailwind.config.ts
├── docker-compose.yml
└── README.md
```

---

## 10. Entregáveis esperados do agente

1. Projeto completo rodando localmente via `docker-compose up` (backend + Postgres) e `npm run dev` (frontend).
2. README explicando setup, variáveis de ambiente (`GITHUB_TOKEN`, `DATABASE_URL`, etc.) e como fazer deploy no Vercel + Render/Supabase.
3. Testes básicos no backend (endpoints de `/api/projects`) usando `pytest` + `httpx.AsyncClient`.
4. Componentização limpa no frontend, seguindo os tokens de cor/tipografia definidos na seção 4.
5. Dados reais do perfil `JONATHAN-DEV-01` puxados dinamicamente da API do GitHub, não mockados no build final.

---

## 11. Perguntas em aberto para alinhar com Jonathan antes/durante o desenvolvimento

- ~~Conteúdo completo do currículo~~ — **resolvido**: currículo em PDF fornecido e incorporado na seção 3.
- Domínio final desejado (ex. `jonathannascimento.dev`) para configurar CORS, SEO e Open Graph.
- Se o formulário de contato deve enviar e-mail de verdade (precisa de provedor tipo Resend/SendGrid) ou apenas abrir o cliente de e-mail (`mailto:`).
- Quais dos 22 repositórios devem ser ocultados do público (ex. exercícios de faculdade sem valor de portfólio) via `project_overrides.hide`.
