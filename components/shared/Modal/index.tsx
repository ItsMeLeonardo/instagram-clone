import { ReactNode, useEffect } from 'react'

import styles from './modal.module.css'

export type ModalProps = {
  children: ReactNode
  open: boolean
  onClose?: () => void
}

export default function Modal(props: ModalProps) {
  const { children, onClose, open } = props

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [open])

  if (!open) return null

  return (
    <aside className={styles.overlay} onClick={onClose}>
      {children}
    </aside>
  )
}
