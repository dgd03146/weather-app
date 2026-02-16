import type { Coordinates } from './types'
import { FALLBACK_COORDS, GPS_TIMEOUT_MS, GPS_MAX_AGE_MS } from '@/shared/config'

export interface GeoResult {
  coords: Coordinates
  source: 'gps' | 'search' | 'fallback'
  displayName?: string
}

export function getCurrentPosition(): Promise<GeoResult> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ coords: FALLBACK_COORDS, source: 'fallback' })
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
        resolve({ coords: FALLBACK_COORDS, source: 'fallback' })
      },
      {
        enableHighAccuracy: false,
        timeout: GPS_TIMEOUT_MS,
        maximumAge: GPS_MAX_AGE_MS,
      },
    )
  })
}
