import { shallow } from 'zustand/shallow'
import { useCreatePostStore, type State } from './index'

const currentPhotoSelector = (state: State) => state.photos[state.currentPhotoIndex]
const currentEditedPhotoSelector = (state: State) => state.editedPhotos[state.currentPhotoIndex]
const currentPhotoIndexSelector = (state: State) => state.currentPhotoIndex
const photosSelector = (state: State) => state.photos
const photosLengthSelector = (state: State) => state.photos.length

export function useCurrentPhoto() {
  const currentPhoto = useCreatePostStore(currentPhotoSelector, shallow)
  const currentEditedPhoto = useCreatePostStore(currentEditedPhotoSelector, shallow)
  const currentPhotoIndex = useCreatePostStore(currentPhotoIndexSelector, shallow)
  const totalPhotos = useCreatePostStore(photosLengthSelector, shallow)

  const isFirstPhoto = currentPhotoIndex === 0
  const isLastPhoto = currentPhotoIndex === totalPhotos - 1

  return { currentPhoto, isFirstPhoto, isLastPhoto, currentEditedPhoto }
}

export function usePhotos() {
  const photos = useCreatePostStore(photosSelector, shallow)
  return {
    photos,
    totalPhotos: photos.length,
  }
}

const photoCropSelector = (state: State) => state.crop

export function usePhotoCrop() {
  const crop = useCreatePostStore(photoCropSelector, shallow)
  return crop
}

const editedPhotosSelector = (state: State) => state.editedPhotos

export function useEditedPhotos() {
  const editedPhotos = useCreatePostStore(editedPhotosSelector, shallow)
  return editedPhotos
}

const isCroppingSelector = (state: State) => state.isCropping

export function useIsCropping() {
  const isCropping = useCreatePostStore(isCroppingSelector, shallow)
  return isCropping
}

const tagSelector = (state: State) => state.tags

export function useTags() {
  const tags = useCreatePostStore(tagSelector, shallow)
  return tags
}

export function useCompletePost() {
  const editedPhotos = useCreatePostStore(editedPhotosSelector, shallow)
  const tags = useCreatePostStore(tagSelector, shallow)
  const description = useCreatePostStore((state) => state.description, shallow)

  const completePost = {
    editedPhotos,
    tags,
    description,
  }

  return completePost
}
