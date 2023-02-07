import useSwr from 'swr'

import type { FeedFilter } from 'types/feed'
import type { FeedPost } from 'types/post'

import { getUserFeed } from 'service/client/feed'

export const USER_FEED_KEY = 'userFeed'

export function useFeed(filter: FeedFilter) {
  const { data, error, isLoading } = useSwr<FeedPost[]>(USER_FEED_KEY, () => getUserFeed(filter), {
    revalidateOnFocus: false,
  })

  return {
    posts: data,
    error,
    isLoading,
  }
}
