'use client'

import Plus from 'remixicon-react/AddLineIcon'

import styles from './Header.module.css'
import SearchInput from './SearchInput'
import CreatePost from 'components/CreatePost'
import { useState } from 'react'
import ToastContainer, { alertToast } from 'components/shared/Toaster'

export default function Header() {
  const [open, setOpen] = useState(false)

  const openModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  const handleComplete = () => {
    alertToast('Post created successfully', 'success')
    closeModal()
  }

  return (
    <div className={styles.container}>
      <ToastContainer />
      <SearchInput />

      <button className={styles.button} onClick={openModal}>
        <span className={styles.icon}>
          <Plus size="16" />
        </span>
        <span>Create new post</span>
      </button>

      <CreatePost onComplete={handleComplete} onCancel={closeModal} open={open} />
    </div>
  )
}
