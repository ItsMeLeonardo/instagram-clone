import uid from 'tiny-uid'
import { create } from 'zustand'

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
}))

export const useCreatePostActions: Actions = {
  addPhotos: (files) => {
    const photos = files.map((file) => createPhoto(file))
    useCreatePostStore.setState((state) => ({
      photos: [...state.photos, ...photos],
    }))
  },
  setInitialPhotos: (files) => {
    const photos = files.map((file) => createPhoto(file))
    useCreatePostStore.setState(() => ({
      photos,
    }))
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
}
