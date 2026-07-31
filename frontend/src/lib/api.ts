// API client — em produção usa VITE_API_URL, em dev usa proxy do Vite

const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api'

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`)
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`)
  }
  return res.json()
}

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || `API error ${res.status}`)
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
  pushed_at: string
  is_deployed: boolean
  is_featured: boolean
  display_order: number
  hide: boolean
  languages: Record<string, number>
}

export interface ProjectDetail extends Project {
  readme_html: string | null
}

export interface Profile {
  login: string
  name: string
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

// ---- API calls ----

export const api = {
  getProjects: () => fetchJson<Project[]>('/projects'),
  getProject: (name: string) => fetchJson<ProjectDetail>(`/projects/${name}`),
  getProfile: () => fetchJson<Profile>('/profile'),
  sendContact: (data: ContactPayload) => postJson('/contact', data),
}

export default api
