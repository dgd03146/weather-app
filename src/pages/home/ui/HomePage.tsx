import { AsyncBoundary, WeatherSkeleton } from '@/shared/ui'
import { WeatherContent } from './WeatherContent'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="mx-auto max-w-md px-4 py-6">
        <AsyncBoundary pendingFallback={<WeatherSkeleton />}>
          <WeatherContent />
        </AsyncBoundary>
      </div>
    </div>
  )
}
