import useSwr from 'swr'

import type { FeedFilter } from 'types/feed'
import type { Post } from 'types/post'

import { getUserFeed } from 'service/client/feed'

export function useFeed(filter: FeedFilter) {
  const { data, error, isLoading } = useSwr<Post[]>('userFeed', () => getUserFeed(filter))

  return {
    posts: data,
    error,
    isLoading,
  }
}
