import styles from './page-favorite.module.css'

const list = new Array(10).fill(null)

export default function loading() {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <small className={styles.text}>{"Only you can see what you've saved"}</small>
        <button className={styles.button}>+ new collection</button>
      </header>
      <div className={styles.grid}>
        {list.map((_, index) => {
          return <div key={index} className={styles.item} data-loader={true}></div>
        })}
      </div>
    </section>
  )
}
