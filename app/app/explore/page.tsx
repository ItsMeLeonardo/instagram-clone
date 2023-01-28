import Heart from 'remixicon-react/Heart3FillIcon'
import CommentIcon from 'remixicon-react/Chat1FillIcon'

import postService from 'service/server/post'
import styles from './page-explore.module.css'

export default async function Explore() {
  const posts = await postService.getExplorePosts()

  return (
    <div className={styles.container}>
      {posts.map(({ photos, id, description, comments, likes }) => (
        <picture key={id} className={styles.gallery_item}>
          <img src={photos[0]} alt={description} />
          <div className={styles.overlay}>
            <span className={styles.item}>
              <Heart size="20" />
              <span className={styles.data}>{likes}</span>
            </span>
            <span className={styles.item}>
              <CommentIcon size="20" />
              <span className={styles.data}>{comments}</span>
            </span>
          </div>
        </picture>
      ))}
    </div>
  )
}
