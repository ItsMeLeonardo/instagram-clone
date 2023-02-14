import axios from 'axios'
import useSWRImmutable from 'swr/immutable'

import { getPostByUserId } from 'service/client/post'
import { getUserById } from 'service/client/user'

import type { SWRConfiguration } from 'swr'
import { useFriendship } from 'lib/client/friendships/useFriendship'

const config: SWRConfiguration = {
  revalidateOnFocus: false,
}

export function useUserFollowData(userId: number) {
  const source = axios.CancelToken.source()

  const { follow, unFollow, loading } = useFriendship(userId)

  const { data: posts, error: postsError } = useSWRImmutable(
    `/posts/${userId}`,
    () => getPostByUserId(userId, source.token),
    config
  )
  const {
    data: user,
    error: userError,
    mutate,
  } = useSWRImmutable(`/user/${userId}`, () => getUserById(userId, source.token), config)

  const isLoading = !posts && !user
  const isError = postsError || userError

  const toggleFollow = () => {
    if (!user || typeof user.following === 'undefined') return
    if (user.following) {
      unFollow().then(() => {
        mutate({ ...user, following: false })
      })
    } else {
      follow().then(() => {
        mutate({ ...user, following: true })
      })
    }
  }

  return {
    isLoading,
    isError,
    posts,
    user,
    toggleFollow,
    followLoading: loading || typeof user?.following === 'undefined',
    abortRequest: source.cancel,
  }
}
