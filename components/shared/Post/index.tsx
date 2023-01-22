import Options from 'remixicon-react/MoreFillIcon'
import Heart from 'remixicon-react/Heart3LineIcon'
import Comment from 'remixicon-react/Chat1LineIcon'
import Share from 'remixicon-react/ShareLineIcon'
import Bookmark from 'remixicon-react/BookMarkLineIcon'
import Attachment from 'remixicon-react/Attachment2Icon'
import ImageIcon from 'remixicon-react/ImageLineIcon'

import User from 'components/shared/User'
import Avatar from 'components/shared/Avatar'
import styles from './Post.module.css'
import EmojiButton from './EmojiButton'

export type PostProps = {
  user?: string
  postImage: string
}

export default function Post(props: PostProps) {
  const { postImage } = props
  return (
    <section className={styles.post}>
      <header className={styles.header}>
        <a href="/">
          <User
            avatar="https://i.pinimg.com/236x/ab/38/69/ab38691fb2e67fa2553f77042a128f3c.jpg"
            name="Anghelina"
            location="Ukraine"
            interactive
          />
        </a>

        <button className={styles.options}>
          <Options />
        </button>
      </header>
      <div className={styles.body}>
        <picture className={styles.image}>
          <img src={postImage} alt="post" />
        </picture>

        <div className={styles.options}>
          <button className={styles.button}>
            <span className={styles.icon}>
              <Heart size="20" />
            </span>
            <span className={styles.label}>28.5k Like</span>
          </button>
          <button className={styles.button}>
            <span className={styles.icon}>
              <Comment size="20" />
            </span>
            <span className={styles.label}>33 Comment</span>
          </button>
          <button className={styles.button}>
            <span className={styles.icon}>
              <Share size="20" />
            </span>
            <span className={styles.label}>134 Share</span>
          </button>
          <button className={styles.button}>
            <span className={styles.icon}>
              <Bookmark size="20" />
            </span>
            <span className={styles.label}>16 Saved</span>
          </button>
        </div>

        <p className={styles.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Quisquam, quod. Quisquam, quod.
        </p>
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
