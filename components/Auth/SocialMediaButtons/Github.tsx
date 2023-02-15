import GithubIcon from 'remixicon-react/GithubLineIcon'

import styles from './social-media-buttons.module.css'

export default function Github() {
  return (
    <button className={styles.button} type="button">
      <span className={styles.icon}>
        <GithubIcon size="20" />
      </span>
      <span className={styles.label}>With Github</span>
    </button>
  )
}
