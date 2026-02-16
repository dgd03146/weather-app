import { RefreshCw } from 'lucide-react'

interface SectionErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
  message?: string
}

export function SectionErrorFallback({
  resetErrorBoundary,
  message = '데이터를 불러올 수 없습니다',
}: SectionErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-white/5 px-4 py-10">
      <p className="text-sm text-slate-400">{message}</p>
      <button
        type="button"
        onClick={resetErrorBoundary}
        className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-1 focus-visible:ring-violet-500/50"
      >
        <RefreshCw aria-hidden="true" className="h-3.5 w-3.5" />
        다시 시도
      </button>
    </div>
  )
}
