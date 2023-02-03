import ArrowLeft from 'remixicon-react/ArrowLeftSLineIcon'
import ArrowRight from 'remixicon-react/ArrowRightSLineIcon'

import { useCurrentPhoto, useIsCropping } from 'components/CreatePost/store/useCreatePost'

import styles from './apply-filter.module.css'
import { useCreatePostActions } from 'components/CreatePost/store'
import { filters } from 'utils/client/shared/filter/filters'
import Loader from 'components/shared/Loader'

const { nextPhoto, prevPhoto, applyFilter, removeFilter } = useCreatePostActions

export default function ApplyFilter() {
  const { currentEditedPhoto: currentPhoto, isFirstPhoto, isLastPhoto } = useCurrentPhoto()
  const isCropping = useIsCropping()

  const handleNextPhoto = () => {
    nextPhoto()
  }

  const handlePrevPhoto = () => {
    prevPhoto()
  }

  const loading = !currentPhoto || isCropping
  return (
    <div className={styles.container}>
      {!loading ? (
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
          <picture className={`${styles.image} filter-${currentPhoto.filter}`}>
            <img src={currentPhoto.preview} alt="hello" />
          </picture>
        </div>
      ) : (
        <div className={styles.photo_container_loader}>
          <Loader size={48} />
        </div>
      )}
      <div className={styles.filters} data-disabled={loading}>
        <button
          className={styles.filter_item}
          onClick={() => removeFilter(currentPhoto.id)}
          data-active={!currentPhoto.filter}
        >
          <picture className={styles.image_filter}>
            <img src="/assets/sample/filter-sample.webp" alt={'original photo'} />
          </picture>
          <span className={styles.label}>original</span>
        </button>
        {filters.map(({ name }) => (
          <button
            key={name}
            className={styles.filter_item}
            onClick={() => applyFilter(name, currentPhoto.id)}
            data-active={name === currentPhoto.filter}
          >
            <picture className={`filter-${name} ${styles.image_filter}`}>
              <img src="/assets/sample/filter-sample.webp" alt={name} />
            </picture>
            <span className={styles.label}>{name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
