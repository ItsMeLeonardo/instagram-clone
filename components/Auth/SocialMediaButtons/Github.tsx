'use client'
import { signIn } from 'next-auth/react'

import GithubIcon from 'remixicon-react/GithubLineIcon'

import styles from './social-media-buttons.module.css'

export default function Github() {
  return (
    <button
      className={styles.button}
      type="button"
      onClick={() => {
        signIn('github', { callbackUrl: '/app/feed/latest' })
      }}
    >
      <span className={styles.icon}>
        <GithubIcon size="20" />
      </span>
      <span className={styles.label}>With Github</span>
    </button>
  )
}
