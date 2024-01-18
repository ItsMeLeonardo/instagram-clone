import Link from 'next/link'
import BackIcon from 'remixicon-react/ArrowLeftSLineIcon'

import styles from './reset-password.module.css'
import FormField from 'components/shared/FormField'
import Button from 'components/shared/Button'

export default function page() {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <Link href="/app/settings" className={styles.back_button}>
          <BackIcon />
        </Link>
        <h1>
          Change Password
        </h1>
      </header>

      <form className={styles.form}>
        <FormField type="password" label="Old password" />
        <FormField type="password" label="New password" />
        <FormField type="password" label="Confirm new password" />

        <Button color="primary" type="submit" rounded>
          <span className={styles.submit_label}>Save Changes</span>
        </Button>
      </form>
    </section>
  )
}
