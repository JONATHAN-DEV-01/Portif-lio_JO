import { renderToString } from 'react-dom/server'
import { QueryClientProvider } from '@tanstack/react-query'
import { createQueryClient } from '@/lib/queryClient'
import Home from '@/pages/Home'

export function render() {
  return renderToString(
    <QueryClientProvider client={createQueryClient()}>
      <Home />
    </QueryClientProvider>,
  )
}
