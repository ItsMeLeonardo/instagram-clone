'use client'
import { useSpring, motion } from 'framer-motion'

import LazyTippy from './LazyTooltip'

import type { TippyProps } from '@tippyjs/react'
import type { ReactNode } from 'react'

import styles from './tooltip.module.css'

type TooltipProps = {
  children: ReactNode
  content: ReactNode
} & TippyProps

export default function Tooltip({ children, content, ...props }: TooltipProps) {
  const springConfig = { damping: 15, stiffness: 300 }
  const initialScale = 0.5
  const opacity = useSpring(0, springConfig)
  const scale = useSpring(initialScale, springConfig)

  function onMount() {
    scale.set(1)
    opacity.set(1)
  }

  function onHide({ unmount }: { unmount: () => void }) {
    const cleanup = scale.on('change', (value) => {
      if (value <= initialScale) {
        cleanup()
        unmount()
      }
    })

    scale.set(initialScale)
    opacity.set(0)
  }

  return (
    <LazyTippy
      {...props}
      animation={true}
      onMount={onMount}
      onHide={onHide}
      render={(attrs) => (
        <motion.div style={{ scale, opacity }} className={styles.container} tabIndex={-1} {...attrs}>
          {content}
        </motion.div>
      )}
    >
      {/* @ts-ignore */}
      {children}
    </LazyTippy>
  )
}
