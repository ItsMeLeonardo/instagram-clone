'use client'
import CloseLineIcon from 'remixicon-react/CloseLineIcon'
import toast, { Toaster } from 'react-hot-toast'
import { AnimationProps, motion } from 'framer-motion'

import styles from './toaster.module.css'

const toastAnimation: AnimationProps = {
  initial: {
    opacity: 0,
    scale: 0.5,
    originX: 0,
    originY: '100%',
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
}

export default function ToastContainer() {
  return <Toaster position="bottom-left"></Toaster>
}
export const alertToast = (message: string) =>
  toast.custom((t) => (
    <motion.aside {...toastAnimation} className={styles.container}>
      <picture className={styles.icon}>
        <img src="/assets/emoji/persevering-face.webp" alt="alert" />
      </picture>
      <div className={styles.message}>{message}</div>
      <button className={styles.close} onClick={() => toast.remove(t.id)}>
        <CloseLineIcon />
      </button>
    </motion.aside>
  ))
