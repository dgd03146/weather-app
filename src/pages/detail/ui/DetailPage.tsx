import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import {
  CurrentWeatherSection,
  HourlyForecastSection,
  CurrentWeatherSkeleton,
  HourlyForecastSkeleton,
} from '@/widgets/weather-detail'
import { AsyncBoundary, SectionErrorFallback } from '@/shared/ui'

export default function DetailPage() {
  const { lat, lon } = useParams<{ lat: string; lon: string }>()
  const navigate = useNavigate()

  const numLat = Number(lat)
  const numLon = Number(lon)

  const isInvalidCoords = Number.isNaN(numLat) || Number.isNaN(numLon)

  if (isInvalidCoords) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-app text-white">
        <p>잘못된 좌표입니다.</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-bg-app text-white">
      <div className="mx-auto max-w-md px-4 py-6 md:max-w-2xl lg:max-w-4xl">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm text-slate-400 transition-colors hover:text-white glass hover:bg-white/10 focus-visible:ring-1 focus-visible:ring-violet-500/50"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          뒤로
        </button>

        <AsyncBoundary
          pendingFallback={<CurrentWeatherSkeleton />}
          errorFallback={(props) => (
            <SectionErrorFallback {...props} message="현재 날씨를 불러올 수 없습니다" />
          )}
        >
          <CurrentWeatherSection lat={numLat} lon={numLon} />
        </AsyncBoundary>
        <AsyncBoundary
          pendingFallback={<HourlyForecastSkeleton />}
          errorFallback={(props) => (
            <SectionErrorFallback {...props} message="시간별 예보를 불러올 수 없습니다" />
          )}
        >
          <HourlyForecastSection lat={numLat} lon={numLon} />
        </AsyncBoundary>
      </div>
    </main>
  )
}
