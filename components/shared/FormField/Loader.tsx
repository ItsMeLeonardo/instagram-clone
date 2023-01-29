import styles from './loader-form-field.module.css'

export default function FormFieldLoader() {
  return (
    <div className={styles.container}>
      <span className={styles.label}></span>
      <div className={styles.input} />
    </div>
  )
}
