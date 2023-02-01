'use client'
import { useEffect, useState } from 'react'

import Modal from 'components/shared/Modal'
import SectionContainer from './sections/SectionContainer'
import DragPhotos from './sections/DragPhotos'

import { useCreatePostActions } from 'components/CreatePost/store'

import CropPhotos from './sections/CropPhotos'
import ApplyFilter from './sections/ApplyFilters'
import CaptionPhoto from './sections/CaptionPhoto'
import { usePhotos } from 'components/CreatePost/store/useCreatePost'
// import styles from './create-post.module.css'

export type PhotoFile = {
  preview: string
  file: File
}

type Steps = 'upload' | 'crop' | 'filter' | 'caption'

type StepData = {
  title: string
  nextStep?: Steps
  prevStep?: Steps
  nextStepLabel?: string
}

const STEP_DATA: Record<Steps, StepData> = {
  upload: {
    title: 'Create new Post',
    nextStep: 'crop',
  },
  crop: {
    title: 'Crop',
    nextStep: 'filter',
    prevStep: 'upload',
  },
  filter: {
    title: 'Edit',
    prevStep: 'crop',
    nextStep: 'caption',
  },
  caption: {
    title: 'Create new Post',
    prevStep: 'filter',
    nextStepLabel: 'Share',
  },
}

const { setInitialPhotos } = useCreatePostActions
export default function CreatePost() {
  const { totalPhotos } = usePhotos()
  const [currentStep, setCurrentStep] = useState<Steps>('upload')

  useEffect(() => {
    if (totalPhotos === 0) {
      setCurrentStep('upload')
    }
  }, [totalPhotos])

  const { title, nextStep, prevStep, nextStepLabel } = STEP_DATA[currentStep]

  const handleUploadPhotos = (files: File[]) => {
    setInitialPhotos(files)
    setCurrentStep('crop')
  }

  const handleNextStep = () => {
    if (nextStep) {
      setCurrentStep(nextStep)
    }
  }

  const handlePrevStep = () => {
    if (prevStep) {
      setCurrentStep(prevStep)
    }
  }

  /*   const handleAddPhoto = (photo: File | File[]) => {
    if (Array.isArray(photo)) {
      const newPhotos = photo.map((file) => {
        const photo = {
          file,
          preview: URL.createObjectURL(file),
        }
        return photo
      })
      setPhotos((photos) => [...photos, ...newPhotos])
      return
    }
    const newPhoto = {
      file: photo,
      preview: URL.createObjectURL(photo),
    }
    setPhotos((photos) => [...photos, newPhoto])
  }

  const handleRemovePhoto = (index: number) => {
    setPhotos((photos) => {
      return photos.filter((_, i) => i !== index)
    })
  } */

  return (
    <Modal open>
      <SectionContainer
        title={title}
        showSteps={currentStep !== 'upload'}
        onNextStep={handleNextStep}
        onPrevStep={handlePrevStep}
        nextStepLabel={nextStepLabel}
      >
        {currentStep === 'upload' && <DragPhotos onUpload={handleUploadPhotos} />}
        {currentStep === 'crop' && <CropPhotos />}
        {currentStep === 'filter' && <ApplyFilter />}
        {currentStep === 'caption' && <CaptionPhoto />}
      </SectionContainer>
    </Modal>
  )
}
