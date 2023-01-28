import NextLink from 'next/link'

import SidebarItemList from './SidebarItemList'
import LogoutItem from './Logout'

import styles from './Sidebar.module.css'
import SidebarHeader from './Header'

export default function Sidebar() {
  return (
    <>
      <div className={styles.container}>
        <NextLink href="/app/feed/latest">
          <picture className={styles.logo}>
            <img src="/logo.svg" alt="" />
          </picture>
        </NextLink>
        <SidebarHeader />
      </div>
      <div className={styles.navbar}>
        <SidebarItemList />
      </div>

      <footer className={styles.footer}>
        <LogoutItem />
      </footer>
    </>
  )
}
