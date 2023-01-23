'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { request } from 'lib/shared/request'

import type { FormEvent } from 'react'

import styles from './styles.module.css'
import { logger } from 'utils/shared/logs'

export default function Login() {
  const router = useRouter()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const username = event.currentTarget.username.value
    const password = event.currentTarget.password.value

    const options = {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    }

    request('/api/auth/login', options)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          router.push('/app')
        } else {
          logger.error('Login failed')
        }
      })
      .catch((err) => logger.error(err))
  }

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Sign in</h1>
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
        <button className={styles.submit} type="submit">
          Login
        </button>
        <div className={styles.footer}>
          <span className={styles.text}>{"Don't have an account?"}</span>
          <Link href="/register">
            <span className={styles.link}>Sign up</span>
          </Link>
        </div>
      </form>
    </section>
  )
}
