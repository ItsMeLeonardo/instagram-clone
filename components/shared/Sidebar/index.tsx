import NextLink from 'next/link'

import Logout from 'remixicon-react/LogoutBoxRLineIcon'

import Avatar from 'components/shared/Avatar'

import styles from './Sidebar.module.css'
import SidebarItemList from './SidebarItemList'

export default function Sidebar() {
  return (
    <>
      <div className={styles.container}>
        <NextLink href="/app">
          <picture className={styles.logo}>
            <img src="/logo.svg" alt="" />
          </picture>
        </NextLink>
        <header className={styles.header}>
          <Avatar
            src="https://i.pinimg.com/236x/3a/72/58/3a72584976987b1458c7330eb5638966.jpg"
            alt="avatar"
            size="xl"
            bordered
          />
          <div className={styles.data}>
            <h2 className={styles.username}>Vera cherry</h2>
            <span className={styles.location}>Bremen, Germany</span>
          </div>

          <div className={styles.metrics}>
            <div className={styles.metric_item}>
              <strong className={styles.value}>578</strong>
              <span className={styles.label}>Posts</span>
            </div>
            <div className={styles.metric_item}>
              <strong className={styles.value}>578</strong>
              <span className={styles.label}>Followers</span>
            </div>
            <div className={styles.metric_item}>
              <strong className={styles.value}>578</strong>
              <span className={styles.label}>Following</span>
            </div>
          </div>
        </header>
      </div>
      <div className={styles.navbar}>
        <SidebarItemList />
      </div>

      <footer className={styles.footer}>
        <button className={styles.logout}>
          <span className={styles.icon}>
            <Logout />
          </span>
          <span className={styles.label}>Logout</span>
        </button>
      </footer>
    </>
  )
}
