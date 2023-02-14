import { useStoreActions } from 'lib/client/user/store'
import { useState } from 'react'
import { followUser, unFollowUser } from 'service/client/friendships'

export const useFriendship = (userId: number) => {
  const [isLoading, setIsLoading] = useState(false)

  const follow = async () => {
    setIsLoading(true)
    await followUser(userId).finally(() => setIsLoading(false))
    useStoreActions.followUser()
  }

  const unFollow = async () => {
    setIsLoading(true)
    await unFollowUser(userId).finally(() => setIsLoading(false))
    useStoreActions.unFollowUser()
  }

  return {
    loading: isLoading,
    follow,
    unFollow,
  }
}
