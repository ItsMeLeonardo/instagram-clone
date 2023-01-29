import { forwardRef } from 'react'
import PasswordInput from './PasswordInput'

import type { InputHTMLAttributes } from 'react'

import styles from './form-field.module.css'

export type FormFieldProps = {
  label: string
  helperText?: string
  error?: boolean
} & InputHTMLAttributes<HTMLInputElement>

const FormField = forwardRef<HTMLInputElement, FormFieldProps>((props, ref) => {
  const { label, helperText, error, disabled, type, ...inputProps } = props

  return (
    <label className={styles.container} data-error={error} data-disabled={disabled}>
      <span className={styles.label}>{label}</span>

      {type === 'password' ? (
        <PasswordInput ref={ref} />
      ) : (
        <div className={styles.input_container}>
          <input className={styles.input} type={type} ref={ref} disabled={disabled} {...inputProps} />
        </div>
      )}
      {helperText && <span className={styles.helperText}>{helperText}</span>}
    </label>
  )
})
export default FormField
