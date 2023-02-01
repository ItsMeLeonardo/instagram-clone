'use client'
import ArrowLeft from 'remixicon-react/ArrowLeftLineIcon'

import type { ReactNode } from 'react'

import styles from './section-container.module.css'

export type SectionContainerProps = {
  title: string
  showSteps?: boolean
  onNextStep?: () => void
  nextStepLabel?: string
  onPrevStep?: () => void
  children: ReactNode
}

export default function SectionContainer(props: SectionContainerProps) {
  const { title, nextStepLabel, onNextStep, onPrevStep, showSteps, children } = props
  return (
    <aside className={styles.container}>
      <header className={styles.header} data-show-steps={showSteps}>
        {showSteps && (
          <button className={styles.button_back} onClick={onPrevStep}>
            <ArrowLeft size={20} />
          </button>
        )}
        <h2 className={styles.title}>{title}</h2>
        {showSteps && (
          <button className={styles.button_next} onClick={onNextStep}>
            {nextStepLabel ?? 'Next'}
          </button>
        )}
      </header>

      {children}
    </aside>
  )
}
