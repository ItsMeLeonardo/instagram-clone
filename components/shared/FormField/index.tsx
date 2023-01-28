import type { InputHTMLAttributes } from 'react'

import styles from './form-field.module.css'
import PasswordInput from './PasswordInput'

export type FormFieldProps = {
  label: string
  helperText?: string
  error?: boolean
} & InputHTMLAttributes<HTMLInputElement>

export default function FormField(props: FormFieldProps) {
  const { label, helperText, error, disabled, type, ...inputProps } = props

  return (
    <label className={styles.container} data-error={error} data-disabled={disabled}>
      <span className={styles.label}>{label}</span>

      {type === 'password' ? (
        <PasswordInput />
      ) : (
        <div className={styles.input_container}>
          <input className={styles.input} type={type} disabled={disabled} {...inputProps} />
        </div>
      )}
      {helperText && <span className={styles.helperText}>{helperText}</span>}
    </label>
  )
}
