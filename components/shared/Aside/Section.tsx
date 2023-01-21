import type { ReactNode } from 'react'
import style from './section.module.css'

type SectionProps = {
  children: ReactNode
  title: string
  className?: string
}

export default function Section({ children, className, title }: SectionProps) {
  const classes = `${style.container} ${className}`
  return (
    <section className={classes}>
      <h3 className={style.title}>{title}</h3>
      {children}
    </section>
  )
}
