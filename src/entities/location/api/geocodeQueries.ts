import { queryOptions } from '@tanstack/react-query'
import { geocodeDistrict, reverseGeocode } from './geocodeApi'

const GEOCODE_GC_TIME_MS = 60 * 60 * 1000
const REVERSE_STALE_TIME_MS = 30 * 60 * 1000

function roundCoord(n: number) {
  return Math.round(n * 1000) / 1000
}

export const geocodeQueries = {
  district: (district: string) =>
    queryOptions({
      queryKey: ['geocode', 'district', district],
      queryFn: () => geocodeDistrict(district),
      staleTime: Infinity,
      gcTime: GEOCODE_GC_TIME_MS,
    }),
  reverseName: (lat: number, lon: number) =>
    queryOptions({
      queryKey: ['geocode', 'reverse', roundCoord(lat), roundCoord(lon)],
      queryFn: () => reverseGeocode(lat, lon),
      staleTime: REVERSE_STALE_TIME_MS,
      gcTime: GEOCODE_GC_TIME_MS,
    }),
}
