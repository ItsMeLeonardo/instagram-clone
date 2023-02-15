import GoogleIcon from 'remixicon-react/GoogleLineIcon'

import styles from './social-media-buttons.module.css'

export default function Google() {
  return (
    <button className={styles.button} type="button">
      <span className={styles.icon}>
        <GoogleIcon size="20" />
      </span>
      <span className={styles.label}>With Google</span>
    </button>
  )
}
