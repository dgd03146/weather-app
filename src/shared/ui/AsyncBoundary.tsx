import { Suspense } from 'react'
import type { ReactNode } from 'react'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from './ErrorBoundary'
import { AppErrorFallback } from './AppErrorFallback'

interface AsyncBoundaryProps {
  children: ReactNode
  pendingFallback: ReactNode
}

export function AsyncBoundary({ children, pendingFallback }: AsyncBoundaryProps) {
  const { reset } = useQueryErrorResetBoundary()

  return (
    <ErrorBoundary onReset={reset} fallbackRender={AppErrorFallback}>
      <Suspense fallback={pendingFallback}>
        {children}
      </Suspense>
    </ErrorBoundary>
  )
}
