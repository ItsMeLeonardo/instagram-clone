'use client'
import { useState } from 'react'
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

  const storiesPhoto = stories.map((story) => story.photo)

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
      <picture className={styles.photo}>
        <img src={currentStory.photo} alt="" />
      </picture>
    </div>
  )
}
