import { useState, type FormEvent } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const BASE = '/api'

async function login(username: string, password: string) {
  const res = await fetch(`${BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  if (!res.ok) throw new Error('Credenciais inválidas')
  return res.json()
}

async function fetchOverrides(token: string) {
  const res = await fetch(`${BASE}/admin/overrides`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Não autorizado')
  return res.json()
}

interface Override {
  repo_name: string
  custom_status: string | null
  custom_url: string | null
  featured: boolean
  display_order: number
  hide: boolean
}

export default function Admin() {
  const [token, setToken] = useState<string | null>(null)
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const qc = useQueryClient()

  const loginMutation = useMutation({
    mutationFn: () => login(credentials.username, credentials.password),
    onSuccess: (data) => setToken(data.access_token),
  })

  const overridesQuery = useQuery({
    queryKey: ['admin', 'overrides'],
    queryFn: () => fetchOverrides(token!),
    enabled: Boolean(token),
  })

  const syncMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${BASE}/sync`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
      return res.json()
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
  })

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()
    loginMutation.mutate()
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <span className="font-mono text-2xl font-bold text-accent-blue">{'<JN />'}</span>
            <p className="text-text-secondary text-sm mt-2">Painel Administrativo</p>
          </div>

          <form onSubmit={handleLogin} className="card p-6 space-y-4">
            <div>
              <label className="block text-sm text-text-secondary mb-1.5" htmlFor="admin-user">Usuário</label>
              <input
                id="admin-user"
                type="text"
                required
                value={credentials.username}
                onChange={e => setCredentials(c => ({ ...c, username: e.target.value }))}
                className="w-full px-4 py-2.5 bg-canvas border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-blue"
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-1.5" htmlFor="admin-pass">Senha</label>
              <input
                id="admin-pass"
                type="password"
                required
                value={credentials.password}
                onChange={e => setCredentials(c => ({ ...c, password: e.target.value }))}
                className="w-full px-4 py-2.5 bg-canvas border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:border-accent-blue"
              />
            </div>

            {loginMutation.isError && (
              <p className="text-red-400 text-sm">{(loginMutation.error as Error).message}</p>
            )}

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="btn-primary w-full justify-center"
              id="admin-login-btn"
            >
              {loginMutation.isPending ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="text-center mt-4">
            <a href="/" className="text-accent-blue text-sm hover:underline">← Voltar ao portfólio</a>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-canvas p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-bold text-text-primary font-mono">Painel Admin</h1>
            <p className="text-text-secondary text-sm">Gerencie os overrides de projetos</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => syncMutation.mutate()}
              disabled={syncMutation.isPending}
              className="btn-secondary text-sm"
              id="admin-sync-btn"
            >
              {syncMutation.isPending ? '⏳ Sincronizando...' : '🔄 Sincronizar GitHub'}
            </button>
            <button onClick={() => setToken(null)} className="btn-ghost text-sm">Sair</button>
          </div>
        </div>

        {syncMutation.isSuccess && (
          <p className="text-accent-green text-sm mb-4">✅ Sincronização concluída!</p>
        )}

        {overridesQuery.isLoading && <p className="text-text-secondary">Carregando overrides...</p>}

        {overridesQuery.data && (
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-hover">
                  <th className="text-left px-4 py-3 text-text-secondary font-medium">Repositório</th>
                  <th className="text-left px-4 py-3 text-text-secondary font-medium">Status</th>
                  <th className="text-left px-4 py-3 text-text-secondary font-medium">URL Custom</th>
                  <th className="text-center px-4 py-3 text-text-secondary font-medium">Destaque</th>
                  <th className="text-center px-4 py-3 text-text-secondary font-medium">Ocultar</th>
                </tr>
              </thead>
              <tbody>
                {overridesQuery.data.map((ov: Override) => (
                  <tr key={ov.repo_name} className="border-b border-border/50 hover:bg-surface-hover">
                    <td className="px-4 py-3 font-mono text-accent-blue">{ov.repo_name}</td>
                    <td className="px-4 py-3 text-text-secondary">{ov.custom_status ?? '—'}</td>
                    <td className="px-4 py-3 text-text-secondary text-xs truncate max-w-xs">
                      {ov.custom_url ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-center">{ov.featured ? '⭐' : '—'}</td>
                    <td className="px-4 py-3 text-center">{ov.hide ? '🚫' : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="text-text-secondary text-xs mt-6">
          💡 Para editar overrides, use a API diretamente: <code className="font-mono text-accent-blue">PUT /api/admin/overrides/{'{repo_name}'}</code>
        </p>
      </div>
    </div>
  )
}
