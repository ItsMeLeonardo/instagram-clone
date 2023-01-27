'use client'

import Avatar from 'components/shared/Avatar'
import Attachment from 'remixicon-react/Attachment2Icon'
import ImageIcon from 'remixicon-react/ImageLineIcon'
import SendPlane from 'remixicon-react/SendPlaneFillIcon'
import EmojiButton from '../EmojiButton'
import { useUserAvatar } from 'lib/client/user/useUser'

import type { FormEvent } from 'react'

import styles from './comment.module.css'

export default function CommentSection() {
  const avatar = useUserAvatar()

  if (!avatar) return null

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const input = e.currentTarget.elements.namedItem('comment') as HTMLInputElement

    console.log({ comment: input.value })
  }

  return (
    <footer className={styles.comment}>
      <Avatar src={avatar} size="md" alt="avatar" />
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.comment_input}>
          <input className={styles.input} type="text" name="comment" placeholder="Add a comment..." />

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
