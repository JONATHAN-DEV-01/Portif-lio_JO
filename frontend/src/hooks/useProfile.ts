import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: api.getProfile,
    staleTime: 1000 * 60 * 30, // profile changes rarely
  })
}
