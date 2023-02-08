import { SavedList } from 'types/saved'
import { api } from '../api'

export async function getSavedPosts() {
  const { data } = await api.get<SavedList[]>('/saved')

  return data
}

export async function createSavedList(title: string) {
  const { data } = await api.post<SavedList>('/saved', { title })

  return data
}

export async function deleteSavedList(listId: number) {
  await api.delete(`/saved/${listId}`)
}

export async function editSavedList(listId: number, title: string) {
  await api.put(`/saved/${listId}`, { title })
}
