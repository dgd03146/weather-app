import { useState, useCallback, type KeyboardEvent } from 'react'

interface UseListNavigationOptions {
  itemCount: number
  onSelect: (index: number) => void
  onClose?: () => void
}

export function useListNavigation({ itemCount, onSelect, onClose }: UseListNavigationOptions) {
  const [activeIndex, setActiveIndex] = useState(-1)

  const reset = useCallback(() => setActiveIndex(-1), [])

  function handleKeyDown(e: KeyboardEvent<HTMLElement>) {
    if (itemCount === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActiveIndex((prev) => (prev < itemCount - 1 ? prev + 1 : 0))
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : itemCount - 1))
        break
      case 'Enter':
        e.preventDefault()
        if (activeIndex >= 0) onSelect(activeIndex)
        break
      case 'Escape':
        e.preventDefault()
        onClose?.()
        reset()
        break
    }
  }

  return { activeIndex, setActiveIndex, handleKeyDown, reset }
}
