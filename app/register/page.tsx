'use client'

import Link from 'next/link'
import type { FormEvent } from 'react'

import styles from './styles.module.css'
import Button from 'components/shared/Button'

export default function Login() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Sign up</h1>
        <label className={styles.formField}>
          <span className={styles.label}>email</span>
          <div className={styles.input}>
            <input type="email" id="email" />
          </div>
        </label>

        <label className={styles.formField}>
          <span className={styles.label}>Username</span>
          <div className={styles.input}>
            <input type="text" id="username" />
          </div>
        </label>

        <label className={styles.formField}>
          <span className={styles.label}>Password</span>
          <div className={styles.input}>
            <input type="password" id="password" />
          </div>
        </label>

        <Button color="gradient" rounded="sm" fullWidth type="submit">
          Login
        </Button>
        <div className={styles.footer}>
          <span className={styles.text}>{'Already have an account?'}</span>
          <Link href="/login">
            <span className={styles.link}>Sign in</span>
          </Link>
        </div>
      </form>
    </section>
  )
}
