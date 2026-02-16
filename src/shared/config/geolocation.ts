import type { Coordinates } from '@/shared/lib'

export const FALLBACK_COORDS: Coordinates = { lat: 37.5665, lon: 126.978 }
export const GEOLOCATION_STALE_TIME_MS = 5 * 60 * 1000
export const GEOLOCATION_GC_TIME_MS = 10 * 60 * 1000
export const GPS_TIMEOUT_MS = 15_000
export const GPS_MAX_AGE_MS = 600_000
