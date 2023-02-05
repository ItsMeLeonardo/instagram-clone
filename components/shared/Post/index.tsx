import Options from 'remixicon-react/MoreFillIcon'
import Heart from 'remixicon-react/Heart3LineIcon'
import CommentIcon from 'remixicon-react/Chat1LineIcon'
import Share from 'remixicon-react/ShareLineIcon'
import Bookmark from 'remixicon-react/BookmarkLineIcon'

import User from 'components/shared/User'
import { timeAgo } from 'utils/shared/date-time'

import type { Post } from 'types/post'

import styles from './Post.module.css'
import Tag from './Tag'
import CommentSection from './Comment'
import SlideImage from './SlideImage'
import Tooltip from 'components/shared/Tooltip'
import UserFollowCard from 'components/UserFollowCard'

export type PostProps = Post

export default function Post(props: PostProps) {
  const { createdAt, description, photos, stats, user, tags } = props
  const { comment: commentNumber, like, saved_post } = stats

  const userDescription = `${user.location} - ${timeAgo(createdAt)}`
  return (
    <section className={styles.post}>
      <header className={styles.header}>
        <Tooltip content={<UserFollowCard userId={user.id} />} interactive>
          <div>
            <User avatar={user.avatar} name={user.username} description={userDescription} interactive />
          </div>
        </Tooltip>
        <button className={styles.options}>
          <Options />
        </button>
      </header>
      <div className={styles.body}>
        <SlideImage photos={photos} description={description} />

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
              <CommentIcon size="20" />
            </span>
            <span className={styles.label}>
              <span className={styles.quantity}>{commentNumber}</span>
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

      <CommentSection />
    </section>
  )
}
