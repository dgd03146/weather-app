export function CurrentWeatherSkeleton() {
  return (
    <div className="flex flex-col items-center gap-3 py-6">
      <div className="h-4 w-24 animate-pulse rounded-full bg-white/5" />
      <div className="h-40 w-40 animate-pulse rounded-full bg-white/5" />
      <div className="h-16 w-40 animate-pulse rounded-xl bg-white/5" />
      <div className="h-5 w-28 animate-pulse rounded bg-white/5" />
      <div className="h-4 w-36 animate-pulse rounded bg-white/5" />
      <div className="mt-2 grid w-full grid-cols-3 gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-2xl bg-white/5" />
        ))}
      </div>
    </div>
  )
}

export function HourlyForecastSkeleton() {
  return (
    <div className="mt-6 rounded-2xl bg-white/5 p-4">
      <div className="mb-4 h-4 w-16 animate-pulse rounded bg-white/8" />
      <div className="flex gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-24 w-16 shrink-0 animate-pulse rounded-2xl bg-white/5" />
        ))}
      </div>
    </div>
  )
}

export function WeatherSkeleton() {
  return (
    <>
      <CurrentWeatherSkeleton />
      <HourlyForecastSkeleton />
    </>
  )
}
