import { RouterProvider } from 'react-router-dom'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { QueryProvider } from './providers/QueryProvider'
import { router } from './router'
import { ErrorBoundary, AppErrorFallback } from '@/shared/ui'

export default function App() {
  return (
    <QueryProvider>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} fallbackRender={AppErrorFallback}>
            <RouterProvider router={router} />
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </QueryProvider>
  )
}
