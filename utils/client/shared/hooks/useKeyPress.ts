import { useEffect } from 'react'

type OnKeyPress = () => void
type UseKeyPressOptions = {
  listening?: boolean
  preventDefault?: boolean
  stopPropagation?: boolean
  keyEvent?: 'keydown' | 'keyup' | 'keypress'
  target?: HTMLElement
}

export function useKeyPress(targetKey: string, onKeyPress: OnKeyPress, options: UseKeyPressOptions = {}) {
  const { listening = true, preventDefault = true, stopPropagation = true, keyEvent = 'keydown', target } = options

  useEffect(() => {
    if (!listening) return

    function pressHandler(event: KeyboardEvent) {
      if (event.key === targetKey) {
        onKeyPress()
      }
      if (preventDefault) {
        event.preventDefault()
      }

      if (stopPropagation) {
        event.stopPropagation()
      }
    }
    if (target) {
      target.addEventListener(keyEvent, pressHandler)
    } else {
      window.addEventListener(keyEvent, pressHandler)
    }

    return () => {
      if (target) {
        target.removeEventListener(keyEvent, pressHandler)
      } else {
        window.removeEventListener(keyEvent, pressHandler)
      }
    }
  }, [targetKey, onKeyPress, listening, target, preventDefault, stopPropagation, keyEvent])
}
