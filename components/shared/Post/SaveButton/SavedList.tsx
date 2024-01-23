import { useSavedList } from 'lib/client/save/useSavedList'
import styles from './save-button.module.css'
import Loader from 'components/shared/Loader'
import { alertToast } from 'components/shared/Toaster'

type Props = {
  postId: number
  isSaved: boolean
  onSaved?: () => void
  onRemove?: () => void
}

export default function SavedList({ postId, onSaved }: Props) {
  const { savedList, isLoading, savePost } = useSavedList()

  if (isLoading) {
    return (
      <aside className={styles.list_container}>
        <header className={styles.header}>Your collections</header>
        <div className={styles.saved_list}>
          <Loader />
        </div>
      </aside>
    )
  }

  if (!savedList) {
    return (
      <aside className={styles.list_container}>
        <header className={styles.header}>No collections</header>
      </aside>
    )
  }

  const handleClick = (listId: number) => {
    savePost(listId, postId)
      .then(() => {
        onSaved?.()
        alertToast('Post saved successfully', {
          theme: 'success',
        })
      })
      .catch(() => {
        alertToast('Something went wrong', {
          theme: 'danger',
        })
      })
  }

  return (
    <aside className={styles.list_container}>
      <header className={styles.header}>Your collections</header>
      <div className={styles.saved_list}>
        {savedList.map(({ id, poster, title }) => {
          const postPoster = poster || '/assets/emoji/face-in-clouds.webp'

          return (
            <button key={id} className={styles.save_item} onClick={() => handleClick(id)}>
              <picture className={styles.thumbnail}>
                <img src={postPoster} alt="coll 1" />
              </picture>
              <span className={styles.label}>{title}</span>
            </button>
          )
        })}
      </div>
    </aside>
  )
}
