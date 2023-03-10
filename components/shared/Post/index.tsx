import Options from 'remixicon-react/MoreFillIcon'

import User from 'components/shared/User'
import { timeAgo } from 'utils/shared/date-time'

import type { FeedPost } from 'types/post'

import styles from './Post.module.css'
import Tag from './Tag'
import CommentSection from './Comment'
import SlideImage from './SlideImage'
import Tooltip from 'components/shared/Tooltip'
import UserFollowCard from 'components/UserFollowCard'
import ButtonOptions from './ButtonOptions'
import Link from 'next/link'

export type PostProps = FeedPost

export default function Post(props: PostProps) {
  const { createdAt, description, photos, stats, user, tags, id, liked, saved } = props
  const { comment: commentNumber, like } = stats

  const userDescription = `${user.location} - ${timeAgo(createdAt)}`
  return (
    <section className={styles.post}>
      <header className={styles.header}>
        <Tooltip content={<UserFollowCard userId={user.id} />} interactive delay={[500, 0]}>
          <Link href={`app/${user.username}`}>
            <User avatar={user.avatar} name={user.username} description={userDescription} interactive />
          </Link>
        </Tooltip>
        <button className={styles.options}>
          <Options />
        </button>
      </header>
      <div className={styles.body}>
        <SlideImage photos={photos} description={description} />

        <ButtonOptions postId={id} comments={commentNumber} likes={like} isLiked={liked} isSaved={saved} />

        <p className={styles.description}>{description}</p>

        <div className={styles.tag_container}>
          {tags.map(({ id, name }) => (
            <Tag key={id} name={name} />
          ))}
        </div>
      </div>

      <CommentSection postId={id} />
    </section>
  )
}
