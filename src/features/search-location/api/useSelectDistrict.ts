import { useMutation, useQueryClient } from '@tanstack/react-query'
import { geocodeDistrict, parseDistrict } from '@/entities/location'
import type { GeoResult } from '@/shared/lib'

interface UseSelectDistrictOptions {
  onSelect?: (displayName: string) => void
}

export function useSelectDistrict({ onSelect }: UseSelectDistrictOptions = {}) {
  const queryClient = useQueryClient()

  const { mutate: select, isPending: isSelecting, error } = useMutation({
    mutationFn: async (district: string) => {
      const coords = await geocodeDistrict(district)
      if (!coords) throw new Error('해당 장소의 정보가 제공되지 않습니다.')
      return { coords, displayName: parseDistrict(district).fullAddress }
    },
    onSuccess: ({ coords, displayName }) => {
      queryClient.setQueryData(['geolocation'], {
        coords,
        source: 'search',
        displayName,
      } satisfies GeoResult)
      onSelect?.(displayName)
    },
  })

  function resetToGps() {
    queryClient.invalidateQueries({ queryKey: ['geolocation'] })
  }

  return { select, isSelecting, error, resetToGps }
}
