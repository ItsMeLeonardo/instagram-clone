import Modal from 'components/shared/Modal'
import styles from './create-list-modal.module.css'
import Button from 'components/shared/Button'
import FormField from 'components/shared/FormField'

import type { ModalProps } from 'components/shared/Modal'
import { FormEvent } from 'react'
import { useSavedList } from 'lib/client/save/useSavedList'

export type Props = {
  onSubmit?: () => void
} & Omit<ModalProps, 'children'>

export default function CreateListModal({ onSubmit, ...props }: Props) {
  const { createList, isLoading } = useSavedList()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const target = e.target as EventTarget & { name: HTMLInputElement }
    const input = target.name
    const name = input.value.trim()

    if (!name) return

    createList(name).then(() => {
      if (onSubmit) onSubmit()
    })
  }

  return (
    <Modal {...props}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <header className={styles.header}>New collection</header>

        <div className={styles.body}>
          <FormField placeholder="Collection name" label="Name" name="name" />
        </div>
        <footer className={styles.footer}>
          <Button fullWidth rounded type="submit" loading={isLoading}>
            Create
          </Button>
        </footer>
      </form>
    </Modal>
  )
}
