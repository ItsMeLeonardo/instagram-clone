import MagnifyingGlass from 'remixicon-react/SearchLineIcon'
import Microphone from 'remixicon-react/Mic2LineIcon'
import Plus from 'remixicon-react/AddLineIcon'
import Hidden from 'components/shared/Hidden'

import styles from './Header.module.css'

export default function Header() {
  return (
    <div className={styles.container}>
      <label className={styles.search_input}>
        <span className={styles.icon} data-icon-left>
          <MagnifyingGlass size="16" />
        </span>
        <input className={styles.input} type="search" placeholder="search" />
        <button className={styles.icon} data-icon-right data-icon-button>
          <Microphone size="16" />
        </button>
      </label>

      <button className={styles.button}>
        <span className={styles.icon}>
          <Plus size="16" />
        </span>
        <Hidden mobileDown>
          <span>Create new post</span>
        </Hidden>
      </button>
    </div>
  )
}
