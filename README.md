# 🚀 Portfólio — Jonathan Nascimento

Portfólio pessoal interativo de Jonathan Nascimento, desenvolvedor Fullstack (Python & React).

**Site:** [jonathannascimento.dev](https://jonathannascimento.dev) *(a configurar)*

---

## 🏗️ Arquitetura

```
portfolio/
├── backend/       FastAPI · Python 3.12 · Arquitetura Hexagonal (Ports & Adapters)
├── frontend/      React 18 · TypeScript · Vite · Tailwind CSS
└── docker-compose.yml
```

### Backend — Arquitetura Hexagonal

| Camada | Pasta | Conteúdo |
|---|---|---|
| Domain | `app/domain/` | Entidades puras: `Project`, `Profile` |
| Application | `app/application/` | Use Cases + Ports (interfaces) |
| Infrastructure | `app/infrastructure/` | Adapters: SQLAlchemy, GitHub httpx, Email |
| Interface | `app/interfaces/api/` | Routers FastAPI (adapters de entrada) |

---

## ⚙️ Setup local

### Pré-requisitos

- Python 3.12+
- Node.js 20+
- Docker & Docker Compose

### 1. Clonar e configurar variáveis de ambiente

```bash
git clone https://github.com/JONATHAN-DEV-01/<repo>.git
cd portfolio

# Backend
cp backend/.env.example backend/.env
# Edite backend/.env e preencha GITHUB_TOKEN, SECRET_KEY, etc.
```

### 2. Subir o backend + banco via Docker

```bash
docker-compose up -d db        # sobe só o Postgres
# OU
docker-compose up              # sobe tudo (Postgres + backend)
```

O backend estará disponível em `http://localhost:8000`.
A documentação interativa da API estará em `http://localhost:8000/docs`.

### 3. Instalar dependências do backend (sem Docker, para dev)

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate          # Windows
# source .venv/bin/activate     # Linux/macOS
pip install -e ".[dev]"
uvicorn app.main:app --reload
```

### 4. Frontend

```bash
cd frontend
npm install
npm run dev
# Acesse http://localhost:5173
```

---

## 🔑 Variáveis de ambiente

Copie `backend/.env.example` para `backend/.env` e preencha:

| Variável | Descrição |
|---|---|
| `GITHUB_TOKEN` | Personal Access Token do GitHub (read-only, public repos) |
| `GITHUB_USERNAME` | `JONATHAN-DEV-01` |
| `DATABASE_URL` | PostgreSQL async URL (`postgresql+asyncpg://...`) |
| `SECRET_KEY` | Chave secreta JWT (mín. 32 chars) |
| `ADMIN_USERNAME` | Login do painel `/admin` |
| `ADMIN_PASSWORD` | Senha do painel `/admin` |
| `RESEND_API_KEY` | (opcional) Chave da API Resend para e-mails |
| `CORS_ORIGINS` | Origens permitidas (ex: `http://localhost:5173`) |
| `SYNC_INTERVAL_HOURS` | Intervalo do sync automático com GitHub (horas) |

---

## 📡 Endpoints da API

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/projects` | Lista todos os repositórios (com cache) |
| `GET` | `/api/projects/{name}` | Detalhe: README, linguagens, stats |
| `GET` | `/api/profile` | Dados do perfil GitHub |
| `POST` | `/api/sync` | Força resync com GitHub (requer auth) |
| `POST` | `/api/contact` | Envia mensagem de contato |
| `POST` | `/api/admin/token` | Login do admin |
| `GET` | `/api/admin/overrides` | Lista overrides de projetos |
| `PUT` | `/api/admin/overrides/{name}` | Edita override de um projeto |
| `GET` | `/health` | Health check |

---

## 🚢 Deploy

### Frontend → Vercel

1. Conecte o repositório no [Vercel](https://vercel.com)
2. Defina `Root Directory: frontend`
3. Adicione a variável `VITE_API_URL` apontando para o backend do Render

### Backend → Render

1. Crie um **Web Service** no [Render](https://render.com)
2. `Root Directory: backend`
3. `Build Command: pip install -e .`
4. `Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Adicione todas as variáveis de ambiente da seção acima
6. Crie um **PostgreSQL** no Render e copie a `Internal Database URL`

### Banco de dados — Supabase (alternativa)

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Copie a `Connection String` (modo `Transaction`)
3. Use como `DATABASE_URL` no Render

---

## 🧪 Testes

```bash
cd backend
pip install -e ".[dev]"
pytest -v
```

---

## 📌 TODO (Jonathan preencher)

- [ ] Adicionar o PDF do currículo em `frontend/public/curriculo-jonathan-nascimento.pdf`
- [ ] Definir domínio final e atualizar CORS + Open Graph
- [ ] Configurar Resend API Key para formulário de contato funcionar com e-mail real
- [ ] Definir quais repositórios ocultar via painel `/admin` → `project_overrides.hide`
