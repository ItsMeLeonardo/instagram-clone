import Avatar from 'components/shared/Avatar'
import styles from './loader.module.css'

import Loader from 'components/shared/Loader'

export default function LoaderHeader() {
  return (
    <header className={styles.header}>
      <Avatar icon={<Loader size={32} />} alt="avatar" size="xl" bordered />
      <div className={styles.data}>
        <div className={styles.username}></div>
        <div className={styles.location}></div>
      </div>

      <div className={styles.metrics}>
        <div className={styles.metric_item}>
          <strong className={styles.value}></strong>
          <span className={styles.label}>Posts</span>
        </div>
        <div className={styles.metric_item}>
          <strong className={styles.value}></strong>
          <span className={styles.label}>Followers</span>
        </div>
        <div className={styles.metric_item}>
          <strong className={styles.value}></strong>
          <span className={styles.label}>Following</span>
        </div>
      </div>
    </header>
  )
}
