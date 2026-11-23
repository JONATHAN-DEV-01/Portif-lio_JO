import { useQuery } from '@tanstack/react-query'
import api, { type Project } from '@/lib/api'
import snapshot from '@/data/snapshot.json'
import { applyProjectOverride } from '@/data/projectOverrides'

const applyToList = (projects: Project[]) => projects.map(applyProjectOverride)

export function useProjects() {
  return useQuery<Project[], Error>({
    queryKey: ['projects'],
    queryFn: api.getProjects,
    // Shown immediately and replaced as soon as the API answers.
    initialData: snapshot.projects as unknown as Project[],
    initialDataUpdatedAt: 0,
    select: applyToList,
  })
}

export function projectDetailQuery(name: string) {
  return {
    queryKey: ['projects', name],
    queryFn: () => api.getProject(name),
  }
}

export function useProject(name: string) {
  return useQuery({
    ...projectDetailQuery(name),
    enabled: Boolean(name),
    select: applyProjectOverride,
  })
}
