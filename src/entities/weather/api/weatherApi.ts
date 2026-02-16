import { ENV } from '@/shared/config'
import { ApiError } from '@/shared/api'
import { currentWeatherSchema, forecastSchema } from '../model'
import type { CurrentWeather, Forecast } from '../model'

const { OPENWEATHER_API_KEY, OPENWEATHER_BASE_URL } = ENV

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

async function fetchJson(url: string) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new ApiError(response.status)
  }
  return response.json()
}

export async function getCurrentWeather(lat: number, lon: number): Promise<CurrentWeather> {
  const data = await fetchJson(buildUrl('weather', lat, lon))
  return currentWeatherSchema.parse(data)
}

export async function getForecast(lat: number, lon: number): Promise<Forecast> {
  const data = await fetchJson(buildUrl('forecast', lat, lon))
  return forecastSchema.parse(data)
}
