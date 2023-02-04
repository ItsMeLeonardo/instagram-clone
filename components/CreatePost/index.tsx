'use client'
import { useEffect, useState } from 'react'

import Modal from 'components/shared/Modal'
import SectionContainer from './sections/SectionContainer'
import DragPhotos from './sections/DragPhotos'

import { useCreatePostActions, PHOTOS_LIMIT } from 'components/CreatePost/store'
import { useCompletePost, usePhotos } from 'components/CreatePost/store/useCreatePost'

import CropPhotos from './sections/CropPhotos'
import ApplyFilter from './sections/ApplyFilters'
import CaptionPhoto from './sections/CaptionPhoto'
import { alertToast } from 'components/shared/Toaster'
import { createPost } from 'service/client/post/create'
// import styles from './create-post.module.css'

type Props = {
  onComplete?: () => void
  onCancel?: () => void
  open?: boolean
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

const { setInitialPhotos, cropPhotos, reset } = useCreatePostActions

export default function CreatePost({ onComplete, onCancel, open }: Props) {
  const post = useCompletePost()
  const { totalPhotos } = usePhotos()
  const [currentStep, setCurrentStep] = useState<Steps>('upload')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (totalPhotos === 0) {
      setCurrentStep('upload')
    }
  }, [totalPhotos])

  const { title, nextStep, prevStep, nextStepLabel } = STEP_DATA[currentStep]

  const handleUploadPhotos = (files: File[]) => {
    if (files.length === 0) return
    setInitialPhotos(files)

    if (files.length > PHOTOS_LIMIT) {
      alertToast('You can upload up to 10 photos by post')
    }
    setCurrentStep('crop')
  }

  const handleCancel = () => {
    onCancel && onCancel()
    reset()
  }

  const handleComplete = () => {
    onComplete && onComplete()
    reset()
  }

  const handleCreatePost = () => {
    setLoading(true)
    createPost({
      description: post.description,
      photos: post.editedPhotos,
      tags: post.tags,
    })
      .then(() => {
        handleComplete()
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false)
      })
  }

  const handleNextStep = () => {
    if (!nextStep) {
      handleCreatePost()
      return
    }
    if (nextStep === 'filter') {
      cropPhotos()
    }

    setCurrentStep(nextStep)
  }

  const handlePrevStep = () => {
    if (prevStep) {
      setCurrentStep(prevStep)
    }
  }

  const largeContainer = currentStep === 'caption' || currentStep === 'filter'

  return (
    <Modal open={open} onClose={handleCancel}>
      <SectionContainer
        title={title}
        showSteps={currentStep !== 'upload'}
        onNextStep={handleNextStep}
        onPrevStep={handlePrevStep}
        nextStepLabel={nextStepLabel}
        large={largeContainer}
        loading={loading}
      >
        {currentStep === 'upload' && <DragPhotos onUpload={handleUploadPhotos} />}
        {currentStep === 'crop' && <CropPhotos />}
        {currentStep === 'filter' && <ApplyFilter />}
        {currentStep === 'caption' && <CaptionPhoto />}
      </SectionContainer>
    </Modal>
  )
}
