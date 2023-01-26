import Avatar from '../Avatar'

import styles from './User.module.css'

type UserProps = {
  name: string
  avatar: string
  description: string
  interactive?: boolean
}

export default function User(props: UserProps) {
  const { avatar, description, name, interactive } = props

  return (
    <div className={styles.item} data-interactive={interactive}>
      <Avatar size="md" src={avatar} alt={name} />

      <div className={styles.data}>
        <strong className={styles.username}>{name}</strong>
        <span className={styles.location}>{description}</span>
      </div>
    </div>
  )
}
