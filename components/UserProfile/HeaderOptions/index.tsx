'use client'

import Button from 'components/shared/Button'

import styles from './header-options.module.css'
import { useUser } from 'lib/client/user/useUser'
import Loader from './Loader'

type Props = {
  userId: number
}

export default function HeaderOptions({ userId }: Props) {
  const { user, loading } = useUser()

  if (loading || !user) {
    return (
      <div className={styles.options}>
        <Loader />
      </div>
    )
  }

  if (user.id === userId) {
    return (
      <div className={styles.options}>
        <Button to="/app/settings/edit-profile" rounded="md" color="light">
          <span className={styles.button_label}>Edit Profile</span>
        </Button>
      </div>
    )
  }

  return (
    <div className={styles.options}>
      <Button rounded="md">
        <span className={styles.button_label}>Follow</span>
      </Button>
      <Button rounded="md" color="light">
        <span className={styles.button_label}>Message</span>
      </Button>
    </div>
  )
}
