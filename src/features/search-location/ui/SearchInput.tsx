import type { KeyboardEvent } from 'react'
import { Search, Navigation } from 'lucide-react'

interface SearchInputProps {
  query: string
  onQueryChange: (value: string) => void
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
  onFocus: () => void
  onClear: () => void
  isSearchActive: boolean
}

export function SearchInput({
  query,
  onQueryChange,
  onKeyDown,
  onFocus,
  onClear,
  isSearchActive,
}: SearchInputProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        placeholder="시, 구, 동으로 검색"
        className="w-full glass rounded-xl py-2.5 pl-10 pr-10 text-sm text-white placeholder-slate-500 outline-none focus:ring-1 focus:ring-violet-500/50"
      />
      {isSearchActive && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
          aria-label="현재 위치로 복귀"
        >
          <Navigation className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
