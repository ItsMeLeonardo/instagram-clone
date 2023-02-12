import React from 'react'

import Link from 'next/link'

import styles from './item.module.css'

import type { SidebarItem as SidebarItemProp } from '../utils/data'
import { useCreatePostModal } from 'lib/client/globalStore'

type Props = {
  active: boolean
} & SidebarItemProp

export default function NavbarItem({ href, icon, label, iconActive, active }: Props) {
  const { open: openModal } = useCreatePostModal()
  if (label === 'add')
    return (
      <button className={styles.button} data-active={active} onClick={openModal}>
        {icon}
      </button>
    )

  return (
    <Link href={href} className={styles.nav_item} data-active={active}>
      <span className={styles.icon}>{active ? iconActive : icon}</span>

      <span className={styles.label}>{label}</span>
    </Link>
  )
}
