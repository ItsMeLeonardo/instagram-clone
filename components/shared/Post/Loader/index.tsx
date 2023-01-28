import UserLoader from 'components/shared/User/Loader'
import styles from './post-loader.module.css'

export default function PostLoader() {
  return (
    <section className={styles.post}>
      <header className={styles.header}>
        <UserLoader />
        <div className={styles.options} />
      </header>
      <div className={styles.body}>
        <div className={styles.image} />

        <div className={styles.options}>
          <div className={styles.button}></div>
          <div className={styles.button}></div>
          <div className={styles.button}></div>
          <div className={styles.button}></div>
        </div>

        <div className={styles.description_container}>
          <div className={styles.description}></div>
          <div className={styles.description}></div>
          <div className={styles.description}></div>
        </div>
      </div>

      <footer className={styles.comment}></footer>
    </section>
  )
}
