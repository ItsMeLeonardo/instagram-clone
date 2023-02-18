'use client'
import useSWR from 'swr'

import { getPostsBySavedList } from 'service/client/saved'
import BackIcon from 'remixicon-react/ArrowLeftSLineIcon'

import styles from './page.module.css'
import { useOpenPostDetailModal } from 'components/PostDetail/Store'
import Link from 'next/link'

type Props = {
  params: { id: number }
}

export default function Page({ params }: Props) {
  const { data, isLoading } = useSWR(`/saved/${params.id}`, () => getPostsBySavedList(params.id), {
    revalidateOnFocus: false,
  })

  const openDetail = useOpenPostDetailModal()

  if (isLoading)
    return (
      <section>
        <header className={styles.header}>
          <Link href="/app/favorite" className={styles.back_button}>
            <BackIcon />
          </Link>
          <div className={styles.title} data-loader></div>
        </header>

        <main className={styles.grid}>
          {new Array(10).fill(null).map((_, index) => (
            <div key={index} className={styles.item} data-loader></div>
          ))}
        </main>
      </section>
    )

  if (!data)
    return (
      <header className={styles.header}>
        <Link href="/app/favorite" className={styles.back_button}>
          <BackIcon />
        </Link>
        <h2>Not found collection 😓</h2>
      </header>
    )

  if (!data.posts.length)
    return (
      <section>
        <header className={styles.header}>
          <Link href="/app/favorite" className={styles.back_button}>
            <BackIcon />
          </Link>
          <h2>{data.title}</h2>
        </header>

        <main>
          <p className={styles.empty}>No posts in this collection</p>
        </main>
      </section>
    )

  const { posts } = data

  return (
    <section>
      <header className={styles.header}>
        <Link href="/app/favorite" className={styles.back_button}>
          <BackIcon />
        </Link>
        <h2>{data.title}</h2>
      </header>

      <main className={styles.grid}>
        {posts.map(({ id, photos }) => (
          <button key={id} className={styles.item} onClick={() => openDetail(id)}>
            <picture className={styles.image}>
              <img src={photos[0]} alt="" />
            </picture>
          </button>
        ))}
      </main>
    </section>
  )
}
