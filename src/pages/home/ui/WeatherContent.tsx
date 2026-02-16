import { Suspense } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { geolocationQuery } from '@/shared/lib'
import { CurrentWeatherSection } from './CurrentWeatherSection'
import { HourlyForecastSection } from './HourlyForecastSection'
import { CurrentWeatherSkeleton, HourlyForecastSkeleton } from './Skeletons'

export function WeatherContent() {
  const { data: geo } = useSuspenseQuery(geolocationQuery)

  return (
    <>
      {geo.isFallback && (
        <div className="mb-4 rounded-lg bg-amber-900/30 px-4 py-2 text-sm text-amber-200">
          위치 권한이 거부되어 서울 날씨를 표시합니다.
        </div>
      )}
      <Suspense fallback={<CurrentWeatherSkeleton />}>
        <CurrentWeatherSection lat={geo.coords.lat} lon={geo.coords.lon} />
      </Suspense>
      <Suspense fallback={<HourlyForecastSkeleton />}>
        <HourlyForecastSection lat={geo.coords.lat} lon={geo.coords.lon} />
      </Suspense>
    </>
  )
}
