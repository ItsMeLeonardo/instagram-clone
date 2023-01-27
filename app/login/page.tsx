'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// import { request } from 'lib/shared/request'

import { logger } from 'utils/shared/logs'

import type { FormEvent } from 'react'

import styles from './styles.module.css'
import Button from 'components/shared/Button'
import { signIn } from 'next-auth/react'

export default function Login() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleError = (err: Error | string) => {
    setError(true)
    logger.error(err)

    setTimeout(() => {
      setError(false)
    }, 3000)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const email = event.currentTarget.email.value
    const password = event.currentTarget.password.value

    setLoading(true)
    signIn('credentials', {
      email,
      password,
      callbackUrl: '/app',
      redirect: false,
    })
      .then((result) => {
        if (result?.error) {
          handleError(result.error)
        }
        if (result?.ok) {
          router.push('/app')
        }
      })
      .catch(handleError)
      .finally(() => setLoading(false))
  }

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Sign in</h1>
        <label className={styles.formField}>
          <span className={styles.label}>Email</span>
          <div className={styles.input}>
            <input type="email" id="email" />
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
        {error && <span className={styles.error}>Invalid email or password</span>}

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
