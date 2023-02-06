'use client'

import Avatar from 'components/shared/Avatar'
import Attachment from 'remixicon-react/Attachment2Icon'
import ImageIcon from 'remixicon-react/ImageLineIcon'
import SendPlane from 'remixicon-react/SendPlaneFillIcon'
import EmojiButton from '../EmojiButton'

import Loader from 'components/shared/Loader'

import { useUserAvatar } from 'lib/client/user/useUser'

import type { FormEvent } from 'react'

import styles from './comment.module.css'
import { commentInputId } from '../utils'

type CommentSectionProps = {
  postId: number
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const avatar = useUserAvatar()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const input = e.currentTarget.elements.namedItem('comment') as HTMLInputElement

    console.log({ comment: input.value })
  }

  const inputId = commentInputId`${postId}`

  return (
    <footer className={styles.comment}>
      {!avatar ? (
        <Avatar icon={<Loader size={20} />} bordered size="md" alt="avatar" />
      ) : (
        <Avatar src={avatar} size="md" alt="avatar" />
      )}
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.comment_input}>
          <input
            className={styles.input}
            id={inputId}
            type="text"
            name="comment"
            placeholder="Add a comment..."
            autoComplete="off"
          />

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

            <button className={styles.submit}>
              <SendPlane size="20" />
            </button>
          </div>
        </label>
      </form>
    </footer>
  )
}
