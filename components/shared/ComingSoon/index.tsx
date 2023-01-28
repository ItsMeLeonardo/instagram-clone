import BackIcon from 'remixicon-react/ArrowLeftSLineIcon'

import Button from 'components/shared/Button'

import styles from './coming-soon.module.css'

export default function ComingSoon() {
  return (
    <section className={styles.container}>
      <h4 className={styles.title}> Coming soon </h4>

      <picture className={styles.image}>
        <img src="/assets/emoji/smiling-face-with-smiling-eyes.webp" alt="face in clouds" />
      </picture>

      <Button color="gradient" to="/app/feed/latest" icon={<BackIcon />}>
        Go back
      </Button>
    </section>
  )
}
