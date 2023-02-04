'use client'
import CloseLineIcon from 'remixicon-react/CloseLineIcon'
import toast, { Toaster } from 'react-hot-toast'
import { AnimationProps, motion } from 'framer-motion'

import { emojiMap } from './utils'

import type { ThemeColor } from 'utils/client/shared/colors/theme'

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
export const alertToast = (message: string, theme: ThemeColor = 'warning') => {
  return toast.custom((t) => (
    <motion.aside {...toastAnimation} className={styles.container} data-theme={theme}>
      <picture className={styles.icon}>
        <img src={emojiMap[theme]} alt="alert" />
      </picture>
      <div className={styles.message}>{message}</div>
      <button className={styles.close} onClick={() => toast.remove(t.id)}>
        <CloseLineIcon />
      </button>
    </motion.aside>
  ))
}
