import { queryOptions } from '@tanstack/react-query'
import { getCurrentPosition } from '@/shared/lib'
import { GEOLOCATION_STALE_TIME_MS, GEOLOCATION_GC_TIME_MS } from '@/shared/config'

export const geolocationQuery = queryOptions({
  queryKey: ['geolocation'],
  queryFn: getCurrentPosition,
  staleTime: GEOLOCATION_STALE_TIME_MS,
  gcTime: GEOLOCATION_GC_TIME_MS,
})
