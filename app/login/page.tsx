'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { logger } from 'utils/shared/logs'

import type { FormEvent } from 'react'

import styles from './styles.module.css'
import Button from 'components/shared/Button'
import { signIn } from 'next-auth/react'
import { useUser } from 'lib/client/user/useUser'
import FormField from 'components/shared/FormField'
import SocialMediaButtons from 'components/Auth/SocialMediaButtons'

export default function Login() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const emailRef = useRef<HTMLInputElement>(null)
  const { user } = useUser()

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
      callbackUrl: '/app/feed/latest',
      redirect: false,
    })
      .then((result) => {
        if (result?.error) {
          handleError(result.error)
        }
        if (result?.ok) {
          router.push('/app/feed/latest')
        }
      })
      .catch(handleError)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (user) {
      router.push('/app/feed/latest')
    }
  }, [user, router])

  useEffect(() => {
    const email = searchParams.get('email')
    if (email && emailRef.current) {
      emailRef.current.focus()
      emailRef.current.value = email
    }
  }, [searchParams])

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Sign in</h1>

        <FormField id="email" label="email" type="email" ref={emailRef} required />
        <FormField id="password" label="password" type="password" required />

        <Button color="gradient" rounded="sm" fullWidth type="submit" loading={loading}>
          Login
        </Button>
        {error && <span className={styles.error}>Invalid email or password</span>}

        <SocialMediaButtons />

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
