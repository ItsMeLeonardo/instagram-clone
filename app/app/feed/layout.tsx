import Play from 'remixicon-react/PlayFillIcon'
import storyService from 'service/server/story'
import Story from 'components/shared/Story'

import type { ReactNode } from 'react'

import styles from './feed-layout.module.css'

type LayoutProps = {
  children: ReactNode
}

export default async function layout({ children }: LayoutProps) {
  const serverStories = await storyService.getStories()
  const stories = serverStories.map((storyUser) => ({
    ...storyUser,
    story: storyUser.story.map((story) => ({
      ...story,
      createdAt: (story.createdAt as Date).toISOString(),
    })),
  }))

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

        <Story stories={stories} />
      </section>

      {children}
    </div>
  )
}
