import type { ReactNode } from 'react'

import styles from './Hidden.module.css'

export type HiddenProps = {
  children: ReactNode | ReactNode[]
  className?: string
  mobileUp?: boolean
  mobileDown?: boolean
  tabledUp?: boolean
  tabledDown?: boolean
  desktopUp?: boolean
  desktopDown?: boolean
  widescreenUp?: boolean
  widescreenDown?: boolean
}

export default function Hidden(props: HiddenProps) {
  const {
    children,
    className,
    mobileUp,
    mobileDown,
    tabledUp,
    tabledDown,
    desktopUp,
    desktopDown,
    widescreenUp,
    widescreenDown,
  } = props

  const classes = [
    className,
    mobileUp ? styles.is_hidden_mobile_up : '',
    mobileDown ? styles.is_hidden_mobile_down : '',
    tabledUp ? styles.is_hidden_tablet_up : '',
    tabledDown ? styles.is_hidden_tablet_down : '',
    desktopUp ? styles.is_hidden_desktop_up : '',
    desktopDown ? styles.is_hidden_desktop_down : '',
    widescreenUp ? styles.is_hidden_widescreen_up : '',
    widescreenDown ? styles.is_hidden_widescreen_down : '',
  ].join(' ')

  return <div className={classes}>{children}</div>
}
