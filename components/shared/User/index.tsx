import Avatar from '../Avatar'

import styles from './User.module.css'

type UserProps = {
  name: string
  avatar: string
  location: string
  interactive?: boolean
}

export default function User(props: UserProps) {
  const { avatar, location, name, interactive } = props

  return (
    <div className={styles.item} data-interactive={interactive}>
      <Avatar size="md" src={avatar} alt={name} />

      <div className={styles.data}>
        <strong className={styles.username}>{name}</strong>
        <span className={styles.location}>{location}</span>
      </div>
    </div>
  )
}
