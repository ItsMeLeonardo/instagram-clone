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

export type SidebarItem = {
  label: string
  icon: ReactNode
  href: string
  iconActive?: ReactNode
}
export const SIDEBAR_ITEMS = [
  {
    label: 'Feed',
    icon: <Home />,
    iconActive: <HomeActive />,
    href: '/app',
  },
  {
    label: 'Explore',
    icon: <Explore />,
    iconActive: <ExploreActive />,
    href: '/',
  },
  {
    label: 'Favorite',
    icon: <Favorite />,
    iconActive: <FavoriteActive />,
    href: '/',
  },
  {
    label: 'Messages',
    icon: <Messages />,
    iconActive: <MessagesActive />,
    href: '/',
  },
  {
    label: 'Settings',
    icon: <Settings />,
    iconActive: <SettingsActive />,
    href: '/',
  },
]
