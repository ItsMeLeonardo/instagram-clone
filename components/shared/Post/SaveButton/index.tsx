import Bookmark from 'remixicon-react/BookmarkLineIcon'
import BookmarkFill from 'remixicon-react/BookmarkFillIcon'
import styles from './save-button.module.css'
import { useState } from 'react'
import { AnimatePresence, motion, AnimationProps } from 'framer-motion'
import Tooltip from 'components/shared/Tooltip'
import SavedList from './SavedList'

export type Props = {
  isSaved: boolean
  postId: number
}

const likedAnimation: AnimationProps = {
  initial: { scale: 0.5 },
  animate: { scale: 1 },
  exit: { scale: 0.5, opacity: 0, display: 'none', transition: { duration: 0.4 } },
  transition: { duration: 0.3 },
}

const unLikedAnimation: AnimationProps = {
  initial: { scale: 0.5 },
  animate: { scale: 1 },
  exit: { scale: 1.5, opacity: 0, display: 'none' },
  transition: { duration: 0.3 },
}

export default function SaveButton({ isSaved, postId }: Props) {
  const [saved, setSaved] = useState(isSaved)

  const onSaved = () => setSaved(true)
  const onRemove = () => setSaved(false)

  return (
    <Tooltip
      content={<SavedList postId={postId} isSaved={isSaved} onSaved={onSaved} onRemove={onRemove} />}
      interactive
      delay={[500, 0]}
    >
      <button className={styles.button} data-saved={saved} onClick={() => setSaved(!saved)}>
        <AnimatePresence>
          {saved ? (
            <motion.span key="like-active" {...likedAnimation} className={styles.icon}>
              <BookmarkFill size="20" />
            </motion.span>
          ) : (
            <motion.span key="like-default" {...unLikedAnimation} className={styles.icon}>
              <Bookmark size="20" />
            </motion.span>
          )}
        </AnimatePresence>
        <span className={styles.label}>
          <span className={styles.word}>Saved</span>
        </span>
      </button>
    </Tooltip>
  )
}
