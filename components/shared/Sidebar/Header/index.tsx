'use client'
import { use } from 'react'
import Avatar from 'components/shared/Avatar'
import { whoAmI } from 'service/client/auth/who-am-i'

import styles from './header.module.css'

const promise = whoAmI()

export default function SidebarHeader() {
  const data = use(promise)

  if (!data) return null

  return (
    <header className={styles.header}>
      <Avatar src={data.avatar} alt="avatar" size="xl" bordered />
      <div className={styles.data}>
        <h2 className={styles.username}>{data.username}</h2>
        <span className={styles.location}>{data.location}</span>
      </div>

      <div className={styles.metrics}>
        <div className={styles.metric_item}>
          <strong className={styles.value}>{data.posts}</strong>
          <span className={styles.label}>Posts</span>
        </div>
        <div className={styles.metric_item}>
          <strong className={styles.value}>{data.followers}</strong>
          <span className={styles.label}>Followers</span>
        </div>
        <div className={styles.metric_item}>
          <strong className={styles.value}>{data.following}</strong>
          <span className={styles.label}>Following</span>
        </div>
      </div>
    </header>
  )
}
