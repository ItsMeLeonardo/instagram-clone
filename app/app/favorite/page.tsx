'use client'
import styles from './page-favorite.module.css'
import Button from 'components/shared/Button'
import CreateListButton from 'components/Saved/CreateListButton'
import { useSavedList } from 'lib/client/save/useSavedList'
import Link from 'next/link'

export default function Favorite() {
  const { savedList, isLoading } = useSavedList()

  if (isLoading || !savedList) {
    return (
      <section className={styles.container}>
        <header className={styles.header}>
          <small className={styles.text}>{"Only you can see what you've saved"}</small>
          <button className={styles.button}>+ new collection</button>
        </header>
        <div className={styles.grid}>
          {Array.from({ length: 9 }, (_, index) => {
            return <div key={index} className={styles.item} data-loader={true}></div>
          })}
        </div>
      </section>
    )
  }

  const isSaved = savedList.length > 0

  if (!isSaved) {
    return (
      <section className={styles.empty_list}>
        <picture className={styles.image}>
          <img src="/assets/emoji/persevering-face.webp" alt="saved" />
        </picture>

        <h1 className={styles.title}>{"You haven't saved anything yet"}</h1>
        <CreateListButton />
      </section>
    )
  }

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <small className={styles.text}>{"Only you can see what you've saved"}</small>
        <CreateListButton />
      </header>
      <div className={styles.grid}>
        {savedList.map(({ id, title, poster }) => {
          const postPoster = poster || '/assets/emoji/face-in-clouds.webp'

          return (
            <Link key={id} href={`app/favorite/${id}`}>
              <picture className={styles.item}>
                <img src={postPoster} alt={title} />
                <span className={styles.title}>{title}</span>
              </picture>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
