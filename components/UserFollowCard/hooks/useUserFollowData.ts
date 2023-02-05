import axios from 'axios'
import useSWRImmutable from 'swr/immutable'

import { getPostByUserId } from 'service/client/post'
import { getUserById } from 'service/client/user'

import type { SWRConfiguration } from 'swr'

const config: SWRConfiguration = {
  revalidateOnFocus: false,
}

export function useUserFollowData(userId: number) {
  const source = axios.CancelToken.source()

  const { data: posts, error: postsError } = useSWRImmutable(
    `/posts/${userId}`,
    () => getPostByUserId(userId, source.token),
    config
  )
  const { data: user, error: userError } = useSWRImmutable(
    `/user/${userId}`,
    () => getUserById(userId, source.token),
    config
  )

  const isLoading = !posts && !user
  const isError = postsError || userError

  return {
    isLoading,
    isError,
    posts,
    user,
    abortRequest: source.cancel,
  }
}
