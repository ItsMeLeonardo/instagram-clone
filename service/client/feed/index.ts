import { api } from 'service/client/api'
import type { FeedFilter } from 'types/feed'
import type { Post } from 'types/post'

export async function getUserFeed(filter: FeedFilter) {
  const invalidParams = filter !== 'latest' && filter !== 'popular'

  if (invalidParams) return []

  try {
    const { data } = await api.get<Post[]>(`/feed/${filter}`)
    return data
  } catch (error) {
    return []
  }
}
