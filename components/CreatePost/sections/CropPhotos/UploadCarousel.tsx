'use client'
import useEmblaCarousel from 'embla-carousel-react'
import CloseIcon from 'remixicon-react/CloseLineIcon'

import ArrowLeft from 'remixicon-react/ArrowLeftSLineIcon'
import ArrowRight from 'remixicon-react/ArrowRightSLineIcon'

import { useCurrentPhoto, usePhotos } from 'components/CreatePost/store/useCreatePost'
import { useCreatePostActions } from 'components/CreatePost/store'

import { MouseEvent, useEffect } from 'react'

import styles from './upload-carousel.module.css'

export type UploadCarouselProps = {}

const { selectPhoto, removePhoto } = useCreatePostActions

export default function UploadCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ draggable: false })
  const { photos, totalPhotos } = usePhotos()
  const { currentPhoto } = useCurrentPhoto()

  useEffect(() => {
    if (emblaApi) emblaApi.reInit()
  }, [totalPhotos, emblaApi])

  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev()
  }

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext()
  }

  const showArrows = totalPhotos > 3

  return (
    <div className={styles.carousel_container}>
      <div className={styles.carousel_viewport} ref={showArrows ? emblaRef : null}>
        <div className={styles.carousel_list}>
          {photos.map(({ id, preview }) => {
            const active = currentPhoto?.id === id

            const handleSelectPhoto = (e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation()
              if (active) return
              selectPhoto(id)
            }

            const handleRemovePhoto = (e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation()
              removePhoto(id)
            }

            return (
              <div key={id} className={styles.item} data-active={active}>
                <button className={styles.image} onClick={handleSelectPhoto}>
                  <picture className={styles.image}>
                    <img src={preview} alt="" />
                  </picture>
                </button>

                {active && (
                  <button className={styles.remove_btn} onClick={handleRemovePhoto}>
                    <CloseIcon size={16} />
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>
      {showArrows && (
        <>
          <button className={styles.arrow_button} data-right onClick={scrollNext}>
            <ArrowRight size={16} />
          </button>
          <button className={styles.arrow_button} data-left onClick={scrollPrev}>
            <ArrowLeft size={16} />
          </button>
        </>
      )}
    </div>
  )
}
