import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { FavoriteItem } from './types'
import { favoritesStateSchema } from './types'

export const MAX_FAVORITES = 6
export const COORD_THRESHOLD = 0.001

interface FavoritesState {
  favorites: FavoriteItem[]
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(() => ({ favorites: [] }), {
    name: 'favorites',
    version: 1,
    storage: createJSONStorage(() => localStorage),
    merge: (persisted, current) => {
      const result = favoritesStateSchema.safeParse(persisted)
      if (!result.success) return current
      return { ...current, ...result.data }
    },
  }),
)

// --- Module-level actions (zustand "no store actions" pattern) ---

function isSameLocation(favorites: FavoriteItem[], lat: number, lon: number) {
  return favorites.some(
    (f) =>
      Math.abs(f.lat - lat) < COORD_THRESHOLD &&
      Math.abs(f.lon - lon) < COORD_THRESHOLD,
  )
}

export function addFavorite(item: Omit<FavoriteItem, 'id'>) {
  const { favorites } = useFavoritesStore.getState()
  if (favorites.length >= MAX_FAVORITES) return
  if (isSameLocation(favorites, item.lat, item.lon)) return
  useFavoritesStore.setState({
    favorites: [...favorites, { ...item, id: crypto.randomUUID() }],
  })
}

export function removeFavorite(id: string) {
  useFavoritesStore.setState((s) => ({
    favorites: s.favorites.filter((f) => f.id !== id),
  }))
}

export function updateNickname(id: string, nickname: string) {
  useFavoritesStore.setState((s) => ({
    favorites: s.favorites.map((f) => (f.id === id ? { ...f, nickname } : f)),
  }))
}
