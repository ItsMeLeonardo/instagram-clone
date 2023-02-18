'use client'
import { useState } from 'react'
import ArrowLeft from 'remixicon-react/ArrowLeftSLineIcon'
import ArrowRight from 'remixicon-react/ArrowRightSLineIcon'

import styles from './story-slide.module.css'
import Steps from './Steps'
import { StoryUser } from 'types/story'
import Avatar from 'components/shared/Avatar'
import { timeAgo } from 'utils/shared/date-time'

type Props = {
  story: StoryUser
  onCompleted: () => void
}

export default function StorySlide({ story, onCompleted }: Props) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)

  const { stories, avatar, username } = story
  const currentStory = stories[currentStoryIndex]

  const isLastStory = currentStoryIndex === stories.length - 1

  const handleNextPhoto = () => {
    setTimeout(() => {
      if (isLastStory) {
        onCompleted()
      }
      if (currentStoryIndex < stories.length - 1) {
        setCurrentStoryIndex(currentStoryIndex + 1)
      }
    }, 10)
  }

  const handlePrevPhoto = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1)
    }
  }

  const storiesPhoto = stories.map((story) => story.photo)

  const isLastPhoto = currentStoryIndex === storiesPhoto.length - 1
  const isFirstPhoto = currentStoryIndex === 0

  return (
    <div className={styles.container}>
      <Steps stories={storiesPhoto} currentStoryIndex={currentStoryIndex} onCompleted={handleNextPhoto} />
      <header className={styles.header}>
        <Avatar src={avatar} size="md" alt="Story" />
        <div className={styles.info}>
          <span className={styles.username}>{username}</span>
          <span className={styles.time}>{timeAgo(currentStory.createdAt)}</span>
        </div>
      </header>
      {!isFirstPhoto && (
        <button className={styles.icon_button} data-arrow-left onClick={handlePrevPhoto}>
          <ArrowLeft size={16} />
        </button>
      )}

      {!isLastPhoto && (
        <button className={styles.icon_button} data-arrow-right onClick={handleNextPhoto}>
          <ArrowRight size={16} />
        </button>
      )}

      <picture className={styles.photo}>
        <img src={currentStory.photo} alt="" />
      </picture>
    </div>
  )
}
