import Plus from 'remixicon-react/AddLineIcon'

import styles from './Header.module.css'
import SearchInput from './SearchInput'
import CreatePost from 'components/CreatePost'

export default function Header() {
  return (
    <div className={styles.container}>
      <SearchInput />

      <button className={styles.button}>
        <span className={styles.icon}>
          <Plus size="16" />
        </span>
        <span>Create new post</span>
      </button>

      <CreatePost />
    </div>
  )
}
