import { api } from 'service/client/api'

export const addStory = async (file: File) => {
  const formData = new FormData()
  formData.append('photo', file)

  const response = await api.post('/story', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}
