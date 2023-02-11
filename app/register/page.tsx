'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import Button from 'components/shared/Button'
import FormField from 'components/shared/FormField'
import { registerUser } from 'service/client/auth'
import { useUser } from 'lib/client/user/useUser'

import type { UserToRegister } from 'service/client/auth'

import styles from './styles.module.css'

export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UserToRegister>()
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { user } = useUser()
  setError
  useEffect(() => {
    if (user) {
      router.push('/app/feed/latest')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit: SubmitHandler<UserToRegister> = async (data) => {
    setLoading(true)
    const result = await registerUser(data)
    setLoading(false)
    if (typeof result === 'string') {
      const usernameError = result.toLowerCase().includes('username')
      const emailError = result.toLowerCase().includes('email')

      if (usernameError) {
        setError('username', { type: 'manual', message: result })
      }

      if (emailError) {
        setError('email', { type: 'manual', message: result })
      }

      return
    }

    router.push(`/login?email=${result.email}`)
  }

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>Sign up</h1>

        <FormField
          label="email"
          type="email"
          {...register('email', { required: 'Email is required' })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <FormField
          label="username"
          type="text"
          {...register('username', { required: 'Username is required' })}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <FormField label="password" type="password" {...register('password', { required: 'Password is required' })} />

        <Button color="gradient" rounded="sm" fullWidth type="submit" loading={loading}>
          Register
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
