import koreaDistricts from '../config/korea_districts.json'

export function searchDistricts(query: string): string[] {
  if (!query.trim()) return []

  const normalizedQuery = query.trim().toLowerCase()

  return koreaDistricts.filter((district: string) => {
    const parts = district.split('-')
    return parts.some((part) => part.toLowerCase().includes(normalizedQuery))
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
