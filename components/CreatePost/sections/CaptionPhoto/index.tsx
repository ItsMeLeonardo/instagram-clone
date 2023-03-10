'use client'
import { ChangeEvent } from 'react'
import debounce from 'just-debounce'
import ArrowLeft from 'remixicon-react/ArrowLeftSLineIcon'
import ArrowRight from 'remixicon-react/ArrowRightSLineIcon'

import { useCreatePostActions } from 'components/CreatePost/store'
import { useCurrentPhoto, useTags } from 'components/CreatePost/store/useCreatePost'
import { extractHashTags } from 'utils/shared/hashTag'

import styles from './caption-photo.module.css'

const { nextPhoto, prevPhoto, setTags, setDescription } = useCreatePostActions

export default function CaptionPhoto() {
  const { currentEditedPhoto: currentPhoto, isFirstPhoto, isLastPhoto } = useCurrentPhoto()
  const tags = useTags()

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
    setDescription(value)
  }, 500)

  if (!currentPhoto) return <div>Loading ...</div>

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
        <picture className={`${styles.image} filter-${currentPhoto.filter}`} style={{ position: 'relative' }}>
          <img src={currentPhoto.preview} alt="hello" />
        </picture>
      </div>
      <div className={styles.content}>
        <div className={styles.title}>Description</div>
        <textarea className={styles.description} placeholder="Write a caption" onInput={handleChangeCaption}></textarea>
        <div className={styles.tags}>
          <header>
            <strong className={styles.title}>Tags ({tags.length})</strong>
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
