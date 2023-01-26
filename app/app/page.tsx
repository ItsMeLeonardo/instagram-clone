import Play from 'remixicon-react/PlayFillIcon'
import AddIcon from 'remixicon-react/AddFillIcon'

import Avatar from 'components/shared/Avatar'
import Post from 'components/shared/Post'

import { getPosts } from 'service/client/post'

import styles from './page-style.module.css'

type Story = {
  id: string
  name: string
  avatar: string
}

const DATA = [
  {
    id: '1',
    name: 'Perdana',
    avatar: 'https://i.pinimg.com/236x/c8/0f/97/c80f971dca149720d06b5e134e6b4a7d.jpg',
  },
  {
    id: '2',
    name: 'Anna',
    avatar: 'https://i.pinimg.com/236x/31/81/d9/3181d9e80494f5d14e65f9aecb07c792.jpg',
  },
  {
    id: '3',
    name: 'Vera',
    avatar: 'https://i.pinimg.com/236x/3a/72/58/3a72584976987b1458c7330eb5638966.jpg',
  },
  {
    id: '4',
    name: 'Vera',
    avatar: 'https://i.pinimg.com/236x/7f/05/71/7f0571fb0e693ced5da9b80fbd9adcf7.jpg',
  },
  {
    id: '5',
    name: 'Vera',
    avatar: 'https://i.pinimg.com/236x/22/29/8b/22298b7a73407463bb3b7283f0c7714d.jpg',
  },
  {
    id: '6',
    name: 'Anna',
    avatar: 'https://i.pinimg.com/236x/31/81/d9/3181d9e80494f5d14e65f9aecb07c792.jpg',
  },
]

export default async function page() {
  const posts = await getPosts()

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
          {DATA.map((story: Story) => (
            <button key={story.id} className={styles.story}>
              <Avatar size="lg" bordered src={story.avatar} alt={story.name} />

              <span className={styles.label}>{story.name}</span>
            </button>
          ))}
        </aside>
      </section>

      <section className={`${styles.section} ${styles.feed}`}>
        <header className={styles.header}>
          <h3 className={styles.title}>Feeds</h3>

          <div className={styles.filters}>
            <button className={styles.button}>Latest</button>
            <button className={styles.button} data-active={true}>
              Popular
            </button>
          </div>
        </header>

        <aside className={styles.posts}>
          {posts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </aside>
      </section>
    </div>
  )
}
