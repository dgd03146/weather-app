import { queryOptions } from '@tanstack/react-query'
import type { Coordinates } from './types'

const SEOUL: Coordinates = { lat: 37.5665, lon: 126.978 }

export interface GeoResult {
  coords: Coordinates
  isFallback: boolean
}

export const geolocationQuery = queryOptions({
  queryKey: ['geolocation'],
  queryFn: getCurrentPosition,
  staleTime: 5 * 60 * 1000,
  gcTime: 10 * 60 * 1000,
})

export function getCurrentPosition(): Promise<GeoResult> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ coords: SEOUL, isFallback: true })
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          coords: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          isFallback: false,
        })
      },
      () => {
        resolve({ coords: SEOUL, isFallback: true })
      },
      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 600000,
      },
    )
  })
}
