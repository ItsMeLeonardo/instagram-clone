import Login from 'remixicon-react/User2LineIcon'
import Home from 'remixicon-react/Home2LineIcon'

import Button from 'components/shared/Button'

import styles from './page.module.css'

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.links}>
        <Button to="/login" icon={<Login />}>
          Login
        </Button>
        <Button color="gradient" icon={<Home />} to="/app">
          Home
        </Button>
      </div>
    </div>
  )
}
