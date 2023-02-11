import Modal, { ModalProps } from 'components/shared/Modal'
import styles from './create-story.module.css'
import AddLineIcon from 'remixicon-react/AddLineIcon'
import { ChangeEvent, DragEvent, useRef, useState } from 'react'
import CloseLineIcon from 'remixicon-react/CloseLineIcon'
import Button from 'components/shared/Button'
import { alertToast } from 'components/shared/Toaster'
import { addStory } from 'service/client/story'

export type Props = Omit<ModalProps, 'children'>

export default function CreateStory(modalProps: Props) {
  const dropZoneRef = useRef<HTMLDivElement>(null)
  const [file, setFile] = useState<File>()
  const [isLoading, setIsLoading] = useState(false)

  const reset = () => {
    setFile(undefined)
  }

  const createStory = () => {
    if (!file) {
      alertToast('Please select a photo', 'danger')
      return
    }
    setIsLoading(true)
    addStory(file)
      .then(() => {
        alertToast('Story created successfully', 'success')
        modalProps.onClose?.()
        reset()
      })
      .catch(() => {
        alertToast('Something went wrong', 'danger')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleUploadPhoto = (files: FileList) => {
    const photo = files[0]
    if (photo.type.startsWith('image/')) {
      setFile(photo)
    }
  }

  const removePhoto = () => {
    setFile(undefined)
  }

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

    dropZoneRef.current.removeAttribute('data-dragging')
    handleUploadPhoto(event.dataTransfer.files)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    handleUploadPhoto(event.target.files)
  }

  return (
    <Modal {...modalProps}>
      <aside className={styles.container}>
        {file ? (
          <picture className={styles.preview}>
            <img src={URL.createObjectURL(file)} alt="Story" />
            <button className={styles.remove_button} onClick={removePhoto}>
              <CloseLineIcon />
            </button>
            <div className={styles.create_button}>
              <Button fullWidth rounded onClick={createStory} loading={isLoading}>
                Create Story
              </Button>
            </div>
          </picture>
        ) : (
          <label>
            <div
              className={styles.drop_section}
              ref={dropZoneRef}
              onDrop={handleDrop}
              onDragLeave={handleDragLeave}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
            >
              <input type="file" name="story" id="story" accept="image/*" onChange={handleChange} />
              <span className={styles.drop_text}>Drop your story here</span>
              <span className={styles.icon}>
                <AddLineIcon size="48" />
              </span>
              <span className={styles.drop_text}>or browse to upload</span>
            </div>
          </label>
        )}
      </aside>
    </Modal>
  )
}
