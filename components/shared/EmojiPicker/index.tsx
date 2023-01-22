'use client'

import EmojiPickerLib from 'emoji-picker-react'

import styles from './emoji-picker.module.css'

export default function EmojiPicker() {
  return (
    <aside className={styles.container}>
      <EmojiPickerLib width={300} lazyLoadEmojis />
    </aside>
  )
}
