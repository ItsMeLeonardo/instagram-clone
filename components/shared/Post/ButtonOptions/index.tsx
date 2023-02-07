'use client'
import { motion, AnimatePresence, type AnimationProps } from 'framer-motion'

import Heart from 'remixicon-react/Heart3LineIcon'
import HeartFilled from 'remixicon-react/Heart3FillIcon'

import CommentIcon from 'remixicon-react/Chat1LineIcon'
import Share from 'remixicon-react/ShareLineIcon'
import Bookmark from 'remixicon-react/BookmarkLineIcon'

import styles from './button-options.module.css'

import { commentInputId } from '../utils'
import { useState } from 'react'
import { useLikePost } from 'lib/client/post/useLikePost'

type ButtonOptionsProps = {
  likes: number
  comments: number
  saved: number
  postId: number
  isLiked: boolean
  isSaved: boolean
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

export default function ButtonOptions({ comments, likes, saved, postId, isLiked }: ButtonOptionsProps) {
  const { loading, toggle, liked } = useLikePost(postId, isLiked)

  const inputId = commentInputId`${postId}`
  return (
    <div className={styles.options}>
      <button className={styles.button} data-liked={liked} onClick={toggle}>
        <AnimatePresence>
          {liked ? (
            <motion.span key="like-active" {...likedAnimation} className={styles.icon}>
              <HeartFilled size="20" />
            </motion.span>
          ) : (
            <motion.span key="like-default" {...unLikedAnimation} className={styles.icon}>
              <Heart size="20" />
            </motion.span>
          )}
        </AnimatePresence>
        <span className={styles.label}>
          <span className={styles.quantity}>{liked && !isLiked ? likes + 1 : likes}</span>
          <span className={styles.word}>Like</span>
        </span>
      </button>
      <label className={styles.button} htmlFor={inputId}>
        <span className={styles.icon}>
          <CommentIcon size="20" />
        </span>
        <span className={styles.label}>
          <span className={styles.quantity}>{comments}</span>
          <span className={styles.word}>Comment</span>
        </span>
      </label>
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
          <span className={styles.quantity}>{saved}</span>
          <span className={styles.word}>Saved</span>
        </span>
      </button>
    </div>
  )
}
