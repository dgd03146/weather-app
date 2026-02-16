import * as z from 'zod'

const envSchema = z.object({
  VITE_OPENWEATHER_API_KEY: z.string(),
})

const parsed = envSchema.parse(import.meta.env)

export const ENV = {
  OPENWEATHER_API_KEY: parsed.VITE_OPENWEATHER_API_KEY,
  OPENWEATHER_BASE_URL: 'https://api.openweathermap.org/data/2.5',
  OPENWEATHER_GEO_URL: 'https://api.openweathermap.org/geo/1.0',
} as const
