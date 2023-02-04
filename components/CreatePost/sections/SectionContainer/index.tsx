'use client'
import ArrowLeft from 'remixicon-react/ArrowLeftLineIcon'

import type { ReactNode } from 'react'

import styles from './section-container.module.css'
import Loader from 'components/shared/Loader'

export type SectionContainerProps = {
  title: string
  showSteps?: boolean
  onNextStep?: () => void
  nextStepLabel?: string
  onPrevStep?: () => void
  children: ReactNode
  large?: boolean
  loading?: boolean
}

export default function SectionContainer(props: SectionContainerProps) {
  const { title, nextStepLabel, onNextStep, onPrevStep, showSteps, children, large, loading } = props
  return (
    <aside className={styles.container} data-large={large} data-loading={loading}>
      {loading && (
        <div className={styles.loader_container}>
          <Loader size={42} />
        </div>
      )}
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
