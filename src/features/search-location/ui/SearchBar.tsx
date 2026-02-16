import { useState, useRef } from 'react'
import { useClickOutside, useListNavigation } from '@/shared/lib'
import { useDistrictSearch } from '../model'
import { useSelectDistrict } from '../api'
import { SearchInput } from './SearchInput'
import { SearchResults } from './SearchResults'

export function SearchBar() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState('')

  const { results, isOpen, close, open } = useDistrictSearch(query)

  const { select, isSelecting, error, resetToGps } = useSelectDistrict({
    onSelect: (displayName) => {
      setQuery(displayName)
      close()
    },
  })

  const { activeIndex, handleKeyDown } = useListNavigation({
    itemCount: isOpen ? results.length : 0,
    onSelect: (index) => select(results[index]),
    onClose: close,
  })

  useClickOutside(containerRef, close)

  function handleClear() {
    setQuery('')
    close()
    resetToGps()
  }

  return (
    <div ref={containerRef} className="relative mb-4">
      <SearchInput
        query={query}
        onQueryChange={setQuery}
        onKeyDown={handleKeyDown}
        onFocus={open}
        onClear={handleClear}
        isSearchActive={query.trim().length > 0}
      />
      <SearchResults results={results} isOpen={isOpen} activeIndex={activeIndex} onSelect={select} />
      {isSelecting && (
        <p className="mt-2 text-xs text-slate-400">날씨 정보를 불러오는 중…</p>
      )}
      {error && <p className="mt-2 text-xs text-red-400">{error.message}</p>}
    </div>
  )
}
