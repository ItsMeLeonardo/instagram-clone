import styles from './suggestions.module.css'

const items = new Array(5).fill(null)

export default function Loader() {
  return (
    <>
      {items.map((_, index) => (
        <div key={index} className={styles.container_loader}>
          <div className={styles.avatar}></div>
          <div className={styles.data}>
            <span className={styles.name}></span>
            <span className={styles.description}></span>
          </div>
        </div>
      ))}
    </>
  )
}
