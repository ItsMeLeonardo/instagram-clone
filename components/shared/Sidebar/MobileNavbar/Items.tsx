import React from 'react'

import Link from 'next/link'

import styles from './item.module.css'

import type { SidebarItem as SidebarItemProp } from '../utils/data'

type Props = {
  active: boolean
} & SidebarItemProp

export default function NavbarItem({ href, icon, label, iconActive, active }: Props) {
  if (label === 'add')
    return (
      <Link href={href} className={styles.button} data-active={active}>
        {icon}
      </Link>
    )

  return (
    <Link href={href} className={styles.nav_item} data-active={active}>
      <span className={styles.icon}>{active ? iconActive : icon}</span>

      <span className={styles.label}>{label}</span>
    </Link>
  )
}
