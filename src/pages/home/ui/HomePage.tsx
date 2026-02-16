import { AsyncBoundary } from '@/shared/ui'
import { SearchBar } from '@/features/search-location'
import { WeatherContent } from './WeatherContent'
import { WeatherSkeleton } from './Skeletons'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-bg-app text-white">
      <div className="mx-auto max-w-md px-4 py-6 md:max-w-2xl lg:max-w-4xl">
        <SearchBar />
        <AsyncBoundary pendingFallback={<WeatherSkeleton />}>
          <WeatherContent />
        </AsyncBoundary>
      </div>
    </main>
  )
}
