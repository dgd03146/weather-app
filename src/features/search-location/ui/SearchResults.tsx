import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { parseDistrict } from '@/entities/location'

interface SearchResultsProps {
  results: string[]
  isOpen: boolean
  activeIndex: number
  onSelect: (district: string) => void
}

export function SearchResults({ results, isOpen, activeIndex, onSelect }: SearchResultsProps) {
  const activeRef = useRef<HTMLLIElement>(null)

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  return (
    <AnimatePresence>
      {isOpen && results.length > 0 && (
        <motion.ul
          role="listbox"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15 }}
          className="absolute z-50 mt-2 max-h-72 w-full overflow-y-auto rounded-xl glass scrollbar-hide"
        >
          {results.map((district, index) => {
            const { dong, sigungu, fullAddress } = parseDistrict(district)
            const isActive = index === activeIndex
            return (
              <li key={district} ref={isActive ? activeRef : null} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onClick={() => onSelect(district)}
                  className={`flex w-full flex-col px-4 py-2.5 text-left transition-colors ${isActive ? 'bg-white/10' : 'hover:bg-white/10'}`}
                >
                  <span className="text-sm text-white">{dong || sigungu}</span>
                  <span className="text-xs text-slate-500">{fullAddress}</span>
                </button>
              </li>
            )
          })}
        </motion.ul>
      )}
    </AnimatePresence>
  )
}
