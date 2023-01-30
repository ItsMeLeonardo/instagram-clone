'use client'
import { type InputHTMLAttributes, useState, forwardRef } from 'react'
import EyeIcon from 'remixicon-react/EyeLineIcon'
import EyeOffIcon from 'remixicon-react/EyeOffLineIcon'

type PasswordInputProps = InputHTMLAttributes<HTMLInputElement>

import styles from './form-field.module.css'

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
  const [show, setShow] = useState(false)

  const toggleShow = () => {
    setShow(!show)
  }

  return (
    <div className={styles.input_container}>
      <input className={styles.input} ref={ref} type={show ? 'text' : 'password'} autoComplete="off" {...props} />
      <button type="button" className={styles.icon}>
        {show ? <EyeOffIcon size={20} onClick={toggleShow} /> : <EyeIcon size={20} onClick={toggleShow} />}
      </button>
    </div>
  )
})

export default PasswordInput
