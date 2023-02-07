'use client'

import { useRef, useState } from 'react'

import { useClickOutside } from 'utils/client/shared/hooks/useClickOutside'

import Emotion from 'remixicon-react/EmotionHappyLineIcon'
import EmojiPicker from 'components/shared/EmojiPicker'
import styles from './emoji-button.module.css'

export default function EmojiButton() {
  const [showPicker, setShowPicker] = useState(false)

  const ref = useRef(null)

  useClickOutside(ref, () => {
    setShowPicker(false)
  })

  const togglePicker = () => {
    setShowPicker(!showPicker)
  }

  return (
    <button ref={ref} type="button" className={styles.button} onClick={togglePicker}>
      <Emotion size="20" />
      {showPicker && <EmojiPicker />}
    </button>
  )
}
