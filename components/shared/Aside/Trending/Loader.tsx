import styles from './trending.module.css'

export default function Loader() {
  return (
    <div className={styles.trending_grid}>
      {new Array(4).fill(null).map((_, index) => (
        <div key={index} className={styles.item_loader}></div>
      ))}
    </div>
  )
}
