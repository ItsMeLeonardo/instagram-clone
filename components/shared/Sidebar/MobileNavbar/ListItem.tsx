'use client'
import { usePathname } from 'next/navigation'

import { MOBILE_NAVBAR_ITEMS } from '../utils/data'
import Item from './Items'

export default function SidebarItemList() {
  const pathname = usePathname()

  return (
    <>
      {MOBILE_NAVBAR_ITEMS.map((item) => {
        let active = pathname ? pathname.startsWith(item.href) : false
        if (item.href === '/app') active = pathname === item.href

        return <Item key={item.label} {...item} active={active} />
      })}
    </>
  )
}
