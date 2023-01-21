import Send from 'remixicon-react/SendPlaneLineIcon'
import Notification from 'remixicon-react/NotificationLineIcon'
import Menu from 'remixicon-react/MenuLineIcon'

import Avatar from 'components/shared/Avatar'
import Section from './Section'

import styles from './Aside.module.css'

export default function Aside() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.button}>
          <Send size="16" />
        </button>
        <button className={styles.button} data-notify={true}>
          <Notification size="16" />
        </button>
        <button className={styles.button}>
          <Menu size="16" />
        </button>
      </header>

      <Section title="Trending feeds">
        <div className={styles.trending_grid}>
          <button>
            <picture className={styles.item}>
              <img src="https://i.pinimg.com/236x/7f/05/71/7f0571fb0e693ced5da9b80fbd9adcf7.jpg" alt="afafkal" />
            </picture>
          </button>
          <button>
            <picture className={styles.item}>
              <img src="https://i.pinimg.com/236x/22/29/8b/22298b7a73407463bb3b7283f0c7714d.jpg" alt="afafkal" />
            </picture>
          </button>
          <button>
            <picture className={styles.item}>
              <img src="https://i.pinimg.com/236x/be/73/04/be7304e5b045af5c870115ec9d7d3707.jpg" alt="afafkal" />
            </picture>
          </button>
          <button>
            <picture className={styles.item}>
              <img src="https://i.pinimg.com/236x/d3/db/d7/d3dbd793e070f2966f54a45908b7749f.jpg" alt="afafkal" />
            </picture>
          </button>
        </div>
      </Section>

      <Section title="Suggestions for you" className={styles.suggestions_container}>
        <div className={styles.suggestions}>
          <button className={styles.item}>
            <Avatar size="md" src="https://i.pinimg.com/236x/ab/38/69/ab38691fb2e67fa2553f77042a128f3c.jpg" alt="afa" />

            <div className={styles.data}>
              <strong className={styles.username}>Anghelina</strong>
              <span className={styles.location}>Ukraine</span>
            </div>
          </button>
        </div>
      </Section>
    </div>
  )
}
