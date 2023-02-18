'use client'
import useSWR from 'swr'

import styles from './trending.module.css'

import { getTrending } from 'service/client/trending'
import Loader from './Loader'
import { useOpenPostDetailModal } from 'components/PostDetail/Store'

export default function Trending() {
  const { data: trending, isLoading } = useSWR('trending', getTrending, {
    revalidateOnFocus: false,
  })

  const openPostDetail = useOpenPostDetailModal()

  if (isLoading) {
    return <Loader />
  }

  if (!trending) {
    return null
  }

  return (
    <div className={styles.trending_grid}>
      {trending.map(({ id, photo }) => (
        <button key={id} className={styles.item} onClick={() => openPostDetail(id)}>
          <picture className={styles.image}>
            <img src={photo} alt="" />
          </picture>
        </button>
      ))}
    </div>
  )
}
