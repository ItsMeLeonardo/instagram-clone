import { motion, type AnimationProps, AnimatePresence } from 'framer-motion'

import ArrowLeft from 'remixicon-react/ArrowLeftSLineIcon'
import ArrowRight from 'remixicon-react/ArrowRightSLineIcon'

import styles from './slide-image.module.css'
import { useState } from 'react'

export type SlideImageProps = {
  photos: string[]
  description: string
}

const slideAnimation: AnimationProps = {
  initial: { opacity: 0.5 },
  animate: { opacity: 1 },
  exit: { opacity: 0.25 },
  transition: { duration: 0.3 },
}

export default function SlideImage({ photos, description }: SlideImageProps) {
  const [photoIndex, setPhotoIndex] = useState(0)

  const nextPhoto = () => {
    if (photoIndex < photos.length - 1) {
      setPhotoIndex(photoIndex + 1)
    }
  }

  const prevPhoto = () => {
    if (photoIndex > 0) {
      setPhotoIndex(photoIndex - 1)
    }
  }

  const isLastPhoto = photoIndex === photos.length - 1
  const isFirstPhoto = photoIndex === 0
  const currentImage = photos[photoIndex]

  return (
    <div className={styles.container}>
      {!isFirstPhoto && (
        <button className={styles.arrow_button} data-left onClick={prevPhoto}>
          <ArrowLeft size={16} />
        </button>
      )}
      {!isLastPhoto && (
        <button className={styles.arrow_button} data-right onClick={nextPhoto}>
          <ArrowRight size={16} />
        </button>
      )}
      <AnimatePresence>
        <picture className={styles.image}>
          {photos.map(
            (photo, index) =>
              index === photoIndex && (
                <motion.img {...slideAnimation} key={photo} src={currentImage} alt={description} />
              )
          )}
        </picture>
      </AnimatePresence>
    </div>
  )
}
