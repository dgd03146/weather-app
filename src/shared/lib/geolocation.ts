import { queryOptions } from '@tanstack/react-query'
import type { Coordinates } from './types'

const SEOUL: Coordinates = { lat: 37.5665, lon: 126.978 }
const GEOLOCATION_STALE_TIME_MS = 5 * 60 * 1000
const GEOLOCATION_GC_TIME_MS = 10 * 60 * 1000
const GPS_TIMEOUT_MS = 15_000
const GPS_MAX_AGE_MS = 600_000

export interface GeoResult {
  coords: Coordinates
  source: 'gps' | 'search' | 'fallback'
  displayName?: string
}

export const geolocationQuery = queryOptions({
  queryKey: ['geolocation'],
  queryFn: getCurrentPosition,
  staleTime: GEOLOCATION_STALE_TIME_MS,
  gcTime: GEOLOCATION_GC_TIME_MS,
})

export function getCurrentPosition(): Promise<GeoResult> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ coords: SEOUL, source: 'fallback' })
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          coords: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          source: 'gps',
        })
      },
      () => {
        resolve({ coords: SEOUL, source: 'fallback' })
      },
      {
        enableHighAccuracy: false,
        timeout: GPS_TIMEOUT_MS,
        maximumAge: GPS_MAX_AGE_MS,
      },
    )
  })
}
