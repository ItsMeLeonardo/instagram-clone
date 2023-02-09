'use client'
import styles from './page-favorite.module.css'
import Button from 'components/shared/Button'
import CreateListButton from 'components/Saved/CreateListButton'
import { useSavedList } from 'lib/client/save/useSavedList'

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
        <Button color="gradient" rounded>
          create your first collection
        </Button>
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
        {savedList.map(({ id, savedPosts, title }) => {
          const isEmpty = savedPosts.length === 0

          const postPoster = isEmpty ? '/assets/emoji/face-in-clouds.webp' : savedPosts[0].post.photos[0]

          return (
            <picture key={id} className={styles.item}>
              <img src={postPoster} alt={title} />
              <span className={styles.title}>{title}</span>
            </picture>
          )
        })}
      </div>
    </section>
  )
}
