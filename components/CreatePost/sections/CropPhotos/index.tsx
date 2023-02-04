'use client'
import { useState, ChangeEvent, useRef, useEffect } from 'react'
import ReactCrop, { type Crop, PixelCrop, PercentCrop, convertToPixelCrop } from 'react-image-crop'
import { motion, AnimatePresence, type AnimationProps } from 'framer-motion'

import AspectRatioIcon from 'remixicon-react/AspectRatioLineIcon'

import AddIcon from 'remixicon-react/AddLineIcon'
import ZoomIcon from 'remixicon-react/ZoomInLineIcon'
import UploadIcon from 'remixicon-react/UploadCloud2LineIcon'
import ArrowLeft from 'remixicon-react/ArrowLeftSLineIcon'
import ArrowRight from 'remixicon-react/ArrowRightSLineIcon'
import OriginalAspectIcon from 'remixicon-react/Image2LineIcon'
import UploadCarousel from './UploadCarousel'

import { useCurrentPhoto, usePhotos, usePhotoCrop } from 'components/CreatePost/store/useCreatePost'
import { useCreatePostActions } from 'components/CreatePost/store'

import { alertToast } from 'components/shared/Toaster'

import { ASPECT_OPTIONS } from './utils'

import 'react-image-crop/dist/ReactCrop.css'
import styles from './crop-photos.module.css'

type Options = 'crop' | 'zoom' | 'upload'

const optionsAnimation: AnimationProps = {
  initial: {
    opacity: 0,
    scale: 0.5,
    originX: 0,
    originY: '100%',
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.5,
  },
  transition: {
    duration: 0.35,
  },
}

const optionsAnimationRight: AnimationProps = {
  initial: {
    opacity: 0,
    scale: 0.5,
    originX: '100%',
    originY: '100%',
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.5,
  },
  transition: {
    duration: 0.35,
  },
}

const originalImageCrop: PixelCrop = {
  height: 0,
  width: 0,
  x: 0,
  y: 0,
  unit: 'px',
}

const { addPhotos, nextPhoto, prevPhoto, setPhotoCrop, removePhotoCrop } = useCreatePostActions

export default function CropPhotos() {
  const { currentPhoto, isFirstPhoto, isLastPhoto } = useCurrentPhoto()
  const { totalPhotos } = usePhotos()
  const defaultCrop = usePhotoCrop()

  const [crop, setCrop] = useState<Crop>()
  const [selectedOption, setSelectedOption] = useState<Options | null>(null)
  const [aspect, setAspect] = useState<number | 'original'>('original')

  const imageRef = useRef<HTMLImageElement>(null)
  // const [zoom, setZoom] = useState(0)

  useEffect(() => {
    if (defaultCrop) {
      setCrop(defaultCrop)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const zoomInputRef = useRef<HTMLInputElement>(null)

  const handleNextPhoto = () => {
    nextPhoto()
  }

  const handlePrevPhoto = () => {
    prevPhoto()
  }

  const handleChangeOption = (option: Options) => {
    if (selectedOption === option) {
      setSelectedOption(null)
    } else {
      setSelectedOption(option)
    }
  }

  const handleChangeZoomRange = (e: ChangeEvent<HTMLInputElement>) => {
    // setZoom(Number(e.target.value))
    const value = Number(e.target.value)

    if (zoomInputRef.current) {
      zoomInputRef.current.style.setProperty('--zoom-value', `${value * 10}%`)
    }
  }

  const handleUploadPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (!files) return
    if (files.length + totalPhotos > 10) {
      alertToast('You can upload a maximum of 10 photos')
      return
    }
    addPhotos(Array.from(files))
  }

  const handleChangeCropByAspect = (crop: PercentCrop) => {
    setCrop(crop)

    if (imageRef.current) {
      const pixelCrop = convertToPixelCrop(crop, imageRef.current?.width, imageRef.current?.height)
      setPhotoCrop(pixelCrop)
    }
  }

  const handleAspectChange = (newAspect: number | 'original', crop?: PercentCrop) => {
    setAspect(newAspect)
    if (newAspect === 'original' || !crop) {
      setCrop(originalImageCrop)
      removePhotoCrop()
      return
    }

    handleChangeCropByAspect(crop)
  }

  const handleCrop = (pixelCrop: PixelCrop) => {
    setCrop(pixelCrop)
  }

  const handleCompleteCrop = (crop: PixelCrop) => {
    const { width, height } = crop
    if (width === 0 && height === 0) {
      setAspect('original')
      removePhotoCrop()
      return
    }
    setPhotoCrop(crop)
  }

  const aspectNumber = aspect === 'original' ? undefined : aspect

  return (
    <div className={styles.container}>
      <ReactCrop
        crop={crop}
        onChange={handleCrop}
        locked={aspect === 'original'}
        minWidth={150}
        minHeight={150}
        onComplete={handleCompleteCrop}
        aspect={aspectNumber}
        className={styles.crop_container}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={currentPhoto?.preview} alt="photos" className={styles.crop_image} ref={imageRef} />
      </ReactCrop>

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
      <AnimatePresence>
        {selectedOption === 'crop' && (
          <motion.div key="crop-option" {...optionsAnimation} className={styles.aspect_options}>
            <button
              className={styles.option}
              data-active={aspect === 'original'}
              onClick={() => handleAspectChange('original')}
            >
              <span className={styles.label}>Original</span>
              <span className={styles.icon}>
                <OriginalAspectIcon size={24} />
              </span>
            </button>
            {ASPECT_OPTIONS.map(({ label, value, crop }) => (
              <button
                className={styles.option}
                key={label}
                data-active={aspect === value}
                onClick={() => handleAspectChange(value, crop)}
              >
                <span className={styles.label}>{label}</span>
                <span className={styles.aspect_icon} data-aspect={label}></span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        className={styles.icon_button}
        data-aspect-ratio
        data-active={selectedOption === 'crop'}
        onClick={() => handleChangeOption('crop')}
      >
        <AspectRatioIcon size={16} />
      </button>

      <AnimatePresence>
        {selectedOption === 'zoom' && (
          <motion.div {...optionsAnimation} key="zoom-option" className={styles.zoom_option}>
            <input
              ref={zoomInputRef}
              className={styles.range_input}
              min={0}
              max={10}
              defaultValue={0}
              type="range"
              onInput={handleChangeZoomRange}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        className={styles.icon_button}
        data-zoom
        data-active={selectedOption === 'zoom'}
        onClick={() => handleChangeOption('zoom')}
      >
        <ZoomIcon size={16} />
      </button>

      <AnimatePresence>
        {selectedOption === 'upload' && (
          <motion.div {...optionsAnimationRight} key="upload-option" className={styles.upload_photo}>
            <UploadCarousel />
            <label className={styles.upload}>
              <input type="file" hidden multiple onInput={handleUploadPhoto} />
              <AddIcon size={32} strokeWidth={1} />
            </label>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        className={styles.icon_button}
        data-upload
        data-active={selectedOption === 'upload'}
        onClick={() => handleChangeOption('upload')}
      >
        <UploadIcon size={16} />
      </button>
    </div>
  )
}
