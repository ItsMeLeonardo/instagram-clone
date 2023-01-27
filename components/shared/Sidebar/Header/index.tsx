'use client'
import Avatar from 'components/shared/Avatar'
import styles from './header.module.css'
import { useUser } from 'lib/client/user/useUser'
import LoaderHeader from './Loader'

export default function SidebarHeader() {
  // const data = use(promise)

  const { user, loading } = useUser()

  if (loading || !user) {
    return <LoaderHeader />
  }

  return (
    <header className={styles.header}>
      <Avatar src={user.avatar} alt="avatar" size="xl" bordered />
      <div className={styles.data}>
        <h2 className={styles.username}>{user.username}</h2>
        <span className={styles.location}>{user.location}</span>
      </div>

      <div className={styles.metrics}>
        <div className={styles.metric_item}>
          <strong className={styles.value}>{user.posts}</strong>
          <span className={styles.label}>Posts</span>
        </div>
        <div className={styles.metric_item}>
          <strong className={styles.value}>{user.followers}</strong>
          <span className={styles.label}>Followers</span>
        </div>
        <div className={styles.metric_item}>
          <strong className={styles.value}>{user.following}</strong>
          <span className={styles.label}>Following</span>
        </div>
      </div>
    </header>
  )
}
