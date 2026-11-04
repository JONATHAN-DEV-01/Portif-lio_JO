import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import '@fontsource-variable/geist/wght.css'
import '@fontsource-variable/jetbrains-mono/wght.css'
import App, { isAdminRoute } from './App'
import { createQueryClient } from './lib/queryClient'
import './index.css'

const container = document.getElementById('root')!
const app = (
  <React.StrictMode>
    <QueryClientProvider client={createQueryClient()}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
)

// The production home page arrives prerendered. /admin and the dev server start from scratch.
if (container.hasChildNodes() && !isAdminRoute()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
