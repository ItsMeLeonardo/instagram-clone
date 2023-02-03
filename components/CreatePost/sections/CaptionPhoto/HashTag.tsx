import type { ReactNode } from 'react'

type Props = {
  children: string
  renderHashtag?: (hashtag: string) => ReactNode
}

const rule = /([#|＃][^\s]+)/g

const DefaultRenderHashtag = ({ hashtag }: { hashtag: string }) => <span>{hashtag}</span>

export default function HashTag({ children, renderHashtag }: Props) {
  if (!children) return null

  const content = children.split(rule).map((chuck) => {
    if (chuck.match(rule)) {
      if (renderHashtag) return renderHashtag(chuck)
      return <DefaultRenderHashtag key={chuck} hashtag={chuck} />
    }
    return chuck
  })
  return <>{content}</>
}
