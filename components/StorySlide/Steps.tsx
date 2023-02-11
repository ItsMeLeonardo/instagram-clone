'use client'
import { useEffect, useState } from 'react'
import PauseIcon from 'remixicon-react/PauseMiniLineIcon'
import PlayIcon from 'remixicon-react/PlayMiniFillIcon'

import styles from './story-slide.module.css'

type Props = {
  stories: string[]
  currentStoryIndex: number
  onCompleted: () => void
}

const defaultDuration = 3000

export default function Steps({ stories, currentStoryIndex, onCompleted }: Props) {
  const [progress, setProgress] = useState(0)
  const [pause, setPause] = useState(false)

  const togglePause = () => {
    setPause((prev) => !prev)
  }

  useEffect(() => {
    setProgress(0)
  }, [currentStoryIndex])

  useEffect(() => {
    const timer = setInterval(() => {
      if (pause) return
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
  }, [pause])

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
      <button className={styles.pause_button} onClick={togglePause}>
        {pause ? <PlayIcon size="24" /> : <PauseIcon size="24" />}
      </button>
    </div>
  )
}
