import { useSuspenseQuery } from '@tanstack/react-query'
import { geolocationQuery } from '@/shared/api'
import {
  CurrentWeatherSection,
  HourlyForecastSection,
  CurrentWeatherSkeleton,
  HourlyForecastSkeleton,
} from '@/widgets/weather-detail'
import { AddFavoriteButton } from '@/features/manage-favorites'
import { AsyncBoundary, SectionErrorFallback } from '@/shared/ui'

export function WeatherContent() {
  const { data: geo } = useSuspenseQuery(geolocationQuery)
  const isFallbackLocation = geo.source === 'fallback'

  return (
    <>
      {isFallbackLocation && (
        <div className="mb-4 glass rounded-2xl px-4 py-3 text-sm text-amber-200">
          위치 권한이 거부되어 서울 날씨를 표시합니다.
        </div>
      )}
      <div className="flex justify-end">
        <AddFavoriteButton geo={geo} />
      </div>
      <AsyncBoundary
        pendingFallback={<CurrentWeatherSkeleton />}
        errorFallback={(props) => (
          <SectionErrorFallback {...props} message="현재 날씨를 불러올 수 없습니다" />
        )}
      >
        <CurrentWeatherSection
          lat={geo.coords.lat}
          lon={geo.coords.lon}
          displayName={geo.displayName}
        />
      </AsyncBoundary>
      <AsyncBoundary
        pendingFallback={<HourlyForecastSkeleton />}
        errorFallback={(props) => (
          <SectionErrorFallback {...props} message="시간별 예보를 불러올 수 없습니다" />
        )}
      >
        <HourlyForecastSection lat={geo.coords.lat} lon={geo.coords.lon} />
      </AsyncBoundary>
    </>
  )
}
