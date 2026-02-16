import * as z from 'zod'
import { ENV } from '@/shared/config'
import { ApiError } from '@/shared/api'
import { buildGeocodeQueries } from '../lib'

const { OPENWEATHER_API_KEY, OPENWEATHER_GEO_URL } = ENV

const geocodeResultSchema = z.array(
  z.object({
    lat: z.number(),
    lon: z.number(),
    name: z.string(),
    local_names: z.record(z.string(), z.string()).optional(),
    country: z.string(),
  }),
)

const reverseGeocodeSchema = z.array(
  z.object({
    name: z.string(),
    local_names: z.object({ ko: z.string() }).partial().optional(),
  }),
)

async function fetchJson(url: string): Promise<unknown> {
  const response = await fetch(url)
  if (!response.ok) throw new ApiError(response.status)
  return response.json()
}

export async function geocodeDistrict(
  district: string,
): Promise<{ lat: number; lon: number } | null> {
  const queries = buildGeocodeQueries(district)

  for (const q of queries) {
    const params = new URLSearchParams({
      q,
      limit: '1',
      appid: OPENWEATHER_API_KEY,
    })

    const data = geocodeResultSchema.parse(
      await fetchJson(`${OPENWEATHER_GEO_URL}/direct?${params}`),
    )
    if (data.length > 0) {
      return { lat: data[0].lat, lon: data[0].lon }
    }
  }

  return null
}

export async function reverseGeocode(lat: number, lon: number): Promise<string | null> {
  const params = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
    limit: '1',
    appid: OPENWEATHER_API_KEY,
  })
  try {
    const data = reverseGeocodeSchema.parse(
      await fetchJson(`${OPENWEATHER_GEO_URL}/reverse?${params}`),
    )
    return data[0]?.local_names?.ko ?? data[0]?.name ?? null
  } catch {
    return null
  }
}
