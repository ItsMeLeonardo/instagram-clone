'use client'
import Logout from 'remixicon-react/LogoutBoxRLineIcon'

import styles from './Sidebar.module.css'

import { signOut } from 'lib/client/auth'

export default function LogoutItem() {
  // const router = useRouter()

  const handleLogout = async () => {
    // await request('/api/auth/logout')

    signOut({ callbackUrl: '/login' })
    // router.push('/login')
  }

  return (
    <button className={styles.logout} onClick={handleLogout}>
      <span className={styles.icon}>
        <Logout />
      </span>
      <span className={styles.label}>Logout</span>
    </button>
  )
}
