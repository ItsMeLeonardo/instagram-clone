'use client'
import { usePostDetailModal } from './Store'
import PostDetail from '.'

export default function PostDetailContainer() {
  const { isOpen, close, postId } = usePostDetailModal()

  if (!postId) return null

  return <PostDetail open={isOpen} onClose={close} postId={postId} />
}
