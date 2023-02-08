'use client'
import { useState } from 'react'
import styles from './create-list-button.module.css'
import CreateListModal from '../CreateListModal'

export default function CreateListButton() {
  const [open, setOpen] = useState(false)

  const closeModal = () => setOpen(false)
  const openModal = () => setOpen(true)

  return (
    <>
      <button className={styles.button} onClick={openModal}>
        + new collection
      </button>
      <CreateListModal open={open} onClose={closeModal} onSubmit={closeModal} />
    </>
  )
}
