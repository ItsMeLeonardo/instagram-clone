import type { ReactNode } from 'react'

import style from './layout-style.module.css'
import Header from 'components/shared/Header'
import Sidebar from 'components/shared/Sidebar'
import Aside from 'components/shared/Aside'

type AppLayoutProps = {
  children: ReactNode
}

export default function AppLayout({ children, ...rest }: AppLayoutProps) {
  return (
    <div className={style.container}>
      <nav className={style.sidebar}>
        <Sidebar />
      </nav>
      <section className={style.content_container}>
        <header className={style.header}>
          <Header />
        </header>
        <div className={style.content}>{children}</div>
      </section>
      <aside className={style.aside}>
        <Aside />
      </aside>
    </div>
  )
}
