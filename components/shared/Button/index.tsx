import NextLink from 'next/link'
import type { ReactNode, ButtonHTMLAttributes } from 'react'
import type { ThemeColor } from 'utils/client/shared/colors/theme'
import Loader from 'components/shared/Loader'
import button from './button.module.css'

export type Props = {
  type?: 'button' | 'submit' | 'reset'
  color?: ThemeColor | 'gradient'
  loading?: boolean
  border?: boolean
  rounded?: boolean | 'full' | 'sm' | 'md' | 'lg'
  children: ReactNode
  icon?: ReactNode
  iconRight?: ReactNode
  href?: string
  to?: string
  fullWidth?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function Button(props: Props) {
  const {
    type = 'button',
    color = 'primary',
    loading,
    border,
    children,
    icon,
    iconRight,
    href,
    to,
    disabled,
    fullWidth,
    rounded,
    className,
    style,
    ...buttonProps
  } = props

  const genericProps = {
    style,
    'data-color': color,
    'data-border': border,
    className: `${button.btn} ${className}`,
    'data-disabled': disabled,
    'data-full-width': fullWidth,
    'data-rounded': rounded,
  }

  const child = (
    <>
      {icon && <span className={button.icon}>{icon}</span>}
      <span className={button.label} data-icon={!!icon} data-icon-right={!!iconRight}>
        {children}
      </span>
      {loading && <Loader color="light" size={16} />}
      {iconRight && !loading && <span className={button.iconRight}>{iconRight}</span>}
    </>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" {...genericProps}>
        {child}
      </a>
    )
  }

  if (to) {
    return (
      <NextLink href={to} {...genericProps}>
        {child}
      </NextLink>
    )
  }

  return (
    <button type={type} {...genericProps} {...buttonProps}>
      {child}
    </button>
  )
}
