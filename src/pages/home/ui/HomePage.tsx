import { AsyncBoundary } from '@/shared/ui'
import { WeatherContent } from './WeatherContent'
import { CurrentWeatherSkeleton, HourlyForecastSkeleton } from './Skeletons'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg-app text-white">
      <div className="mx-auto max-w-md px-4 py-6 md:max-w-2xl lg:max-w-4xl">
        <AsyncBoundary
          pendingFallback={
            <>
              <CurrentWeatherSkeleton />
              <HourlyForecastSkeleton />
            </>
          }
        >
          <WeatherContent />
        </AsyncBoundary>
      </div>
    </div>
  )
}
