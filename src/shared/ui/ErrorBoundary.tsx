import { Component } from 'react'
import type { ReactNode, ErrorInfo } from 'react'

interface FallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

interface ErrorBoundaryProps {
  children: ReactNode
  onReset?: () => void
  fallbackRender: (props: FallbackProps) => ReactNode
}

interface ErrorBoundaryState {
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {}

  resetErrorBoundary = () => {
    this.props.onReset?.()
    this.setState({ error: null })
  }

  render() {
    if (this.state.error) {
      return this.props.fallbackRender({
        error: this.state.error,
        resetErrorBoundary: this.resetErrorBoundary,
      })
    }
    return this.props.children
  }
}
