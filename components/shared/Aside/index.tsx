import Send from 'remixicon-react/SendPlaneLineIcon'
import Notification from 'remixicon-react/NotificationLineIcon'
import Menu from 'remixicon-react/MenuLineIcon'

import Section from './Section'

import styles from './Aside.module.css'
import Trending from './Trending'

import Suggestions from './Suggestions'

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
        <Trending />
      </Section>

      <Section title="Suggestions for you" className={styles.suggestions_container}>
        <Suggestions />
      </Section>
    </div>
  )
}
