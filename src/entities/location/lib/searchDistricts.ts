let cache: string[] | null = null

async function loadDistricts(): Promise<string[]> {
  if (cache) return cache
  const m = await import('../config/korea_districts.json')
  cache = m.default
  return cache
}

export async function searchDistricts(query: string): Promise<string[]> {
  if (!query.trim()) return []

  const districts = await loadDistricts()
  const q = query.trim().toLowerCase()

  return districts.filter((d: string) => {
    const parts = d.split('-')
    return parts.some((p) => p.toLowerCase().includes(q))
  })
}

export function parseDistrict(district: string) {
  const parts = district.split('-')
  return {
    sido: parts[0] ?? '',
    sigungu: parts[1] ?? '',
    dong: parts[2] ?? '',
    fullAddress: parts.join(' '),
  }
}

export function buildGeocodeQueries(district: string): string[] {
  const parts = district.split('-')
  if (parts.length >= 3) {
    return [`${parts[2]},${parts[1]},KR`, `${parts[1]},${parts[0]},KR`]
  }
  if (parts.length >= 2) {
    return [`${parts[1]},${parts[0]},KR`]
  }
  return [`${parts[0]},KR`]
}
