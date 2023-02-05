'use client'
import Tippy from '@tippyjs/react/headless'

import type { TippyProps } from '@tippyjs/react'
import type { ReactNode } from 'react'

import styles from './tooltip.module.css'

type TooltipProps = {
  children: ReactNode
  content: ReactNode
} & TippyProps

export default function Tooltip({ children, content, ...props }: TooltipProps) {
  return (
    <Tippy
      {...props}
      render={(attrs) => (
        <div className={styles.container} tabIndex={-1} {...attrs}>
          {content}
        </div>
      )}
    >
      {/* @ts-ignore */}
      {children}
    </Tippy>
  )
}
