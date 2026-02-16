import { Star } from 'lucide-react'
import { useFavoritesStore, addFavorite, removeFavorite, MAX_FAVORITES, COORD_THRESHOLD } from '@/entities/favorite'
import type { GeoResult } from '@/shared/lib'

interface AddFavoriteButtonProps {
  geo: GeoResult
}

export function AddFavoriteButton({ geo }: AddFavoriteButtonProps) {
  const matchedId = useFavoritesStore((s) =>
    s.favorites.find(
      (f) =>
        Math.abs(f.lat - geo.coords.lat) < COORD_THRESHOLD &&
        Math.abs(f.lon - geo.coords.lon) < COORD_THRESHOLD,
    )?.id ?? null,
  )
  const isFull = useFavoritesStore((s) => s.favorites.length >= MAX_FAVORITES)

  if (geo.source === 'fallback') return null

  const alreadyAdded = matchedId !== null
  const disabled = !alreadyAdded && isFull

  function handleClick() {
    if (alreadyAdded) {
      removeFavorite(matchedId)
      return
    }
    const displayName = geo.displayName ?? ''
    addFavorite({
      district: displayName,
      nickname: displayName,
      lat: geo.coords.lat,
      lon: geo.coords.lon,
    })
  }

  function getLabel() {
    if (alreadyAdded) return '저장됨'
    if (isFull) return '최대 6개'
    return '즐겨찾기'
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className="flex cursor-pointer items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed glass hover:bg-white/10 focus-visible:ring-1 focus-visible:ring-violet-500/50"
    >
      <Star aria-hidden="true" className={`h-4 w-4 ${alreadyAdded ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
      <span className="text-slate-300">{getLabel()}</span>
    </button>
  )
}
