import useSWR from 'swr'

import { getPostDetail } from 'service/client/post'

const KEY_PREFIX = 'post-detail'

export function usePostDetail(id: number) {
  const { data, isLoading } = useSWR(`${KEY_PREFIX}-${id}`, () => getPostDetail(id))

  return {
    post: data,
    isLoading,
  }
}
