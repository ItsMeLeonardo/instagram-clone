import Options from 'remixicon-react/MoreFillIcon'
import Heart from 'remixicon-react/Heart3LineIcon'
import Comment from 'remixicon-react/Chat1LineIcon'
import Share from 'remixicon-react/ShareLineIcon'
import Bookmark from 'remixicon-react/BookmarkLineIcon'
import Attachment from 'remixicon-react/Attachment2Icon'
import ImageIcon from 'remixicon-react/ImageLineIcon'

import User from 'components/shared/User'
import Avatar from 'components/shared/Avatar'
import EmojiButton from './EmojiButton'
import { timeAgo } from 'utils/shared/date-time'

import type { Post } from 'types/post'

import styles from './Post.module.css'
import Tag from './Tag'

export type PostProps = Post

export default function Post(props: PostProps) {
  const { createdAt, description, photos, stats, user, tags } = props
  const { comment, like, saved_post } = stats

  const userDescription = `${user.location} - ${timeAgo(createdAt)}`
  return (
    <section className={styles.post}>
      <header className={styles.header}>
        <a href="/">
          <User avatar={user.avatar} name={user.username} description={userDescription} interactive />
        </a>
        <button className={styles.options}>
          <Options />
        </button>
      </header>
      <div className={styles.body}>
        <picture className={styles.image}>
          <img src={photos[0]} alt={description} />
        </picture>

        <div className={styles.options}>
          <button className={styles.button}>
            <span className={styles.icon}>
              <Heart size="20" />
            </span>
            <span className={styles.label}>
              <span className={styles.quantity}>{like}</span>
              <span className={styles.word}>Like</span>
            </span>
          </button>
          <button className={styles.button}>
            <span className={styles.icon}>
              <Comment size="20" />
            </span>
            <span className={styles.label}>
              <span className={styles.quantity}>{comment}</span>
              <span className={styles.word}>Comment</span>
            </span>
          </button>
          <button className={styles.button}>
            <span className={styles.icon}>
              <Share size="20" />
            </span>
            <span className={styles.label}>
              <span className={styles.quantity}>134</span>
              <span className={styles.word}>Share</span>
            </span>
          </button>
          <button className={styles.button}>
            <span className={styles.icon}>
              <Bookmark size="20" />
            </span>
            <span className={styles.label}>
              <span className={styles.quantity}>{saved_post}</span>
              <span className={styles.word}>Saved</span>
            </span>
          </button>
        </div>

        <p className={styles.description}>{description}</p>

        <div className={styles.tag_container}>
          {tags.map(({ id, name }) => (
            <Tag key={id} name={name} />
          ))}
        </div>
      </div>

      <footer className={styles.comment}>
        <Avatar src="https://i.pinimg.com/236x/3a/72/58/3a72584976987b1458c7330eb5638966.jpg" size="md" alt="avatar" />

        <label className={styles.comment_input}>
          <input className={styles.input} type="text" placeholder="Add a comment..." />

          <div className={styles.options}>
            <label className={styles.button}>
              <Attachment size="20" />
              <input type="file" />
            </label>

            <EmojiButton />

            <label className={styles.button}>
              <ImageIcon size="20" />
              <input type="file" />
            </label>
          </div>
        </label>
      </footer>
    </section>
  )
}
