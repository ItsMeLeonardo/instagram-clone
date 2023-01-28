import { SavedList } from 'types/saved'
import { api } from '../api'

export async function getSavedPosts() {
  const { data } = await api.get<SavedList[]>('/saved')

  return data
}
