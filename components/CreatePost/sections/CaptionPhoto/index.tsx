'use client'
import { useState, ChangeEvent } from 'react'
import debounce from 'just-debounce'
import ArrowLeft from 'remixicon-react/ArrowLeftSLineIcon'
import ArrowRight from 'remixicon-react/ArrowRightSLineIcon'

import { useCreatePostActions } from 'components/CreatePost/store'
import { useCurrentPhoto } from 'components/CreatePost/store/useCreatePost'
import { extractHashTags } from 'utils/shared/hashTag'

import styles from './caption-photo.module.css'

const { nextPhoto, prevPhoto } = useCreatePostActions

export default function CaptionPhoto() {
  const { currentCroppedPhoto, isFirstPhoto, isLastPhoto } = useCurrentPhoto()
  const [tags, setTags] = useState<string[]>([])

  const handleNextPhoto = () => {
    nextPhoto()
  }

  const handlePrevPhoto = () => {
    prevPhoto()
  }

  const handleChangeCaption = debounce((e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    const hashTags = extractHashTags(value)
    setTags(hashTags)
  }, 500)

  return (
    <div className={styles.container}>
      <div className={styles.photo_container}>
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
        <picture className={styles.image}>
          <img src={currentCroppedPhoto?.preview} alt="hello" />
        </picture>
      </div>
      <div className={styles.content}>
        <div className={styles.title}>Description</div>
        <textarea className={styles.description} placeholder="Write a caption" onInput={handleChangeCaption}></textarea>
        <div className={styles.tags}>
          <header>
            <strong className={styles.title}>Tags</strong>
            <label className={styles.helper_text}>all words starting with # will be automatically tagged</label>
          </header>
          <div className={styles.tag_list}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
