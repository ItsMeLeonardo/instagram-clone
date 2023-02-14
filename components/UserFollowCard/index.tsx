import React from 'react'

import User from 'components/shared/User'
import Button from 'components/shared/Button'

import styles from './user-follow-card.module.css'
import { useUserFollowData } from './hooks/useUserFollowData'
import Loader from 'components/shared/Loader'
import UserLoader from 'components/shared/User/Loader'

type UserFollowCardProps = {
  userId: number
}

export default function UserFollowCard({ userId }: UserFollowCardProps) {
  const { posts, user, isLoading: loadingCard, followLoading, toggleFollow } = useUserFollowData(userId)

  if (loadingCard) return <Loader />

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        {user ? (
          <User avatar={user.avatar} name={user.username} description={user.location} interactive />
        ) : (
          <UserLoader />
        )}
      </header>
      <div className={styles.stats}>
        <div className={styles.item}>
          <span className={styles.value}>{user?.posts}</span>
          <span className={styles.label}>posts</span>
        </div>
        <div className={styles.item}>
          <span className={styles.value}>{user?.followers}</span>
          <span className={styles.label}>followers</span>
        </div>
        <div className={styles.item}>
          <span className={styles.value}>{user?.followings}</span>
          <span className={styles.label}>Following</span>
        </div>
      </div>

      <div className={styles.last_posts}>
        {posts?.map((post) => (
          <picture key={post.id} className={styles.post}>
            <img src={post.photos[0]} alt="post" />
          </picture>
        ))}
      </div>
      <footer className={styles.follow}>
        <Button
          fullWidth
          rounded="md"
          className={styles.button}
          onClick={toggleFollow}
          loading={followLoading}
          color={user?.following ? 'light' : 'primary'}
        >
          <span className={styles.label}>{user?.following ? 'Unfollow' : 'Follow'}</span>
        </Button>
      </footer>
    </div>
  )
}
