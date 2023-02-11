'use client'

import { useEffect, useState } from 'react'

import styles from './story-slide.module.css'

type Props = {
  stories: string[]
  currentStoryIndex: number
  onCompleted: () => void
}

const defaultDuration = 3000

export default function Steps({ stories, currentStoryIndex, onCompleted }: Props) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          onCompleted()
          return 0
        }
        return prevProgress + 1
      })
    }, defaultDuration / 100)

    return () => {
      clearInterval(timer)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStoryIndex])

  return (
    <div className={styles.top_steps}>
      {stories.map((_, index) => {
        const isCurrent = index === currentStoryIndex

        let width = '0'
        if (isCurrent) {
          width = `${progress}%`
        }
        if (index < currentStoryIndex) {
          width = '100%'
        }

        return (
          <div key={index} className={styles.step}>
            <span className={styles.progress} style={{ width }}></span>
          </div>
        )
      })}
    </div>
  )
}
