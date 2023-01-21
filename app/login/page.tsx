'use client'

import type { FormEvent } from 'react'
import styles from './styles.module.css'

export default function Login() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const username = event.currentTarget.username.value
    const password = event.currentTarget.password.value
    console.log({ username, password })
  }

  return (
    <section className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Login</h1>
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
      </form>
    </section>
  )
}
