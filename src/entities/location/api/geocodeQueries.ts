import { queryOptions } from '@tanstack/react-query'
import { geocodeDistrict, reverseGeocode } from './geocodeApi'

function roundCoord(n: number) {
  return Math.round(n * 1000) / 1000
}

export const geocodeQueries = {
  district: (district: string) =>
    queryOptions({
      queryKey: ['geocode', 'district', district],
      queryFn: () => geocodeDistrict(district),
      staleTime: Infinity,
      gcTime: 1000 * 60 * 60,
    }),
  reverseName: (lat: number, lon: number) =>
    queryOptions({
      queryKey: ['geocode', 'reverse', roundCoord(lat), roundCoord(lon)],
      queryFn: () => reverseGeocode(lat, lon),
      staleTime: 1000 * 60 * 30,
      gcTime: 1000 * 60 * 60,
    }),
}
