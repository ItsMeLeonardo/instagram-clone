import styles from './user-loader.module.css'

export default function UserLoader() {
  return (
    <div className={styles.item}>
      <div className={styles.avatar}></div>

      <div className={styles.data}>
        <strong className={styles.username}></strong>
        <span className={styles.location}></span>
      </div>
    </div>
  )
}
