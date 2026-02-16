import { queryOptions } from '@tanstack/react-query'
import { getCurrentWeather, getForecast } from './weatherApi'

export const weatherQueries = {
  current: (lat: number, lon: number) =>
    queryOptions({
      queryKey: ['weather', 'current', lat, lon],
      queryFn: () => getCurrentWeather(lat, lon),
    }),
  forecast: (lat: number, lon: number) =>
    queryOptions({
      queryKey: ['weather', 'forecast', lat, lon],
      queryFn: () => getForecast(lat, lon),
    }),
}
