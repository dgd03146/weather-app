export function FavoriteCardSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl bg-white/5 p-4">
      <div className="h-4 w-16 animate-pulse rounded bg-white/8" />
      <div className="h-12 w-12 animate-pulse rounded-full bg-white/5" />
      <div className="h-7 w-12 animate-pulse rounded bg-white/5" />
      <div className="h-3 w-24 animate-pulse rounded bg-white/5" />
    </div>
  )
}
