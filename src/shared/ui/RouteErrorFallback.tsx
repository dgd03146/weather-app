import { useRouteError, useNavigate } from 'react-router-dom'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { ApiError } from '@/shared/api'

export function RouteErrorFallback() {
  const error = useRouteError()
  const navigate = useNavigate()
  const { reset } = useQueryErrorResetBoundary()

  const handleRetry = () => {
    reset()
    navigate(0)
  }

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
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            홈으로 돌아가기
          </button>
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
            onClick={handleRetry}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
          >
            다시 시도
          </button>
        </div>
      </div>
    )
  }

  const message = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다'

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <p className="text-6xl font-bold text-red-500 mb-4">!</p>
        <h1 className="text-xl font-semibold text-white mb-2">
          오류가 발생했습니다
        </h1>
        <p className="text-slate-400 mb-6">{message}</p>
        <button
          type="button"
          onClick={handleRetry}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          다시 시도
        </button>
      </div>
    </div>
  )
}
