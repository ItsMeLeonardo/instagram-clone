import { notFound } from 'next/navigation'

import postService from 'service/server/post'

import styles from './user-page.module.css'
import userService from 'service/server/user/service'
import Avatar from 'components/shared/Avatar'
import HeaderOptions from 'components/UserProfile/HeaderOptions'

type Props = {
  params: { username: string }
}

export default async function Page({ params }: Props) {
  const { username } = params

  const user = await userService.getUserByUsername(username)
  const posts = await postService.getPostsByUsername(username)

  if (!user) {
    notFound()
  }

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <div className={styles.bg_gradient}></div>
        <div className={styles.content}>
          <Avatar bordered size="xl" src={user.avatar} alt={user.username} />

          <div className={styles.info}>
            <h1 className={styles.name}>
              {user.name} {user.lastName}
            </h1>
            <p className={styles.username}>@{user.username}</p>

            <HeaderOptions userId={user.id} />

            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{user.posts}</span>
                <span className={styles.statLabel}>posts</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{user.followers}</span>
                <span className={styles.statLabel}>followers</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{user.followings}</span>
                <span className={styles.statLabel}>following</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className={styles.grid}>
        {posts.map(({ id, photos }) => (
          <picture key={id} className={styles.item}>
            <img src={photos[0]} alt="" />
          </picture>
        ))}
      </div>
    </section>
  )
}
