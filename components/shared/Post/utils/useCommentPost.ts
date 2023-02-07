import { useSWRConfig } from 'swr'
import { useState } from 'react'
import * as commentService from 'service/client/comments'

import { USER_FEED_KEY } from 'lib/client/feed/useFeed'
import { FeedPost } from 'types/post'

export function useCommentPost(postId: number) {
  const { mutate } = useSWRConfig()
  const [loading, setLoading] = useState(false)
  const [comments, setComments] = useState([])
  const [error, setError] = useState(false)

  async function getPostComments() {
    //NOTE: use mutation to update comments
    setLoading(true)
    try {
      const comments = await commentService.getComments(postId)
      setComments(comments)
    } catch (error) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  async function commentPost(comment: string) {
    setLoading(true)
    try {
      await commentService.commentPost(postId, comment)

      mutate(USER_FEED_KEY, (data) => {
        const posts = data as FeedPost[]
        return posts.map((post) => {
          if (post.id !== postId) {
            return post
          }

          return {
            ...post,
            stats: {
              ...post.stats,
              comment: post.stats.comment + 1,
            },
          }
        })
      })
    } catch (error) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  async function deleteComment() {
    setLoading(true)
    try {
      await commentService.deleteComment(postId)
    } catch (error) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    comments,
    error,
    getPostComments,
    commentPost,
    deleteComment,
  }
}
