'use client'
import { useState, ChangeEvent, useRef } from 'react'
import ReactCrop, { type Crop } from 'react-image-crop'

import AspectRatioIcon from 'remixicon-react/AspectRatioLineIcon'

import AddIcon from 'remixicon-react/AddLineIcon'
import ZoomIcon from 'remixicon-react/ZoomInLineIcon'
import UploadIcon from 'remixicon-react/UploadCloud2LineIcon'
import ArrowLeft from 'remixicon-react/ArrowLeftSLineIcon'
import ArrowRight from 'remixicon-react/ArrowRightSLineIcon'
import OriginalAspectIcon from 'remixicon-react/Image2LineIcon'
import UploadCarousel from './UploadCarousel'

import { useCurrentPhoto, usePhotos } from 'components/CreatePost/store/useCreatePost'
import { useCreatePostActions } from 'components/CreatePost/store'

import { alertToast } from 'components/shared/Toaster'

import 'react-image-crop/dist/ReactCrop.css'
import styles from './crop-photos.module.css'

type Options = 'crop' | 'zoom' | 'upload'

type AspectOption = {
  label: string
  value: number
}

const aspectOptions: AspectOption[] = [
  {
    label: '1:1',
    value: 1 / 1,
  },

  {
    label: '4:5',
    value: 4 / 5,
  },
  {
    label: '16:9',
    value: 16 / 9,
  },
]

const { addPhotos, nextPhoto, prevPhoto } = useCreatePostActions

export default function CropPhotos() {
  const { currentPhoto, isFirstPhoto, isLastPhoto } = useCurrentPhoto()
  const { totalPhotos } = usePhotos()

  const [crop, setCrop] = useState<Crop>()
  const [selectedOption, setSelectedOption] = useState<Options | null>(null)
  const [aspect, setAspect] = useState<number | 'original'>('original')
  // const [zoom, setZoom] = useState(0)

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

  return (
    <div className={styles.container}>
      <ReactCrop crop={crop} onChange={(c) => setCrop(c)} aspect={1 / 1} className={styles.crop_container}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={currentPhoto?.preview} alt="photos" className={styles.crop_image} />
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
      {selectedOption === 'crop' && (
        <div className={styles.aspect_options}>
          <button className={styles.option} data-active={aspect === 'original'} onClick={() => setAspect('original')}>
            <span className={styles.label}>Original</span>
            <span className={styles.icon}>
              <OriginalAspectIcon size={24} />
            </span>
          </button>
          {aspectOptions.map(({ label, value }) => (
            <button
              className={styles.option}
              key={label}
              data-active={aspect === value}
              onClick={() => setAspect(value)}
            >
              <span className={styles.label}>{label}</span>
              <span className={styles.aspect_icon} data-aspect={label}></span>
            </button>
          ))}
        </div>
      )}
      <button
        className={styles.icon_button}
        data-aspect-ratio
        data-active={selectedOption === 'crop'}
        onClick={() => handleChangeOption('crop')}
      >
        <AspectRatioIcon size={16} />
      </button>

      {selectedOption === 'zoom' && (
        <div className={styles.zoom_option}>
          <input
            ref={zoomInputRef}
            className={styles.range_input}
            min={0}
            max={10}
            defaultValue={0}
            type="range"
            onInput={handleChangeZoomRange}
          />
        </div>
      )}

      <button
        className={styles.icon_button}
        data-zoom
        data-active={selectedOption === 'zoom'}
        onClick={() => handleChangeOption('zoom')}
      >
        <ZoomIcon size={16} />
      </button>

      {selectedOption === 'upload' && (
        <div className={styles.upload_photo}>
          <UploadCarousel />
          <label className={styles.upload}>
            <input type="file" hidden multiple onInput={handleUploadPhoto} />
            <AddIcon size={32} strokeWidth={1} />
          </label>
        </div>
      )}

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
