import ListItem from './ListItem'
import styles from './mobile-navbar.module.css'

export default function MobileNavbar() {
  return (
    <aside className={styles.container}>
      <ListItem />
    </aside>
  )
}
