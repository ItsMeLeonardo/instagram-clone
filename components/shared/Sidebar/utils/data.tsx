import type { ReactNode } from 'react'

import HomeActive from 'remixicon-react/HomeFillIcon'
import Home from 'remixicon-react/HomeLineIcon'
import Explore from 'remixicon-react/CompassLineIcon'
import ExploreActive from 'remixicon-react/CompassFillIcon'
import Favorite from 'remixicon-react/Bookmark2LineIcon'
import FavoriteActive from 'remixicon-react/Bookmark2FillIcon'
import Messages from 'remixicon-react/Chat3LineIcon'
import MessagesActive from 'remixicon-react/Chat3FillIcon'
import Settings from 'remixicon-react/Settings3LineIcon'
import SettingsActive from 'remixicon-react/Settings3FillIcon'
import Plus from 'remixicon-react/AddLineIcon'

export type SidebarItem = {
  label: string
  icon: ReactNode
  href: string
  iconActive?: ReactNode
}
export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    label: 'Feed',
    icon: <Home />,
    iconActive: <HomeActive />,
    href: '/app/feed/latest',
  },
  {
    label: 'Explore',
    icon: <Explore />,
    iconActive: <ExploreActive />,
    href: '/app/explore',
  },
  {
    label: 'Favorite',
    icon: <Favorite />,
    iconActive: <FavoriteActive />,
    href: '/app/favorite',
  },
  {
    label: 'Messages',
    icon: <Messages />,
    iconActive: <MessagesActive />,
    href: '/app/settings',
  },
  {
    label: 'Settings',
    icon: <Settings />,
    iconActive: <SettingsActive />,
    href: '/app/settings',
  },
]

export const MOBILE_NAVBAR_ITEMS: SidebarItem[] = [
  {
    label: 'Feed',
    icon: <Home />,
    iconActive: <HomeActive />,
    href: '/app/feed/latest',
  },
  {
    label: 'Explore',
    icon: <Explore />,
    iconActive: <ExploreActive />,
    href: '/app/explore',
  },
  {
    label: 'add',
    icon: <Plus size="20" />,
    href: '/app/feed/latest',
  },
  {
    label: 'Messages',
    icon: <Messages />,
    iconActive: <MessagesActive />,
    href: '/app/settings',
  },
  {
    label: 'Settings',
    icon: <Settings />,
    iconActive: <SettingsActive />,
    href: '/app/settings',
  },
]
