import { Trending } from 'types/trending'
import { api } from '../api'

export async function getTrending() {
  const { data } = await api.get<Trending[]>('/trending')
  return data
}
