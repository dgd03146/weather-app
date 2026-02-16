interface SkeletonProps {
  count?: number
}

export function CurrentWeatherSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2 pb-6">
      <div className="h-4 w-20 animate-pulse rounded bg-slate-800" />
      <div className="h-32 w-32 animate-pulse rounded-full bg-slate-800" />
      <div className="h-16 w-36 animate-pulse rounded-xl bg-slate-800" />
      <div className="h-4 w-24 animate-pulse rounded bg-slate-800" />
      <div className="h-4 w-32 animate-pulse rounded bg-slate-800" />
      <div className="mt-4 grid w-full grid-cols-3 gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-16 animate-pulse rounded-xl bg-slate-800" />
        ))}
      </div>
    </div>
  )
}

export function HourlyForecastSkeleton({ count = 5 }: SkeletonProps) {
  return (
    <div className="mt-4">
      <div className="mb-3 h-4 w-20 animate-pulse rounded bg-slate-800" />
      <div className="flex gap-3">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="h-20 w-16 shrink-0 animate-pulse rounded-xl bg-slate-800" />
        ))}
      </div>
    </div>
  )
}
