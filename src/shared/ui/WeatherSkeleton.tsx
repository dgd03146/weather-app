interface WeatherSkeletonProps {
  count?: number
}

export function WeatherSkeleton({ count = 3 }: WeatherSkeletonProps) {
  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="mx-auto max-w-md space-y-6 pt-8">
        <div className="h-6 w-32 animate-pulse rounded-lg bg-slate-800" />
        <div className="h-48 animate-pulse rounded-2xl bg-slate-800" />
        <div className="flex gap-3">
          <div className="h-10 flex-1 animate-pulse rounded-xl bg-slate-800" />
          <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-800" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-slate-800" />
          ))}
        </div>
        <div className="h-32 animate-pulse rounded-2xl bg-slate-800" />
      </div>
    </div>
  )
}
