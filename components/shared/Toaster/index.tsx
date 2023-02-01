'use client'
import CloseLineIcon from 'remixicon-react/CloseLineIcon'
import toast, { Toaster } from 'react-hot-toast'

import styles from './toaster.module.css'

export default function ToastContainer() {
  return <Toaster position="bottom-left"></Toaster>
}
export const alertToast = (message: string) =>
  toast.custom((t) => (
    <aside className={styles.container}>
      <picture className={styles.icon}>
        <img src="/assets/emoji/persevering-face.webp" alt="alert" />
      </picture>
      <div className={styles.message}>{message}</div>
      <button className={styles.close} onClick={() => toast.dismiss(t.id)}>
        <CloseLineIcon />
      </button>
    </aside>
  ))
