import Link from 'next/link'

import EditProfileIcon from 'remixicon-react/Edit2LineIcon'
import ChangePasswordIcon from 'remixicon-react/LockPasswordLineIcon'
import Notification from 'remixicon-react/NotificationLineIcon'

import styles from './page-settings.module.css'

export default function page() {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Settings</h1>
      <div className={styles.button_list}>
        <Link href="/app/settings/edit-profile" className={styles.button}>
          <span className={styles.icon}>
            <EditProfileIcon />
          </span>
          <span className={styles.label}>Edit profile</span>
        </Link>
        <Link href="/app/settings/reset-password" className={styles.button}>
          <span className={styles.icon}>
            <ChangePasswordIcon />
          </span>
          <span className={styles.label}>Change password</span>
        </Link>
        <button className={styles.button}>
          <span className={styles.icon}>
            <Notification />
          </span>
          <span className={styles.label}>Notification</span>
        </button>
      </div>
    </section>
  )
}
