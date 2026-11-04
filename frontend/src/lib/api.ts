// API client — em produção usa VITE_API_URL, em dev usa proxy do Vite

export const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api'

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`)
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`)
  }
  return res.json()
}

// FastAPI sends a string for HTTP errors and a list of problems for validation errors.
function readErrorDetail(detail: unknown): string | null {
  if (typeof detail === 'string') return detail
  if (Array.isArray(detail) && typeof detail[0]?.msg === 'string') {
    return detail[0].msg.replace(/^Value error, /, '')
  }
  return null
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(readErrorDetail(err.detail) ?? `API error ${res.status}`)
  }
  return res.json()
}

// ---- Types ----

export interface Project {
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  topics: string[]
  stargazers_count: number
  pushed_at: string | null
  is_deployed: boolean
  deploy_url: string | null
  featured: boolean
  display_order: number
  languages: Record<string, number>
  readme_content: string | null
}

export interface Profile {
  login: string
  name: string | null
  bio: string | null
  avatar_url: string
  followers: number
  following: number
  public_repos: number
  html_url: string
}

export interface ContactPayload {
  name: string
  email: string
  message: string
}

interface ContactResult {
  success: boolean
  message?: string | null
  error?: string | null
}

// ---- API calls ----

export const api = {
  getProjects: () => fetchJson<{projects: Project[]}>('/projects').then(res => res.projects),
  getProject: (name: string) => fetchJson<Project>(`/projects/${encodeURIComponent(name)}`),
  getProfile: () => fetchJson<Profile>('/profile'),
  sendContact: async (data: ContactPayload) => {
    // The API answers 200 with success: false when the e-mail could not be sent.
    const result = await postJson<ContactResult>('/contact', data)
    if (!result.success) {
      throw new Error(result.error ?? 'Não foi possível enviar a mensagem agora.')
    }
    return result
  },
}

export default api
