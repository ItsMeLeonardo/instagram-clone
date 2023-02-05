'use client'
import { ReactNode, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import type { AnimationProps } from 'framer-motion'

import styles from './modal.module.css'

export type ModalProps = {
  children: ReactNode
  open?: boolean
  onClose?: () => void
}

const modalOverlayAnimations: AnimationProps = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
  transition: {
    duration: 0.25,
  },
}

const modalContentAnimations: AnimationProps = {
  initial: {
    opacity: 0,
    scale: 1.2,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 1.2,
  },
  transition: {
    duration: 0.4,
  },
}

export default function Modal(props: ModalProps) {
  const { children, onClose, open } = props

  useEffect(() => {
    if (open) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'auto'
    }

    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.aside key="modal" {...modalOverlayAnimations} className={styles.overlay} onClick={onClose}>
          <motion.div {...modalContentAnimations} onClick={(e) => e.stopPropagation()}>
            {children}
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
