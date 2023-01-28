import styles from './page-explore.module.css'

const items = Array.from({ length: 12 })

export default function loading() {
  return (
    <div className={styles.container}>
      {items.map((_, index) => (
        <div key={index} className={styles.gallery_item} data-loading={true}></div>
      ))}
    </div>
  )
}
