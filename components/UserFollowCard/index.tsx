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
  const { posts, user, isLoading } = useUserFollowData(userId)

  if (isLoading) return <Loader />
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
          <span className={styles.value}>{user?.following}</span>
          <span className={styles.label}>Following</span>
        </div>
      </div>

      <div className={styles.last_posts}>
        {posts?.map((post) => (
          <picture key={post.id} className={styles.post}>
            <img src={post.photos[0]} alt="post" />
          </picture>
        ))}
        {/*     <picture className={styles.post}>
          <img src="https://i.pinimg.com/236x/19/94/b9/1994b976fc54744e9af897d71d880489.jpg" alt="post" />
        </picture>
        <picture className={styles.post}>
          <img src="https://i.pinimg.com/564x/4c/30/ac/4c30ac8c47c247d918311a9cc9f045b9.jpg" alt="post" />
        </picture> */}
      </div>
      <footer className={styles.follow}>
        <Button fullWidth rounded="md" className={styles.button}>
          <span className={styles.label}>Follow</span>
        </Button>
      </footer>
    </div>
  )
}
