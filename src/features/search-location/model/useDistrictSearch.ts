import { useState, useEffect, useDeferredValue, useCallback } from 'react'
import { searchDistricts } from '@/entities/location'

const MAX_RESULTS = 20

export function useDistrictSearch(query: string) {
  const [results, setResults] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const deferredQuery = useDeferredValue(query)

  useEffect(() => {
    if (!deferredQuery.trim()) {
      setResults([])
      setIsOpen(false)
      return
    }

    let cancelled = false
    searchDistricts(deferredQuery).then((found) => {
      if (!cancelled) {
        setResults(found.slice(0, MAX_RESULTS))
        setIsOpen(found.length > 0)
      }
    })

    return () => {
      cancelled = true
    }
  }, [deferredQuery])

  const close = useCallback(() => setIsOpen(false), [])
  const open = useCallback(() => {
    if (results.length > 0) setIsOpen(true)
  }, [results.length])

  return { results, isOpen, close, open }
}
