'use client'
import { useRef } from 'react'

import UploadIcon from 'remixicon-react/UploadCloud2LineIcon'
import ImageAdd from 'remixicon-react/ImageAddLineIcon'

import type { DragEvent, ChangeEvent } from 'react'

import styles from './drag-photos.module.css'

type Props = {
  onUpload: (files: File[]) => void
}

export default function DragPhotos({ onUpload }: Props) {
  const dropZoneRef = useRef<HTMLDivElement>(null)

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (!dropZoneRef.current) return
    event.dataTransfer.dropEffect = 'move'
    dropZoneRef.current.setAttribute('data-dragging', 'true')
  }

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (!dropZoneRef.current) return
    dropZoneRef.current.removeAttribute('data-dragging')
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    if (!dropZoneRef.current) return
    const files = Array.from(event.dataTransfer.files)

    dropZoneRef.current.removeAttribute('data-dragging')

    onUpload(files)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    const files = Array.from(event.target.files)

    onUpload(files)
  }

  return (
    <div
      className={styles.drag_section}
      ref={dropZoneRef}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
    >
      <div className={styles.drag_message}>
        <ImageAdd size={32} />
        <p className={styles.text}>Drag photos here</p>
      </div>
      <label className={styles.uploadImage}>
        <input type="file" hidden multiple onChange={handleChange} />
        <span className={styles.icon}>
          <UploadIcon size={16} />
        </span>
        <span className={styles.label}>Select from computer</span>
      </label>
    </div>
  )
}
