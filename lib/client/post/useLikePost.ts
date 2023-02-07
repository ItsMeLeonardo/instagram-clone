import { useState } from 'react'
import { likePost, unlikePost } from 'service/client/post'

export function useLikePost(postId: number, initialLiked?: boolean) {
  const [liked, setLiked] = useState(!!initialLiked)
  const [loading, setLoading] = useState(false)

  const like = () => {
    setLoading(true)
    likePost(postId)
      .then(() => setLiked(true))
      .finally(() => setLoading(false))
  }

  const unlike = () => {
    setLoading(true)
    unlikePost(postId)
      .then(() => setLiked(false))
      .finally(() => setLoading(false))
  }

  const toggle = () => {
    if (liked) {
      unlike()
    } else {
      like()
    }
  }

  return { toggle, liked, loading }
}
