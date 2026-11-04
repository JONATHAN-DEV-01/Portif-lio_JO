import { lazy, Suspense } from 'react'
import Home from './pages/Home'

const Admin = lazy(() => import('./pages/Admin'))

export function isAdminRoute() {
  return window.location.pathname.replace(/\/$/, '') === '/admin'
}

function App() {
  if (isAdminRoute()) {
    return (
      <Suspense fallback={null}>
        <Admin />
      </Suspense>
    )
  }

  return <Home />
}

export default App
