import { queryOptions } from '@tanstack/react-query'
import { getCurrentWeather, getForecast } from './weatherApi'

const WEATHER_STALE_TIME_MS = 5 * 60 * 1000

function roundCoord(n: number) {
  return Math.round(n * 1000) / 1000
}

export const weatherQueries = {
  current: (lat: number, lon: number) =>
    queryOptions({
      queryKey: ['weather', 'current', roundCoord(lat), roundCoord(lon)],
      queryFn: ({ signal }) => getCurrentWeather(lat, lon, signal),
      staleTime: WEATHER_STALE_TIME_MS,
    }),
  forecast: (lat: number, lon: number) =>
    queryOptions({
      queryKey: ['weather', 'forecast', roundCoord(lat), roundCoord(lon)],
      queryFn: ({ signal }) => getForecast(lat, lon, signal),
      staleTime: WEATHER_STALE_TIME_MS,
    }),
}
