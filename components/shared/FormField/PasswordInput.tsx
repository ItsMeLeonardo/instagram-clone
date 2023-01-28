'use client'
import { type InputHTMLAttributes, useState } from 'react'
import EyeIcon from 'remixicon-react/EyeLineIcon'
import EyeOffIcon from 'remixicon-react/EyeOffLineIcon'

type PasswordInputProps = InputHTMLAttributes<HTMLInputElement>

import styles from './form-field.module.css'

export default function PasswordInput(props: PasswordInputProps) {
  const [show, setShow] = useState(false)

  const toggleShow = () => {
    setShow(!show)
  }

  return (
    <div className={styles.input_container}>
      <input className={styles.input} type={show ? 'text' : 'password'} autoComplete="off" {...props} />
      <button className={styles.icon}>
        {show ? <EyeOffIcon size={20} onClick={toggleShow} /> : <EyeIcon size={20} onClick={toggleShow} />}
      </button>
    </div>
  )
}
