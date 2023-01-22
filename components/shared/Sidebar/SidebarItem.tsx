import Link from 'next/link'

import styles from './sidebar-item.module.css'

import type { SidebarItem as SidebarItemProp } from './utils/data'

type Props = {
  active: boolean
} & SidebarItemProp

export default function SidebarItem({ href, icon, label, iconActive, active }: Props) {
  return (
    <Link href={href} className={styles.nav_item} data-active={active}>
      <span className={styles.icon}>{active ? iconActive : icon}</span>

      <span className={styles.label}>{label}</span>
    </Link>
  )
}
