import { Suggestion } from 'types/suggestions'
import { api } from '../api'

export async function getSuggestions() {
  const { data } = await api.get<Suggestion[]>('/suggestions')
  return data
}
