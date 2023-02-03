import ArrowLeft from 'remixicon-react/ArrowLeftSLineIcon'
import ArrowRight from 'remixicon-react/ArrowRightSLineIcon'

import { useCurrentPhoto } from 'components/CreatePost/store/useCreatePost'

import styles from './apply-filter.module.css'
import { useCreatePostActions } from 'components/CreatePost/store'
import { filters } from './filters'
import { useState } from 'react'

const { nextPhoto, prevPhoto } = useCreatePostActions

export default function ApplyFilter() {
  const { currentCroppedPhoto, isFirstPhoto, isLastPhoto } = useCurrentPhoto()
  const [photoFilter, setPhotoFilter] = useState('original')

  const handleNextPhoto = () => {
    nextPhoto()
  }

  const handlePrevPhoto = () => {
    prevPhoto()
  }

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
        <picture className={`${styles.image} ${photoFilter}`}>
          <img src={currentCroppedPhoto?.preview} alt="hello" />
        </picture>
      </div>
      <div className={styles.filters}>
        <button
          className={styles.filter_item}
          onClick={() => setPhotoFilter('original')}
          data-active={'original' === photoFilter}
        >
          <picture className={styles.image_filter}>
            <img src="/assets/sample/filter-sample.webp" alt={'original photo'} />
          </picture>
          <span className={styles.label}>original</span>
        </button>
        {filters.map((filter) => (
          <button
            key={filter}
            className={styles.filter_item}
            onClick={() => setPhotoFilter(filter)}
            data-active={filter === photoFilter}
          >
            <picture className={`${filter} ${styles.image_filter}`}>
              <img src="/assets/sample/filter-sample.webp" alt={filter} />
            </picture>
            <span className={styles.label}>{filter.split('-')[1]}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
