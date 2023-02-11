import postService from 'service/server/post'

import styles from './user-page.module.css'

type Props = {
  params: { username: string }
}

export default async function Page({ params }: Props) {
  const { username } = params

  const posts = await postService.getPostsByUsername(username)

  return (
    <section className={styles.container}>
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
