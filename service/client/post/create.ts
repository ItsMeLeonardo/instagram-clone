import { applyPresetOnImageURL } from 'instagram-filters'
import { filters } from 'utils/client/shared/filter/filters'
import { api } from '../api'

import type { EditedPhoto } from 'components/CreatePost/store'

type Params = {
  description: string
  tags: string[]
  photos: EditedPhoto[]
}

export async function createPost({ description, photos, tags }: Params) {
  const formData = new FormData()

  formData.append('description', description)
  tags.forEach((tag) => formData.append('tags', tag))

  for (const photo of photos) {
    const file = photo.file
    const filter = photo.filter

    if (filter) {
      const preset = filters.find((preset) => preset.name === filter)
      if (!preset) {
        formData.append('photos', file)
        continue
      }

      const filterURL = await applyPresetOnImageURL(photo.preview, preset.filter())

      if (!filterURL) {
        formData.append('photos', file)
        continue
      }
      formData.append('photos', filterURL)
    } else {
      formData.append('photos', file)
    }
  }

  return formData

  /*  const { data } = await api.post('/post', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return data */
}
