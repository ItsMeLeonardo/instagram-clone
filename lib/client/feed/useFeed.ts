import useSwr from 'swr'

import type { FeedFilter } from 'types/feed'
import type { FeedPost } from 'types/post'

import { getUserFeed } from 'service/client/feed'

export function useFeed(filter: FeedFilter) {
  const { data, error, isLoading } = useSwr<FeedPost[]>('userFeed', () => getUserFeed(filter), {
    revalidateOnFocus: false,
  })

  return {
    posts: data,
    error,
    isLoading,
  }
}
