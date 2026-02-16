import { useFavoritesStore } from '@/entities/favorite'
import { FavoriteCard, FavoriteCardSkeleton } from '@/features/manage-favorites'
import { AsyncBoundary, SectionErrorFallback } from '@/shared/ui'

function FavoritesGrid() {
  const favorites = useFavoritesStore((s) => s.favorites)

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {favorites.map((item) => (
        <FavoriteCard key={item.id} item={item} />
      ))}
    </div>
  )
}

function FavoritesGridSkeleton() {
  const count = useFavoritesStore((s) => s.favorites.length)

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <FavoriteCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function FavoritesSection() {
  const count = useFavoritesStore((s) => s.favorites.length)

  if (count === 0) return null

  return (
    <section aria-label="즐겨찾기" className="mt-6">
      <h2 className="mb-3 text-sm font-medium text-slate-400">즐겨찾기</h2>
      <AsyncBoundary
        pendingFallback={<FavoritesGridSkeleton />}
        errorFallback={(props) => (
          <SectionErrorFallback {...props} message="즐겨찾기를 불러올 수 없습니다" />
        )}
      >
        <FavoritesGrid />
      </AsyncBoundary>
    </section>
  )
}
