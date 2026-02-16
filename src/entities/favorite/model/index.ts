export type { FavoriteItem } from './types'
export { favoriteItemSchema } from './types'
export {
  useFavoritesStore,
  addFavorite,
  removeFavorite,
  updateNickname,
  MAX_FAVORITES,
  COORD_THRESHOLD,
} from './favoritesStore'
