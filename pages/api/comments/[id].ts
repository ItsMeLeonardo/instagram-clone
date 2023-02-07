import { authMiddleware } from 'lib/server/auth/middleware'
import { NextAuthRequest } from 'lib/server/auth/middleware/with-next-auth'
import base from 'lib/server/middleware/common'
import commentService from 'service/server/comments'
import { CommentNotFoundError } from 'service/server/comments/errors'
import { PostNotFoundError } from 'service/server/post/errors'

export default base()
  .get(async (req, res) => {
    const postId = req.query.id

    try {
      const comments = await commentService.getPostComments(Number(postId))
      res.status(200).json(comments)
    } catch (error) {
      if (error instanceof PostNotFoundError) {
        res.status(404).json({ error: error.message })
        return
      }

      res.status(400).json({ error: "could't get comments" })
    }
  })
  .use(authMiddleware)
  .post<NextAuthRequest>(async (req, res) => {
    const postId = req.query.id
    const userId = req.userId
    const { comment } = req.body

    try {
      await commentService.commentPost(Number(postId), userId, comment)
      res.status(200).json({ success: true })
    } catch (error) {
      if (error instanceof PostNotFoundError) {
        res.status(404).json({ error: error.message })
        return
      }
      res.status(400).json({ error: "couldn't create comment" })
    }
  })
  .delete<NextAuthRequest>(async (req, res) => {
    const postId = req.query.id
    const userId = req.userId

    try {
      await commentService.deleteComment(Number(postId), userId)
      res.status(200).json({ success: true })
    } catch (error) {
      if (error instanceof CommentNotFoundError) {
        res.status(404).json({ error: error.message })
        return
      }
      res.status(400).json({ error: "couldn't delete comment" })
    }
  })
