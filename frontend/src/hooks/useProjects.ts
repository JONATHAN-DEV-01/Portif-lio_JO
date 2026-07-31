import { useQuery } from '@tanstack/react-query'
import api, { type Project } from '@/lib/api'

export function useProjects() {
  return useQuery<Project[], Error>({
    queryKey: ['projects'],
    queryFn: api.getProjects,
  })
}

export function useProject(name: string) {
  return useQuery({
    queryKey: ['projects', name],
    queryFn: () => api.getProject(name),
    enabled: Boolean(name),
  })
}
