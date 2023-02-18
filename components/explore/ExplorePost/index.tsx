'use client'

import Heart from 'remixicon-react/Heart3FillIcon'
import CommentIcon from 'remixicon-react/Chat1FillIcon'
import type { ExplorePost as ExplorePostType } from 'types/post'

import styles from './explore-post.module.css'
import { useOpenPostDetailModal } from 'components/PostDetail/Store'

type Props = {
  post: ExplorePostType
}

export default function ExplorePost({ post }: Props) {
  const { photos, description, likes, comments, id } = post

  const openDetail = useOpenPostDetailModal()

  return (
    <button className={styles.gallery_item} onClick={() => openDetail(id)}>
      <picture>
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
    </button>
  )
}
