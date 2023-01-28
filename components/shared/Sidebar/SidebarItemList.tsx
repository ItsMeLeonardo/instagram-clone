'use client'
import { usePathname } from 'next/navigation'

import { SIDEBAR_ITEMS } from './utils/data'
import SidebarItem from './SidebarItem'

export default function SidebarItemList() {
  const pathname = usePathname()

  return (
    <>
      {SIDEBAR_ITEMS.map((item) => {
        let active = pathname ? pathname.startsWith(item.href) : false
        if (item.href === '/app/feed/latest') active = !!pathname?.startsWith('/app/feed')
        return <SidebarItem key={item.label} {...item} active={active} />
      })}
    </>
  )
}
