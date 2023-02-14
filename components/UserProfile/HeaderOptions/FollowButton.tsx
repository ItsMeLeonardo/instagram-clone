'use client'
import { useState, useEffect } from 'react'

import Button from 'components/shared/Button'
import { useFriendship } from 'lib/client/friendships/useFriendship'

import { isFollowing } from 'service/client/friendships'

import styles from './header-options.module.css'

export default function FollowButton({ userId }: { userId: number }) {
  const { follow, loading, unFollow } = useFriendship(userId)

  const [following, setFollowing] = useState(false)
  const [loadingFollow, setLoadingFollow] = useState(false)

  useEffect(() => {
    setLoadingFollow(true)

    isFollowing(userId)
      .then((isFollowing) => {
        setLoadingFollow(false)
        setFollowing(isFollowing)
      })
      .finally(() => {
        setLoadingFollow(false)
      })
  }, [userId])

  const toggleFollow = () => {
    setLoadingFollow(true)

    if (following) {
      unFollow()
        .then(() => {
          setFollowing(false)
        })
        .finally(() => {
          setLoadingFollow(false)
        })
      return
    }
    follow()
      .then(() => {
        setFollowing(true)
      })
      .finally(() => {
        setLoadingFollow(false)
      })
  }

  const isLoading = loading || loadingFollow

  return (
    <Button rounded="md" loading={isLoading} onClick={toggleFollow}>
      <span className={styles.button_label}>{following ? 'Unfollow' : 'Follow'}</span>
    </Button>
  )
}
