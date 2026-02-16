import { Suspense } from 'react'
import type { ReactNode } from 'react'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from './ErrorBoundary'
import { AppErrorFallback } from './AppErrorFallback'

type FallbackRender = (props: { error: Error; resetErrorBoundary: () => void }) => ReactNode

interface AsyncBoundaryProps {
  children: ReactNode
  pendingFallback: ReactNode
  errorFallback?: FallbackRender
}

export function AsyncBoundary({ children, pendingFallback, errorFallback }: AsyncBoundaryProps) {
  const { reset } = useQueryErrorResetBoundary()

  return (
    <ErrorBoundary onReset={reset} fallbackRender={errorFallback ?? AppErrorFallback}>
      <Suspense fallback={pendingFallback}>
        {children}
      </Suspense>
    </ErrorBoundary>
  )
}
