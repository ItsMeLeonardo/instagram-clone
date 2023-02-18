import GitHubIcon from 'remixicon-react/GithubFillIcon'

import Button from 'components/shared/Button'

import styles from './page.module.css'

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.bg}></div>
      <div className={styles.overlay}></div>
      <main className={styles.content}>
        <header className={styles.hero}>
          <h1 className={styles.title}>
            <span className={styles.text_gradient}>Instagram </span>
            clone
          </h1>
          <p className={styles.subtitle}>A simple Instagram clone, for educational purposes.</p>
          <div className={styles.buttons}>
            <Button rounded color="gradient" to="/login">
              Login
            </Button>

            <Button rounded to="/register">
              Register
            </Button>
          </div>

          <span className={styles.text}>developed by </span>

          <a href="https://github.com/ItsMeLeonardo" target="_blank" rel="noreferrer" className={styles.card}>
            <div className={styles.avatar}>
              <GitHubIcon size="40" />
            </div>
            <div className={styles.card_content}>
              <h2 className={styles.card_title}>Leonardo</h2>
              <span className={styles.card_subtitle}>@ItsMeLeonardo</span>
            </div>
          </a>
        </header>
      </main>
    </div>
  )
}
