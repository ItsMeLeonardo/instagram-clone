'use client'

import Button from 'components/shared/Button'
import styles from './user-page.module.css'
import Avatar from 'components/shared/Avatar'

export default function NotFound() {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <div className={styles.bg_gradient}></div>
        <div className={styles.content}>
          <Avatar bordered size="xl" src="/assets/emoji/dizzy-face.webp" alt="unknown user" />

          <div className={styles.info}>
            <div className={styles.name}>User not found</div>
            <p className={styles.username} style={{ maxWidth: 350, textAlign: 'center' }}>
              The user you are looking for does not exist or the account has been deleted.
            </p>

            <Button
              to="/app/feed/latest"
              border
              rounded
              style={{ margin: '1rem 0', fontSize: '14px', fontWeight: '400' }}
            >
              Go back
            </Button>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>000</span>
                <span className={styles.statLabel}>posts</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>000</span>
                <span className={styles.statLabel}>followers</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>000</span>
                <span className={styles.statLabel}>following</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </section>
  )
}
