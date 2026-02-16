import { useSuspenseQuery } from '@tanstack/react-query'
import { geolocationQuery } from '@/shared/lib'
import { AsyncBoundary } from '@/shared/ui'
import { CurrentWeatherSection } from './CurrentWeatherSection'
import { HourlyForecastSection } from './HourlyForecastSection'
import { CurrentWeatherSkeleton, HourlyForecastSkeleton } from './Skeletons'

export function WeatherContent() {
  const { data: geo } = useSuspenseQuery(geolocationQuery)

  return (
    <>
      {geo.source === 'fallback' && (
        <div className="mb-4 glass rounded-2xl px-4 py-3 text-sm text-amber-200">
          위치 권한이 거부되어 서울 날씨를 표시합니다.
        </div>
      )}
      <AsyncBoundary pendingFallback={<CurrentWeatherSkeleton />}>
        <CurrentWeatherSection
          lat={geo.coords.lat}
          lon={geo.coords.lon}
          displayName={geo.displayName}
        />
      </AsyncBoundary>
      <AsyncBoundary pendingFallback={<HourlyForecastSkeleton />}>
        <HourlyForecastSection lat={geo.coords.lat} lon={geo.coords.lon} />
      </AsyncBoundary>
    </>
  )
}
