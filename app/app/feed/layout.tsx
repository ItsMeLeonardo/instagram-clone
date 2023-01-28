import Play from 'remixicon-react/PlayFillIcon'
import AddIcon from 'remixicon-react/AddFillIcon'
import Avatar from 'components/shared/Avatar'

import storyService from 'service/server/story'

import type { ReactNode } from 'react'

import styles from './feed-layout.module.css'

type LayoutProps = {
  children: ReactNode
}

export default async function layout({ children }: LayoutProps) {
  const stories = await storyService.getStories()

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <header className={styles.header}>
          <h3 className={styles.title}>Stories</h3>

          <button className={styles.see_all}>
            <span className={styles.label}>Watch all</span>
            <span className={styles.icon}>
              <Play size="20" />
            </span>
          </button>
        </header>

        <aside className={styles.stories}>
          <button className={styles.story}>
            <Avatar bordered size="lg" icon={<AddIcon size="28" />} alt="afkajf" />

            <span className={styles.label}>Add story</span>
          </button>
          {stories.map(({ user, id }) => (
            <button key={id} className={styles.story}>
              <Avatar size="lg" bordered src={user.avatar} alt={user.username} />

              <span className={styles.label}>{user.username}</span>
            </button>
          ))}
        </aside>
      </section>

      {children}
    </div>
  )
}
