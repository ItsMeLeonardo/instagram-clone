import uid from 'tiny-uid'
import { create } from 'zustand'
import { cropImage } from 'utils/client/shared/images'

import type { PixelCrop } from 'react-image-crop'

export const PHOTOS_LIMIT = 10

type Photo = {
  id: string
  preview: string
  file: File
}

export type State = {
  photos: Photo[]
  currentPhotoIndex: number
  description: string
  tags: string[]
  crop?: PixelCrop
  croppedPhotos: Photo[]
}

export type Actions = {
  setInitialPhotos: (photos: File[]) => void
  addPhotos: (photos: File[]) => void
  removePhoto: (id: string) => void
  nextPhoto: () => void
  prevPhoto: () => void
  selectPhoto: (id: string) => void
  setDescription: (description: string) => void
  addTags: (tags: string[]) => void
  setPhotoCrop: (crop: PixelCrop) => void
  removePhotoCrop: () => void
  cropPhotos: () => void
}

const createPhoto = (file: File): Photo => ({
  id: uid(10),
  file,
  preview: URL.createObjectURL(file),
})

const removePhotoPreview = (photo: Photo) => {
  URL.revokeObjectURL(photo.preview)
}

export const useCreatePostStore = create<State>(() => ({
  photos: [],
  currentPhotoIndex: 0,
  description: '',
  tags: [],
  croppedPhotos: [],
}))

export const useCreatePostActions: Actions = {
  addPhotos: (files) => {
    const photos = files.slice(0, PHOTOS_LIMIT).map((file) => createPhoto(file))
    useCreatePostStore.setState((state) => {
      if (state.photos.length + photos.length > PHOTOS_LIMIT) {
        return {
          photos: state.photos,
        }
      }

      return {
        photos: [...state.photos, ...photos],
      }
    })
  },
  setInitialPhotos: (files) => {
    const photos = files.slice(0, PHOTOS_LIMIT).map((file) => createPhoto(file))
    useCreatePostStore.setState(() => {
      return {
        photos,
      }
    })
  },
  removePhoto: (id) => {
    useCreatePostStore.setState((state) => {
      // the current index always should be deleted
      let newIndex = state.currentPhotoIndex - 1
      if (newIndex === -1) {
        newIndex = 0
      }

      const photos = state.photos.filter((photo) => {
        if (photo.id === id) {
          removePhotoPreview(photo)
        }
        return photo.id !== id
      })

      return {
        photos,
        currentPhotoIndex: newIndex,
      }
    })
  },

  nextPhoto: () => {
    useCreatePostStore.setState((state) => {
      const nextIndex = state.currentPhotoIndex + 1
      if (nextIndex >= state.photos.length) {
        return {
          currentPhotoIndex: state.currentPhotoIndex,
        }
      }

      return {
        currentPhotoIndex: nextIndex,
      }
    })
  },

  prevPhoto: () => {
    useCreatePostStore.setState((state) => {
      const newIndex = state.currentPhotoIndex - 1
      if (newIndex < 0) {
        return {
          currentPhotoIndex: state.currentPhotoIndex,
        }
      }

      return {
        currentPhotoIndex: newIndex,
      }
    })
  },

  selectPhoto: (id) => {
    useCreatePostStore.setState((state) => ({
      currentPhotoIndex: state.photos.findIndex((photo) => photo.id === id),
    }))
  },

  setDescription: (description) => {
    useCreatePostStore.setState(() => ({
      description,
    }))
  },
  addTags: (tags) => {
    useCreatePostStore.setState((state) => ({
      tags: [...state.tags, ...tags],
    }))
  },
  setPhotoCrop: (crop) => {
    useCreatePostStore.setState(() => ({
      crop,
    }))
  },

  removePhotoCrop: () => {
    useCreatePostStore.setState(() => ({
      crop: undefined,
    }))
  },

  async cropPhotos() {
    const photos = useCreatePostStore.getState().photos
    const crop = useCreatePostStore.getState().crop

    if (!crop) return

    const croppedPhotos: Awaited<ReturnType<typeof cropImage>>[] = []
    const originalWidth = 450
    const originalHeight = 450
    for (const photo of photos) {
      const croppedPhoto = await cropImage({ image: photo.file, crop, originalWidth, originalHeight })
      croppedPhotos.push(croppedPhoto)
    }

    useCreatePostStore.setState((state) => {
      const photos = croppedPhotos.map(([file, preview], index) => {
        const id = state.photos[index].id
        return {
          id,
          file,
          preview,
        }
      })

      return {
        croppedPhotos: photos,
      }
    })
  },
}
