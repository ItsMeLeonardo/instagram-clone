'use client'
import CloseLineIcon from 'remixicon-react/CloseLineIcon'
import toast, { Toaster } from 'react-hot-toast'
import { AnimationProps, motion } from 'framer-motion'

import { emojiMap } from './utils'

import type { ThemeColor } from 'utils/client/shared/colors/theme'

import styles from './toaster.module.css'
import { useEffect, useRef } from 'react'

type AlertToastOptions = {
  theme?: ThemeColor
  duration?: number
}

type ToastComponentProps = {
  id: string
  message: string
  theme: ThemeColor
  duration: number
}

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

export function ToastComponent(props: ToastComponentProps) {
  const { duration, id, message, theme } = props

  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const interval = 45

    const container = containerRef.current

    if (!container) return

    let progress = 0

    const intervalId = setInterval(() => {
      progress += interval / duration
      container.style.setProperty('--toast-progress-duration', `${progress * 100}%`)

      if (progress >= 1) {
        clearInterval(intervalId)
      }
    }, interval)

    return () => {
      clearInterval(intervalId)
    }
  }, [duration])

  return (
    <motion.aside {...toastAnimation} ref={containerRef} className={styles.container} data-theme={theme}>
      <picture className={styles.icon}>
        <img src={emojiMap[theme]} alt="alert" />
      </picture>
      <div className={styles.message}>{message}</div>
      <button className={styles.close} onClick={() => toast.remove(id)}>
        <CloseLineIcon color="currentColor" />
      </button>
    </motion.aside>
  )
}

export const alertToast = (message: string, options: AlertToastOptions = {}) => {
  const { theme = 'primary', duration = 4000 } = options
  return toast.custom(
    (t) => {
      return <ToastComponent duration={duration} message={message} theme={theme} id={t.id} />
    },
    {
      duration,
    }
  )
}

export default function ToastContainer() {
  return <Toaster position="bottom-center"></Toaster>
}
