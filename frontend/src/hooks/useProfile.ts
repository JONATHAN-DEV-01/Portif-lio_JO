import { useQuery } from '@tanstack/react-query'
import api, { type Profile } from '@/lib/api'
import snapshot from '@/data/snapshot.json'

export function useProfile() {
  return useQuery<Profile, Error>({
    queryKey: ['profile'],
    queryFn: api.getProfile,
    staleTime: 1000 * 60 * 30, // profile changes rarely
    // Shown immediately and replaced as soon as the API answers.
    initialData: snapshot.profile as Profile,
    initialDataUpdatedAt: 0,
  })
}
