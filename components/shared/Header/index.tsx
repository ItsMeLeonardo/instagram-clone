'use client'

import Plus from 'remixicon-react/AddLineIcon'

import styles from './Header.module.css'
import SearchInput from './SearchInput'
import CreatePost from 'components/CreatePost'
import { alertToast } from 'components/shared/Toaster'
import { useCreatePostModal } from 'lib/client/globalStore'

export default function Header() {
  const { isOpen: open, close: closeModal, open: openModal } = useCreatePostModal()

  const handleComplete = () => {
    alertToast('Post created successfully', 'success')
    closeModal()
  }

  return (
    <div className={styles.container}>
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
