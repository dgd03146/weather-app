import * as z from 'zod'

export const favoriteItemSchema = z.object({
  id: z.string(),
  district: z.string(),
  nickname: z.string(),
  lat: z.number(),
  lon: z.number(),
})

export const favoritesStateSchema = z.object({
  favorites: z.array(favoriteItemSchema),
})

export type FavoriteItem = z.infer<typeof favoriteItemSchema>
