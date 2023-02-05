import { useEffect, RefObject } from 'react'

export function useClickOutside(ref: RefObject<HTMLElement>, onClick: () => void) {
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!ref.current) return
      if (ref.current.contains(e.target as Node)) return

      onClick()
    }

    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
