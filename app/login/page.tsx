'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { request } from 'lib/shared/request'

import { logger } from 'utils/shared/logs'

import type { FormEvent } from 'react'

import styles from './styles.module.css'
import Button from 'components/shared/Button'

export default function Login() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const username = event.currentTarget.username.value
    const password = event.currentTarget.password.value

    const options = {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    }

    setLoading(true)

    request('/api/auth/login', options)
      .then((response) => response.json())
      .then(() => {
        router.push('/app')
      })
      .catch((err) => {
        setError(true)
        logger.error(err)

        setTimeout(() => {
          setError(false)
        }, 3000)
      })
      .finally(() => setLoading(false))
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

        <Button color="gradient" fullWidth type="submit" loading={loading}>
          Login
        </Button>
        {error && <span className={styles.error}>Invalid username or password</span>}

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
