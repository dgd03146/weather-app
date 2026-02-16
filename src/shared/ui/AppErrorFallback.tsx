import { ApiError } from '@/shared/api'

interface AppErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

export function AppErrorFallback({ error, resetErrorBoundary }: AppErrorFallbackProps) {
  if (error instanceof ApiError && error.isNotFound) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <p className="text-6xl font-bold text-slate-600 mb-4">404</p>
          <h1 className="text-xl font-semibold text-white mb-2">
            해당 장소의 정보가 제공되지 않습니다.
          </h1>
          <p className="text-slate-400 mb-6">
            요청하신 위치의 날씨 정보를 찾을 수 없습니다.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            홈으로 돌아가기
          </a>
        </div>
      </div>
    )
  }

  if (error instanceof ApiError && error.isRateLimit) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <p className="text-6xl font-bold text-amber-500 mb-4">429</p>
          <h1 className="text-xl font-semibold text-white mb-2">
            요청이 너무 많습니다
          </h1>
          <p className="text-slate-400 mb-6">잠시 후 다시 시도해주세요.</p>
          <button
            type="button"
            onClick={resetErrorBoundary}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
          >
            다시 시도
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <p className="text-6xl font-bold text-red-500 mb-4">!</p>
        <h1 className="text-xl font-semibold text-white mb-2">
          오류가 발생했습니다
        </h1>
        <p className="text-slate-400 mb-6">{error.message}</p>
        <button
          type="button"
          onClick={resetErrorBoundary}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          다시 시도
        </button>
      </div>
    </div>
  )
}
