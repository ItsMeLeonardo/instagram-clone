import { shallow } from 'zustand/shallow'
import { useCreatePostStore, type State } from './index'

const currentPhotoSelector = (state: State) => state.photos[state.currentPhotoIndex]
const currentPhotoIndexSelector = (state: State) => state.currentPhotoIndex
const photosSelector = (state: State) => state.photos
const photosLengthSelector = (state: State) => state.photos.length

export function useCurrentPhoto() {
  const currentPhoto = useCreatePostStore(currentPhotoSelector, shallow)
  const currentPhotoIndex = useCreatePostStore(currentPhotoIndexSelector, shallow)
  const totalPhotos = useCreatePostStore(photosLengthSelector, shallow)

  const isFirstPhoto = currentPhotoIndex === 0
  const isLastPhoto = currentPhotoIndex === totalPhotos - 1

  return { currentPhoto, isFirstPhoto, isLastPhoto }
}

export function usePhotos() {
  const photos = useCreatePostStore(photosSelector, shallow)
  return {
    photos,
    totalPhotos: photos.length,
  }
}
