'use client'

import { useOpenPostDetailModal } from 'components/PostDetail/Store'
import styles from './post-item.module.css'

type Props = {
  photo: string
  postId: number
}

export default function PostItem({ photo, postId }: Props) {
  const openDetail = useOpenPostDetailModal()

  return (
    <button className={styles.item} onClick={() => openDetail(postId)}>
      <picture className={styles.image}>
        <img src={photo} alt="" />
      </picture>
    </button>
  )
}
