import { Suggestion } from 'types/suggestions'
import { api } from '../api'

export async function getSuggestions() {
  console.log('exe')
  const { data } = await api.get<Suggestion[]>('/suggestions')
  return data
}
