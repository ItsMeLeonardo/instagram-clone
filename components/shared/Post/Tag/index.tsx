import styles from './tag.module.css'

export type TagProps = {
  name: string
}

export default function Tag({ name }: TagProps) {
  return <span className={styles.tag}>#{name}</span>
}
