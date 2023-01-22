'use client'

import { useState } from 'react'

import Emotion from 'remixicon-react/EmotionHappyLineIcon'
import EmojiPicker from 'components/shared/EmojiPicker'
import styles from './Post.module.css'

export default function EmojiButton() {
  const [showPicker, setShowPicker] = useState(false)

  const togglePicker = () => {
    setShowPicker(!showPicker)
  }

  return (
    <button className={styles.button} onClick={togglePicker}>
      <Emotion size="20" />
      {showPicker && <EmojiPicker />}
    </button>
  )
}
