'use client'
import { redirect } from 'next/navigation'

import Post from 'components/shared/Post'
import styles from './page-style.module.css'

import type { FeedFilter } from 'types/feed'
import { useFeed } from 'lib/client/feed/useFeed'
import PostLoader from 'components/shared/Post/Loader'

type PageProps = {
  params: { filter: FeedFilter }
}

export default function Page({ params }: PageProps) {
  const { filter } = params

  const invalidParams = filter !== 'latest' && filter !== 'popular'

  const { posts, isLoading } = useFeed(filter)

  if (invalidParams) {
    return redirect('/app/feed/latest')
  }

  console.log(posts)

  const dataNotReady = !posts || isLoading

  return (
    <section className={styles.feed}>
      <header className={styles.header}>
        <h3 className={styles.title}>Feeds</h3>

        <div className={styles.filters}>
          <button className={styles.button} data-active={filter === 'latest'}>
            Latest
          </button>
          <button className={styles.button} data-active={filter === 'popular'}>
            Popular
          </button>
        </div>
      </header>

      <aside className={styles.posts}>
        {dataNotReady ? (
          <>
            <PostLoader />
            <PostLoader />
            <PostLoader />
          </>
        ) : (
          <>
            {posts.map((post) => (
              <Post key={post.id} {...post} />
            ))}
          </>
        )}
      </aside>
    </section>
  )
}

export const dynamicParams = true
