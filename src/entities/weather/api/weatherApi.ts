import { ENV } from '@/shared/config'
import { ApiError } from '@/shared/api'
import { currentWeatherSchema, forecastSchema } from '../model'
import type { CurrentWeather, Forecast } from '../model'

const { OPENWEATHER_API_KEY, OPENWEATHER_BASE_URL } = ENV
const GEO_BASE_URL = 'https://api.openweathermap.org/geo/1.0'

function buildUrl(endpoint: string, lat: number, lon: number) {
  const params = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
    appid: OPENWEATHER_API_KEY,
    units: 'metric',
    lang: 'kr',
  })
  return `${OPENWEATHER_BASE_URL}/${endpoint}?${params}`
}

async function fetchJson(url: string): Promise<unknown> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new ApiError(response.status)
  }
  return response.json()
}

async function reverseGeocode(lat: number, lon: number): Promise<string | null> {
  const params = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
    limit: '1',
    appid: OPENWEATHER_API_KEY,
  })
  try {
    const data = await fetchJson(`${GEO_BASE_URL}/reverse?${params}`)
    return data[0]?.local_names?.ko ?? data[0]?.name ?? null
  } catch {
    return null
  }
}

export async function getCurrentWeather(lat: number, lon: number): Promise<CurrentWeather> {
  const [weatherData, koName] = await Promise.all([
    fetchJson(buildUrl('weather', lat, lon)),
    reverseGeocode(lat, lon),
  ])
  const parsed = currentWeatherSchema.parse(weatherData)
  return koName ? { ...parsed, name: koName } : parsed
}

export async function getForecast(lat: number, lon: number): Promise<Forecast> {
  const data = await fetchJson(buildUrl('forecast', lat, lon))
  return forecastSchema.parse(data)
}
