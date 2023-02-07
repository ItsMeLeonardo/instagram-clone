import { api } from 'service/client/api'
import type { FeedFilter } from 'types/feed'
import type { FeedPost } from 'types/post'

export async function getUserFeed(filter: FeedFilter) {
  const invalidParams = filter !== 'latest' && filter !== 'popular'

  if (invalidParams) return []

  try {
    const { data } = await api.get<FeedPost[]>(`/feed/${filter}`)
    return data
  } catch (error) {
    return []
  }
}
