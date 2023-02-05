import React from 'react'

import Tippy from '@tippyjs/react/headless'

import type { TippyProps } from '@tippyjs/react'

export type LazyTippyProps = TippyProps

export default function LazyTippy(props: LazyTippyProps) {
  const [mounted, setMounted] = React.useState(false)

  const lazyPlugin = {
    fn: () => ({
      onMount: () => setMounted(true),
      onHidden: () => setMounted(false),
    }),
  }

  const computedProps = { ...props }

  computedProps.plugins = [lazyPlugin, ...(props.plugins || [])]

  if (props.render) {
    const render = props.render // let TypeScript safely derive that render is not undefined
    computedProps.render = (...args) => (mounted ? render(...args) : '')
  } else {
    computedProps.content = mounted ? props.content : ''
  }

  return <Tippy {...computedProps} />
}
