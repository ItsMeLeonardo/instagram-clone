import type { ReactNode } from 'react'

import style from './layout-style.module.css'
import Header from 'components/shared/Header'

type AppLayoutProps = {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className={style.container}>
      <nav className={style.sidebar}>sidebar</nav>
      <section className={style.content_container}>
        <header className={style.header}>
          <Header />
        </header>
        <div className={style.content}>{children}</div>
      </section>
      <aside className={style.aside}>aside</aside>
    </div>
  )
}
