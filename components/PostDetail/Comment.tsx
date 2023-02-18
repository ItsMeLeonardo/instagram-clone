import Avatar from 'components/shared/Avatar'
import styles from './post-details.module.css'
import { RawComment } from 'types/comments'

export type CommentProps = {
  username: string
  avatar: string
  comment: RawComment
}

export default function Comment({ avatar, comment, username }: CommentProps) {
  return (
    <div className={styles.comment}>
      <Avatar size="sm" src={avatar} alt={username} />
      <div className={styles.data}>
        <span className={styles.username}>{username}</span>
        <p className={styles.text}>{comment.text}</p>
      </div>
    </div>
  )
}
